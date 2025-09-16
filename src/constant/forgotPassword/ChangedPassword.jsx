import { passwordChanged } from '@/hooks/ReactQueryHooks';
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, ArrowLeft, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
export default function ChangedPassword() {
    const location = useLocation();
    const user_id = location.state?.userId || "";
    console.log("user id", user_id)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const { mutateAsync } = useMutation({ mutationFn: passwordChanged });

    const onSubmit = async (data) => {

        try {
            const res = await mutateAsync(data);
            toast.success(res?.data?.message);
            console.log(res);
            navigate("/login ");
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
                    <div className="">


                        {/* Right Side - OTP Form */}
                        <div className="bg-white rounded-r-3xl lg:rounded-l-none rounded-3xl shadow-2xl p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                {/* Back button */}
                                <Link to="/otp">
                                    <button className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
                                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                        Back
                                    </button>
                                </Link>


                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Lock className="w-8 h-8 text-red-800" style={{ color: '#7B1E19' }} />
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
                                    <p className="text-gray-600">
                                        Create a new secure password for your account <br />
                                    </p>
                                </div>

                                {/* OTP Input */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-8">
                                        <div className="mb-6">

                                            <div className='hidden'>
                                                {
                                                    user_id && (
                                                        <input
                                                            id="user_id"
                                                            type="number"
                                                            {...register("user_id", { required: true })}
                                                            value={user_id || ""}
                                                            className="w-full px-2 py-2 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-primaryBg focus:outline-none transition-all duration-200 hover:border-primaryBg tracking-widest"
                                                        />
                                                    )
                                                }

                                            </div>
                                            <div>
                                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    id="otp"
                                                    type="password"
                                                    {...register("password", { required: true })}
                                                    placeholder="Password"
                                                    className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-poppins focus:border-primaryBg focus:outline-none transition-all duration-200 hover:border-primaryBg tracking-widest"
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    id="otp"
                                                    type="password"
                                                    {...register("password_confirmation", { required: true })}
                                                    placeholder="Confirm Password"
                                                    className="w-full px-2 py-2  border-2 border-gray-300 rounded-md text-poppins focus:border-primaryBg focus:outline-none transition-all duration-200 hover:border-primaryBg tracking-widest"
                                                />
                                            </div>
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
