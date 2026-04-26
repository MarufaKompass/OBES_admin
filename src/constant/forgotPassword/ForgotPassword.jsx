import { forgotPasswords } from '@/hooks/ReactQueryHooks';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Mail, ArrowRight } from 'lucide-react';
import forgotPasswordImage from "@/assets/forgot.png";

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

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Illustration */}
            <div className="lg:w-1/2  flex items-center justify-center p-8 lg:p-12">
              <img
                src={forgotPasswordImage}
                alt="forgot password"

              />
            </div>
            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <h1 className="lg:text-4xl text-2xl font-bold text-gray-900 mb-2">
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
                      className="w-full bg-primary  text-white py-3 px-6 rounded-xl font-semibold hover:from-primary hover:to-[#7B1E1990] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                    <Link to="/login" className="text-primary hover:text-primary font-semibold transition-colors">
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
