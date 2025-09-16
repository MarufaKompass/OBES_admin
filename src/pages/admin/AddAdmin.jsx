import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm,Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addAdmin, adminProfile } from '@/hooks/ReactQueryHooks';
import { Card, CardHeader, Typography} from "@material-tailwind/react";
import DatePicker from '@/components/datepicker/Datepicker';

export default function AddAdmin() {
  const navigate = useNavigate();
  const [smsNumber, setSmsNumber] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
    const {
      register,
      handleSubmit,
      // formState: { errors },
      reset,
      setValue,
      control,
    } = useForm();
  
      const handleSmsNumber = (e) => {
    const newValue = e.target.value;
    setSmsNumber(newValue);
    setValue("smsmobile", newValue);
  };


    const { data: profile } = useQuery({
      queryKey: ['profile'],
      queryFn: adminProfile
    });
  
    const { mutateAsync } = useMutation({ mutationFn: addAdmin });
    const onSubmit = async (data) => {
      console.log("data", data)
      try {
        const res = await mutateAsync({ addAdminData: data, role: profile?.role });
        toast.success(res.data.message);
        navigate('/dashboard/admin/adminList');
        reset();
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Create Admin failed');
        reset();
      }
    };
  
  return (
    <div>
      <>
      <div className="h-full flex items-center justify-center px-4 py-16 mt-4">
        <Card className="w-full mx-auto md:px-24 px-2  md:pb-20 pb-6">
          <CardHeader
            floated={false}
            shadow={false}
            className="flex flex-col items-center bg-transparent">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <TagIcon className="h-6 w-6 text-primaryBg" />
            </div>
            <Typography variant="h4" color="blue-gray">
              Create New Admin
            </Typography>
  <Typography color="gray" className="text-center font-normal text-sm">
  Create a new admin to manage the system.
</Typography>
          </CardHeader>
       <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="font-poppins  text-[14px] font-medium">Full Name</label>
                  <input
                    name="fulname"
                    type="text"
                    placeholder="Full Name"
                    {...register("fulname", { required: true })}
                    className="input  border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                  />

                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {" "}
                    <div>
                      <label className="font-poppins  text-[14px] font-medium">Code</label>

                      <input
                        name="ccode"
                        value="88"
                        {...register("ccode", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                      />

                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div>
                      <label className="font-poppins  text-[14px] font-medium">
                        Mobile Number
                      </label>
                      <input
                        name="logmobile"
                        type="number"
                        autoComplete="logmobile"
                        placeholder="Mobile Number"
                        {...register("logmobile", { required: true })}
                        onChange={handleSmsNumber}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                      />
                    </div>
                  </div>
                </div>

                {smsNumber && (
                  <div className="hidden">
                    <label className="font-poppins  text-[14px]">
                      sms Number
                    </label>
                    <input
                      value={smsNumber}
                      onChange={handleSmsNumber}
                      name="smsmobile"
                      type="number"
                      autoComplete="smsmobile"
                      placeholder="Mobile Number"
                      {...register("smsmobile", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                    />
                  </div>
                )}

                <div>
                  <label className=" text-[14px] font-poppins font-medium">
                    Choose Gender
                  </label>

                  <div>
                    <select
                      defaultValue="choose gender"
                      {...register("ogender", { required: true })}
                      className="select border border-[#d8d8d8] rounded-md px-2 focus:outline-none focus:ring-0 focus:ring-none w-[100%]  py-2 pl-2 mt-1"
                    >
                      <option disabled={true}>Pick a color</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-poppins  text-[14px] font-medium">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    {...register("logemail", { required: true })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                  />

                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="w-full ">
                  <div className='mb-1'>
                      <label   className="text-[14px] font-poppins font-medium">
                      Date Of Birth
                    </label>
                  </div>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          showCalendar={showCalendar}
                          setShowCalendar={setShowCalendar}
                          {...field}
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          format="YYYY-MM-DD"
                          className="w-full mt-2"
                        />
                      )}
                    />
                  </div>
                <div>
                  <label
                    className="text-[14px] font-poppins font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="password"
                      {...register("password", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-[5px]"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                    </button>
                  </div>
                </div>
                </div>

        <div className='hidden'>
                         <input
                    id="role"
                    name="role"
                    type="role"
                    value="admin"
                    {...register("role", { required: true })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                  />

        </div>

              </div>

              <button
                type="submit"
                className="w-full font-serif text-[18px] text-[#fff] bg-primaryBg py-[10px] cursor-pointer mt-6 rounded-[8px]"
              >
                Create Admin
              </button>
            </form>

        </Card>
      </div>
    </>
    </div>
  )
}
