# Vercel Deployment Guide - Raven Tech Group Website

## ✅ Git Repository Setup Complete

Your code is now on GitHub:
**Repository**: https://github.com/victorcodes63/raventechgroup_website_2026.git

## 🚀 Deploy to Vercel

### Step 1: Sign up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. **Recommended**: Sign in with GitHub (easiest option)

### Step 2: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories listed
3. Find and click **"Import"** next to `raventechgroup_website_2026`
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Project Settings

Vercel should auto-detect:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `next build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

**You can leave these as default** - they're correct for Next.js.

### Step 4: Add Environment Variables ⚠️ CRITICAL

**Before deploying**, you MUST add environment variables:

1. In the project import screen, click **"Environment Variables"**
2. Add these two variables:

   **Variable 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_ZnZk1y45_7cViVnbbXvw2fQuqy81JdY8H`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXZLNHFX62`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

3. Click **"Add"** for each variable

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a URL like: `raventechgroup-website-2026.vercel.app`

### Step 6: Add Custom Domain

1. Go to your project dashboard in Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter: `www.raventechgroup.com`
4. Click **"Add"**

### Step 7: Configure DNS

Vercel will show you DNS configuration instructions. You'll need to add:

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or default)
```

**For root domain (raventechgroup.com):**
You can either:
- Add an A record pointing to Vercel's IP (they'll provide it)
- Or use Vercel's domain configuration (recommended)

**Where to add DNS records:**
- Log into your domain registrar (where you bought raventechgroup.com)
- Go to DNS management
- Add the CNAME record as shown above

### Step 8: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually takes 10-30 minutes
- Vercel will show "Valid Configuration" when ready

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at the Vercel URL
- [ ] Custom domain works (after DNS propagation)
- [ ] HTTPS is enabled (automatic)
- [ ] Contact forms work (test submission)
- [ ] Emails are received at hello@raventechgroup.com
- [ ] Google Analytics is tracking (check Real-Time reports)
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Mobile responsiveness works
- [ ] Cookie consent banner appears

## 🔄 Continuous Deployment

Vercel automatically:
- **Deploys** every time you push to `main` branch
- **Creates preview deployments** for other branches
- **Runs builds** automatically

## 🛠️ Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure environment variables are set correctly
- Verify all dependencies are in `package.json`

### Domain Not Working
- Check DNS records are correct
- Wait for DNS propagation
- Verify domain is added in Vercel dashboard
- Check Vercel's domain status page

### Emails Not Sending
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for email logs
- Test the contact form

### Analytics Not Working
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check browser console for errors
- Wait a few minutes after deployment

## 📝 Important Notes

1. **Environment Variables**: Must be set in Vercel (`.env.local` is not deployed)
2. **Automatic Deployments**: Every push to `main` auto-deploys
3. **Preview Deployments**: Other branches get preview URLs for testing
4. **SSL Certificates**: Vercel handles HTTPS automatically
5. **Build Output**: Don't commit `.next/` folder (already in `.gitignore`)

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repository**: https://github.com/victorcodes63/raventechgroup_website_2026
- **Resend Dashboard**: https://resend.com/emails
- **Google Analytics**: https://analytics.google.com

## 🎯 Next Steps After Deployment

1. **Test Everything**: Go through all pages and features
2. **Set up GA4 Goals**: Configure conversion goals in Google Analytics
3. **Monitor Performance**: Check Vercel analytics
4. **Set up Monitoring**: Consider adding error tracking (optional)

---

**Your website will be live at**: `www.raventechgroup.com` once DNS is configured!

