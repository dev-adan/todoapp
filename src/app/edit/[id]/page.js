import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import EditTodoForm from './edit-todo-form';
import SignOutButton from '@/components/auth/sign-out-button';

export default async function EditTodoPage({ params }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const todo = await prisma.todo.findUnique({
    where: { id: params.id },
  });

  if (!todo || todo.userId !== session.user.id) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Todo</h1>
              <p className="text-sm text-gray-600">
                Update your todo item below
              </p>
            </div>
            <SignOutButton />
          </div>

          <EditTodoForm todo={todo} />
        </div>
      </div>
    </div>
  );
}
