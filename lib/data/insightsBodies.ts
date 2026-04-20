/** Long-form HTML for insights — heading ids must match lib/data/insights.ts tableOfContents */

export const BODY_MPESA_HTML = `
<h2 id="what-you-need-before-you-start">What you need before you start</h2>
<p>You need a Safaricom Daraja production app (consumer key and secret), a short code or till number cleared for the APIs you plan to use, and a publicly reachable HTTPS callback URL. Safaricom rejects HTTP callbacks in production — plan for that before you wire anything locally. I am writing this from the R4 Automotive build: same patterns we ship on Vercel with Next.js App Router route handlers.</p>
<p>Keep secrets in server-only environment variables. Never expose consumer secret or passkey to the browser. The browser should only trigger an API route that runs on the server.</p>

<h2 id="the-mpesa-daraja-api-what-each-endpoint-actually-does">The M-Pesa Daraja API — what each endpoint actually does</h2>
<p><strong>OAuth</strong> — You exchange consumer key and secret for an access token. Tokens expire (typically around an hour). Treat the token as cacheable but time-bounded.</p>
<p><strong>STK Push</strong> — Lipa na M-Pesa online: you send amount, Party A phone, Party B till/paybill, AccountReference, TransactionDesc, and a CallBackURL. The customer gets the STK prompt on their handset. Your callback receives the result asynchronously.</p>
<p><strong>C2B</strong> — Customer sends money to your paybill or till; you register validation and confirmation URLs. Different flow from STK; most product checkouts use STK Push first.</p>
<p>The docs name the endpoints; they do not always explain failure modes. Read the error payloads in practice — the difference between a declined STK and a timeout matters for your order state machine.</p>

<h2 id="setting-up-environment-variables-safely">Setting up environment variables safely</h2>
<p>Minimum server keys: <code>MPESA_CONSUMER_KEY</code>, <code>MPESA_CONSUMER_SECRET</code>, <code>MPESA_SHORTCODE</code> (or till), <code>MPESA_PASSKEY</code> for STK, <code>MPESA_CALLBACK_URL</code> (your API route URL), and <code>MPESA_ENV</code> (sandbox vs production base URL).</p>
<p>In Next.js, only reference these inside Route Handlers or Server Actions — never in client components. If you need a public key for something, Safaricom still expects the secret server-side for OAuth.</p>

<h2 id="building-the-oauth-token-service">Building the OAuth token service</h2>
<p>Tokens expire. If you request a fresh token on every STK call you will add latency and occasionally hit rate limits. Cache the token in memory (per server instance) with an expiry buffer — refresh when less than two minutes remain. On 401 from an API call, clear cache and retry once.</p>
<pre><code class="language-typescript">type TokenCache = { token: string; expiresAt: number }

let cache: TokenCache | null = null

export async function getMpesaAccessToken(): Promise&lt;string&gt; {
  const now = Date.now()
  if (cache &amp;&amp; cache.expiresAt - now &gt; 120_000) return cache.token

  const key = process.env.MPESA_CONSUMER_KEY
  const secret = process.env.MPESA_CONSUMER_SECRET
  const auth = Buffer.from(key + ':' + secret).toString('base64')
  const url = process.env.MPESA_BASE_URL + '/oauth/v1/generate?grant_type=client_credentials'

  const res = await fetch(url, {
    headers: { Authorization: 'Basic ' + auth },
  })
  if (!res.ok) throw new Error('Daraja OAuth failed: ' + res.status)
  const data = (await res.json()) as { access_token: string; expires_in: string }
  cache = {
    token: data.access_token,
    expiresAt: now + Number(data.expires_in) * 1000,
  }
  return cache.token
}</code></pre>

<h2 id="implementing-stk-push">Implementing STK Push</h2>
<p>Generate a password from the shortcode, passkey, and timestamp (format in Daraja docs — follow the exact string layout). Post to <code>/mpesa/stkpush/v1/processrequest</code> with Bearer token.</p>
<pre><code class="language-typescript">export async function stkPush(params: {
  phone: string
  amount: number
  accountRef: string
  desc: string
}) {
  const token = await getMpesaAccessToken()
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const short = process.env.MPESA_SHORTCODE ?? ''
  const pass = process.env.MPESA_PASSKEY ?? ''
  const password = Buffer.from(short + pass + timestamp).toString('base64')

  const body = {
    BusinessShortCode: short,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: params.amount,
    PartyA: params.phone,
    PartyB: short,
    PhoneNumber: params.phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: params.accountRef,
    TransactionDesc: params.desc,
  }

  const base = process.env.MPESA_BASE_URL ?? ''
  const res = await fetch(base + '/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok || json.ResponseCode !== '0') {
    throw new Error(json.errorMessage || json.CustomerMessage || 'STK failed')
  }
  return json as { CheckoutRequestID: string; MerchantRequestID: string }
}</code></pre>

<h2 id="handling-the-callback-the-right-way">Handling the callback the right way</h2>
<p>Safaricom POSTs JSON to your CallBackURL. The payload nests ResultCode and ResultDesc inside Body.stkCallback. A ResultCode of 0 is success; anything else is a failed or cancelled payment.</p>
<p>Verify the callback: check that the request is HTTPS, reject unknown hosts, and compare CheckoutRequestID to what you stored when you initiated STK. Log the raw body before parsing edge cases — duplicate callbacks happen.</p>
<p>Respond with HTTP 200 quickly after you enqueue work. Long database transactions in the callback handler can cause Safaricom to retry while you are still processing.</p>

<h2 id="error-handling-and-retry-logic">Error handling and retry logic</h2>
<p>Common ResultCodes: insufficient funds, user cancelled, wrong PIN, timeout. Map them to user-visible copy — never show raw Daraja strings to customers.</p>
<p>Implement idempotency on order completion: same CheckoutRequestID should not create two paid orders. Use a unique constraint or idempotency key in your database.</p>
<p>For transient failures (network blips talking to your DB), use a small retry queue — not infinite loops on the callback thread.</p>

<h2 id="testing-with-the-safaricom-sandbox">Testing with the Safaricom sandbox</h2>
<p>Use sandbox credentials and test numbers from the Daraja portal. For local callback testing, expose your dev server with <strong>ngrok</strong> (HTTPS) and register that URL in the app settings. Plain localhost HTTP will not receive production-style callbacks from Safaricom.</p>

<h2 id="going-to-production-what-changes">Going to production — what changes</h2>
<p>Switch base URL to production, rotate credentials, tighten IP allowlisting if you use it, and turn logging to structured JSON with request IDs. Monitor STK success rate and callback latency. Set alerts when error rates spike — often the first sign of a credential expiry or passkey rotation on the Safaricom side.</p>

<h2 id="common-production-issues-and-how-to-debug-them">Common production issues and how to debug them</h2>
<p><strong>Callback never arrives</strong> — Firewall, wrong URL in Daraja app, or TLS chain issues. Hit the URL yourself with a signed test POST.</p>
<p><strong>Intermittent 401 on OAuth</strong> — Clock skew on the server, or stale cache after secret rotation.</p>
<p><strong>STK succeeds but your DB does not update</strong> — Callback handled on a different server instance without shared state — fix with idempotent DB writes and queue.</p>
<p>This is the pattern we use on every M-Pesa integration, including the <a href="/case-studies/r4-automotive">R4 Automotive case study</a>. If you want this wired for your product, <a href="/book">book a discovery call</a> — we will map STK to your order model and ship with logging you can audit.</p>
`.trim()

