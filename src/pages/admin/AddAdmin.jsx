import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addAdmin, adminProfile } from '@/hooks/ReactQueryHooks';
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import DatePicker from '@/components/datepicker/Datepicker';
import CustomInput from '@/components/input/CustomInput';
import DynamicSelect from '@/components/select/DynamicSelect';
import MainButton from '@/components/mainButton/MainButton';

const genderTypes = [
  { id: '1', label: 'Male', value: 'male' },
  { id: '2', label: 'female', value: 'female' },
  { id: '3', label: 'Others', value: 'others' },

];


export default function AddAdmin() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [smsNumber, setSmsNumber] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
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
      setError(err?.response?.data?.message);
      reset();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 mt-4 bg-background shadow-xl rounded-2xl">
      <Card className="w-full mx-auto md:max-w-lg shadow-lg rounded-2xl border ">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex flex-col items-center bg-[#7B1E19] pb-6 rounded-t-2xl"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 mt-4">
            <TagIcon className="h-6 w-6 text-white" />
          </div>
          <Typography variant="h4" className="font-semibold text-whiteHeading font-heading">
            Create New Admin
          </Typography>
          <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
            Create a new admin to manage the system.
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="space-y-3 px-5 py-8 ">
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-mainHeading font-heading">
                Full Name
              </Typography>
              <CustomInput
                name="fulname"
                label="Full Name"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />

              {errors.fulname && (
                <Typography color="red" className="text-xs mt-1">{errors.fulname.message}</Typography>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <div>
                  <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                    Code
                  </Typography>
                  <CustomInput
                    name="ccode"
                    label="Code"
                    register={register}
                    defaultValue='88'
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.ccode && (
                    <Typography color="red" className="text-xs mt-1">{errors.ccode.message}</Typography>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                    Mobile Number
                  </Typography>
                  <CustomInput
                    name="logmobile"
                    label="Mobile Number"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.logmobile && (
                    <Typography color="red" className="text-xs mt-1">{errors.logmobile.message}</Typography>
                  )}
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

              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading pb-1">
                Choose Gender
              </Typography>

              <DynamicSelect
                name="ogender"
                label="Select Gender Type"
                options={genderTypes}
                register={register}
                rules={{ required: error }}
                errors={errors}
                placeholder="-- Select Gender Type --"
              />

              {errors.ogender && (
                <Typography color="red" className="text-xs ">
                  {errors.ogender.message}
                </Typography>
              )}

            </div>

            <div>

              <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                Email address
              </Typography>
              <CustomInput
                name="logemail"
                label="Email address"
                type="email"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />

              {errors.logemail && (
                <Typography color="red" className="text-xs mt-1">{errors.logemail.message}</Typography>
              )}
            </div>

            <div >
              <div className="w-full ">
                <div className=''>

                  <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                    Date Of Birth
                  </Typography>

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
                {errors.dob && (
                  <Typography color="red" className="text-xs mt-1">{errors.dob.message}</Typography>
                )}
              </div>
              <div>

                <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1 mt-3">
                  Password
                </Typography>
                <CustomInput
                  name="password"
                  type="password"
                  label="Password"
                  register={register}
                  rules={{ required: error }}
                  errors={errors}
                />

                {errors.password && (
                  <Typography color="red" className="text-xs mt-1">{errors.password.message}</Typography>
                )}

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
            <MainButton
              fullWidth
              type="submit"
              variant="primary"
            >
              Create Admin
            </MainButton>
          </CardBody>
        </form>
      </Card>
    </div>
  )
}
