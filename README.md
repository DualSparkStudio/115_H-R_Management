# LuxeStay Management - Hotel & Resort Management Website

A premium, modern single-page website for a Hotel & Resort Management brand. Built with React, featuring smooth animations, premium UI/UX, and a clean, professional design.

## Features

- 🎨 **Premium Design**: Modern, minimal layout with lots of white space and elegant typography
- ✨ **Smooth Animations**: AOS (Animate On Scroll) and GSAP for premium micro-animations
- 🖱️ **Custom Cursor**: Interactive cursor effect that responds to hover states
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- 🎯 **Smooth Scrolling**: Lenis-powered smooth scrolling throughout
- 🎭 **Interactive Elements**: Hover effects, parallax, and text reveals

## Tech Stack

- **React** 18.2.0
- **AOS** (Animate On Scroll) for scroll-based animations
- **GSAP** for advanced animations and transitions
- **Lenis** for smooth scrolling
- **Modern CSS** (no Tailwind) with CSS Modules approach

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navigation with blur effect
│   ├── Hero.jsx            # Full-viewport hero section
│   ├── Services.jsx        # Service cards grid
│   ├── Properties.jsx      # Portfolio/Properties showcase
│   ├── Process.jsx         # Timeline/stepper process section
│   ├── Testimonials.jsx    # Testimonial slider
│   ├── CTASection.jsx      # Call-to-action strip
│   ├── Contact.jsx         # Contact form section
│   ├── Footer.jsx          # Footer with links
│   └── Cursor.jsx          # Custom cursor component
├── App.js                  # Main app component
├── App.css                 # Global app styles
├── index.js                # Entry point
└── index.css               # Global styles and CSS variables
```

## Sections

1. **Navbar**: Sticky navigation with smooth scroll links
2. **Hero**: Full-viewport hero with text reveal animations
3. **Services**: Grid of service cards with hover effects
4. **Properties**: Portfolio showcase with filter and hover effects
5. **Process**: Timeline showing how the company works
6. **Testimonials**: Auto-rotating testimonial slider
7. **CTA Section**: High-contrast call-to-action
8. **Contact**: Contact form with validation
9. **Footer**: Footer with links and social media

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2d2d2d;
  --accent-color: #d4a574;
  --bg-color: #fafafa;
  /* ... */
}
```

### Brand Name
Replace "LuxeStay Management" in:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `public/index.html` (title)

### Content
All content is easily editable in the respective component files.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

