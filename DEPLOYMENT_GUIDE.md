# Deployment Guide - Raven Tech Group Website

## 🚀 Deployment to Vercel

### Prerequisites
- [x] Build successful (✓ Completed)
- [ ] Git repository initialized
- [ ] GitHub/GitLab/Bitbucket account
- [ ] Vercel account (free tier works)

### Step 1: Git Setup

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Raven Tech Group website redesign 2026"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., `raventechgroup-website`)
   - **DO NOT** initialize with README, .gitignore, or license
   - Copy the repository URL

3. **Connect Local Repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/raventechgroup-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Vercel Deployment

1. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login (can use GitHub account)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**:
   In Vercel dashboard, go to Project Settings → Environment Variables and add:
   ```
   RESEND_API_KEY=re_ZnZk1y45_7cViVnbbXvw2fQuqy81JdY8H
   NEXT_PUBLIC_GA_ID=G-XXZLNHFX62
   ```
   
   **Important**: Add these for all environments (Production, Preview, Development)

4. **Configure Domain**:
   - Go to Project Settings → Domains
   - Add your domain: `www.raventechgroup.com`
   - Follow Vercel's DNS configuration instructions
   - Update your DNS records as instructed

### Step 3: DNS Configuration

For `www.raventechgroup.com`, you'll need to add DNS records:

1. **CNAME Record** (for www subdomain):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

2. **A Record** (for root domain, optional):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

   Or use Vercel's recommended DNS provider settings.

### Step 4: Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at `www.raventechgroup.com`
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Contact forms work
- [ ] Emails are being received
- [ ] Google Analytics is tracking
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Mobile responsiveness works
- [ ] Cookie consent banner appears

### Step 5: Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches (for testing)

### Environment Variables in Vercel

Make sure these are set in Vercel dashboard:
- `RESEND_API_KEY` - Your Resend API key
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

### Custom Domain Setup

1. In Vercel dashboard → Project → Settings → Domains
2. Add `www.raventechgroup.com`
3. Follow Vercel's instructions for DNS configuration
4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### Troubleshooting

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version (Vercel auto-detects)

**Domain Not Working:**
- Check DNS records are correct
- Wait for DNS propagation
- Verify domain is added in Vercel dashboard

**Emails Not Sending:**
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for logs
- Ensure domain is verified in Resend (if using custom domain)

**Analytics Not Working:**
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check browser console for errors
- Verify GA4 property is active

## 📝 Notes

- `.env.local` is in `.gitignore` - environment variables must be set in Vercel
- Build output (`.next/`) is automatically generated, don't commit it
- Vercel handles SSL certificates automatically
- Preview deployments are great for testing before production

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Resend Dashboard](https://resend.com/emails)
- [Google Analytics](https://analytics.google.com)

