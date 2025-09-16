import { forgotPasswords } from '@/hooks/ReactQueryHooks';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { User, Mail, ArrowRight } from 'lucide-react';
export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()


  const { mutateAsync } = useMutation({ mutationFn: forgotPasswords });

  const onSubmit = async (data) => {
    console.log("data", data)
    try {
      const res = await mutateAsync(data);
      toast.success(res.data.message);
      navigate("/otp", { state: { email: data.email } });
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'failed');
      reset();
    }
  };
  return (
    <div>

      <div className="min-h-screen bg-[#7B1E1910] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Illustration */}
            <div className="lg:w-1/2 bg-gradient-to-br from-primaryBg to-[#7B1E1940] flex items-center justify-center p-8 lg:p-12">
              <div className="relative">
                {/* Background blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-primaryBg to-[#7B1E1990] rounded-full transform rotate-12 scale-110 opacity-60"></div>

                {/* Hand holding phone */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="relative">
                    {/* Hand */}
                    <div className="w-32 h-40 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full transform rotate-12 relative">
                      <div className="absolute top-8 left-6 w-20 h-24 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full transform -rotate-6"></div>
                      {/* Thumb */}
                      <div className="absolute top-16 right-2 w-6 h-12 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full transform rotate-45"></div>
                    </div>

                    {/* Phone */}
                    <div className="absolute -top-8 left-8 w-24 h-44 bg-gray-800 rounded-3xl shadow-xl transform -rotate-6">
                      <div className="w-full h-full bg-white rounded-3xl m-1 p-3 flex flex-col items-center">
                        {/* Phone screen */}
                        <div className="w-full h-full bg-gray-50 rounded-2xl p-2 flex flex-col items-center justify-center">
                          {/* User icon */}
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mb-2">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          {/* Password dots */}
                          <div className="flex gap-1 mb-2">
                            {[...Array(8)].map((_, i) => (
                              <div key={i} className="w-1 h-1 bg-primaryBg rounded-full"></div>
                            ))}
                          </div>
                          {/* Login button */}
                          <div className="w-12 h-3 bg-primaryBg rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Forgot Password
                </h1>
                <p className="text-gray-600 mb-8">
                  Please enter your email address below
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          id="email"
                          className=" block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-none focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="Enter Email Address"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-gradient-to-r from-primaryBg to-[#7B1E1990] text-white py-3 px-6 rounded-xl font-semibold hover:from-primaryBg hover:to-[#7B1E1990] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Remember your password?{' '}
                    <Link to="/login" className="text-primaryBg hover:text-primaryBg font-semibold transition-colors">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
