# Setup Guide - Raven Tech Group Website

## Quick Start

Follow these steps to get your website up and running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Next SEO

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Customization Checklist

### ✅ Update Company Information

1. **Contact Information** (`components/layout/Footer.tsx`):
   - Update email: `info@raventechgroup.com`
   - Update phone: `+1 (234) 567-890`
   - Update address

2. **Social Media Links** (`components/layout/Footer.tsx`):
   - Update Facebook, Twitter, LinkedIn, Instagram URLs

3. **SEO Metadata** (`app/layout.tsx`):
   - Update site title and description
   - Update Open Graph tags
   - Update Twitter Card tags
   - Add verification codes if needed

### ✅ Update Content

1. **Hero Section** (`components/sections/Hero.tsx`):
   - Update headline and subheadline
   - Update call-to-action buttons
   - Update statistics

2. **About Section** (`components/sections/About.tsx`):
   - Update company description
   - Update values and mission

3. **Services** (`components/sections/Services.tsx`):
   - Update service offerings
   - Add/remove services as needed
   - Update service descriptions and features

4. **Portfolio** (`components/sections/Portfolio.tsx`):
   - Add your actual projects
   - Update project images (add to `public/` folder)
   - Update project descriptions and tags

5. **Testimonials** (`components/sections/Testimonials.tsx`):
   - Add real client testimonials
   - Update client names and roles

6. **Contact Form** (`components/sections/Contact.tsx`):
   - Connect form to your email service
   - Update contact information
   - Update business hours

### ✅ Branding

1. **Colors** (`tailwind.config.ts`):
   - Update primary colors to match your brand
   - Update dark/neutral colors if needed

2. **Logo**:
   - Add your logo to `public/` folder
   - Update logo in `components/layout/Header.tsx`

3. **Fonts** (`app/layout.tsx`):
   - Change font if needed (currently using Inter)
   - Update font in `tailwind.config.ts`

### ✅ Images

1. Add images to `public/` folder:
   - Logo
   - Portfolio project images
   - Team photos (if applicable)
   - Hero background images (optional)

2. Update image paths in components

### ✅ Forms

1. **Contact Form** (`components/sections/Contact.tsx`):
   - Integrate with form service (e.g., Formspree, SendGrid)
   - Or set up API route in `app/api/contact/route.ts`

2. **Newsletter** (if adding):
   - Integrate with email service
   - Add subscription form

### ✅ Analytics

1. **Google Analytics**:
   - Add GA tracking code to `app/layout.tsx`
   - Or use Next.js Analytics

2. **Other Analytics**:
   - Add tracking scripts as needed

### ✅ Performance

1. **Images**:
   - Optimize all images
   - Use WebP format where possible
   - Add proper alt text

2. **Fonts**:
   - Fonts are already optimized with `next/font`
   - Verify font loading

### ✅ SEO

1. **Metadata**:
   - Update all meta tags in `app/layout.tsx`
   - Add page-specific metadata for each page

2. **Sitemap** (`app/sitemap.ts`):
   - Update URLs if domain changes
   - Add all pages to sitemap

3. **Robots.txt** (`app/robots.ts`):
   - Update sitemap URL
   - Add any disallowed paths

4. **Structured Data**:
   - Add JSON-LD structured data
   - Implement schema.org markup

### ✅ Testing

1. **Responsive Design**:
   - Test on mobile, tablet, and desktop
   - Test on different browsers

2. **Performance**:
   - Run Lighthouse audit
   - Optimize based on recommendations

3. **Accessibility**:
   - Test with screen readers
   - Verify keyboard navigation
   - Check color contrast

4. **Forms**:
   - Test contact form
   - Verify email delivery

### ✅ Deployment

1. **Environment Variables**:
   - Create `.env.local` for local development
   - Add environment variables to hosting platform

2. **Domain**:
   - Update domain in `next.config.js`
   - Update domain in metadata
   - Update domain in sitemap

3. **Deploy**:
   - Deploy to Vercel (recommended)
   - Or deploy to your preferred platform

## Next Steps

1. **Content Management**: Consider adding a headless CMS (Contentful, Sanity, etc.)
2. **Blog**: Add a blog section for content marketing
3. **E-commerce**: Add e-commerce functionality if needed
4. **Multi-language**: Add internationalization if serving multiple countries
5. **Dark Mode**: Implement dark mode toggle
6. **Advanced Animations**: Add more sophisticated animations
7. **Interactive Elements**: Add more interactive features

## Support

For questions or issues:
- Check the README.md for general information
- Check ARCHITECTURE.md for technical details
- Contact: info@raventechgroup.com

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Happy coding! 🚀

