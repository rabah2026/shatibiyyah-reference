# Setup Guide - Shatibiyyah API

Complete setup and deployment instructions for the Shatibiyyah API project.

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 22 or higher
- **pnpm**: Package manager (recommended) or npm
- **MySQL/TiDB**: Database server
- **Git**: Version control system
- **Text Editor**: VS Code or similar

### Install Node.js

Visit [nodejs.org](https://nodejs.org/) and download the LTS version.

### Install pnpm

```bash
npm install -g pnpm
```

### Install MySQL

**macOS (Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

**Windows:**
Download from [mysql.com](https://www.mysql.com/downloads/)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shatibiyyah-api.git
cd shatibiyyah-api
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the example file and edit it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:

```env
DATABASE_URL=mysql://root:password@localhost:3306/shatibiyyah
JWT_SECRET=your-secure-secret-key-here
```

### 4. Setup Database

Create the database and tables:

```bash
pnpm db:push
```

### 5. Seed Initial Data

Load the 1,173 verses into the database:

```bash
npx tsx seed-db.ts
```

### 6. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Development Commands

```bash
# Start development server with hot reload
pnpm dev

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build for production
pnpm build

# Start production server
pnpm start

# Format code
pnpm format

# Type checking
pnpm check

# Database migrations
pnpm db:push
pnpm db:generate
```

## Database Setup Details

### Create Database Manually

If `pnpm db:push` doesn't work, create manually:

```sql
CREATE DATABASE shatibiyyah CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shatibiyyah;
```

### Verify Database Connection

```bash
mysql -u root -p -h localhost -e "USE shatibiyyah; SHOW TABLES;"
```

## Troubleshooting

### Database Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:3306`

**Solution:**
1. Ensure MySQL is running
2. Check DATABASE_URL in .env.local
3. Verify credentials

```bash
# macOS
brew services start mysql

# Ubuntu
sudo systemctl start mysql

# Windows
net start MySQL80
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

### Module Not Found

**Error:** `Cannot find module '@/lib/trpc'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Arabic Text Encoding Issues

**Solution:**
1. Ensure database uses UTF-8 encoding
2. Check .env file is saved as UTF-8
3. Verify MySQL charset:

```sql
ALTER DATABASE shatibiyyah CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Production Deployment

### Build for Production

```bash
pnpm build
```

This creates:
- `dist/` - Server bundle
- `client/dist/` - Frontend bundle

### Environment Variables

Create `.env.production` with production values:

```env
DATABASE_URL=mysql://user:password@prod-host:3306/shatibiyyah
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

### Run Production Server

```bash
pnpm start
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

Build and run:

```bash
docker build -t shatibiyyah-api .
docker run -p 3000:3000 -e DATABASE_URL=mysql://... shatibiyyah-api
```

## Deployment Platforms

### Manus Platform

The project is optimized for Manus deployment:

1. Push to GitHub
2. Connect repository to Manus
3. Configure environment variables
4. Deploy with one click

### Vercel/Netlify

For frontend-only deployment:

```bash
pnpm build
# Deploy client/dist/ folder
```

### Railway/Render

1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### AWS/Google Cloud

1. Build Docker image
2. Push to container registry
3. Deploy to cloud service

## Database Backup

### Backup Database

```bash
mysqldump -u root -p shatibiyyah > backup.sql
```

### Restore Database

```bash
mysql -u root -p shatibiyyah < backup.sql
```

## Performance Optimization

### Enable Query Caching

```sql
SET GLOBAL query_cache_type = ON;
SET GLOBAL query_cache_size = 268435456;
```

### Add Database Indexes

Already included in schema, but verify:

```sql
SHOW INDEXES FROM verses;
SHOW INDEXES FROM chapters;
```

### Monitor Performance

```bash
# Check slow queries
mysql -u root -p -e "SHOW PROCESSLIST;"
```

## Security Checklist

- [ ] Change default database password
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Set up firewall rules
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Monitor error logs
- [ ] Use environment variables for secrets

## Maintenance

### Update Dependencies

```bash
pnpm update
pnpm audit
```

### Database Maintenance

```sql
-- Optimize tables
OPTIMIZE TABLE verses;
OPTIMIZE TABLE chapters;

-- Check table integrity
CHECK TABLE verses;
CHECK TABLE chapters;
```

### Monitor Logs

```bash
# Development logs
tail -f .manus-logs/devserver.log

# Browser console logs
tail -f .manus-logs/browserConsole.log

# Network requests
tail -f .manus-logs/networkRequests.log
```

## Getting Help

- Check [README.md](./README.md)
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- See [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open an issue on GitHub

## Next Steps

1. Complete the setup
2. Run tests to verify: `pnpm test`
3. Start development: `pnpm dev`
4. Check API endpoints: `http://localhost:3000/api/trpc/shatibiyyah.verses.list`
5. Explore the UI: `http://localhost:3000`

---

For more information, visit the project repository.
