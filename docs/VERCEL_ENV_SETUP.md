# Setting Environment Variables in Vercel

## ⚠️ The Issue

If you're seeing the error "Email service not configured. Please set RESEND_API_KEY environment variable", it means the environment variable isn't set in Vercel (for production) or your local dev server needs to be restarted (for local development).

## 🔧 Quick Fix

### For Local Development:

1. **Stop your dev server** (Ctrl+C or Cmd+C)
2. **Restart it**: `npm run dev`
3. The `.env.local` file should now be loaded

### For Production (Vercel):

You need to add the environment variable in Vercel's dashboard:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `raventechgroup_website_2026` (or whatever you named it)
3. **Go to Settings** → **Environment Variables**
4. **Add these variables**:

   **Variable 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: `your_resend_api_key`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXZLNHFX62`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

5. **Click "Save"** for each variable
6. **Redeploy**: After adding variables, Vercel will automatically redeploy, OR you can manually trigger a redeploy:
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on the latest deployment
   - Click **"Redeploy"**

## ✅ Verify It's Working

After setting up:

1. **Test the contact form** on your live site
2. **Check Resend Dashboard**: https://resend.com/emails to see if emails are being sent
3. **Check your inbox**: `hello@raventechgroup.com` should receive the test email

## 🔍 Troubleshooting

### Still not working?

1. **Check Vercel logs**:
   - Go to your deployment in Vercel
   - Click on the deployment
   - Check the "Functions" tab for any errors

2. **Verify the API key**:
   - Go to https://resend.com/api-keys
   - Make sure the key `your_resend_api_key` is active

3. **Check Resend domain**:
   - The emails are sent from `onboarding@resend.dev` (Resend's default)
   - To use a custom domain (e.g., `noreply@raventechgroup.com`), you need to verify your domain with Resend first

## 📝 Important Notes

- **`.env.local` only works locally** - it's not deployed to Vercel
- **Environment variables must be set in Vercel** for production
- **After adding variables, redeploy** for changes to take effect
- **The API key is sensitive** - never commit it to Git (it's already in `.gitignore`)

---

**Quick Link**: [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

