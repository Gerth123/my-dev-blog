# VServer Setup

This guide describes how to set up and secure a fresh Ubuntu VServer: configuring SSH key authentication, disabling password login, installing and configuring NGINX to serve a static site, and connecting the server to GitHub.

## Table of Contents

- [Quickstart](#quickstart)
- [Project Goal](#project-goal)
- [SSH Key Authentication](#ssh-key-authentication)
- [Disabling Password Login](#disabling-password-login)
- [NGINX Installation and Configuration](#nginx-installation-and-configuration)
- [Git Configuration on the Server](#git-configuration-on-the-server)
- [Testing](#testing)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
  link="https://github.com/Gerth123/my-dev-blog/tree/main"
  title="GitHub Repository"
  type="tip"
>
  View the full project history and this documentation in this repository.
</GithubLinkAdmonition>

## Quickstart

1. Generate an SSH key pair locally.
2. Copy the public key to the server and confirm login works with the private key.
3. Disable password login on the server.
4. Install NGINX and configure it to serve a static site.
5. Configure Git on the server and connect it to GitHub via SSH.

## Project Goal

The goal of this project was to set up a Ubuntu VServer from scratch and secure it against attacks based on passwords, using SSH key authentication only. NGINX was installed and configured to serve a simple static page on the server, and Git was configured so the server can interact directly with GitHub repositories.

## SSH Key Authentication

1. Generate an SSH key pair locally:

   ```bash
   ssh-keygen -t ed25519
   ```

2. Copy the public key to the server so it can be added to the target user's authorized keys:

   ```bash
   type C:\Users\robin\.ssh\da\blog_ed25519.pub | ssh root@<SERVER_IP> "cat >> .ssh/authorized_keys"
   ```

3. Test login using the private key to confirm that authentication using the key works, before making any further changes:

   ```bash
   ssh -i ~/.ssh/da/blog_ed25519 robin-gerth@<SERVER_IP>
   ```

4. Optional: create a shell alias locally to simplify future connections:

   ```bash
   alias blog_connect="ssh -o StrictHostKeyChecking=no -i ~/.ssh/blog_ed25519 robin-gerth@<SERVER_IP>"
   ```

## Disabling Password Login

Only disable password login after confirming that SSH key login works.

1. Edit the SSH daemon configuration:

   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

2. Change the following line:

   ```
   #PasswordAuthentication yes
   ```

   to:

   ```
   PasswordAuthentication no
   ```

3. Restart the SSH service to apply the change:

   ```bash
   sudo systemctl restart ssh.service
   ```

4. Verify the change by attempting to connect with public key authentication explicitly disabled:

   ```bash
   ssh -o PubkeyAuthentication=no robin-gerth@<SERVER_IP>
   ```

   This should result in `Permission denied (publickey)`, confirming that only SSH keys can be used to log in.

## NGINX Installation and Configuration

1. Update the package list and install NGINX:

   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. Check that the service is running:

   ```bash
   systemctl status nginx.service
   ```

3. Visit the server's IP address in a browser to confirm the default NGINX welcome page is served on port 80.

4. Create a directory and a static HTML page for an alternative site:

   ```bash
   sudo mkdir /var/www/alternatives
   sudo nano /var/www/alternatives/alternate-index.html
   ```

5. Create a new server block to serve this page on a separate port (`8081`), so the default NGINX page on port 80 remains untouched:

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

6. Validate the configuration and reload NGINX:

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. Visit `<SERVER_IP>:8081` in a browser to confirm the alternative page is served correctly, while `<SERVER_IP>` on port 80 still shows the default NGINX page.

## Git Configuration on the Server

1. Configure Git with your name and email, matching your GitHub account:

   ```bash
   git config --global user.name "<your-name>"
   git config --global user.email "<github-email>"
   ```

2. Generate a dedicated SSH key pair on the server for GitHub access, separate from the key used to log into the server itself:

   ```bash
   ssh-keygen -t ed25519 -C "<github-email>" -f ~/.ssh/github_ed25519
   ```

3. Display and copy the public key:

   ```bash
   cat ~/.ssh/github_ed25519.pub
   ```

4. Add the public key to your GitHub account under **Settings > SSH and GPG keys > New SSH key**.

5. Add an SSH config entry on the server so Git automatically uses this key when talking to GitHub:

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

6. Verify the connection:

   ```bash
   ssh -T git@github.com
   ```

## Testing

Before submitting, the following was verified:

- Login with the SSH key succeeds.
- Login with a username/password combination fails (`Permission denied (publickey)`).
- The NGINX configuration passes validation before every reload (`nginx -t`).
- The server's IP address on port 80 shows the default NGINX welcome page.
- The server's IP address on port 8081 shows the custom static page.
- A connection to GitHub from the server via SSH succeeds (`ssh -T git@github.com`).

## Further References

- [NGINX Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html)
- [OpenSSH sshd_config Manual](https://man.openbsd.org/sshd_config)
- [GitHub SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Server Details

- **Server IP (submission URL):** `116.203.27.31:8081`
- **Authentication:** SSH key only, password login disabled