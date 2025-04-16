import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/auth/auth-form';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <AuthForm />
      </div>
    </div>
  );
}
