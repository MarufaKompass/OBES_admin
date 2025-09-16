import React from 'react'
import { Shield, ArrowLeft, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { otpMatch } from '@/hooks/ReactQueryHooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
export default function Otp() {
    const location = useLocation();
    const email = location.state?.email || "";
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const { mutateAsync } = useMutation({ mutationFn: otpMatch });

    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            const res = await mutateAsync(data);
            toast.success(res?.data?.message);
            console.log(res);
            navigate("/changed-password", { state: { userId: res?.data?.user_id } });
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'failed');
            reset();
        }
    };




    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
                        {/* Left Side - Illustration */}
                        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primaryBg to-rose-800 rounded-l-3xl p-12 relative overflow-hidden" style={{ backgroundColor: '#7B1E19' }}>
                            {/* Background decorations */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
                            <div className="absolute bottom-16 right-16 w-24 h-24 bg-white bg-opacity-5 rounded-full blur-lg"></div>
                            <div className="absolute top-1/2 right-8 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>

                            <div className="relative z-10 text-center">
                                {/* Mobile phone illustration */}
                                <div className="relative mx-auto mb-8">
                                    <div className=" bg-gray-900 rounded-3xl shadow-2xl relative">
                                        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl m-1 p-6 flex flex-col">
                                            {/* Phone screen content */}
                                            <div className="flex-1 bg-white rounded-2xl p-4 shadow-inner">
                                                <div className="text-center mb-6">
                                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#7B1E19' }}>
                                                        <Shield className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded mb-2"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-3/4 mx-auto mb-4"></div>
                                                </div>

                                                {/* OTP boxes animation */}
                                                <div className="flex justify-center gap-2 mb-4">
                                                    {[...Array(6)].map((_, i) => (
                                                        <div key={i} className="w-6 h-8 bg-gray-100 rounded border-2" style={{ borderColor: i < 3 ? '#7B1E19' : '#e5e7eb' }}>
                                                            {i < 3 && <div className="w-full h-full bg-primaryBg rounded-sm animate-pulse" style={{ backgroundColor: '#7B1E19' }}></div>}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="h-8 bg-red-800 rounded-lg" style={{ backgroundColor: '#7B1E19' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-4">Secure Verification</h2>
                                <p className="text-red-100 text-lg">
                                    We've sent a verification code to keep your account secure
                                </p>
                            </div>
                        </div>

                        {/* Right Side - OTP Form */}
                        <div className="bg-white rounded-r-3xl lg:rounded-l-none rounded-3xl shadow-2xl p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                {/* Back button */}
                                <Link to="/forgot-password">
                                    <button className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
                                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                        Back
                                    </button>
                                </Link>


                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Smartphone className="w-8 h-8 text-red-800" style={{ color: '#7B1E19' }} />
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
                                    <p className="text-gray-600">
                                        We've sent a 6-digit code to <br />
                                    </p>
                                </div>

                                {/* OTP Input */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-8">
                                        <div className="mb-6">
                                            <label htmlFor="otp" className="block text-lg font-medium text-gray-900 mb-2">
                                                Verification Code
                                            </label>
                                            <div className='hidden'>
                                                {
                                                    email && (
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            {...register("email", { required: true })}
                                                            maxLength="6"
                                                            value={email || ""}
                                                            className="w-full px-2 py-2 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-primaryBg focus:outline-none transition-all duration-200 hover:border-primaryBg tracking-widest"
                                                        />
                                                    )
                                                }

                                            </div>
                                            <input
                                                id="otp"
                                                type="number"
                                                {...register("otp", { required: true })}
                                                maxLength="6"
                                                placeholder="Enter 6-digit code"
                                                className="w-full px-2 py-2 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-primaryBg focus:outline-none transition-all duration-200 hover:border-primaryBg tracking-widest"
                                            />
                                        </div>
                                        <button type="submit" className="w-full  text-white bg-primaryBg py-3 px-6 rounded-xl font-semibold hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mb-6">
                                            <div className=" rounded-ful">Changed Password</div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
