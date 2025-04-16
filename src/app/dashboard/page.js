import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import CreateTodo from '@/components/todos/create-todo';
import TodoList from '@/components/todos/todo-list';
import SignOutButton from '@/components/auth/sign-out-button';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {session.user.name || session.user.email}
              </p>
            </div>
            <SignOutButton />
          </div>

          <CreateTodo />
          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
}
