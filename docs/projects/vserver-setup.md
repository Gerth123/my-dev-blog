# V-Server Setup

This project documents how I set up and secured a V-Server, installed and configured NGINX, and deployed this Docusaurus blog onto it as the live website.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
  - [Project Goal](#project-goal)
  - [SSH Key Authentication](#ssh-key-authentication)
  - [Disabling Password Login](#disabling-password-login)
  - [NGINX Installation and Configuration](#nginx-installation-and-configuration)
  - [Git Configuration on the Server](#git-configuration-on-the-server)
  - [Deployment](#deployment)
  - [Testing](#testing)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
  link="https://github.com/Gerth123/my-dev-blog/tree/main"
  title="GitHub Repository"
  type="tip"
>
  View the full technical documentation for this setup in the `V-Server Setup` folder of this repository.
</GithubLinkAdmonition>

## Quickstart

1. Generate an SSH key pair locally and add the public key to the server's `authorized_keys`:

   ```bash
   ssh-keygen -t ed25519
   ```

2. Confirm key-based login works, then disable password authentication on the server.

3. Install NGINX:

   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

4. Configure Git and add a dedicated SSH key on the server for GitHub access.

5. Clone the repository, build it, and deploy it through NGINX:

   ```bash
   git clone git@github.com:Gerth123/my-dev-blog.git
   cd my-dev-blog
   pnpm install
   pnpm build
   sudo cp -r build/* /var/www/my-dev-blog/
   ```

## Description

### Project Goal

The goal of this project was to set up a Ubuntu V-Server from scratch, secure it against password-based attacks, and use it to serve this Docusaurus blog as a live website via NGINX. This included configuring SSH key authentication, installing and configuring NGINX, connecting the server to GitHub, and deploying the built site.

### SSH Key Authentication

An SSH key pair was generated locally to authenticate with the server:

```bash
ssh-keygen -t ed25519
```

The public key was copied to the server so it could be added to the target user's authorized keys:

```bash
type C:\Users\robin\.ssh\da\blog_ed25519.pub | ssh root@<SERVER_IP> "cat >> .ssh/authorized_keys"
```

Before making any further changes, the connection was tested using the private key to confirm that key-based login worked:

```bash
ssh -i ~/.ssh/da/blog_ed25519 robin-gerth@<SERVER_IP>
```

To simplify future connections, a shell alias was created locally:

```bash
alias blog_connect="ssh -o StrictHostKeyChecking=no -i ~/.ssh/blog_ed25519 robin-gerth@<SERVER_IP>"
```

### Disabling Password Login

With key-based login confirmed, password authentication was disabled to harden the server against brute-force attacks. The SSH daemon configuration was edited:

```bash
sudo nano /etc/ssh/sshd_config
```

```
PasswordAuthentication no
```

The SSH service was restarted to apply the change:

```bash
sudo systemctl restart ssh.service
```

To verify the change took effect, a connection attempt was made while explicitly disabling public key authentication:

```bash
ssh -o PubkeyAuthentication=no robin-gerth@<SERVER_IP>
```

This correctly resulted in `Permission denied (publickey)`, confirming that only SSH keys can be used to log in from this point on.

### NGINX Installation and Configuration

NGINX was installed as the web server:

```bash
sudo apt update
sudo apt install nginx -y
```

As a first test, an alternative site was configured on a separate port (`8081`) to validate that custom server blocks work as expected:

```nginx
server {
        listen 8081;
        listen [::]:8081;

        root /var/www/alternatives;
        index alternate-index.html;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Once this test succeeded, the default server block (port 80) was updated to serve the actual project deliverable instead — this Docusaurus blog:

```nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/my-dev-blog;
        index index.html;

        server_name _;

        location / {
                try_files $uri $uri/ /index.html;
        }
}
```

Every configuration change was validated before reloading NGINX:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The `try_files` directive falls back to `/index.html` rather than a `404` so that Docusaurus's client-side routing works correctly for direct links to sub-pages.

### Git Configuration on the Server

To allow the server to interact with GitHub directly, Git was configured with the same identity used locally and on GitHub:

```bash
git config --global user.name "Gerth123"
git config --global user.email "<github-email>"
```

A dedicated SSH key pair — separate from the key used to log into the server — was generated specifically for GitHub access:

```bash
ssh-keygen -t ed25519 -C "<github-email>" -f ~/.ssh/github_ed25519
```

The resulting public key was added under GitHub's **Settings > SSH and GPG keys**. An SSH config entry was added on the server so Git automatically uses this key when talking to GitHub:

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_ed25519
```

The connection was verified with:

```bash
ssh -T git@github.com
```

### Deployment

With SSH and Git set up, the repository was cloned directly onto the server:

```bash
git clone git@github.com:Gerth123/my-dev-blog.git
cd my-dev-blog
```

Dependencies were installed and the site was built using `pnpm`:

```bash
pnpm install
pnpm build
```

The resulting static output in `build/` was copied to a dedicated web root, kept separate from the Git repository itself:

```bash
sudo mkdir -p /var/www/my-dev-blog
sudo cp -r ~/my-dev-blog/build/* /var/www/my-dev-blog/
```

With NGINX pointing at `/var/www/my-dev-blog`, the blog became live on the server's IP address. Future updates only require pulling the latest changes, rebuilding, and re-copying the build output to the web root.

### Testing

Before considering the setup complete, the following was verified:

- Login with the SSH key succeeds, and login with a username/password combination fails.
- The NGINX configuration passes validation before every reload:

  ```bash
  sudo nginx -t
  ```

- The server's IP address, opened in a browser, correctly serves the built Docusaurus blog instead of the default NGINX welcome page.
- The production build completes successfully before deployment:

  ```bash
  pnpm build
  ```

## Further References

- [GitHub repository](https://github.com/Gerth123/my-dev-blog)
- [NGINX Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html)
- [Docusaurus Deployment Docs](https://docusaurus.io/docs/deployment)
- [pnpm Documentation](https://pnpm.io/)
- [OpenSSH sshd_config Manual](https://man.openbsd.org/sshd_config)