# Deployment Guide

Complete guide for deploying Personal Hub with multiple deployment options including Coolify (recommended), Docker, and manual deployment.

## Table of Contents

- [Coolify Deployment (Recommended)](#coolify-deployment-recommended)
  - [Security Architecture](#security-architecture)
  - [Prerequisites](#prerequisites-coolify)
  - [Quick Start](#quick-start-coolify)
  - [Detailed Setup](#detailed-setup-coolify)
  - [Security Configuration](#security-configuration)
  - [Post-Deployment](#post-deployment-coolify)
  - [Troubleshooting Coolify](#troubleshooting-coolify)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Environment Configuration](#environment-configuration)
- [Production Checklist](#production-checklist)

## Coolify Deployment (Recommended)

### Overview

Coolify is a self-hosted platform that makes deployment simple with automatic HTTPS, Docker integration, and Git-based deployments. **This is the recommended deployment method** for Personal Hub.

**Why Coolify?**
- ✅ One-click Docker Compose deployment
- ✅ Automatic HTTPS/SSL with Let's Encrypt
- ✅ Built-in monitoring and logging
- ✅ Git-based auto-deployments
- ✅ Zero-downtime rolling updates
- ✅ Easy environment management

### Architecture

Personal Hub consists of two services:
- **App (Public)**: Next.js website - `casperdamen.eu` - accessible to everyone
- **Studio (Private)**: Sanity CMS - `studio.casperdamen.eu` - secured for content management

### Security Architecture

#### Multi-Layer Security for Studio

**Layer 1: Sanity Built-in Authentication** (Primary)
- Studio requires login through Sanity.io OAuth
- Users must be added to your Sanity project
- Secure, industry-standard authentication
- Control access via Sanity project settings

**Layer 2: HTTP Basic Auth** (Recommended Extra Layer)
- Adds username/password via Coolify before Sanity login
- Protects against bots and automated attacks
- Simple to configure in Coolify UI
- Provides defense in depth

**Layer 3: Network Isolation** (Optional - Most Secure)
- Don't expose studio to public internet
- Access via SSH tunnel or VPN
- Best for highly sensitive content

#### Public App Security

- No authentication required (public-facing)
- HTTPS encryption via Let's Encrypt
- Rate limiting via Traefik/Coolify
- Standard web security headers

**Recommended Setup:**
```
App:    https://casperdamen.eu         (Public, HTTPS only)
Studio: https://studio.casperdamen.eu  (Basic Auth + Sanity Login)
```

### Prerequisites (Coolify)

- ✅ Coolify instance running (self-hosted or managed)
- ✅ GitHub/GitLab repository
- ✅ Domain name with DNS access (`casperdamen.eu`)
- ✅ Sanity project credentials

### Quick Start (Coolify)

1. **Prepare Your Repository:**
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Coolify deployment"
git push origin main
```

2. **Create New Resource in Coolify:**
- Log into your Coolify dashboard
- Click "Add Resource" → "Application"
- Select "Docker Compose" as the build pack
- Connect your Git repository

3. **Configure Build Settings:**
- **Build Pack**: Docker Compose
- **Docker Compose File**: `docker-compose.coolify.yml`
- **Base Directory**: `/` (root)
- **Dockerfile**: Use existing `Dockerfile` and `studio/Dockerfile`

4. **Set Environment Variables:**

In Coolify, add the following environment variables:

**Required Variables:**
```env
# Public (safe to expose in browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Private (server-side only)
SANITY_API_TOKEN=sk...your_token
SANITY_REVALIDATE_SECRET=random_secret_here

# Studio configuration
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

**Getting Credentials:**

*Sanity Project ID & Dataset:*
1. Go to https://sanity.io/manage
2. Select your project
3. Copy Project ID from project settings

*API Token:*
1. Project Settings → API → Tokens
2. Create new token with "Viewer" permissions
3. Copy token (starts with `sk`)

*Revalidate Secret:*
```bash
openssl rand -base64 32
```

5. **Configure Domains:**

In Coolify resource settings:

**App Service (Public):**
- **Domain**: `yourdomain.com`
- **Port**: `3000`
- **HTTPS**: Enable (automatic Let's Encrypt)
- **Authentication**: None

**Studio Service (Private):**
- **Domain**: `studio.yourdomain.com`
- **Port**: `3333`
- **HTTPS**: Enable (automatic Let's Encrypt)
- **Authentication**: Enable Basic Auth (recommended)

**DNS Configuration:**

Point your domains to Coolify server:
```dns
# A Records
yourdomain.com          → <coolify-server-ip>
studio.yourdomain.com   → <coolify-server-ip>

# Or CNAME if using CDN
yourdomain.com          → CNAME → coolify.example.com
studio.yourdomain.com   → CNAME → coolify.example.com
```

Verify DNS propagation:
```bash
dig yourdomain.com
dig studio.yourdomain.com
```

6. **Deploy:**
- Click "Deploy" in Coolify dashboard
- Monitor build logs
- Coolify will automatically:
  - Build Docker images
  - Create containers
  - Configure networking
  - Set up SSL/HTTPS
  - Health check services

### Detailed Setup (Coolify)

#### Step 1: Prepare Repository

Ensure your repository has the required files:
```bash
# Verify required files exist
ls docker-compose.coolify.yml Dockerfile studio/Dockerfile

# Commit and push all changes
git add .
git commit -m "Prepare for Coolify deployment"
git push origin main
```

#### Step 2: Create Resource in Coolify

1. Log into Coolify dashboard
2. Navigate to your project
3. Click "Add Resource" → "Application"
4. Select "Docker Compose" as the build pack
5. Connect your Git repository (GitHub/GitLab)
6. Select branch: `main`
7. Set Docker Compose file path: `docker-compose.coolify.yml`

#### Step 3: Configure Build Settings

In Coolify resource settings:
- **Build Pack**: Docker Compose
- **Docker Compose File**: `docker-compose.coolify.yml`
- **Base Directory**: `/` (root of repository)
- **Automatic Deployment**: Enable for git push deployments

#### Step 4: Set Environment Variables

Navigate to resource → Environment Variables and add:

```env
# Public variables (bundled into JavaScript)
NEXT_PUBLIC_SANITY_PROJECT_ID=ktdunyve
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Private variables (server-side only)
SANITY_API_TOKEN=sk...your_token_here
SANITY_REVALIDATE_SECRET=generate_with_openssl_rand

# Studio variables (bundled into studio JavaScript)
SANITY_STUDIO_PROJECT_ID=ktdunyve
SANITY_STUDIO_DATASET=production
```

**Variable Management Best Practices:**
- Never commit secrets to Git
- Use Coolify's encrypted variable storage
- Rotate tokens regularly
- Use different tokens for staging/production

### Security Configuration

#### Option 1: Basic Auth + Sanity Auth (Recommended)

**Setup in Coolify:**
1. Go to Studio service → Security settings
2. Enable "Basic Authentication"
3. Set username (e.g., `admin`)
4. Generate strong password: `openssl rand -base64 32`
5. Save settings

**Authentication Flow:**
```
User → HTTP Basic Auth → Sanity OAuth Login → Studio Access
```

**Benefits:**
- Two layers of security
- Protects against automated attacks
- Simple to configure
- Defense in depth

#### Option 2: Sanity Auth Only

**Setup:**
- Keep Basic Auth disabled in Coolify
- Rely solely on Sanity's built-in OAuth

**Best Practices:**
- Use strong Sanity passwords
- Enable 2FA on all Sanity accounts
- Limit Sanity project members to necessary users only
- Monitor access logs regularly

**Authentication Flow:**
```
User → Sanity OAuth Login → Studio Access
```

#### Option 3: Network Isolation (Most Secure)

**Setup:**
1. In Coolify, remove public domain from studio service
2. Studio only accessible via internal network
3. Access via SSH tunnel or VPN

**SSH Tunnel Access:**
```bash
# Create SSH tunnel to Coolify server
ssh -L 3333:localhost:3333 user@coolify-server

# Access studio locally
# Open: http://localhost:3333
```

**VPN Access:**
- Set up WireGuard or Tailscale
- Connect to VPN
- Access studio through private network

**Best For:**
- Highly sensitive content
- Single-user scenarios
- Maximum security requirements

### Coolify Features

**Automatic Deployments:**
```bash
# Push to main branch triggers auto-deployment
git push origin main
```

**Health Checks:**
- Coolify monitors container health
- Automatic restarts on failure
- Configured via docker-compose healthcheck directives

**Zero-Downtime Deployments:**
- Rolling updates with container replacement
- Old containers kept running until new ones are healthy
- Automatic rollback on deployment failure

**Environment Management:**
- Separate environments (staging, production)
- Easy variable updates via UI without code changes
- Secure encrypted secret storage

**Monitoring:**
- Real-time logs via Coolify dashboard
- Resource usage metrics (CPU, RAM, network)
- Container status and health monitoring
- Deployment history and rollback capabilities

### Post-Deployment (Coolify)

#### 1. Verify Deployment

**Check Services Status:**
```bash
# Test app is responding
curl https://casperdamen.eu
# Should return HTML homepage

# Test studio is responding
curl -I https://studio.casperdamen.eu
# Should return 200 (or 401 if basic auth enabled)
```

**In Coolify Dashboard:**
- Navigate to your resource
- Verify both containers show "Healthy" status
- Check deployment logs for successful completion
- Confirm no error messages in runtime logs

#### 2. Test Studio Access

1. Visit `https://studio.casperdamen.eu`
2. If Basic Auth enabled: Enter username/password
3. You should see Sanity login screen
4. Log in with your Sanity account credentials
5. Verify studio loads correctly and content is visible

#### 3. Add Sanity Users

**In Sanity Project Settings:**
1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to Members tab
4. Invite team members with appropriate roles:
   - **Administrator**: Full access to project and content
   - **Editor**: Can edit content
   - **Viewer**: Read-only access

#### 4. Configure CORS

**In Sanity Project Settings → API:**
1. Add allowed origins:
   - `https://casperdamen.eu` (public app)
   - `https://studio.casperdamen.eu` (studio)
2. Enable credentials: Yes
3. Save settings

This allows the app to fetch content from Sanity API.

#### 5. Monitor Deployment

**View Logs in Coolify:**
- Real-time log streaming for both services
- Filter by service (app or studio)
- Search logs for errors or warnings
- Download logs for offline analysis

**Check Health Endpoints:**
```bash
# App health (via wget in container)
# Monitored automatically by Coolify

# Studio health
curl https://studio.casperdamen.eu
# Should return studio HTML
```

**Resource Usage:**
- Monitor CPU and memory usage in Coolify dashboard
- Set up alerts for high resource usage
- Review metrics to optimize container resources

### Updating the Application

**Method 1: Git Push (Recommended)**
```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Coolify automatically deploys changes
```

**Method 2: Manual Deploy**
- Go to Coolify dashboard
- Click "Redeploy" button
- Pulls latest code and rebuilds

### Rollback Procedure

1. **Via Coolify Dashboard:**
   - Go to Deployments history
   - Select previous successful deployment
   - Click "Redeploy this version"

2. **Via Git:**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

### Troubleshooting Coolify

#### Build Failures

**Symptoms:** Deployment fails during build phase

**Check Build Logs:**
1. Coolify dashboard → Resource → Logs → Build
2. Look for error messages in output
3. Common issues:
   - Missing environment variables
   - Docker build context errors
   - Dependency installation failures
   - Network connectivity issues

**Solutions:**
```bash
# Verify environment variables are set
# In Coolify: Resource → Environment → Check all required vars

# Force clean rebuild
# In Coolify: Enable "Force Rebuild" option and redeploy

# Check Docker Compose file is valid
docker-compose -f docker-compose.coolify.yml config

# Verify build args are passed correctly
# Check docker-compose.coolify.yml build.args section
```

#### Container Crashes

**Symptoms:** Containers start but immediately crash or restart loop

**Check Runtime Logs:**
1. Coolify dashboard → Resource → Logs → Runtime
2. Select crashed service (app or studio)
3. Look for:
   - Port conflicts
   - Missing environment variables
   - Application startup errors
   - Permission issues

**Common Fixes:**

**Missing Environment Variables:**
```bash
# Verify all required vars are set
# App needs: NEXT_PUBLIC_SANITY_*, SANITY_API_TOKEN, SANITY_REVALIDATE_SECRET
# Studio needs: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET
```

**Health Check Failures:**
- Verify health check endpoints work
- Check port mappings (3000 for app, 3333 for studio)
- Increase health check start_period if containers need more startup time

**Application Errors:**
- Check Sanity API connectivity
- Verify project ID and dataset are correct
- Review application logs for specific error messages

#### SSL/HTTPS Issues

**Certificate Not Provisioning:**

**Verify DNS Configuration:**
```bash
# Check DNS points to Coolify server
dig casperdamen.eu
dig studio.casperdamen.eu

# Should return your Coolify server IP
```

**Check Coolify Settings:**
1. Verify domain configured in service labels
2. Ensure `coolify.https=true` is set
3. Check ports 80 and 443 are accessible on server

**Wait for Certificate Generation:**
- Let's Encrypt can take 5-10 minutes
- Check Coolify logs for certificate generation status
- Retry deployment if certificate generation failed

**Mixed Content Warnings:**
- Ensure all asset URLs use HTTPS
- Verify Sanity CDN uses HTTPS (it does by default)
- Check API calls use HTTPS endpoints

#### Studio Not Loading

**Black Page or Blank Screen:**

**Verify Build-Time Environment Variables:**
```bash
# Check build logs for:
# "Including the following environment variables as part of the JavaScript bundle:"
# - SANITY_STUDIO_DATASET
# - SANITY_STUDIO_PROJECT_ID

# If missing, rebuild with env vars set
```

**Check Browser Console:**
1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed requests

**Common Causes:**
- Studio built without environment variables
- Wrong project ID or dataset
- CORS not configured in Sanity project
- Network firewall blocking Sanity API

**Solution:**
1. Set environment variables in Coolify
2. Force rebuild to bake vars into bundle
3. Verify project ID matches Sanity project
4. Configure CORS in Sanity project settings

**Authentication Issues:**
- If Basic Auth enabled, verify credentials are correct
- Check Sanity user has access to project
- Try logging out of Sanity and back in
- Clear browser cookies and cache

#### Performance Issues

**Slow Response Times:**

**Check Server Resources:**
1. Coolify dashboard → Resource metrics
2. Monitor CPU and RAM usage
3. Look for resource exhaustion

**Solutions:**
- Increase container resource limits
- Scale horizontally if Coolify supports it
- Enable CDN caching for static assets
- Review Sanity API usage and optimize queries

**High Memory Usage:**
- Restart containers to clear memory leaks
- Check application logs for memory issues
- Review Next.js build configuration
- Consider increasing memory limits

**Build Takes Too Long:**
- Use Docker layer caching
- Optimize Dockerfile stages
- Review dependency installation
- Consider using Bun's faster installation

### Security Best Practices (Coolify)

#### For Studio

**Essential Security Measures:**
1. ✅ **Always use HTTPS** - Enabled automatically by Coolify via Let's Encrypt
2. ✅ **Enable Basic Auth** - Add extra layer before Sanity login (recommended)
3. ✅ **Restrict Sanity Access** - Only add users who need studio access
4. ✅ **Use Strong Passwords** - Both for Basic Auth and Sanity accounts
5. ✅ **Enable 2FA** - On all Sanity accounts with studio access
6. ✅ **Regular Security Audits** - Review access logs and user permissions

**Advanced Security (Optional):**
- **IP Whitelisting**: Use Coolify firewall rules to restrict access by IP
- **VPN/SSH Access**: For maximum security, don't expose studio to public internet
- **Separate Sanity Projects**: Use different projects for staging and production

#### For App

**Security Checklist:**
1. ✅ **Keep Dependencies Updated** - Regularly update packages
2. ✅ **Monitor Vulnerabilities** - Enable Dependabot or similar tools
3. ✅ **Environment Variables for Secrets** - Never commit secrets to Git
4. ✅ **Rate Limiting** - Configured automatically via Coolify/Traefik
5. ✅ **HTTPS Everywhere** - All content served over HTTPS
6. ✅ **Regular Backups** - Backup Sanity content regularly

#### General Security

**Operational Security:**
1. **Rotate Credentials Regularly**
   - Change Sanity API tokens every 90 days
   - Update Basic Auth passwords periodically
   - Generate new revalidate secrets on rotation

2. **Monitor Access Logs**
   - Review Coolify logs for suspicious activity
   - Check Sanity project access logs
   - Set up alerts for unusual patterns

3. **Keep Systems Updated**
   - Update Coolify regularly
   - Keep Docker and dependencies current
   - Apply security patches promptly

4. **Use Separate Environments**
   - Staging environment for testing
   - Production environment for live site
   - Different credentials for each environment

5. **Test Before Production**
   - Test all changes in staging first
   - Verify security measures work
   - Test rollback procedures

### Backup Strategy (Coolify)

#### Sanity Content Backups

**Automatic Backups:**
- Sanity handles backups automatically
- Point-in-time recovery available
- Content stored redundantly in Sanity cloud

**Manual Export (Recommended):**
```bash
# Export entire dataset
cd studio
bun run sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# Store backups securely off-site
# Consider automated weekly exports
```

**Backup Schedule:**
- **Weekly**: Full dataset export
- **Before major changes**: Ad-hoc export
- **Monthly**: Archive to long-term storage

#### Application State Backups

**What to Backup:**
1. **Code**: Backed up in Git repository
2. **Docker Images**: Stored in Coolify registry
3. **Environment Variables**: Export from Coolify settings
4. **Configuration**: docker-compose.coolify.yml in Git

**Environment Variables Backup:**
```bash
# Export from Coolify UI
# Resource → Environment → Export/Download
# Store securely (encrypted) off-site
```

#### Disaster Recovery Plan

**Recovery Steps:**

1. **Restore Code:**
```bash
git clone https://github.com/your-username/personal-hub.git
cd personal-hub
git checkout <last-known-good-commit>
```

2. **Restore Content:**
```bash
cd studio
bun run sanity dataset import backup.tar.gz production --replace
```

3. **Restore Deployment:**
   - Create new Coolify resource
   - Configure domains and environment variables
   - Deploy from Git repository

4. **Verify Recovery:**
   - Test app functionality
   - Verify content appears correctly
   - Check all integrations work

**Recovery Time Objective (RTO):** ~30 minutes
**Recovery Point Objective (RPO):** Last backup (weekly = max 7 days data loss)

## Docker Deployment

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Sanity project with credentials

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/personal-hub.git
cd personal-hub
```

2. **Configure environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
SANITY_REVALIDATE_SECRET=your_secret

# For Studio
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

3. **Build and run with Docker Compose:**
```bash
docker-compose up -d
```

4. **Verify deployment:**
- Application: http://localhost:3000
- Studio: http://localhost:3333

### Individual Container Deployment

**Build and run the application:**
```bash
# Build
docker build -t personal-hub-app .

# Run
docker run -d \
  --name personal-hub-app \
  -p 3000:3000 \
  --env-file .env.local \
  personal-hub-app
```

**Build and run Sanity Studio:**
```bash
# Build
cd studio
docker build -t personal-hub-studio .

# Run
docker run -d \
  --name personal-hub-studio \
  -p 3333:3333 \
  -e SANITY_STUDIO_PROJECT_ID=your_project_id \
  -e SANITY_STUDIO_DATASET=production \
  personal-hub-studio
```

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View app logs only
docker-compose logs -f app

# Rebuild containers
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

### Production Docker Deployment

**Using Docker Swarm:**
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml personal-hub

# Check services
docker service ls

# Scale app service
docker service scale personal-hub_app=3

# Remove stack
docker stack rm personal-hub
```

**Using Kubernetes:**

Create `kubernetes/deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: personal-hub-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: personal-hub-app
  template:
    metadata:
      labels:
        app: personal-hub-app
    spec:
      containers:
      - name: app
        image: your-registry/personal-hub-app:latest
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: personal-hub-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: personal-hub-app
spec:
  selector:
    app: personal-hub-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

Deploy to Kubernetes:
```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/studio-deployment.yaml
```

## Manual Deployment

### Prerequisites

- Node.js 18+ or Bun
- Reverse proxy (nginx/Apache)
- Process manager (PM2/systemd)

### Build Process

1. **Install dependencies:**
```bash
bun install
```

2. **Build application:**
```bash
bun run build
```

3. **Start production server:**
```bash
bun run start
```

### PM2 Deployment

**Install PM2:**
```bash
bun install -g pm2
```

**Create ecosystem file (`ecosystem.config.js`):**
```javascript
module.exports = {
  apps: [
    {
      name: 'personal-hub-app',
      script: 'bun',
      args: 'run start',
      cwd: '/var/www/personal-hub',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_file: '.env.local'
    }
  ]
}
```

**Deploy with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Nginx Configuration

**Create `/etc/nginx/sites-available/personal-hub`:**
```nginx
# Application
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Studio
server {
    listen 80;
    server_name studio.yourdomain.com;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:
```bash
sudo ln -s /etc/nginx/sites-available/personal-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d studio.yourdomain.com
```

## Environment Configuration

### Required Environment Variables

**Application (`.env.local`):**
```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
SANITY_REVALIDATE_SECRET=your_secret
```

**Studio (`studio/.env`):**
```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

### Generating Secrets

**Revalidate secret:**
```bash
openssl rand -base64 32
```

**API Token:**
1. Go to https://sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Add API token with "Viewer" permissions

## Production Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Sanity content populated
- [ ] Images uploaded and optimized
- [ ] Build runs successfully locally
- [ ] Tests pass (if implemented)
- [ ] Dependencies up to date
- [ ] Security audit completed

### Deployment

- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Environment variables set in production
- [ ] Build and deploy successful
- [ ] Health checks passing

### Post-Deployment

- [ ] Site accessible via domain
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] ISR working as expected
- [ ] Studio accessible
- [ ] Content updates reflect on site
- [ ] Performance metrics acceptable
- [ ] Analytics configured (if needed)

### Monitoring

**Check application health:**
```bash
# Application
curl https://yourdomain.com

# Studio
curl https://studio.yourdomain.com/health
```

**Monitor logs:**
```bash
# Docker
docker-compose logs -f app

# PM2
pm2 logs personal-hub-app

# Coolify
# Access logs via Coolify dashboard UI
```

## Rollback Procedures

### Coolify Rollback

1. Go to Coolify Dashboard
2. Navigate to Deployments
3. Select previous successful deployment
4. Click "Redeploy this version"

### Docker Rollback

```bash
# Stop current containers
docker-compose down

# Pull previous image
docker pull your-registry/personal-hub-app:previous-tag

# Start with previous version
docker-compose up -d
```

### Manual Rollback

```bash
# Git revert
git revert HEAD
git push origin main

# Rebuild
bun run build
pm2 restart personal-hub-app
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs app

# Verify environment
docker-compose config

# Rebuild
docker-compose up -d --build
```

### Application errors

```bash
# Check health
docker-compose ps

# Verify Sanity connection
curl "https://ktdunyve.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='homepage'][0]"
```

### Performance issues

- Enable CDN caching
- Verify ISR configuration
- Check Sanity API limits
- Monitor resource usage

## Support

For deployment issues:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review Docker logs
- Verify environment configuration
- Contact Sanity support for CMS issues
