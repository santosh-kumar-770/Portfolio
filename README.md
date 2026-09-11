# Santosh Kumar Itte — Personal Portfolio Website

A modern dark personal portfolio website built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, featuring native **Vercel Serverless Functions** for contact messaging via **Resend**.

Designed with an editorial Liquid Glass aesthetic: dark obsidian surfaces, subtle cyan/teal accents, high-contrast typography, smooth transitions, and a modular architecture.

---

## 🚀 Quick Start

To run the portfolio locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Visit the local URL shown in your terminal (typically `http://localhost:5173/`).

To build for production:

```bash
npm run build
```

---

## 🛠️ How to Update Your Information

All personal details, projects, experiences, skills, and links are managed in a single central data file:

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

### 4. Update Experiences, Skills & Education
- Edit `experiences`, `skillCategories`, and `educationInfo` directly in `src/data/portfolioData.ts`.

---

## 📬 Contact Form & Serverless Functions

The contact form dispatches emails securely using **Resend** through a native Vercel Function (`api/messages.ts`).

### Environment Variables

Configure these in your Vercel Project Dashboard under **Settings $\rightarrow$ Environment Variables**:

| Variable | Description |
| :--- | :--- |
| `RESEND_API_KEY` | API Key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_RECEIVER_EMAIL` | Email address where you receive messages (`santoshkumaritte7@gmail.com`) |
| `CONTACT_FROM_EMAIL` | *(Optional)* Sender address (e.g. `Portfolio Contact <onboarding@resend.dev>`) |

---

## 📂 Asset Structure

```
public/
  favicon.svg
  icons.svg
  assets/
    images/
      profile.jpg
      projects/
        stucet.svg
        mnist.svg
        eventloop.svg
    resume/
      resume.pdf
```
