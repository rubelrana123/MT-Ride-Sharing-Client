import { useState } from 'react';
import { Link } from 'react-router';
import LoginForm from '../../components/modules/Auth/LoginForm';

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      console.log('Login attempt:', data);
      // Here you would typically make an API call to authenticate
      // For now, we'll just log the data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Login successful! (This is a demo)');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to My Trip
            </h1>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Sign in
          </h2>

          <LoginForm onSubmit={onSubmit} isSubmitting={isSubmitting} />

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>Powered by My Trip</p>
          <p className="mt-1">V1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
