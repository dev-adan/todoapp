import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      
      // Allow access to login page without authentication
      if (pathname === '/') return true;
      
      // Require authentication for other pages
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/', '/dashboard/:path*', '/edit/:path*']
};
