# Creating Open Graph Image for Social Media Sharing

## Current Status

The site is currently using `/images/logos/raven_logo.png` as a temporary Open Graph image. For better social media previews, you should create a dedicated Open Graph image.

## Recommended Open Graph Image Specifications

- **Dimensions**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 1MB (optimized)
- **Location**: `/public/images/og-image.jpg`

## What to Include in the Image

A good Open Graph image should include:
1. **Your Logo** - Prominently displayed
2. **Company Name** - "Raven Tech Group"
3. **Tagline or Key Message** - e.g., "Innovative Technology Solutions"
4. **Brand Colors** - Use your brand orange (#FFA91E) and black
5. **Clean Design** - Simple, readable, professional

## Tools to Create the Image

### Option 1: Canva (Easiest)
1. Go to [Canva.com](https://canva.com)
2. Create custom size: 1200 x 630 pixels
3. Add your logo, company name, and tagline
4. Use brand colors
5. Export as JPG
6. Save to `/public/images/og-image.jpg`

### Option 2: Figma
1. Create a 1200 x 630px frame
2. Design with your logo and branding
3. Export as JPG
4. Save to `/public/images/og-image.jpg`

### Option 3: Photoshop/Design Software
1. Create new document: 1200 x 630 pixels
2. Design with logo and text
3. Export as optimized JPG
4. Save to `/public/images/og-image.jpg`

## After Creating the Image

1. Save the image as `/public/images/og-image.jpg`
2. Update `app/layout.tsx` to use the new image (already configured)
3. Push to GitHub
4. Vercel will automatically redeploy

## Testing Your OG Image

After deployment, test using:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Enter your URL: `https://www.raventechgroup.com`

## Current Configuration

The Open Graph image is configured in `app/layout.tsx`:
- Open Graph: `/images/og-image.jpg`
- Twitter Card: `/images/og-image.jpg`

Once you create and add the image, it will automatically be used for social media sharing.

