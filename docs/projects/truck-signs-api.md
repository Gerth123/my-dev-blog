# Truck Signs API

Containerized Django REST backend for an online store selling custom truck vinyl letterings, upgraded to current Python and Django versions and shipped with a CI pipeline.

## Table of Contents

- [Project Goal](#project-goal)
- [What I Did](#what-i-did)
- [Architecture](#architecture)
- [Quickstart](#quickstart)
- [CI/CD](#cicd)
- [Lessons Learned](#lessons-learned)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

<GithubLinkAdmonition
  link="https://github.com/Gerth123/truck-signs-api/tree/feature/truck-signs-api-v2"
  title="GitHub Repository"
  type="tip"
>
  View the source code, the full README and the project history in this repository.
</GithubLinkAdmonition>

## Project Goal

The task was to take over an existing Django project with broken Docker files and make it run reliably in containers again. Instead of rewriting everything from scratch, I debugged the existing `Dockerfile`, `docker-compose.yml` and `entrypoint.sh`, updated the project to Python 3.12 and Django 5.2 and documented the whole setup.

## What I Did

- **Fixed the Dockerfile** so dependencies are installed once and all commands inside the container run from the `src/` folder without extra path prefixes.
- **Fixed the entrypoint script** so migrations, static files and the superuser are set up automatically on every container start.
- **Made superuser creation idempotent**, so repeated deployments do not fail because the user already exists.
- **Moved all configuration into environment variables**, loaded from a `.env` file that is never committed. An `example.env` documents every variable.
- **Updated Python and Django** to current versions, including Django REST Framework.
- **Added linting and tests to CI** with `flake8`, `black` and `isort`.

## Architecture

The stack consists of two containers orchestrated by Docker Compose:

| Service | Purpose |
|---|---|
| `backend` | Django REST API served by Gunicorn, static files via WhiteNoise |
| `db` | PostgreSQL with a named volume, so data survives container restarts |

Media files are stored in Cloudinary. A `MODE` variable switches between SQLite for local development and PostgreSQL for production.

## Quickstart

1. Clone the repository and switch into it:

```bash
   git clone https://github.com/Gerth123/truck-signs-api.git
   cd truck-signs-api
```

2. Create the environment file and fill in your own values:

```bash
   cp example.env .env
```

3. Build the image and start the stack:

```bash
   docker build -t truck-signs-api:latest .
   docker compose up
```

4. Open the admin panel at `http://localhost:8020/admin/`.

## CI/CD

Three GitHub Actions workflows run in the repository:

- **Lint and test** checks code style and runs the Django test suite on every push and pull request that touches Python files.
- **Build** pushes the Docker image to the GitHub Container Registry when a tag is pushed.
- **Open PR check** makes sure every feature branch has an open pull request.

## Lessons Learned

- **Debugging beats rewriting.** Understanding why the existing files failed taught me more than starting over, and kept the project history intact.
- **Line endings matter.** A shell script checked out with Windows line endings breaks the container start. A `.gitattributes` rule enforcing LF fixed this permanently.
- **Two names for the same value.** The Postgres image reads `POSTGRES_*` variables on first start while Django reads `DB_*`. Both sets must match, otherwise the connection fails.

## Further References

- [Django documentation](https://docs.djangoproject.com/en/5.2/)
- [Django REST Framework documentation](https://www.django-rest-framework.org/)
- [Docker Compose documentation](https://docs.docker.com/compose/)