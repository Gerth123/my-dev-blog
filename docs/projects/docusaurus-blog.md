# Docusaurus Blog

This project is my personal learning journal and developer portfolio. It is based on the Developer Akademie Docusaurus starter template and documents my projects, guides, and technical learning progress.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
  - [Project Goal](#project-goal)
  - [Site Configuration](#site-configuration)
  - [Environment Variables](#environment-variables)
  - [Navbar and Footer](#navbar-and-footer)
  - [Git Workflow](#git-workflow)
  - [Deployment](#deployment)
  - [Testing](#testing)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
  link="https://github.com/Gerth123/my-dev-blog"
  title="GitHub Repository"
  type="tip"
>
  View the source code and the project history in this repository.
</GithubLinkAdmonition>

## Quickstart

1. Clone the repository:

   ```bash
   git clone git@github.com:Gerth123/my-dev-blog.git
   cd my-dev-blog
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Create the local environment file:

   ```powershell
   Copy-Item example.env .env
   ```

4. Start the development server:

   ```bash
   pnpm start
   ```

5. Open `http://localhost:3000` in a browser.

## Description

### Project Goal

The goal of this project was to personalize the provided Docusaurus template and turn it into my own learning journal and portfolio. The website contains project reports, technical guides, knowledge articles, and optional blog posts.

### Site Configuration

I updated the main settings in `docusaurus.config.ts`:

- `title` was changed to `Robins Dev Blog`.
- `tagline` now describes the technical focus of the website.
- The default `url` uses my GitHub username.
- The navbar title was personalized.
- The default logo was kept and its alternative text was adjusted.

### Environment Variables

I added the following public configuration values to `example.env`:

- `GIT_REPOSITORY_URL`: URL of my own repository
- `TEMPLATE_REPOSITORY_URL`: URL of the original template repository

The values are read in `docusaurus.config.ts`. A fallback URL is used when an environment variable is not available:

```typescript
const gitRepositoryUrl =
  process.env.GIT_REPOSITORY_URL ??
  'https://github.com/Gerth123/my-dev-blog';

const templateRepositoryUrl =
  process.env.TEMPLATE_REPOSITORY_URL ??
  'https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template';
```

The repository URL is used for:

- the documentation `editUrl`
- the blog `editUrl`
- the GitHub link in the navbar
- the GitHub link in the footer

The template URL is used for the `Template` link in the footer.

The real `.env` file is ignored by Git and must not contain committed secrets. Only safe example values belong in `example.env`.

### Navbar and Footer

I changed the navbar and footer as required:

- The navbar shows the personalized site title.
- The GitHub navbar item links to my repository.
- The `Docs` footer column contains links to the tutorial and project overview.
- The original `Community` footer column was removed.
- The `More` footer column contains links to my repository and the original template.
- The copyright text contains my name and the text `extended from the developer-akademie-starter`.

### Git Workflow

The project changes were made on the feature branch `feature/setup-blog`. The work was split into multiple commits so that the project history remains understandable.

After the project is reviewed and approved, the feature branch is merged into `main` through a pull request.

### Deployment

A prepared GitHub Actions workflow automatically builds and deploys the website to GitHub Pages whenever a commit is pushed to `main`.

In the repository settings, the GitHub Pages deployment source must be set to **GitHub Actions** under **Settings > Pages > Build and deployment**.

### Testing

I tested the project locally with:

```bash
pnpm start
```

I also tested the production build with:

```bash
pnpm build
```

The same build must complete successfully in the GitHub Actions workflow before the project is submitted.

## Further References

- [GitHub repository](https://github.com/Gerth123/my-dev-blog)
- [Developer Akademie starter template](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template)
- [Docusaurus documentation](https://docusaurus.io/docs)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
