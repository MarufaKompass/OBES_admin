import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { Typography, } from "@material-tailwind/react";

import { loginUser } from "@/hooks/ReactQueryHooks";
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';
import useNavigator from "../../components/navigator/useNavigate";
import { useAdminObeContext } from "@/components/contextProvider/AdminContextProvider";

export function SignIn() {
  const [error, setError] = useState();
  const { setUser } = useAdminObeContext();
  const { handleNavigation } = useNavigator();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useMutation({ mutationFn: loginUser });
  const onSubmit = async (data) => {
    try {
      const res = await mutateAsync(data);
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      setUser(res.data.token);
      toast.success(res.data.message);
      handleNavigation('/');
      reset();
    } catch (err) {
      setError(err?.response?.data?.message);
      reset();
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" className="font-medium text-mainHeading font-heading">
              Your email
            </Typography>
            <CustomInput
              name="login"
              placeholder="017******/name@mail.com"
              register={register}
              rules={{ required: error }}
              errors={errors}
            />

            {errors.login && (
              <Typography color="red" className="text-xs mt-1">{errors.login.message}</Typography>
            )}


            <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
              Password
            </Typography>
            <CustomInput
              name="password"
              type="password"
              placeholder="*********"
              register={register}
              rules={{ required: error }}
              errors={errors}
            />

            {errors.password && (
              <Typography color="red" className="text-xs mt-1">{errors?.password?.message}</Typography>
            )}



          </div>
          <div className="flex justify-end  gap-2 my-3 ">
            <Typography variant="medium" className="font-medium text-gray-900 flex ">
              <Link to="/forgot-password">
                Forgot Password
              </Link>
            </Typography>
          </div>
          <MainButton variant="primary" fullWidth type="submit">
            Sign In
          </MainButton>

        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/signIn.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
