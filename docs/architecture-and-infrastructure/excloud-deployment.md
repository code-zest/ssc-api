# SSC API Deployment Architecture & Setup Guide

This document serves as a comprehensive reference for the deployment architecture of the `ssc-api` backend. It explains **what** is being deployed, **how** it is deployed, and provides the necessary context for future developers or AI agents to understand the infrastructure.

---

## 1. Context & Motivation (The "What" and "Why")

- **The Application:** The `ssc-api` is a Node.js/Express backend using Prisma. 
- **The Frontends:** The client and admin web apps are hosted externally on **Vercel**.
- **External Services:** The database is hosted on **NeonDB** (PostgreSQL) and caching is managed via an external **Redis** provider. 
- **The Deployment Target:** **Excloud** (a cloud provider offering performant AMD EPYC VMs).
- **The Chosen Approach:** A traditional bare-metal setup using **PM2** (Process Manager) and **Nginx** (Reverse Proxy) on a small Excloud VM (`t1a.micro`, 1 GiB RAM).
  - *Why this approach?* Since the database and cache are managed externally, the backend footprint is very small. Running Node directly via PM2 without Docker minimizes memory overhead, allowing it to run smoothly on a highly cost-effective server (~₹170/month).
- **Automation:** **GitHub Actions** handles continuous integration and deployment (CI/CD), so pushing to the main branch automatically updates the live server.

---

## 2. Architecture Overview

```mermaid
flowchart TD
    Developer[Developer Push] -->|Triggers| GH[GitHub Actions]
    GH -->|SSH & Deploy Script| Excloud[Excloud t1a.micro VM]
    
    subgraph Excloud [Excloud VM Infrastructure]
        Nginx[Nginx Reverse Proxy]
        PM2[PM2 Process Manager]
        Node[Node.js API Instances]
        
        Nginx -->|Proxy pass localhost:3000| PM2
        PM2 --> Node
    end

    User[Vercel Frontends / Users] -->|HTTPS Request| Nginx
    Node -->|SQL Queries| NeonDB[(NeonDB PostgreSQL)]
    Node -->|Key-Value lookups| Redis[(Managed Redis)]
```

---

## 3. The CI/CD Pipeline (The "How")

When code is pushed to the `main` branch, the following sequence occurs:

1. **GitHub Action Triggers:** The `.github/workflows/deploy.yml` workflow starts.
2. **SSH Connection:** The action uses an SSH key stored in GitHub Secrets to securely connect to the Excloud VM.
3. **Execution:** It runs a deployment script on the server which performs the following:
   - `git pull` to fetch the latest code.
   - `npm install` to update dependencies.
   - `npm run build` to compile the TypeScript code.
   - `npx prisma generate` and `npm run db:migrate:prod` to apply database changes to NeonDB.
   - `pm2 reload ecosystem.config.js` to gracefully restart the API without downtime.

---

## 4. Codebase Additions (What we are building)

To enable this architecture, the following files will be added to the `ssc-api` repository:

- **`.github/workflows/deploy.yml`**: The GitHub action that connects to the server.
- **`ecosystem.config.js`**: PM2 configuration defining environment variables, instances, and restart behavior.
- **`nginx.conf`**: A template configuration for Nginx to handle domain routing and SSL.
- **`scripts/deploy.sh`**: A shell script placed on the server (or run via CI) to execute the build steps.

---

## 5. Step-by-Step Server Configuration Guide

*(Use this section if you ever need to recreate the server from scratch)*

### Step 1: Provision the Server (Via Web Console)
Since the `exc` CLI currently has token expiration bugs, the easiest and most reliable way to spin up your VPS is through the Excloud Dashboard.

1. Log in to the [Excloud Console](https://console.excloud.in/).
2. Navigate to **Compute** -> **Instances** and click **Create Instance**.
3. **Select Image:** Choose **Ubuntu 22.04 LTS** (or 24.04).
4. **Select Plan:** Choose the `t1a.micro` (1 GiB RAM, 2 vCPU).
5. **Authentication:** Add your SSH Public Key (you can find it by running `cat ~/.ssh/id_rsa.pub` in your terminal). Do not use a password.
6. **Network:** Ensure a Public IPv4 address is allocated.
7. Click **Create**. Once it's running, note the Public IP address and point your API domain (e.g., `api.yourdomain.com`) to it using an A Record in your DNS provider.

### Step 2: Install Dependencies
SSH into the server as your deploy user (e.g., `ubuntu` or `root`) and run:
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx and Certbot
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 3: Setup the Application Directory
```bash
# Create directory and clone the repository
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone <your-repo-url> ssc-api
cd ssc-api

# Create the .env file
nano .env
# Paste your NeonDB, Redis, JWT secrets, etc.
```

### Step 4: Configure Nginx & SSL
Copy the `nginx.conf` from the repository to the Nginx directory:
```bash
sudo cp /var/www/ssc-api/nginx.conf /etc/nginx/sites-available/ssc-api
sudo ln -s /etc/nginx/sites-available/ssc-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Generate SSL Certificate
sudo certbot --nginx -d api.yourdomain.com
```

### Step 5: Setup CI/CD Access (GitHub Actions SSH Key)

For GitHub Actions to automatically deploy code to your server, it needs a secure way to log in. We will create a dedicated SSH key pair on the server and give the public key permission to log in.

**Run these commands on your Excloud server:**

1. **Generate a new SSH key pair without a passphrase:**
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions -N ""
   ```
   *Explanation: This creates two files: `~/.ssh/github_actions` (the private key) and `~/.ssh/github_actions.pub` (the public key).*

2. **Authorize the new key to access this server:**
   ```bash
   cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
   ```
   *Explanation: This tells the server to allow anyone holding the private key we just generated to log in as the current user.*

3. **Ensure correct permissions (Crucial for SSH to work):**
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

4. **Display the Private Key (Copy this exactly as shown):**
   ```bash
   cat ~/.ssh/github_actions
   ```
   *Explanation: This prints the private key starting with `-----BEGIN OPENSSH PRIVATE KEY-----` and ending with `-----END OPENSSH PRIVATE KEY-----`. You will need to copy this entire block for the next step.*

### Step 6: Configure GitHub Secrets

Go to your repository on GitHub. Navigate to **Settings -> Secrets and variables -> Actions**, and add the following repository secrets:

- `SERVER_HOST`: The Public IP address of your Excloud instance.
- `SERVER_USERNAME`: The username you used to log into the server (e.g., `root` or `ubuntu`).
- `SERVER_SSH_KEY`: Paste the entire block of the private key you copied in Step 5 (Point 4).

---

## User Review Required

> [!IMPORTANT]  
> I have expanded the SSH key setup with clear, step-by-step instructions. Please review. If everything looks good, approve the plan and I will begin generating the necessary code!
