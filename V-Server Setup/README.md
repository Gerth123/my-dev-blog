# V-Server Setup

This document describes how the V-Server for this project was set up, including SSH key authentication, NGINX installation and configuration, Git configuration, and deployment of the Docusaurus blog.

## Table of Contents

- [1. Server Access via SSH](#1-server-access-via-ssh)
- [2. Disabling Password Login](#2-disabling-password-login)
- [3. Installing and Configuring NGINX](#3-installing-and-configuring-nginx)
- [4. Git Configuration on the Server](#4-git-configuration-on-the-server)
- [5. Deploying the Docusaurus Blog](#5-deploying-the-docusaurus-blog)
- [6. Server Details](#6-server-details)

## 1. Server Access via SSH

An SSH key pair was generated locally to authenticate with the server:

```bash
ssh-keygen -t ed25519
```

The public key was then copied to the server's `authorized_keys` file:

```bash
type C:\Users\robin\.ssh\da\blog_ed25519.pub | ssh root@<SERVER_IP> "cat >> .ssh/authorized_keys"
```

The connection was tested using the private key before proceeding further:

```bash
ssh -i ~/.ssh/da/blog_ed25519 robin-gerth@<SERVER_IP>
```

For convenience, an alias/function was set up locally to simplify connecting to the server. In WSL/bash:

```bash
alias blog_connect="ssh -o StrictHostKeyChecking=no -i ~/.ssh/blog_ed25519 robin-gerth@<SERVER_IP>"
```

This was made permanent by adding it to `~/.bashrc`.

## 2. Disabling Password Login

Before disabling password authentication, a successful login using the SSH key was confirmed.

The SSH daemon configuration was edited:

```bash
sudo nano /etc/ssh/sshd_config
```

The following line was changed:

```
#PasswordAuthentication yes
```

to:

```
PasswordAuthentication no
```

The SSH service was then restarted to apply the change:

```bash
sudo systemctl restart ssh.service
```

**Verification:** After logging out, an attempt to connect while forcing public key authentication off was made to confirm that password-based login is fully disabled:

```bash
ssh -o PubkeyAuthentication=no robin-gerth@<SERVER_IP>
```

Result: `Permission denied (publickey)` — confirming that only key-based authentication is possible.

## 3. Installing and Configuring NGINX

The package list was updated and NGINX was installed:

```bash
sudo apt update
sudo apt install nginx -y
```

Service status was verified:

```bash
systemctl status nginx.service
```

The default NGINX welcome page was confirmed by visiting the server's IP address in a browser.

### Initial test configuration (alternative page)

As an initial test, an alternative site was set up on a separate port (`8081`) to confirm that custom NGINX configurations work as expected:

```bash
sudo mkdir /var/www/alternatives
sudo touch /var/www/alternatives/alternate-index.html
```

A new server block was created:

```bash
sudo nano /etc/nginx/sites-enabled/alternatives
```

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

A simple HTML page was added to `alternate-index.html`, and NGINX was reloaded:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

Visiting `<SERVER_IP>:8081` confirmed the custom page was served correctly.

**Note:** This test configuration was later commented out (rather than deleted) in `/etc/nginx/sites-enabled/alternatives` once the final blog deployment (below) was in place, so it is kept for reference but is no longer active.

### Final configuration (Docusaurus blog as the site's index)

For the actual project deliverable, the default NGINX server block (port 80) was updated to serve the built Docusaurus blog instead of the default NGINX page:

```bash
sudo nano /etc/nginx/sites-available/default
```

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

The configuration was validated before reloading:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 4. Git Configuration on the Server

Git was configured with the same identity used on GitHub:

```bash
git config --global user.name "Gerth123"
git config --global user.email "<github-email>"
```

A dedicated SSH key pair was generated on the server to interact with GitHub (separate from the key used to log into the server itself):

```bash
ssh-keygen -t ed25519 -C "<github-email>" -f ~/.ssh/github_ed25519
cat ~/.ssh/github_ed25519.pub
```

The resulting public key was added to GitHub under **Settings → SSH and GPG keys → New SSH key**.

An SSH config entry was added on the server so Git automatically uses the correct key when talking to GitHub:

```bash
nano ~/.ssh/config
```

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_ed25519
```

```bash
chmod 600 ~/.ssh/config
```

The connection was verified:

```bash
ssh -T git@github.com
```

## 5. Deploying the Docusaurus Blog

The repository was cloned onto the server:

```bash
git clone git@github.com:Gerth123/my-dev-blog.git
cd my-dev-blog
```

Dependencies were installed and the site was built using `pnpm`:

```bash
pnpm install
pnpm build
```

This produces a static site in the `build/` directory. The build output was copied to a dedicated web root, separate from the Git repository itself:

```bash
sudo mkdir -p /var/www/my-dev-blog
sudo cp -r ~/my-dev-blog/build/* /var/www/my-dev-blog/
```

NGINX was reloaded (see configuration above) so the built site is served as the root page on port 80.

**Note:** Redeploying after future changes requires repeating the last three steps: `git pull`, `pnpm build`, and copying the updated `build/` output to `/var/www/my-dev-blog`.

## 6. Server Details

- **Server IP:** `116.203.27.31`
- **Web server:** NGINX, serving the built Docusaurus site on port 80
- **Authentication:** SSH key only, password login disabled