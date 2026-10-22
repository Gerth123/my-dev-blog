# Robin Gerth | Developer Portfolio and Learning Journal

A personal portfolio built with React and TypeScript on top of Docusaurus, combined with a learning journal that documents every project of my DevSecOps course. Every push to `main` is type checked, built and deployed to GitHub Pages automatically.

**Live site:** [gerth123.github.io/my-dev-blog](https://gerth123.github.io/my-dev-blog/)

## Table of Contents

- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [How to Start](#how-to-start)
- [Project Goal](#project-goal)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Start the Development Server](#start-the-development-server)
  - [Build the Project](#build-the-project)
  - [Deploy to GitHub Pages](#deploy-to-github-pages)
  - [Deploy with Docker and NGINX](#deploy-with-docker-and-nginx)
  - [Customize the Portfolio](#customize-the-portfolio)
  - [Add Documentation and Blog Posts](#add-documentation-and-blog-posts)
- [Features](#features)
- [Portfolio Components](#portfolio-components)
- [Environment Variables](#environment-variables)
- [CI/CD](#cicd)
- [Additional Files](#additional-files)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later (includes npm)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (only needed for the [NGINX deployment](#deploy-with-docker-and-nginx))

### How to Start

1. Clone the repository and switch into it:

   ```bash
   git clone https://github.com/Gerth123/my-dev-blog.git
   cd my-dev-blog
   ```

2. Install the dependencies exactly as defined in the lockfile:

   ```bash
   npm ci
   ```

3. Create your local environment file from the template:

   ```bash
   cp example.env .env
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the URL printed in the terminal, by default `http://localhost:3000/my-dev-blog/`.

## Project Goal

This repository contains my developer portfolio and my learning journal in one Docusaurus site.

- **Portfolio:** The start page is a custom React page with the sections Header, Hero, My Skills, My Project Highlights, Contact and Footer. Every section is its own typed React component, styled with CSS Modules and implemented according to the Figma design provided by Developer Akademie.
- **Learning journal:** The `docs/` folder contains guides and a detailed documentation page for every project of the DevSecOps course. The portfolio links to these pages, so visitors can go from a project highlight straight to its documentation.
- **Automated delivery:** A GitHub Actions workflow type checks, builds and deploys the site to GitHub Pages on every push to `main`.

## Usage

### Configuration

The site is configured in `docusaurus.config.ts`. Values that differ between environments (URL, base path, repository links) are read from environment variables, which are loaded from a local `.env` file via `dotenv`.

1. Copy the template:

   ```bash
   cp example.env .env
   ```

2. Adjust the values to your own GitHub account and repository. See [Environment Variables](#environment-variables) for a description of every variable.

3. Restart the development server after changing `.env`, because the file is only read on startup.

The `.env` file is listed in `.gitignore` and must never be committed. All values in this project are public, but the same pattern keeps real secrets out of the repository if they are ever needed.

### Start the Development Server

```bash
npm start
```

The development server reloads the page automatically when you change a file. To check all TypeScript types without starting the server, run:

```bash
npm run typecheck
```

### Build the Project

```bash
npm run build
```

The static site is generated into the `build/` folder. The build fails on broken internal links, so a typo in a documentation path is caught before deployment. To preview the production build locally, run:

```bash
npm run serve
```

### Deploy to GitHub Pages

Deployment is fully automated with my own GitHub Actions workflow, no deploy command has to be run manually.

1. In the repository on GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
2. Make sure `BASE_URL` in `example.env` matches your repository name, for example `/my-dev-blog/`. The workflow copies `example.env` to `.env` before building.
3. Create a feature branch, commit your changes and open a pull request against `main`. The workflow builds the site for the pull request, so errors show up before merging.
4. Merge the pull request. The push to `main` triggers the workflow again, and this time it also deploys the build to GitHub Pages.

The deployment status and the site URL are shown under **Actions** and in the **github-pages** environment of the repository.

### Deploy with Docker and NGINX

The `Dockerfile` builds the site in a Node container and serves the result with NGINX. This is an alternative to GitHub Pages for hosting the site on your own server.

1. Build the image:

   ```bash
   docker build -t my-dev-blog .
   ```

2. Start a container and map the NGINX port to a free port on the host:

   ```bash
   docker run -d --name my-dev-blog -p 8080:80 my-dev-blog
   ```

3. Open `http://localhost:8080` in a browser.

The `.env` file is excluded from the Docker build context, so the site is built with the base path `/` and runs at the root of the server. A step by step guide is available in [docs/guides/deploy-docusaurus-with-docker-and-nginx.md](./docs/guides/deploy-docusaurus-with-docker-and-nginx.md).

### Customize the Portfolio

All portfolio content lives in typed data structures, so most changes do not require touching the layout.

| What to change | Where |
|---|---|
| Name, job title and introduction text | `src/components/hero/index.tsx` |
| Profile photo | Replace `static/img/profile.jpg` (square, about 800 x 800 pixels) |
| Skills, their icons and the bullet points shown on hover | `skills` array in `src/components/my-skills/skills.ts` |
| Project highlights, texts, badges, images and links | `projects` array in `src/components/project-highlights/index.tsx` |
| Email address and LinkedIn profile | Constants at the top of `src/components/contact/index.tsx` |
| Legal notice link | Constant at the top of `src/components/footer/index.tsx` |
| Colors and font | Design tokens at the end of `src/css/custom.css` |
| Page title and meta description | `src/pages/index.tsx` |

To add a project highlight:

1. Create a documentation page in `docs/projects/`.
2. Add a screenshot to `static/img/projects/`, ideally in 16:9 and about 800 pixels wide.
3. Add a new entry to the `projects` array. Use skill names from `skills.ts` as technologies, so the badges show the matching icons.
4. Run `npm run build` to verify that the documentation link is valid.

Because every array is typed with a TypeScript interface, a missing or misspelled field is reported by `npm run typecheck` and by the pipeline.

### Add Documentation and Blog Posts

- **Documentation:** Add a Markdown file to `docs/`. The sidebar is generated automatically, the order and labels of folders are controlled by `_category_` files.
- **Blog posts:** Add a Markdown file to `blog/` and set `BLOG_ENABLED=true` in your `.env` to show the blog in the navigation.

## Features

- **Responsive portfolio:** Every section adapts to desktop and mobile. On mobile the navigation turns into a burger menu with an overlay that slides in from the top.
- **Hiding header:** The header disappears while scrolling down and comes back when scrolling up, so it never covers the content.
- **Skill cards with details:** Hovering or focusing a skill card with the keyboard shows how I used that skill. On mobile the skills are shown as a swipeable slider with page indicators, built with CSS Scroll Snap and without any slider library.
- **Interactive project highlights:** On desktop a list switches between projects, on mobile all projects are stacked as cards. Each card links to its documentation page and its GitHub repository.
- **Accessibility:** All interactive elements are reachable with the keyboard, images have alternative texts, and smooth scrolling and the menu animation are disabled for users who prefer reduced motion.
- **Privacy friendly font:** The Quicksand font is bundled via npm, so no requests are sent to Google Fonts.
- **Type safety:** All components and their data are typed with TypeScript interfaces, and the type check runs in the pipeline.

## Portfolio Components

Every section is a React component in its own folder under `src/components/`, with the component in `index.tsx` and its styles in a CSS Module named after the component. The sections are composed in `src/pages/index.tsx`.

| Folder | Component | Purpose |
|---|---|---|
| `header/` | `Header` | Navigation with scroll behavior and mobile menu |
| `hero/` | `Hero` | Introduction with photo and contact button |
| `my-skills/` | `MySkills` | Skill grid and mobile slider, data in `skills.ts` |
| `project-highlights/` | `ProjectHighlights` | Project list, cards and links to the documentation |
| `contact/` | `Contact` | Contact information with email and LinkedIn |
| `footer/` | `Footer` | Scroll to top button, copyright and legal notice |
| `github-link-admonition/` | `GithubLinkAdmonition` | Highlighted GitHub link used inside the documentation pages |

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DEPLOYMENT_URL` | Base URL of the deployed site | `https://gerth123.github.io` |
| `BASE_URL` | Path under which the site is served, must match the repository name on GitHub Pages | `/my-dev-blog/` |
| `DEPLOYMENT_BRANCH` | Branch Docusaurus uses for deployments | `main` |
| `GITHUB_ORG` | GitHub user or organization that owns the repository | `Gerth123` |
| `GITHUB_PROJECT` | Name of the repository | `my-dev-blog` |
| `GIT_REPOSITORY_URL` | Repository URL used for the GitHub links and the "edit this page" links | `https://github.com/Gerth123/my-dev-blog` |
| `TEMPLATE_REPOSITORY_URL` | URL of the original template, linked in the footer of the docs | `https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template` |
| `BLOG_ENABLED` | Shows the blog when set to `true`, not set by default | `true` |

## CI/CD

The workflows are located in `.github/workflows/`.

| Workflow | Trigger | Purpose |
|---|---|---|
| `main.yml` | Push and pull request to `main` | Entry point that calls the deploy workflow |
| `deploy.yaml` | Called by `main.yml` | Installs dependencies with `npm ci`, runs the type check, builds the site and deploys it to GitHub Pages. The deploy job only runs on `main`. |
| `create-pr.yaml` | Push to any branch except `main` | Opens a pull request against `main` automatically if none exists yet |
| `check-open-pr.yaml` | Push to any branch except `main` | Fails if a feature branch has no open pull request |

## Additional Files

| File or folder | Description |
|---|---|
| `blog/` | Blog posts and the author and tag definitions used by the blog |
| `docs/` | Guides and project documentation, rendered as the docs section of the site |
| `src/components/` | React components of the portfolio and the documentation |
| `src/css/custom.css` | Global styles and the design tokens of the portfolio |
| `src/pages/index.tsx` | Portfolio start page that composes all sections |
| `static/img/` | Images and icons, served without processing |
| `.dockerignore` | Files excluded from the Docker build context, including `node_modules` and `.env` |
| `.gitignore` | Files excluded from Git, including `node_modules`, `build` and `.env` |
| `babel.config.js` | Babel configuration required by Docusaurus |
| `Dockerfile` | Multi stage build that creates the site and serves it with NGINX |
| `docusaurus.config.ts` | Main configuration of the site, reads the environment variables |
| `example.env` | Template for the `.env` file with all environment variables |
| `LICENSE` | License of the repository |
| `package.json` | Dependencies and npm scripts |
| `package-lock.json` | Exact dependency versions used by `npm ci` |
| `sidebars.ts` | Sidebar configuration of the documentation |
| `tsconfig.json` | TypeScript configuration used by the editor and `npm run typecheck` |