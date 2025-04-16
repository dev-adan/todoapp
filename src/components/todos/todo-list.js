'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiTrash2, FiEdit, FiCheckSquare, FiSquare } from 'react-icons/fi';

export default function TodoList({ todos }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const toggleTodo = async (id, completed) => {
    try {
      setUpdatingId(id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setDeletingId(id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!todos?.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li key={todo.id} className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleTodo(todo.id, todo.completed)}
                disabled={updatingId === todo.id}
                className="text-gray-500 hover:text-blue-500 focus:outline-none disabled:opacity-50"
              >
                {todo.completed ? (
                  <FiCheckSquare className="w-5 h-5" />
                ) : (
                  <FiSquare className="w-5 h-5" />
                )}
              </button>
              <span className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.push(`/edit/${todo.id}`)}
                className="text-gray-500 hover:text-blue-500 focus:outline-none"
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                disabled={deletingId === todo.id}
                className="text-gray-500 hover:text-red-500 focus:outline-none disabled:opacity-50"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
