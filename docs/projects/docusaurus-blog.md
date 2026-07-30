# Docusaurus Blog

This project is based on the [dev-blog-template](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template) and set up as my personal learning journal and portfolio site.

## Table of Contents

- [Docusaurus Blog](#docusaurus-blog)
  - [Overview](#overview)
  - [Configuration Steps](#configuration-steps)
    - [Site Metadata](#site-metadata)
    - [Environment Variables](#environment-variables)
    - [Navbar](#navbar)
    - [Footer](#footer)
  - [Deployment](#deployment)

## Overview

This site uses Docusaurus and started from the DevSecOps course template. Below are the steps I took to set it up.

## Configuration Steps

### Site Metadata

In `docusaurus.config.ts`, I changed:

- `title`: now shows this is my learning journal and portfolio
- `tagline`: short subtitle describing the site
- `url`: default value now matches my GitHub username

### Environment Variables

I added two values to `example.env`:

- `GIT_REPOSITORY_URL`: my own repository URL
- `TEMPLATE_REPOSITORY_URL`: the original template repository URL

Both are read in `docusaurus.config.ts` with a fallback default, the same way `blogEnabled` works:

```typescript
const gitRepositoryUrl = process.env.GIT_REPOSITORY_URL
const templateRepositoryUrl = process.env.TEMPLATE_REPOSITORY_URL
```

`gitRepositoryUrl` is used for:
- `editUrl` in `docs` and `blog`
- the GitHub link in the navbar
- the GitHub link in the footer

`templateRepositoryUrl` is used for the "Template" link in the footer.

### Navbar

- `title`: updated to match the site name
- `logo`: kept the default logo (or: replaced with my own, alt text updated)
- GitHub item now uses `gitRepositoryUrl` instead of a hardcoded link

### Footer

- **Docs** column: added a link to `/docs/projects/overview`
- **Community** column: removed
- **More** column: GitHub link points to my repo, added a "Template" link to the original template
- `copyright`: personalized, extended with "extended from the developer-akademie-starter"

## Deployment

The site deploys automatically to GitHub Pages via a GitHub Action. Every commit to main triggers a new build and deployment.

I set the GitHub Pages source to **GitHub Actions** under **Settings → Pages → Build and deployment**.