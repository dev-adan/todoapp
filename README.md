# Full-Stack Todo App

A modern, full-stack todo application built with Next.js, Prisma, PostgreSQL, and NextAuth.js.

## Features

- 🔐 User authentication (Email/Password and Google OAuth)
- 📝 Create, read, update, and delete todos
- 🔄 Real-time UI updates
- 🎨 Responsive design with Tailwind CSS
- 🛡️ Protected API routes and pages
- 🔑 Session management
- 📱 Mobile-friendly interface

## Tech Stack

- Next.js 14 (App Router)
- PostgreSQL (via Prisma ORM)
- NextAuth.js for authentication
- Tailwind CSS for styling
- React Icons

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd todo-app-nextjs
npm install
```

2. Set up your environment variables:

Copy `.env.example` to `.env` and update the variables:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Any random string (you can generate one with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your app's URL (http://localhost:3000 for development)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Get these from the Google Cloud Console

3. Set up the database:

```bash
# Create and migrate the database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

4. Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## Project Structure

```
/src
  /app                    # Next.js app router pages
    /api                  # API routes
    /dashboard            # Dashboard page
    /edit                # Edit todo page
  /components            # React components
    /auth               # Authentication components
    /todos             # Todo-related components
  /lib                  # Utility functions and libraries
```

## Authentication

The app supports two authentication methods:
1. Email/Password
2. Google OAuth

To enable Google authentication:
1. Create a project in the Google Cloud Console
2. Enable the Google+ API
3. Create OAuth credentials
4. Add the credentials to your `.env` file

## Database Schema

The application uses PostgreSQL with Prisma as the ORM. The main models are:
- User: Stores user information
- Todo: Stores todo items with user relationships
- Account: For OAuth accounts
- Session: For managing user sessions

## Development

To work on the project:

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "Description of your changes"
```

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

## Production Deployment

1. Set up a PostgreSQL database
2. Update environment variables for production
3. Deploy to your preferred platform (e.g., Vercel)

## License

MIT
