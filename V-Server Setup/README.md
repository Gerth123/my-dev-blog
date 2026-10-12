# Juice Shop Master

A hands on security project on the OWASP Juice Shop, an intentionally vulnerable web application built for security training. This project documents a set of self solved challenges across different vulnerability categories, showing how each flaw is exploited and, more importantly, how it is mitigated. Every challenge has its own documentation folder and a short demonstration video. All work is performed against a local instance only.

:::warning Educational purpose only

The content in this repository is provided strictly for educational and defensive security purposes. The OWASP Juice Shop is a deliberately vulnerable training application. Do not apply any of these techniques against systems you do not own or are not explicitly authorized to test.

:::

## Table of Contents

- [Quickstart](#quickstart)
- [Project Goal](#project-goal)
- [Challenges](#challenges)
- [Videos](#videos)
- [Security Notes](#security-notes)

## Quickstart

### Prerequisites

- Docker installed locally, or a local Kali Linux VM
- A modern browser

### Steps

1. Pull and run the official Juice Shop image on your local machine:

   ```bash
   docker run --rm -p 3000:3000 bkimminich/juice-shop
   ```

2. Open the application in your browser:

   ```bash
   http://localhost:3000
   ```

3. Open a challenge folder below and follow its documentation to reproduce the finding on your own local instance.

## Project Goal

The goal of this project is to explore the OWASP Juice Shop, identify security vulnerabilities across several distinct categories, understand why each one is dangerous, and document how each one can be prevented. Each challenge is treated as a full case study: what the weakness is, what an attacker could achieve, and what a secure implementation looks like.

## Challenges

Each challenge lives in its own folder with full documentation and a linked video. The selection intentionally spans three different vulnerability categories.

| Challenge | Category | Documentation |
| --- | --- | --- |
| Login Admin | Injection (SQL Injection) | [login-admin](./login-admin/index.md) |
| Admin Section | Broken Access Control | [admin-section](./admin-section/index.md) |
| API-only XSS | Cross Site Scripting | [api-xss](./api-xss/index.md) |

## Videos

Each challenge is demonstrated in a video of no more than 5 minutes. The video walks through the finding on a local instance and explains the mitigation.

| Challenge | Video |
| --- | --- |
| Login Admin | [Watch on Loom](https://www.loom.com/share/20017eaa985a4a2eaf250adf86e004fe) |
| Admin Section | [Watch on Loom](https://www.loom.com/share/29f50be18013416396758588b76d66ee) |
| API-only XSS | [Watch on Loom](https://www.loom.com/share/60b505abf6594e3cb0141c824086cc3d) |

## Security Notes

- No real personal data is used anywhere in this project. All accounts are throwaway test accounts.
- No passwords, tokens, usernames, IP addresses, or SSH keys are stored in this repository.
- The Juice Shop instance is run locally only and is never exposed to the public internet.
- Screenshots and videos are reviewed before publishing to make sure no host IP addresses, tokens, or credentials are visible.