export const BODY_SACCO_MISTAKES_HTML = `
<h2 id="why-saccos-are-especially-hard-to-digitise-well">Why SACCOs are especially hard to digitise well</h2>
<p>SACCOs sit in an awkward middle: you need retail-grade transaction handling, but you also run a member-owned institution where authority, minutes, and resolutions matter as much as ledgers. A teller screen that ignores committee approvals is not a small UX issue — it is a governance failure waiting to surface at the AGM.</p>
<p>Where SASRA supervision applies, examiners do not care whether your React bundle is pretty. They care whether controls are demonstrable: who approved a limit change, which officer disbursed, what evidence sits behind a waiver. I have watched teams buy “banking” software and then spend a year retrofitting SACCO-specific rules because the vendor sold them a product built for branch networks, not for societies with guarantor chains and tiered lending policies.</p>
<p>Kenya adds another layer: mobile money is the default rail for many members, tax and statutory deductions have real teeth, and your staff already juggle paper while members expect WhatsApp-speed responses. Digitisation is not “put the form online.” It is rebuild the operating model with software — and that is why generic playbooks fail.</p>
<p>I also see a timing problem. Societies often digitise in a rush — AGM pressure, competitor marketing, or a grant window — without sequencing data cleanup, workflow design, and training. The system goes live; adoption does not. Then leadership concludes “our members are not tech-savvy,” when the real issue is that the software never matched how decisions actually get made. The seven mistakes below are the patterns I see repeat across that rush.</p>
<p>None of this is an argument against digitising. It is an argument against treating SACCOs like small banks with co-ops pasted on the homepage. Get the model right, and members adopt fast — because the tool finally matches the way they already work.</p>

<h2 id="mistake-1-copying-bank-ui-patterns-for-a-member-owned-model">Mistake 1: Copying bank UI patterns for a member-owned model</h2>
<p><strong>What it looks like.</strong> You pick a core or portal that speaks “account number” and “product catalogue” because the demo looked familiar to someone who last logged into a commercial bank app. Screens show balances first, loans second, and nowhere does the member see share capital, meeting attendance, or eligibility rules in language the society actually uses.</p>
<p><strong>Why it keeps happening.</strong> Boards and IT committees benchmark against banks — they are the visible standard. Vendors lean into that because “like a bank” sells. Nobody in that room is paid to explain that a SACCO’s risk model is not a retail credit score; it is bylaws plus committee judgment plus historical behaviour in the register.</p>
<p><strong>Real consequence.</strong> Members stop trusting the channel. They call the office anyway. Staff re-key data from the “official” system into spreadsheets because the committee workflow never fit. Within months you run two truths: the core says one thing, Excel says another. When reconciliation breaks during busy season, the project sponsor gets blamed — not the category error of copying the wrong reference architecture.</p>
<p><strong>Better pattern.</strong> Start from loan and share ledgers, resolutions, and approval limits. Design labels and navigation from credit committee language outward. If the first wireframe cannot be read aloud to your chairperson without translation, you are still building a bank skin on SACCO bones.</p>

<h2 id="mistake-2-underestimating-the-loan-approval-workflow">Mistake 2: Underestimating the loan approval workflow</h2>
<p><strong>What it looks like.</strong> Someone maps “apply → approve → disburse” in three boxes. The build ships with a status field and email notifications. Then reality arrives: guarantor capture, partial documentation, rescheduled committee sittings, exceptions for long-standing members, and disputes over appraisal values.</p>
<p><strong>Why it keeps happening.</strong> Loan workflow is invisible to executives until it breaks. Everyone sees the member queue at the front office; few people model the full state machine. Vendors quote modules, not ethnography of how your credit officers actually decide.</p>
<p><strong>Real consequence.</strong> I have seen a society (anonymised) push automation on disbursement before routing was settled. Loans went “approved” in the system while paper files were incomplete. Finance halted payouts; IT rolled back three weeks of configuration. The cost was not the sprint hours — it was credibility with members who had already received SMS confirmations.</p>
<p><strong>Better pattern.</strong> Walk the real path with officers: paper form to committee minutes to disbursement instruction. Name every state, every actor, every reversal. Only then encode. If your workflow engine cannot express “returned to member for co-guarantor” without a hack, your model is still wrong.</p>

<h2 id="mistake-3-building-member-portals-before-member-data-is-clean">Mistake 3: Building member portals before member data is clean</h2>
<p><strong>What it looks like.</strong> Leadership wants a glossy app because competitors launched one. IT accelerates the portal. Members register and immediately see wrong names, duplicated accounts, or balances that do not match passbooks.</p>
<p><strong>Why it keeps happening.</strong> The portal is visible; data cleanup is not. Funding follows screenshots. Everyone underestimates how many member records were keyed under pressure during growth years — typos, inconsistent ID formats, merged families, dormant accounts still “active” in Excel.</p>
<p><strong>Real consequence.</strong> Self-service turns into a complaint desk. Trust drops faster than it was built. You also create legal exposure: if statements are official, wrong statements are worse than no statements.</p>
<p><strong>Better pattern.</strong> Freeze scope on the portal until master data has owners, validation rules, and a reconciliation plan against legacy books. Run a closed pilot with staff-only accounts, then branch staff acting as members, before public launch.</p>
<p>Practical checklist before you expose balances: one national ID format, one phone format, deduplicated member numbers, written rules for joint accounts and estate cases, and a sign-off from finance that opening balances tie to the last audited trial balance. If that sounds boring, it is cheaper than explaining wrong statements to five hundred members.</p>

<h2 id="mistake-4-not-planning-for-audit-trails-from-day-one">Mistake 4: Not planning for audit trails from day one</h2>
<p><strong>What it looks like.</strong> Developers ship features fast. Logging is an afterthought — maybe application logs, maybe database backups, but no immutable trail tied to user identity for sensitive actions.</p>
<p><strong>Why it keeps happening.</strong> Audit feels like overhead until a regulator letter lands or a board member asks who moved a limit. SASRA-aligned societies need to show that controls operated on the dates in question — not that you can grep a server file if someone is awake at midnight.</p>
<p><strong>Real consequence.</strong> You cannot reconstruct history for a disputed loan decision. External auditors qualify findings. Internal teams blame each other because the system cannot answer “who clicked approve.”</p>
<p><strong>Better pattern.</strong> Treat audit events as a first-class table from sprint one: actor, before/after snapshots for financial fields, timestamp in Nairobi time, correlation ID across services. If a feature cannot be audited, it is not done for production in a supervised context.</p>
<p>Separate operational logs from security logs. Your DBA should not be the only person who can prove who deleted a row. Exporters and reporting jobs should leave their own trace: file name, row counts, who triggered the run. When SASRA or your external auditors ask for evidence, you hand a folder — not a story about what probably happened.</p>

<h2 id="mistake-5-choosing-vendors-based-on-price-not-on-kenya-specific-knowledge">Mistake 5: Choosing vendors based on price, not on Kenya-specific knowledge</h2>
<p><strong>What it looks like.</strong> Procurement ranks three bids; the lowest day rate wins. The winning team has never wired M-Pesa Daraja into a regulated workflow, never mapped KRA reporting expectations for payroll-side work, and treats “mobile” as responsive CSS.</p>
<p><strong>Why it keeps happening.</strong> Price is easy to compare on a spreadsheet. Local context is not line-itemed. Offshore shops often win on rate cards — then burn hours learning rails your junior engineer in Nairobi already knows.</p>
<p><strong>Real consequence.</strong> Integration gaps show up late: STK callbacks, idempotency, statement formats members actually read. You pay for rework, or you ship late and eat opportunity cost during peak lending season.</p>
<p><strong>Better pattern.</strong> Score vendors on reference work in East Africa, on integration depth, and on who will sit with your credit committee when the workflow argument happens. Paying a higher rate for fewer surprises is often cheaper than the alternative.</p>

<h2 id="mistake-6-launching-without-board-buy-in-on-the-operational-change">Mistake 6: Launching without board buy-in on the operational change</h2>
<p><strong>What it looks like.</strong> Management procures a system. The board hears a quarterly update. Go-live arrives; loan officers resist because their incentives and daily routines were never redesigned to match the tool.</p>
<p><strong>Why it keeps happening.</strong> Boards approve budgets; they rarely approve process change in the same motion. Sponsors avoid hard conversations about headcount, branch roles, and who owns data quality.</p>
<p><strong>Real consequence.</strong> Passive resistance at the counter — workarounds, shadow spreadsheets, “the old way” for VIP members. The system looks live in the report; adoption metrics tell the truth.</p>
<p><strong>Better pattern.</strong> Pair UAT with change management: job descriptions, training calendars, escalation paths. Put operational owners in weekly demos, not a big reveal at the end.</p>
<p>Board buy-in is not a one-off town hall. It is a standing agenda item: what behaviour we expect from branch managers, how incentives align with the new process, and what we stop doing manually when the system is live. If compensation still rewards paper throughput, software will lose every time.</p>

<h2 id="mistake-7-treating-the-website-and-the-system-as-separate-projects">Mistake 7: Treating the website and the system as separate projects</h2>
<p><strong>What it looks like.</strong> Marketing runs a WordPress site; operations run the core; the two never share member identity. Someone re-types enquiry forms into the loan register.</p>
<p><strong>Why it keeps happening.</strong> Budgets sit in different lines. Agencies sell websites; core vendors sell cores. Nobody owns the full member journey from first click to first repayment.</p>
<p><strong>Real consequence.</strong> You cannot measure acquisition cost per funded loan. Marketing celebrates leads; credit says leads are junk. The organisation argues instead of iterating.</p>
<p><strong>Better pattern.</strong> One architecture: public web feeds authenticated flows with the same member keys as core. We ship that mindset on complex builds — see <a href="/case-studies/eagle-hr-consultants">Eagle HR</a> for how far “front door + operations system” can go when treated as one product.</p>

<h2 id="what-to-do-instead">What to do instead</h2>
<p>Sequence matters. Lock data ownership and auditability first. Model loan and share workflows second — with officers in the room, not after handover. Only then invest in member-facing channels that expose verified data.</p>
<p>Run weekly demos with compliance and operations in attendance. If your vendor dodges those meetings, you have the wrong partner. Measure adoption by reduced re-keying and reduced reconciliation time — not by login counts alone.</p>
<p>Fund training like a line item, not an afterthought. Branch staff should see the system before members do — with scripts for failure (network down, printer broken, member forgot PIN). Nothing erodes trust faster than a teller who improvises because nobody rehearsed the bad day.</p>
<p>Finally, plan for the third year, not just go-live. Cores and portals age; bylaws change; regulators issue new guidance. If your architecture cannot swap a module or add a field without a rewrite, you will repeat this cycle with interest.</p>
<p>Read the <a href="/case-studies">case studies</a> for systems we have shipped in production. If you want a straight assessment of your stack and governance fit, <a href="/book">book a discovery call</a> — we will tell you what we would fix first, and what we would not touch until data is clean.</p>
`.trim()

