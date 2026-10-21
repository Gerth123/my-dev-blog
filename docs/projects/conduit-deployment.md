# Conduit Deployment

Containerized full stack blogging platform with a Django backend, an Angular frontend and PostgreSQL, automatically built and deployed to a cloud server through GitHub Actions.

## Table of Contents

- [Project Goal](#project-goal)
- [Architecture](#architecture)
- [What I Did](#what-i-did)
- [Deployment Pipeline](#deployment-pipeline)
- [Quickstart](#quickstart)
- [Lessons Learned](#lessons-learned)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

<GithubLinkAdmonition
  link="https://github.com/Gerth123/conduit-container/tree/feature/conduit-deployment"
  title="GitHub Repository"
  type="tip"
>
  View the source code, the full README and the deployment workflow in this repository.
</GithubLinkAdmonition>

## Project Goal

Conduit is a Medium style blogging platform that was never built with containers in mind. The project had two parts: first containerize the legacy application, then deploy it automatically to a cloud server on every push to `main`.

## Architecture

Docker Compose runs three services:

| Service | Purpose |
|---|---|
| `backend` | Django REST API served by Gunicorn, static files via WhiteNoise |
| `frontend` | Production Angular build served by Nginx |
| `db` | PostgreSQL with a named volume, so data survives container restarts |

All services use `restart: unless-stopped`, so Docker brings them back automatically after a crash.

## What I Did

- **Multi stage builds** for backend and frontend. The final images only contain what is needed at runtime, which keeps them small.
- **Patched a legacy Django version.** The backend runs on Django 1.10.5, which breaks on modern Python. A patch script applies the required compatibility fixes automatically during the image build.
- **Injected the API URL at build time.** The Angular frontend receives the backend address as a Docker build argument, so it never lands in the repository.
- **Configured Nginx for client side routing**, falling back to `index.html` so Angular routes work on page reloads.
- **Kept all secrets out of the repository.** Locally they live in a `.env` file, in the pipeline they come from GitHub Secrets.

## Deployment Pipeline

The workflow runs on every push to `main` and consists of two jobs:

1. **Build and push:** Builds the backend and frontend images and pushes them to the GitHub Container Registry.
2. **Deploy:** Copies `docker-compose.yaml` to the server via SCP, connects via SSH and runs `docker compose pull` and `docker compose up -d`.

Server address, SSH user, private key and API URL are stored as GitHub Secrets.

## Quickstart

1. Clone the repository and switch into it:

```bash
   git clone https://github.com/Gerth123/conduit-container.git
   cd conduit-container
```

2. Create the environment file and fill in your own values:

```bash
   cp .env.example .env
```

3. Build and start all services:

```bash
   docker compose up --build -d
```

4. Open the application at `http://localhost:8282`.

## Lessons Learned

- **Legacy code needs patience.** Finding out which Django internals break on newer Python versions took the most time, but automating the fixes made the build reproducible.
- **Database passwords are set only once.** Postgres reads `POSTGRES_PASSWORD` only when the volume is created. Changing it later has no effect unless the volume is reset.
- **Testing restarts correctly.** `docker kill` from outside counts as a manual stop, so `unless-stopped` does not restart the container. Killing the main process inside the container with `docker exec <container> kill -9 1` simulates a real crash.

## Further References

- [Docker multi stage builds](https://docs.docker.com/build/building/multi-stage/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Compose documentation](https://docs.docker.com/compose/)