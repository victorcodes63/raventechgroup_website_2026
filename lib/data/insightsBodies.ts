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
<p>SACCOs sit between retail banking and member democracy. Every screen has to work for staff who process loans daily and for members who vote on policy once a year. Regulators — including SASRA where applicable — expect evidence of controls. That combination breaks when you import a generic banking UI and hope for the best.</p>

<h2 id="mistake-1-copying-bank-ui-patterns-for-a-member-owned-model">Mistake 1: Copying bank UI patterns for a member-owned model</h2>
<p>Bank apps optimise for account balances and fixed products. SACCO members care about shares, deposits, loan eligibility, and meeting resolutions. I have seen SACCOs spend months forcing a retail-bank dashboard onto a membership model; adoption stalls because the language on screen does not match the bylaws.</p>
<p>Better pattern: start from loan and share ledgers, then design outward. Label flows the way the board speaks — not the way a generic core vendor labels them.</p>

<h2 id="mistake-2-underestimating-the-loan-approval-workflow">Mistake 2: Underestimating the loan approval workflow</h2>
<p>Loan committees, guarantors, and documentation checks are not edge cases — they are the product. A shortcut here shows up as audit findings later. One client (details anonymised) tried to automate disbursement before approval routing was modelled; they rolled back three weeks of work.</p>
<p>Map the workflow on paper with credit officers before you write TypeScript. Codify states and transitions explicitly.</p>

<h2 id="mistake-3-building-member-portals-before-member-data-is-clean">Mistake 3: Building member portals before member data is clean</h2>
<p>Portals amplify bad data. If KYC fields are inconsistent, members see wrong balances and lose trust instantly. Cleanse and validate in the back office first; then expose self-service.</p>

<h2 id="mistake-4-not-planning-for-audit-trails-from-day-one">Mistake 4: Not planning for audit trails from day one</h2>
<p>Regulators and internal audit ask who changed what, when, and why. If you bolt logging on at the end, you will miss historical events. We model audit logs as a first-class table from sprint one on regulated work.</p>

<h2 id="mistake-5-choosing-vendors-based-on-price-not-on-kenya-specific-knowledge">Mistake 5: Choosing vendors based on price, not on Kenya-specific knowledge</h2>
<p>Offshore teams can be strong engineers and still miss M-Pesa, KRA, and local clearing realities. Price is one line on the spreadsheet; rework is another.</p>

<h2 id="mistake-6-launching-without-board-buy-in-on-the-operational-change">Mistake 6: Launching without board buy-in on the operational change</h2>
<p>Software changes job roles. If the board thinks you bought a website and you actually changed loan approval, you get passive resistance at the counter. Run change management alongside UAT.</p>

<h2 id="mistake-7-treating-the-website-and-the-system-as-separate-projects">Mistake 7: Treating the website and the system as separate projects</h2>
<p>Members discover you online and transact in core. If lead capture does not flow into the same member record, you rebuild work by hand. We treat public web and core as one architecture — see <a href="/case-studies/eagle-hr-consultants">Eagle HR</a> for how far that can go.</p>

<h2 id="what-to-do-instead">What to do instead</h2>
<p>Sequence: data model and audit first, workflows second, member-facing channels third. Bring compliance and operations into weekly demos — not a big reveal at the end.</p>
<p>Read the <a href="/case-studies">case studies</a> for shipped systems, then <a href="/book">book a discovery call</a> if you want an honest assessment of your current stack.</p>
`.trim()

export const BODY_COST_KENYA_HTML = `
<h2 id="why-this-article-exists">Why this article exists</h2>
<p>Founders ask what software should cost in Kenya and get either a vague "it depends" or a number with no breakdown. Here is what we actually see in the market in 2026 — and what Raven quotes against when we scope work in Westlands.</p>

<h2 id="the-three-pricing-models-in-kenya">The three pricing models in Kenya</h2>
<p><strong>Fixed price</strong> — Scope locked, payment milestones. Good when requirements are clear; painful when scope shifts.</p>
<p><strong>Time and materials</strong> — Hourly or day rates with weekly burn visibility. Good for discovery-heavy work.</p>
<p><strong>Retainer</strong> — Monthly capacity for product and advisory. Good when you need steady delivery without re-negotiating every sprint.</p>

<h2 id="typical-ranges-for-common-project-types">Typical ranges for common project types</h2>
<p>Indicative KES ranges we see for serious vendors (not weekend freelancers):</p>
<ul>
<li>Corporate website: KES 250,000 – 800,000</li>
<li>E-commerce (Shopify): KES 180,000 – 450,000</li>
<li>Custom web app: KES 1.2M – 6M</li>
<li>SACCO platform: KES 3.5M – 12M</li>
<li>HRMS-class platform (multi-module): KES 2.8M – 8M</li>
<li>Mobile app (iOS + Android): KES 2M – 7M</li>
</ul>
<p>Your mileage moves with integrations (M-Pesa, KRA reporting), compliance depth, and how clean your requirements are on day one.</p>

<h2 id="what-goes-into-the-price-really">What goes into the price — really</h2>
<p>Discovery and specification, design iterations, engineering hours, QA, deployment, documentation, and handover. Fixed-price quotes bury risk in margin; T&amp;M quotes expose the burn. Neither is free — pick based on how stable your scope is.</p>

<h2 id="where-kenyan-agencies-cut-corners">Where Kenyan agencies cut corners</h2>
<p>Skipping automated tests, skipping runbooks, skipping staging environments, and shipping straight to production. You pay less until the first failure — then you pay double to unwind bad data.</p>

<h2 id="fixed-price-vs-time-and-materials-honest-tradeoffs">Fixed price vs time and materials — honest tradeoffs</h2>
<p>Fixed price needs a definition of done that both sides sign. T&amp;M needs discipline on weekly demos and backlog hygiene. We use both at Raven depending on the engagement.</p>

<h2 id="red-flags-when-someone-quotes-you">Red flags when someone quotes you</h2>
<p>Unrealistically low totals with no discovery phase, no mention of who owns hosting and SSL, or "we will figure out M-Pesa later." Push for a written assumptions list.</p>

<h2 id="how-we-price-at-raven-tech-group">How we price at Raven Tech Group</h2>
<p>We price from scope, risk, and ongoing support needs — not from what we think you can afford. Small projects get tight proposals; larger regulated builds get phased delivery with clear exit criteria each phase.</p>
<p>If you want specific numbers for your project, <a href="/book">book a discovery call</a>. We will give you a real range, in writing, within 48 hours of the call — not a brochure estimate.</p>
`.trim()
