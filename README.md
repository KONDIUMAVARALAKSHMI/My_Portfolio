# 🚀 Developer Portfolio Website

A stunning, modern portfolio website built with pure HTML, CSS, and JavaScript — no frameworks required.

## ✨ Features

- **Dark Cosmic Theme** — Deep space background with purple/cyan gradient accents
- **Interactive Canvas Background** — Animated particle field with connection lines
- **Custom Cursor** — Smooth follower cursor with hover effects
- **Typed Effect** — Rotating role titles in the hero section
- **Scroll Reveal Animations** — Elements animate in as you scroll
- **Glassmorphism Cards** — Frosted glass project cards with hover effects
- **Orbit Rings** — Animated tech orbit around profile in hero
- **Animated Skill Bars** — Progress bars animate when visible
- **Project Filter** — Filter projects by category (Web, API, Tools)
- **Experience Timeline** — Dual-side animated timeline
- **Contact Form** — Client-side validation with success feedback
- **Fully Responsive** — Mobile, tablet, and desktop ready
- **SEO Ready** — Meta tags, semantic HTML, structured headings

## 📁 Project Structure

```
portfolio_internship/
├── index.html      ← Main HTML (all sections)
├── style.css       ← Full design system & animations
├── script.js       ← Interactions & animations
└── README.md       ← This file
```

## 🎨 Color Palette

| Role            | Hex       |
| --------------- | --------- |
| Background      | `#050816` |
| Electric Purple | `#7C3AED` |
| Cyan            | `#06B6D4` |
| Amber           | `#F59E0B` |
| Emerald         | `#10B981` |

## 🚀 Getting Started

### Local Development

Simply open `index.html` in your browser — no build step required!

```bash
# Windows
start index.html

# Or drag and drop index.html into any browser
```

### Adding Your Info (Placeholders to Replace)

Search for `[Your Name]`, `[Your City]`, `[your@email.com]` etc. in `index.html` and replace with your real information.

| Placeholder              | Replace With                      |
| ------------------------ | --------------------------------- |
| `[Your Name]`            | Your full name                    |
| `[YN]`                   | Your initials                     |
| `[Your City, Country]`   | Your location                     |
| `[Your Degree, College]` | Education info                    |
| `[your@email.com]`       | Your email                        |
| Social link `href="#"`   | Real GitHub/LinkedIn/Twitter URLs |
| Project card content     | Your real projects                |
| Timeline entries         | Real experience                   |

### Adding Your Photo

Replace the initials avatar with your photo by adding inside `.profile-avatar` in `index.html`:

```html
<img src="your-photo.jpg" alt="[Your Name]" />
```

### Resume Download

Change the `href="#"` on the **Download Resume** button to point to your PDF file:

```html
<a href="resume.pdf" class="btn btn-primary" download></a>
```

## 🌐 Deployment

### GitHub Pages (Free)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify (Free)

1. Drag & drop your project folder to [netlify.com/drop](https://netlify.com/drop)
2. Get an instant live URL!

### Vercel (Free)

```bash
npx vercel
```

## 📋 SEO Checklist

- ✅ Meta title and description
- ✅ Open Graph tags
- ✅ Semantic HTML (header, nav, section, article, footer)
- ✅ Single H1 per page
- ✅ ARIA labels on all interactive elements
- ✅ Alt text placeholders ready

## 📜 License

MIT — Free to use and modify.
