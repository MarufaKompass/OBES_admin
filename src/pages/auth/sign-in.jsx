import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { Input, Button, Typography, } from "@material-tailwind/react";

import { loginUser } from "@/hooks/ReactQueryHooks";
import useNavigator from "../../components/navigator/useNavigate";
import { useAdminObeContext } from "@/components/contextProvider/AdminContextProvider";
import MainButton from '@/components/mainButton/MainButton';

export function SignIn() {
  const { setUser } = useAdminObeContext();

  const { handleNavigation } = useNavigator();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
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
      toast.error(err?.response?.data?.message || 'Login failed');
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
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("login", { required: true })}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("password", { required: true })}
            />
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
