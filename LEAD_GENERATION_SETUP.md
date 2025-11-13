# Lead Generation Setup Guide

This guide covers all the lead generation features implemented and how to configure them.

## ✅ Implemented Features

### 1. Contact Forms
- **Homepage Contact Form**: Simplified 3-field form
- **Contact Page Form**: Full detailed form
- **Email Integration**: Sends to `hello@raventechgroup.com` via Resend
- **Bot Protection**: Honeypot, rate limiting, spam detection
- **Analytics Tracking**: Form submissions tracked in Google Analytics

### 2. Google Analytics (GA4)
- **Tracking ID**: `G-XXZLNHFX62`
- **Page View Tracking**: Automatic
- **Event Tracking**: Form submissions, newsletter signups
- **Conversion Goals**: Set up in GA4 dashboard (see below)

### 3. Structured Data (JSON-LD)
- **Organization Schema**: Company information
- **WebSite Schema**: Site-wide information
- **LocalBusiness Schema**: Business location and hours
- **Service Schema**: Individual service pages

### 4. SEO Features
- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter sharing optimization
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Configured at `/robots.txt`

### 5. Security & Performance
- **Security Headers**: HSTS, XSS protection, frame options
- **Bot Protection**: Honeypot fields, rate limiting
- **Cookie Consent**: GDPR-compliant banner

## 🎯 Setting Up Conversion Goals in Google Analytics

### Step 1: Create Conversion Events

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin** → **Events**
3. Mark these events as conversions:
   - `form_submit` (Contact form submissions)
   - `newsletter_signup` (Newsletter subscriptions)

### Step 2: Create Custom Goals (Optional)

1. Go to **Admin** → **Goals**
2. Create new goals:
   - **Goal 1**: Contact Form Submission
     - Type: Event
     - Category: `contact`
     - Action: `form_submit`
   - **Goal 2**: Newsletter Signup
     - Type: Event
     - Category: `engagement`
     - Action: `newsletter_signup`

## 📧 Newsletter Integration

The newsletter component is currently set up to use the contact API. To integrate with a proper email marketing service:

### Option 1: Mailchimp
1. Get your Mailchimp API key
2. Update `components/sections/Newsletter.tsx`
3. Replace the API call with Mailchimp API

### Option 2: ConvertKit
1. Get your ConvertKit API key
2. Update the newsletter component
3. Use ConvertKit's API

### Option 3: Resend (Current)
- Currently sends to contact email
- Can be enhanced to use Resend's contact list feature

## 🔒 Additional Security Recommendations

### 1. Content Security Policy (CSP)
Add to `next.config.js`:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';"
}
```

### 2. Rate Limiting (Production)
For production, replace in-memory rate limiting with:
- **Redis**: For distributed rate limiting
- **Upstash**: Serverless Redis
- **Cloudflare**: DDoS protection

### 3. reCAPTCHA v3 (Optional)
Add Google reCAPTCHA v3 for additional bot protection:
1. Get reCAPTCHA site key
2. Install: `npm install react-google-recaptcha-v3`
3. Add to contact forms

## 📊 Additional Tracking Options

### Facebook Pixel (Optional)
If you run Facebook ads:
1. Get your Pixel ID
2. Create `components/analytics/FacebookPixel.tsx`
3. Add to `app/layout.tsx`

### LinkedIn Insight Tag (Optional)
For B2B lead generation:
1. Get your LinkedIn Partner ID
2. Create `components/analytics/LinkedInInsight.tsx`
3. Add to `app/layout.tsx`

## 🎨 Trust Badges & Social Proof

### Adding Certifications
1. Add certification badges/images
2. Update the badges array in `components/sections/Process.tsx`

## 📈 Performance Monitoring

### Core Web Vitals
- Already tracked by Google Analytics
- View in GA4 → Reports → Engagement → Web Vitals

### Error Tracking (Optional)
Consider adding Sentry:
1. Install: `npm install @sentry/nextjs`
2. Configure Sentry
3. Track errors and performance

## 🚀 Lead Magnets (Future Enhancement)

Consider adding:
1. **Resource Downloads**: Whitepapers, guides, case studies
2. **Webinar Signups**: Event registration forms
3. **Free Consultations**: Calendar booking integration
4. **Exit Intent Popups**: Capture leaving visitors

## 📝 Checklist

- [x] Contact forms functional
- [x] Google Analytics configured
- [x] Structured data implemented
- [x] Security headers added
- [x] Bot protection active
- [x] Cookie consent banner
- [ ] Newsletter service integrated (using contact API currently)
- [ ] Conversion goals set up in GA4
- [ ] reCAPTCHA added (optional)
- [ ] Facebook Pixel added (optional)
- [ ] LinkedIn Insight Tag added (optional)

## 🔗 Useful Resources

- [Google Analytics Help](https://support.google.com/analytics)
- [Schema.org Documentation](https://schema.org/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Resend Documentation](https://resend.com/docs)

