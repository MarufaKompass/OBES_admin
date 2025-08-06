
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Input, Button, Select, Option } from "@material-tailwind/react";
import { Upload, User, Building2, Mail, CheckCircle } from "lucide-react"
import useNavigator from '@/components/navigator/useNavigate';
import { addExpertsList, adminProfile } from '@/hooks/ReactQueryHooks';


export default function AddExpertsInfo() {
  const [preview, setPreview] = useState(null);
  const { handleNavigation } = useNavigator();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    // formState: { errors },
    reset,
  } = useForm();


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const { mutateAsync } = useMutation({ mutationFn: addExpertsList });
  const onSubmit = async (data) => {

    console.log('data', data)
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
      toast.error(err?.response?.data?.message || 'add Expert failed');
      reset();
    }
  };
  return (
    <>

      {/* <Title title="Add Faq"></Title> */}
      <div className="min-h-full flex items-center justify-center px-4 py-8 mt-4">
        <Card className="w-full mx-auto md:px-24 px-2 ">
          <CardHeader
            floated={false}
            shadow={false}
            className="flex flex-col items-center bg-transparent"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <TagIcon className="h-6 w-6 text-primaryBg" />
            </div>
            <Typography variant="h4" color="blue-gray" className='font-poppins'>
              Add Experts
            </Typography>
            <Typography color="gray" className="text-center font-normal text-sm font-poppins">
              Create a new Experts for your posts
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}  >
            <CardBody className="space-y-6">
              <div className='flex gap-3 border-b pb-4'>
                <User></User>
                <p>
                  Personal Information
                </p>
              </div>
              <div>
                <div className="space-y-2">
                  <Typography variant="small" color="blue-gray" className="font-medium pb-1">
                    Doctor Name*
                  </Typography>
                  <Input label="Doctor Name" type="text" {...register("drname", { required: true })} />
                </div>
                <div className="space-y-2 mt-3">
                  <div>
                    <div>
                      <div>

                        <Typography variant="small" color="blue-gray" className="font-medium pb-3">
                          Experts Image*
                        </Typography>
                        <Controller
                          name="drimg"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "Image is required",
                            validate: {
                              isImage: (file) => {
                                if (!file) return true;
                                const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                                return validTypes.includes(file.type) || "File must be an image (JPEG, PNG, JPG, GIF, SVG)";
                              }
                            }
                          }}
                          render={({ field: { onChange }, fieldState: { error } }) => (
                            <>
                              <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    onChange(file);
                                    setPreview(URL.createObjectURL(file));
                                  } else {
                                    onChange(null);
                                    setPreview(null);
                                  }
                                }}
                                label="Choose File"
                              />
                              {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                            </>
                          )}
                        />

                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className='flex gap-3 border-b pb-4'>
                <Building2></Building2>
                <p>
                  Professional Information
                </p>
              </div>

              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                  Hospital/Clinic*
                </Typography>
                <Input label="Hospital/Clinic"
                  {...register("hospital", { required: true })}
                  type="text"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                    Primary Designation*
                  </Typography>
                  <Input label="Primary Designation"
                    type="text"
                    rows={4}
                    {...register("designation", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                    Secondary Designation*
                  </Typography>
                  <Input label="Secondary Designation"
                    type="text"
                    rows={4}
                    {...register("add_desig", { required: true })} />
                </div>
              </div>

              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                  Organization
                </Typography>
                <Input label="organization"
                  type="text"
                  {...register("add_org", { required: true })} />

              </div>

              <div className='flex gap-3 border-b pb-4'>
                <Mail></Mail>
                <p>
                  Contact Information
                </p>
              </div>


              <div className='grid grid-cols-2 gap-4'>
                <div className="space-y-2">
                  <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                    Email Address
                  </Typography>
                  <Input label="email address"
                    type="email"
                    rows={4}
                    {...register("email", { required: true })} />

                </div>
                <div className="space-y-2">
                  <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                    Phone Number
                  </Typography>
                  <Input label="019********"
                    type="number"
                    rows={4}
                    {...register("mobile", { required: true })} />

                </div>
              </div>

              <div className='flex gap-3 border-b pb-4'>
                <CheckCircle></CheckCircle>
                <p>
                  Account Status
                </p>
              </div>

              <div className="space-y-2 ">
                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                  Status
                </Typography>
                <Select label="Select Status" {...register("status", { required: true })}
                  value={watch("status") || ""}
                  onChange={(value) => setValue("status", value)} >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </div>
              <div className="flex gap-3 pt-4 pb-6">
                <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                  + Add Expert
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </>
  )
}
