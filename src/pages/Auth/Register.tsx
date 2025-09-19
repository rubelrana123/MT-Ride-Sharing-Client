import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import RegisterForm from '../../components/modules/Auth/RegisterForm';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';
 

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerUser] = useRegisterMutation();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsSubmitting(true);
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };
      console.log(payload)
      const res = await registerUser(payload).unwrap();
      console.log('Registered:', res);
      navigate('/login');
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
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
              Join ReadyRide
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create your account to get started
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Create Account
          </h2>

          <RegisterForm onSubmit={onSubmit} isSubmitting={isSubmitting} />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>Powered by My Trip ©2025</p>
          <p className="mt-1">V1.0.0</p>
        </div>
      </div>
    </div>
  );
};

 
