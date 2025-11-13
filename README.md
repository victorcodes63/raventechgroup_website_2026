# Raven Tech Group - Website Redesign 2026

A modern, high-performance website built with Next.js 14, TypeScript, Framer Motion, and Tailwind CSS. This redesign features smooth animations, excellent SEO optimization, and a beautiful sans-serif typography system.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Smooth Animations**: Framer Motion for beautiful, performant animations
- **SEO Optimized**: Comprehensive meta tags, sitemap, robots.txt, and structured data
- **Responsive Design**: Fully responsive across all devices
- **Performance**: Optimized images, code splitting, and lazy loading
- **Accessibility**: Semantic HTML, ARIA attributes, and keyboard navigation
- **Typography**: Inter font family for a clean, modern look
- **Dark Mode Ready**: Design system prepared for dark mode implementation

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

## 🛠️ Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd "Raven-Tech-Group Web Redesign 2026"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and SEO
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles and Tailwind
│   ├── robots.ts           # Robots.txt configuration
│   └── sitemap.ts          # Sitemap configuration
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation header
│   │   └── Footer.tsx      # Footer component
│   └── sections/
│       ├── Hero.tsx        # Hero section
│       ├── About.tsx       # About section
│       ├── Services.tsx    # Services section
│       ├── Portfolio.tsx   # Portfolio section
│       ├── Testimonials.tsx # Testimonials section
│       └── Contact.tsx     # Contact section
├── lib/
│   └── animations.ts       # Framer Motion animation variants
└── public/                 # Static assets
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your primary colors
  },
  dark: {
    // Your dark/neutral colors
  },
}
```

### Typography

The Inter font is loaded in `app/layout.tsx`. To change fonts:

1. Import a different font from `next/font/google`
2. Update the `fontFamily` in `tailwind.config.ts`
3. Update the CSS variable in `app/globals.css`

### Animations

Animation variants are defined in `lib/animations.ts`. You can:
- Modify existing animations
- Create new animation variants
- Adjust timing and easing

### SEO

Update SEO metadata in `app/layout.tsx`:
- Title and description
- Open Graph tags
- Twitter Card tags
- Verification codes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://www.raventechgroup.com
```

## 🧪 Development

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## 📊 Performance

This website is optimized for performance with:
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts with `next/font`
- Static generation where possible
- Minimal JavaScript bundle size

## 🎯 SEO Features

- Semantic HTML structure
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Sitemap.xml generation
- Robots.txt configuration
- Structured data ready
- Canonical URLs

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful icon library
- **Next SEO**: SEO optimization utilities

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Raven Tech Group

## 📞 Contact

For questions or support, please contact:
- Email: info@raventechgroup.com
- Website: https://www.raventechgroup.com

---

Built with ❤️ by Raven Tech Group

