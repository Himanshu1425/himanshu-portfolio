<div align="center">

# Himanshu Raj. Portfolio

**Applied AI Engineer (Fresher) | GenAI, Agentic AI, Full Stack**

A motion-heavy personal portfolio with a scramble preloader, expanding video hero, scroll-driven reveals, and a certificate gallery.

[**Live Site**](https://himanshu-portfolio-wine-kappa.vercel.app) · [LinkedIn](https://www.linkedin.com/in/himanshu-raj2002) · [GitHub](https://github.com/Himanshu1425)

<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white" alt="Framer Motion" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## About

I am a B.Tech CSE student at VIT Chennai (2022 to 2026) targeting AI/ML, GenAI, Agentic AI and full stack roles. This site collects my projects, skills and certifications in one place.

## Sections

| Section | What it does |
| --- | --- |
| **Preloader** | "HIMANSHU RAJ" scrambles and settles, "PORTFOLIO" slides up, then a shutter opens |
| **Hero** | Video starts as a rounded card and expands to full screen, masked heading reveal, play/pause control |
| **About** | Masked heading, draggable ID badge with spring physics, scroll-filled paragraph, count-up stats |
| **Skills** | Skill chips grouped by area |
| **Projects** | Scroll-drawn timeline path with project cards |
| **Certificates** | 8 tilted cards with spring entrance, click-to-zoom popup, Verify links, scrolling ticker strips |
| **Contact** | Working contact form that delivers messages to my inbox |
| **Footer** | Quick links to email, LinkedIn and GitHub |

## Tech Stack

- **React** with **Vite**
- **Tailwind CSS v4**
- **Framer Motion** for transitions, scroll-linked animation and layout animation
- **AOS** for simple scroll reveals
- **Formspree** for the contact form backend
- **Vercel** for hosting

## Getting Started

Requires Node.js (developed on Node 24).

    git clone https://github.com/Himanshu1425/himanshu-portfolio.git
    cd himanshu-portfolio
    npm install
    npm run dev

Then open the local URL printed in the terminal (usually http://localhost:5173).

For a production build:

    npm run build
    npm run preview

## Project Structure

    src/
    ├── assets/          hero video, images, certificate images, icons
    ├── components/      Preloader, Navbar, Hero, About, Skills, Projects,
    │                    Certificates, Contact, Footer
    ├── data/            certificates.js, projects data
    ├── App.jsx          section order and page assembly
    └── main.jsx

Section order in App.jsx: Preloader, Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer.

## Customising

- **Certificates:** edit `src/data/certificates.js` (name, issuer, image, verify link) and drop images into `src/assets/certificates/`.
- **Projects:** edit the projects data file and the card content in `src/components/Projects.jsx`.
- **Contact form:** the form posts to a Formspree endpoint set in `src/components/Contact.jsx`. To receive messages on your own email, create a form at [formspree.io](https://formspree.io) and replace the endpoint URL.
- **Hero video:** replace `src/assets/hero video/intro.mp4`.

## Deployment

The site is deployed on Vercel, connected to this repository. Every push to `main` triggers a new production deployment automatically.

## Contact

- Email: [rishisinghpat323@gmail.com](mailto:rishisinghpat323@gmail.com)
- LinkedIn: [linkedin.com/in/himanshu-raj2002](https://www.linkedin.com/in/himanshu-raj2002)
- GitHub: [@Himanshu1425](https://github.com/Himanshu1425)

---

<div align="center">

Built with React by Himanshu Raj

</div>
