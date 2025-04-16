'use client';

import { useState } from 'react';
import LoginForm from './login-form';
import SignUpForm from './signup-form';
import GoogleSignInButton from './google-signin-button';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-center text-3xl font-bold text-gray-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
        </p>
      </div>

      <div className="space-y-6">
        {isLogin ? <LoginForm /> : <SignUpForm />}

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleSignInButton />
      </div>
    </div>
  );
}