export const BODY_COST_KENYA_HTML = `
<h2 id="why-this-article-exists">Why this article exists</h2>
<p>Founders ask what software should cost in Kenya and get either a vague “it depends” or a single number with no idea what sits behind it. Procurement teams compare three quotes and still cannot tell whether they are buying the same thing. I am publishing ranges we actually see in 2026 for serious delivery — not weekend WordPress installs — and what Raven prices against when we scope work from Westlands.</p>
<p>This is not a rate card. It is a map: what moves a project to the top of a band, where agencies hide risk, and how to read a proposal so you know what you are funding.</p>
<p>A word on who this is for. If you need a five-page brochure site and a contact form, you do not need a product team — you need a competent web shop and a clear content owner. If you are wiring money, storing national IDs, or running payroll with statutory lines, you need engineering discipline, security review, and someone who has shipped under pressure before. The bands below assume the second category when numbers run high.</p>

<h2 id="the-three-pricing-models-in-kenya">The three pricing models in Kenya</h2>
<p><strong>Fixed price.</strong> Scope, milestones, and acceptance criteria are written down; you pay against delivery checkpoints. Works when the problem is bounded — a marketing site with known content, a defined integration with documented APIs. It breaks when “small changes” pile up because discovery skipped edge cases. Good vendors bake contingency into margin; cheap vendors either change-order you to death or quietly cut quality.</p>
<p><strong>Time and materials (T&amp;M).</strong> You pay for capacity — day rates or hourly — with transparent burn. Best when discovery must stay honest: regulated workflows, multi-department sign-off, or integrations that need trial and error with sandbox APIs. You need weekly demos, a single product owner on your side, and discipline on backlog hygiene — otherwise T&amp;M becomes an open tap.</p>
<p><strong>Retainer.</strong> A fixed monthly fee for a defined slice of engineering and advisory — product iteration, reliability work, security patches. Makes sense when you are past first launch and need predictable throughput without renegotiating every sprint. Not a substitute for a first build; you still fund the initial delivery separately unless scope is tiny.</p>
<p>Most serious shops blend models. You might pay fixed price for a defined MVP, then move to retainer for six months of hardening — or T&amp;M for discovery, then fixed price for build once scope is frozen. Anyone who quotes a single giant number without saying which model applies is asking you to sign a blank cheque on interpretation.</p>

<h2 id="typical-ranges-for-common-project-types">Typical ranges for common project types</h2>
<p>These are indicative KES bands for vendors who staff projects properly — design, engineering, QA, deployment — not for a single freelancer quoting from a coffee shop.</p>
<ul>
<li>Corporate website: KES 250,000 – 800,000</li>
<li>E-commerce (Shopify): KES 180,000 – 450,000</li>
<li>Custom web app: KES 1.2M – 6M</li>
<li>SACCO platform: KES 3.5M – 12M</li>
<li>HRMS-class platform (multi-module): KES 2.8M – 8M</li>
<li>Mobile app (iOS + Android): KES 2M – 7M</li>
</ul>
<p>What pushes you up within a band: M-Pesa and bank integrations, KRA-facing reporting, role-based access across many departments, audit trails, uptime expectations, and data migration from messy legacy spreadsheets. What keeps you lower: clean requirements, one environment, a single admin persona, and acceptance that v1 is narrow.</p>
<p>Currency and staffing matter too. Senior engineers in Nairobi are not cheap relative to five years ago; if a quote assumes junior rates for senior work, someone is lying — either about seniority or about what will ship.</p>
<p>Compare apples to apples on support. A low build quote that omits a warranty period, SLA, or handover window is not cheaper — it is incomplete. Ask what happens in the thirty days after launch: who fixes bugs, who answers the phone when payments fail on Friday evening, and whether that time is included or billed extra.</p>
<p>Offshore teams can win on hourly rates but lose on communication lag and context. Local teams cost more per hour but may finish in fewer hours when the problem is “make Daraja callbacks idempotent under Kenyan mobile network behaviour,” not “integrate generic payment API.” Price per sprint is the wrong unit; cost per shipped, audited feature is closer to the truth.</p>

<h2 id="what-goes-into-the-price-really">What goes into the price — really</h2>
<p><strong>Discovery and specification.</strong> Workshops, process maps, API inventory, risk review. Skip this and you pay twice in rework. Serious firms charge for discovery as its own phase or fold it into fixed price with a clear exit artefact — signed scope, wireframes, integration list.</p>
<p><strong>Design.</strong> Not just “make it pretty” — information architecture, form flows, error states, mobile-first layouts. For member-facing financial flows, design time is risk reduction.</p>
<p><strong>Engineering.</strong> The bulk of cost. Count front-end, back-end, integrations, and data migration separately in your head even if the proposal bundles them.</p>
<p><strong>QA and staging.</strong> Automated tests where they earn their keep, manual QA for regulated paths, a staging environment that mirrors production. If the quote has no line for QA, it is not serious.</p>
<p><strong>Deployment and hosting.</strong> Vercel, AWS, managed databases — someone pays for SSL, backups, and monitoring. Clarify whether hosting is in your name or bundled.</p>
<p><strong>Documentation and handover.</strong> Runbooks, environment variables, admin training. You cannot operate a system you cannot hand to a second vendor.</p>
<p>Fixed price hides risk inside margin; T&amp;M exposes burn week by week. Pick based on how frozen your scope really is — not on which label sounds safer.</p>
<p>There is also an agency pyramid: partners and leads sell; seniors architect; mid-level engineers build; juniors fix CSS. A day rate should say who sits in your stand-ups. If you pay senior rates and get only junior output, your burn is mislabelled. Ask for team composition — not to micromanage, but to align risk: integrations and data migration should not be someone’s first production database.</p>
<p>Finally, budget for content and operations. The prettiest HR portal still fails if nobody owns employee data entry, or if finance has not signed off on payroll rules. Software quotes rarely include your internal time — but that time shows up in whether the project lands or drifts.</p>

<h2 id="where-kenyan-agencies-cut-corners">Where Kenyan agencies cut corners</h2>
<p><strong>No automated tests.</strong> Manual click-through before launch, then hope. First serious refactor breaks production.</p>
<p><strong>No staging.</strong> Developers push to the same URL members use. You become the test environment.</p>
<p><strong>No monitoring or alerting.</strong> Downtime is discovered by customers on WhatsApp.</p>
<p><strong>Thin documentation.</strong> Knowledge lives in one contractor’s head. When they disappear, you re-buy the same discovery.</p>
<p><strong>Integration theatre.</strong> “M-Pesa compatible” means nothing until you see STK push, callback handling, idempotency, and reconciliation against orders in a test harness.</p>
<p>You pay less on the first invoice until the first failure — then you pay again to unwind bad data, rebuild trust with customers, and hire someone to grep logs at midnight. The total cost rarely stays low.</p>
<p>Security is another corner: shared admin passwords, secrets in Git history, no dependency updates for a year. None of that shows up in a demo — it shows up when something breaks or leaks. Ask how dependencies are updated and who has access to production. Silence there is expensive later.</p>

<h2 id="fixed-price-vs-time-and-materials-honest-tradeoffs">Fixed price vs time and materials — honest tradeoffs</h2>
<p>Fixed price works when both sides can describe “done” without ambiguity: pages, roles, integrations with documented endpoints, acceptance tests. You should still expect change requests — the question is whether they are managed through a formal process with pricing.</p>
<p>T&amp;M works when discovery must stay adaptive: you are replacing a workflow nobody has fully documented, or you need parallel experiments with payment providers. Your protection is cadence: weekly demos, burn visibility, and the right to pause scope when assumptions fail.</p>
<p>Hybrids are common: fixed price for a thin first release, then T&amp;M for iteration — or T&amp;M for a two-week discovery that produces a fixed bid for build. We use the model that matches how clear the problem is, not what sounds easier to finance.</p>
<p>From the buyer side, fixed price rewards decisive product ownership — someone who can say “no” to scope creep without reopening the contract weekly. T&amp;M rewards teams that can absorb uncertainty and still keep a backlog ordered. If your organisation argues internally for six weeks on every decision, you will burn either way; fix governance before you blame the pricing model.</p>

<h2 id="red-flags-when-someone-quotes-you">Red flags when someone quotes you</h2>
<p><strong>Impossible totals.</strong> A full SACCO-facing build at freelancer rates — the math does not close unless corners are cut you have not seen yet.</p>
<p><strong>No discovery line item.</strong> Especially for anything touching money or personal data — they are guessing.</p>
<p><strong>“We will sort M-Pesa later.”</strong> Payment rails are not a plugin; they are part of architecture.</p>
<p><strong>No named environments.</strong> If they cannot describe dev, staging, and production, walk away.</p>
<p><strong>Vague ownership of code and hosting.</strong> You should receive repos, deployment rights, and credentials — not a black box on someone else’s account.</p>
<p>Ask for a written assumptions list: user volumes, peak concurrency, browsers supported, third-party fees, who pays SSL and domains, and what happens after go-live. Silence on those is a quote, not a plan.</p>
<p>Another smell: the proposal is ten pages of methodology and one paragraph on your problem. You are not buying a methodology; you are buying a working system. Push for references in your sector or with similar integrations — not logos on a slide, but people you can call.</p>
<p>Lastly, watch for “unlimited revisions.” Unlimited usually means unmanaged feedback and a team that cannot say no — which delays launch and trains your organisation to treat software as free to change. Cap revisions in writing; you will get sharper feedback and faster decisions.</p>

<h2 id="how-we-price-at-raven-tech-group">How we price at Raven Tech Group</h2>
<p>We price from scope, integration risk, compliance depth, and what happens after launch — not from what we think your budget headline should say. Small, well-bounded projects get short proposals with clear deliverables. Larger regulated builds get phased delivery: exit criteria per phase, documented handover, and optional retainer for iteration.</p>
<p>We bias to honest ranges early. If your idea needs a number we cannot defend, we say so — and we tell you what would have to change (scope, timeline, or quality bar) to make the math work.</p>
<p>We also separate what we control from what you control. We can quote engineering and integration; we cannot quote how fast your finance team signs off on requirements — but we can structure phases so you are not paying for idle developers while approvals drift.</p>
<p>Maintenance is explicit: either a retainer line with hours, or a handover to your team with documentation and training priced in. “We will support you” means nothing until the channel, response time, and billing rate are named.</p>
<p>If you want specific numbers for your project, <a href="/book">book a discovery call</a>. We will give you a real range, in writing, within 48 hours of the call — not a brochure estimate copied from last year’s deck.</p>
`.trim()
