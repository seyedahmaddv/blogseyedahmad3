# Deployment Guide for Vercel

## Database Setup

1. **Create a PostgreSQL database** on Vercel:
   - Go to your Vercel dashboard
   - Navigate to Storage tab
   - Create a new PostgreSQL database
   - Note down the connection string

2. **Set Environment Variables** in Vercel:
   - Go to your project settings in Vercel
   - Navigate to Environment Variables
   - Add the following variables:
     - `DATABASE_URL`: Your PostgreSQL connection string from step 1
     - `NEXTAUTH_SECRET`: A random string for NextAuth (generate one)
     - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)

3. **Deploy the application**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Deploy

4. **Run database migrations**:
   - After deployment, you need to run the database migrations
   - You can do this by adding a build command or running it manually

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   DATABASE_URL="your-local-database-url"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database** (optional):
   ```bash
   npm run db:seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Ensure `DATABASE_URL` is properly set in Vercel environment variables
   - Check that the database is accessible from Vercel's servers
   - Verify the connection string format

2. **Build Errors**:
   - Make sure all dependencies are installed
   - Check that Prisma client is generated (`npx prisma generate`)
   - Verify TypeScript compilation

3. **Runtime Errors**:
   - Check Vercel function logs for detailed error messages
   - Ensure all environment variables are set correctly
   - Verify database schema matches the code

### Database Schema

The application uses the following main models:
- `User`: User accounts and authentication
- `Post`: Blog posts with content, metadata, and author relationship
- `Comment`: Comments on posts
- `Like`: Post likes/reactions

Make sure your database supports these relationships and constraints. 