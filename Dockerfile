FROM node:20.16-alpine AS builder

WORKDIR /app

ARG DEPLOYMENT_URL="https://gerth123.github.io"
ARG DEPLOYMENT_BRANCH="main"
ARG GITHUB_ORG="Gerth123"
ARG GITHUB_PROJECT="my-dev-blog"

COPY . .

RUN npm ci && npm run build

FROM nginx:latest AS runner

COPY --from=builder /app/build /usr/share/nginx/html