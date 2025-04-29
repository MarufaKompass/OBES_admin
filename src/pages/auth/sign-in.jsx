import { useAdminObeContext } from "@/components/contextProvider/AdminContextProvider";

import {Input,Button, Typography,} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export function SignIn() {
  const { setUser } = useAdminObeContext();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

 
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "https://obapi.myhealthrow.com/public/api/login",
        data
      );

      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      toast.success(res.data.message);
      setUser(res.data.token);
      handleButtonClick();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
 
        <form onSubmit={handleSubmit(onSubmit)}  className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            
              {...register("login")}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("password")}
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
          {/* <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
            <Typography variant="small" className="font-medium text-gray-900 flex ">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Button className="mt-6 bg-[#121926]" fullWidth type="submit">
            Sign In
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/signIn.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
