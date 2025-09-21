
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Input, Button, Select, Option } from "@material-tailwind/react";
import { User, Building2, Mail, CheckCircle, Loader2 } from "lucide-react"
import useNavigator from '@/components/navigator/useNavigate';
import { addExpertsList, adminProfile, uploadImage } from '@/hooks/ReactQueryHooks';
import CustomInput from '@/components/input/CustomInput';
import DynamicSelect from '@/components/select/DynamicSelect';
import MainButton from '@/components/mainButton/MainButton';
import ImageUploadField from '@/components/UploadImage/ImageUploadField';


const statusTypes = [
  { id: '1', label: 'Active', value: 'active' },
  { id: '2', label: 'inactive', value: 'inactive' },

];

export default function AddExpertsInfo() {
  const { handleNavigation } = useNavigator();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const { mutateAsync } = useMutation({ mutationFn: addExpertsList });
  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("drname", data.drname);
    formData.append("drimg", data.drimg);
    formData.append("hospital", data.hospital);
    formData.append("designation", data.designation);
    formData.append("add_desig", data.add_desig);
    formData.append("add_org", data?.add_org);
    formData.append("email", data?.email);
    formData.append("mobile", data?.mobile);
    formData.append("status", data?.status);

    console.log("Form Data:", formData);
    try {
      const res = await mutateAsync({ addExpertsData: formData, role: profile?.role });
      toast.success(res.data.message);
      handleNavigation('/dashboard/experts/expertsList');
      reset();
    } catch (err) {
      setError(err?.response?.data?.message)
      reset();
    }
  };
  return (
    <>
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
              Create Experts
            </Typography>
            <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
              Create a new Experts for your posts
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}  >
            <CardBody className="space-y-2">
              <div className='flex gap-3 border-b pb-4 text-paragraphFont text-paragraph font-heading'>
                <User></User>
                <p>
                  Personal Information
                </p>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">

                    <Typography variant="small" className="font-medium text-mainHeading font-heading">
                      Doctor Name*
                    </Typography>
                    <CustomInput
                      name="drname"
                      label="Doctor Name"
                      register={register}
                      rules={{ required: error }}
                      errors={errors}
                    />

                    {errors.drname && (
                      <Typography color="red" className="text-xs mt-1">{errors?.drname?.message}</Typography>
                    )}
                  </div>

                  <div>
                    <Typography variant="small" className="font-medium text-mainHeading font-heading pb-3">
                      Expert Image*
                    </Typography>

                    <ImageUploadField
                      name="drimg"
                      control={control}
                      register={register}
                      label="Expert Image*"
                      moduleTitle="obesexpertimg"
                      rules={{
                        required: "Image is required",
                        validate: {
                          isImage: (value) => {
                            if (!value) return "Please upload an image";
                            return true;
                          },
                        },
                      }}
                    />
                  </div>
                </div>

              </div>

              <div className='flex gap-3 border-b py-3 text-paragraphFont text-paragraph font-heading'>
                <Building2></Building2>
                <p>
                  Professional Information
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className="space-y-2">

                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Hospital/Clinic*
                  </Typography>
                  <CustomInput
                    name="hospital"
                    label="Hospital/Clinic"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.hospital && (
                    <Typography color="red" className="text-xs mt-1">{errors.hospital.message}</Typography>
                  )}

                </div>

                <div className="space-y-2">

                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Organization*
                  </Typography>
                  <CustomInput
                    name="add_org"
                    label="organization"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.add_org && (
                    <Typography color="red" className="text-xs mt-1">{errors.add_org.message}</Typography>
                  )}

                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">




                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Primary Designation*
                  </Typography>
                  <CustomInput
                    name="designation"
                    label="Primary Designation"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.designation && (
                    <Typography color="red" className="text-xs mt-1">{errors.designation.message}</Typography>
                  )}



                </div>
                <div className="space-y-2">


                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Secondary Designation*
                  </Typography>
                  <CustomInput
                    name="add_desig"
                    label="Secondary Designation"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.add_desig && (
                    <Typography color="red" className="text-xs mt-1">{errors.add_desig.message}</Typography>
                  )}
                </div>
              </div>



              <div className=' pb-4 flex gap-3 border-b py-3 text-paragraphFont text-paragraph font-heading'>
                <Mail></Mail>
                <p className=''>
                  Contact Information
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Email Address*
                  </Typography>
                  <CustomInput
                    name="email"
                    label="Email Address"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />
                  {errors.email && (
                    <Typography color="red" className="text-xs mt-1">{errors.email.message}</Typography>
                  )}
                </div>
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-mainHeading font-heading">
                    Phone Number*
                  </Typography>
                  <CustomInput
                    name="mobile"
                    label="Phone Number"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />
                  {errors.mobile && (
                    <Typography color="red" className="text-xs mt-1">{errors.mobile.message}</Typography>
                  )}
                </div>
              </div>
              <div className='flex gap-3 border-b py-3 text-paragraphFont text-paragraph font-heading'>
                <CheckCircle></CheckCircle>
                <p>
                  Account Status
                </p>
              </div>
              <div className="space-y-2 ">

                <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                  Select Status Type
                </Typography>

                <DynamicSelect
                  name="status"
                  label="Select Status Type"
                  options={statusTypes}
                  register={register}
                  rules={{ required: error }}
                  errors={errors}
                  placeholder="-- Select Status Type --"
                />

                {errors.status && (
                  <Typography color="red" className="text-xs ">
                    {errors.status.message}
                  </Typography>
                )}
              </div>
              <div className="flex gap-3 pt-4 pb-6">
                <MainButton fullWidth type="submit" variant='primary' >
                  + Add Expert
                </MainButton>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>

    </>
  )
}
