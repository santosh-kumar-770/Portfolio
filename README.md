# Itte Santosh Kumar — Personal Portfolio Website

A modern dark personal portfolio website built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

Designed with a creative-technologist editorial aesthetic: dark obsidian surfaces, subtle cyan/teal accents, high-contrast typography, smooth transitions, and a modular architecture.

---

## 🚀 Quick Start

To run the portfolio locally on your machine:

```bash
# 1. Navigate to the project directory
cd santosh-portfolio

# 2. Start the development server
npm run dev
```

Visit the local URL shown in your terminal (typically `http://localhost:5173/`).

To build for production:

```bash
npm run build
```

---

## 🛠️ How to Update Your Information

All your personal details, projects, experiences, skills, and links are managed in a single central data file:

📍 **`src/data/portfolioData.ts`**

### 1. Update Profile Photo
- Place your photo at `public/assets/images/profile.jpg` (or `.png` / `.webp`).
- In `src/data/portfolioData.ts`, update `profileImagePath: '/assets/images/profile.jpg'`.

### 2. Update Resume PDF
- Replace the file at `public/assets/resume/resume.pdf` with your updated resume PDF.
- The "View Resume" and "Download Resume" buttons will automatically serve the new file.

### 3. Add or Edit Projects
- Open `src/data/portfolioData.ts` and edit the `projects` array:
```typescript
{
  id: 'your-project-id',
  title: 'Project Name',
  subtitle: 'Short Tagline',
  tagline: 'Key value proposition',
  description: 'Detailed explanation of what you built...',
  technologies: ['Python', 'Django', 'PostgreSQL'],
  highlights: [
    'Key architecture highlight 1',
    'Key architecture highlight 2'
  ],
  liveUrl: 'https://...',
  githubUrl: 'https://github.com/...',
  image: '/assets/images/projects/your-image.svg',
  featured: true,
  status: 'Live',
  category: 'Systems & APIs'
}
```

### 4. Update Instagram & Tech Content Grid
- Edit the `contentPieces` array in `src/data/portfolioData.ts`.
- Place new thumbnails inside `public/assets/images/content/`.

### 5. Update Experiences, Skills & Education
- Edit `experiences`, `skillCategories`, and `educationInfo` directly in `src/data/portfolioData.ts`.

---

## 📂 Asset Structure

```
public/
  favicon.svg
  assets/
    images/
      profile.svg (placeholder - replace with profile.jpg)
      projects/
        stucet.svg
        mnist.svg
        eventloop.svg
      content/
        neural-nets.svg
        django-api.svg
        builder-guide.svg
    resume/
      resume.pdf (placeholder - replace with your actual resume.pdf)
```

---

## 🚢 Deployment

This website is a static single-page application and can be deployed with 1 click to:
- **Vercel** (`npx vercel`)
- **Netlify**
- **GitHub Pages**
