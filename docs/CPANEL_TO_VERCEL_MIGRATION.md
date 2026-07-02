# Migration Guide: cPanel to Vercel

## 🎯 Overview

You're moving from traditional cPanel hosting to Vercel. This guide will help you safely transition your domain from cPanel to Vercel.

## ⚠️ Important: Before You Start

1. **Backup Everything**: Download a backup of your current site from cPanel
2. **Note Current DNS Settings**: Write down your current DNS records
3. **Check Email**: If you use email hosting through cPanel, you'll need to keep those DNS records

## 📋 Step-by-Step Migration

### Step 1: Backup Current Site (cPanel)

1. **Login to cPanel**
2. **Download Files**:
   - Go to "File Manager"
   - Navigate to `public_html` (or your site's root directory)
   - Select all files
   - Click "Compress" → Choose ZIP format
   - Download the ZIP file

3. **Export Database** (if you have one):
   - Go to "phpMyAdmin" or "MySQL Databases"
   - Export your database as SQL file
   - Download it

4. **Save DNS Records**:
   - Go to "Zone Editor" or "DNS Zone Editor"
   - Take screenshots or write down all current DNS records
   - **Important**: Note which records are for email (MX records)

### Step 2: Deploy to Vercel First

**Do this BEFORE removing from cPanel:**

1. Deploy your new site to Vercel (follow VERCEL_DEPLOYMENT.md)
2. Get your Vercel deployment URL (e.g., `raventechgroup-website-2026.vercel.app`)
3. Test that everything works on the Vercel URL

### Step 3: Configure Domain in Vercel

1. In Vercel dashboard → Your Project → Settings → Domains
2. Add `www.raventechgroup.com`
3. Add `raventechgroup.com` (root domain)
4. Vercel will show you DNS configuration instructions

### Step 4: Update DNS Records in cPanel

**Option A: If you want to keep email on cPanel**

You'll need to keep some DNS records for email and add new ones for the website:

1. **Go to cPanel → Zone Editor** (or DNS Zone Editor)

2. **Keep these records** (for email):
   - MX records (mail server)
   - Any TXT records for email (SPF, DKIM, DMARC)

3. **Update/Add these records** (for website):
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```
   
   **For root domain:**
   ```
   Type: A
   Name: @ (or blank)
   Value: 76.76.21.21
   TTL: 3600
   ```
   *(Vercel will provide the exact IP address - check your Vercel dashboard)*

4. **Remove old A/CNAME records** that pointed to your cPanel server (if any)

**Option B: If you're moving everything to Vercel**

1. **Remove all old A/CNAME records** pointing to cPanel
2. **Add Vercel's DNS records** as shown above
3. **Set up email elsewhere** (if needed):
   - Google Workspace
   - Microsoft 365
   - Or keep email on cPanel (see Option A)

### Step 5: Remove Files from cPanel (Optional)

**Wait until DNS has propagated and Vercel site is live!**

1. **Test first**: Visit `www.raventechgroup.com` and verify it shows your Vercel site
2. **Then remove files**:
   - Go to cPanel → File Manager
   - Navigate to `public_html`
   - Delete all files (or rename the folder to `public_html_old` as backup)
   - **Keep the folder structure** (don't delete `public_html` folder itself)

3. **Optional - Create redirect** (if you want):
   - Create a simple `index.html` in `public_html`:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <meta http-equiv="refresh" content="0; url=https://www.raventechgroup.com">
   </head>
   <body>
       <p>Redirecting to <a href="https://www.raventechgroup.com">www.raventechgroup.com</a></p>
   </body>
   </html>
   ```

### Step 6: Verify DNS Propagation

1. **Check DNS propagation**:
   - Visit: https://www.whatsmydns.net
   - Enter `www.raventechgroup.com`
   - Check that it points to Vercel's servers

2. **Wait for propagation**:
   - Can take 5 minutes to 48 hours
   - Usually 10-30 minutes
   - Vercel dashboard will show "Valid Configuration" when ready

3. **Test your site**:
   - Visit `www.raventechgroup.com`
   - Should show your new Vercel site
   - Check HTTPS is working (automatic with Vercel)

## 🔄 DNS Record Examples

### If Keeping Email on cPanel:

```
Type    Name    Value                    TTL
----    ----    -----                    ---
A       @       [cPanel IP]              3600    (for email)
CNAME   www     cname.vercel-dns.com     3600    (for website)
MX      @       mail.raventechgroup.com  3600    (email)
TXT     @       "v=spf1 ..."             3600    (email SPF)
```

### If Moving Everything to Vercel:

```
Type    Name    Value                    TTL
----    ----    -----                    ---
A       @       76.76.21.21              3600    (Vercel IP - check dashboard)
CNAME   www     cname.vercel-dns.com     3600    (Vercel)
```

## ⚠️ Important Considerations

### Email Hosting

**If you use email through cPanel:**
- You can keep email on cPanel and just point the website to Vercel
- Keep MX records pointing to cPanel mail server
- Only change A/CNAME records for the website

**If you want to move email too:**
- Set up Google Workspace, Microsoft 365, or another email service
- Update MX records to point to new email provider
- This is separate from website hosting

### SSL Certificates

- **Vercel**: Automatically provides SSL certificates (HTTPS)
- **cPanel**: You can remove SSL certificates from cPanel once DNS points to Vercel
- No action needed - Vercel handles SSL automatically

### Subdomains

If you have subdomains (like `blog.raventechgroup.com`):
- Add them in Vercel dashboard → Settings → Domains
- Update DNS records in cPanel accordingly

## 🧪 Testing Checklist

Before removing cPanel files:

- [ ] Vercel site is deployed and working
- [ ] DNS records updated in cPanel
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] `www.raventechgroup.com` shows Vercel site
- [ ] HTTPS works (automatic with Vercel)
- [ ] All pages load correctly
- [ ] Contact forms work
- [ ] Email still works (if keeping on cPanel)

## 🗑️ Cleanup (After Everything Works)

Once verified everything works on Vercel:

1. **Remove old files from cPanel** (optional - keep as backup for a while)
2. **Cancel cPanel hosting** (if you're not using it for email)
3. **Or keep minimal cPanel** (if using for email only)

## 📞 Need Help?

### Common Issues:

**Site shows old content:**
- Clear browser cache
- Wait for DNS propagation
- Check DNS records are correct

**Email stops working:**
- You removed MX records - restore them
- Keep MX records pointing to email server

**SSL errors:**
- Vercel handles SSL automatically
- Wait for DNS propagation
- Clear browser cache

## 🎯 Quick Reference

**Vercel DNS Values** (check your Vercel dashboard for exact values):
- CNAME for www: `cname.vercel-dns.com`
- A record IP: Vercel will provide (usually `76.76.21.21` or similar)

**cPanel Locations:**
- File Manager: `public_html` folder
- DNS Editor: "Zone Editor" or "DNS Zone Editor"
- Email Settings: "Email Accounts" or "MX Records"

---

**Remember**: Always test on Vercel URL first, then update DNS, then verify, then remove old files!

