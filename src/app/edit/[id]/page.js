import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import EditTodoForm from './edit-todo-form';

export default async function EditTodoPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Todo</h1>
            <p className="text-sm text-gray-600">
              Update your todo item below
            </p>
          </div>

          <EditTodoForm todo={todo} />
        </div>
      </div>
    </div>
  );
}
