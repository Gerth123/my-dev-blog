# Juice Shop Master

A hands on security project on the OWASP Juice Shop, an intentionally vulnerable web application built for security training. This project documents a set of self solved challenges across different vulnerability categories, showing how each flaw is exploited and, more importantly, how it is mitigated. Every challenge has its own documentation folder and a short demonstration video. All work is performed against a local instance only.

> **Educational purpose only.** The content in this repository is provided strictly for educational and defensive security purposes. The OWASP Juice Shop is a deliberately vulnerable training application. Do not apply any of these techniques against systems you do not own or are not explicitly authorized to test.

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

Each challenge lives in its own folder with full documentation and a linked video. The selection intentionally spans four different vulnerability categories so that no two findings come from the same area.

### Login Admin

**Category:** Injection (SQL Injection). Crafted input in the login form is interpreted as part of the database query, which allows an attacker to bypass authentication and sign in as the administrator. This exposes every customer account, order, and administrative function.

Documentation: [login-admin](./login-admin/index.md)

### Admin Section

**Category:** Broken Access Control. The administration area is reachable without a proper server side authorization check, so a normal user can access functionality that should be restricted to administrators. This can lead to disclosure and manipulation of data that users should never be able to touch.

Documentation: [admin-section](./admin-section/index.md)

### DOM XSS

**Category:** Cross Site Scripting. Untrusted input is written into the page without proper encoding, so an attacker can inject script that runs in the victim's browser. This can be abused to steal sessions, perform actions on behalf of the victim, or deface the application.

Documentation: [dom-xss](./dom-xss/index.md)

### Confidential Document

**Category:** Sensitive Data Exposure. A confidential file is served from a path that is not properly protected, so it can be reached directly without authorization. Exposing internal documents this way can leak business secrets and personal data.

Documentation: [confidential-document](./confidential-document/index.md)

## Videos

Each challenge is demonstrated in a video of no more than 5 minutes. The video walks through the finding on a local instance and explains the mitigation.

| Challenge | Video |
| --- | --- |
| Login Admin | _pending: add Loom link_ |
| Admin Section | _pending: add Loom link_ |
| DOM XSS | _pending: add Loom link_ |
| Confidential Document | _pending: add Loom link_ |

## Security Notes

- No real personal data is used anywhere in this project. All accounts are throwaway test accounts.
- No passwords, tokens, usernames, IP addresses, or SSH keys are stored in this repository.
- The Juice Shop instance is run locally only and is never exposed to the public internet.
- Screenshots and videos are reviewed before publishing to make sure no host IP addresses, tokens, or credentials are visible.