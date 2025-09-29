// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Label } from '../../ui/label';
// import { Eye, EyeOff, Copy } from 'lucide-react';

// // Form validation schema
// const loginSchema = z.object({
//   email: z.string().email('Please enter a valid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// interface LoginFormProps {
//   onSubmit: (data: LoginFormData) => Promise<void>;
//   isSubmitting?: boolean;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting = false }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const handleFormSubmit = async (data: LoginFormData) => {
//     await onSubmit(data);
//   };

//   const fillDemoCredentials = () => {
//     setValue('email', 'helloWorld@example.com');
//     setValue('password', 'RiderPass123!');
//   };

//   const copyCredentials = () => {
//     const credentials = `Email: helloWorld@example.com\nPassword: RiderPass123!`;
//     navigator.clipboard.writeText(credentials);
//     alert('Credentials copied to clipboard!');
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//       {/* Email Field */}
//       <div className="space-y-2">
//         <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           Email
//         </Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="Enter your email"
//           className="w-full"
//           {...register('email')}
//         />
//         {errors.email && (
//           <p className="text-sm text-red-600 dark:text-red-400">
//             {errors.email.message}
//           </p>
//         )}
//       </div>

//       {/* Password Field */}
//       <div className="space-y-2">
//         <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           Password
//         </Label>
//         <div className="relative">
//           <Input
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Enter your password"
//             className="w-full pr-10"
//             {...register('password')}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           >
//             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//           </button>
//         </div>
//         {errors.password && (
//           <p className="text-sm text-red-600 dark:text-red-400">
//             {errors.password.message}
//           </p>
//         )}
//       </div>

//       {/* Demo Credentials */}
//       <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
//             Demo Credentials
//           </h3>
//           <button
//             type="button"
//             onClick={() => setShowCredentials(!showCredentials)}
//             className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             {showCredentials ? 'Hide' : 'Show'}
//           </button>
//         </div>
        
//         {showCredentials && (
//           <div className="space-y-2">
//             <div className="text-sm">
//               <span className="font-medium text-blue-900 dark:text-blue-100">Email:</span>
//               <span className="ml-2 text-blue-700 dark:text-blue-300">helloWorld@example.com</span>
//             </div>
//             <div className="text-sm">
//               <span className="font-medium text-blue-900 dark:text-blue-100">Password:</span>
//               <span className="ml-2 text-blue-700 dark:text-blue-300">RiderPass123!</span>
//             </div>
//           </div>
//         )}
        
//         <div className="flex gap-2 mt-3">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={fillDemoCredentials}
//             className="flex-1 text-xs"
//           >
//             Fill Demo
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={copyCredentials}
//             className="flex-1 text-xs"
//           >
//             <Copy className="h-3 w-3 mr-1" />
//             Copy
//           </Button>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         className="w-full"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? 'Signing in...' : 'Sign in'}
//       </Button>
//     </form>
//   );
// };

// export default LoginForm;
