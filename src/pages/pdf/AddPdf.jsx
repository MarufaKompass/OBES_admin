import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { TagIcon } from "@heroicons/react/24/solid";
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import DynamicSelect from '@/components/select/DynamicSelect';
import PdfUploadField from '@/components/upload/PdfUploadField';
import ImageUploadField from '@/components/upload/ImageUploadField';
import { addNewsletter, addPdf, adminProfile} from '@/hooks/ReactQueryHooks';
import { Card, CardHeader, CardBody, Typography, Input } from "@material-tailwind/react";

const statusTypes = [
  { qId: '1', label: 'Draft', value: 'draft' },
  { qId: '2', label: 'Published', value: 'published' },
  { qId: '3', label: 'Archived', value: 'archived' },
];


export default function AddPdf() {
  const navigate = useNavigate();
  const [error, setError] = useState();


  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();



  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setValue("published_date", today);
  }, [setValue]);


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });


  const { mutateAsync } = useMutation({ mutationFn: addPdf });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_summary", data.short_summary);
    formData.append("status", data.status);
    formData.append("upby", data.upby);
    formData.append("coverimage", data?.coverimage);
    formData.append("pdflink", data?.pdflink);
    formData.append("published_date", data?.published_date);


    try {
      const res = await mutateAsync({ addPdfData: formData, role: profile?.role });
      toast.success(res.data.message);
      navigate('/dashboard/material/pdfLists');
      reset();
    } catch (err) {
      setError(err?.response?.data?.message);
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
              Create PDF
            </Typography>
            <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
              Create a new pdf for your posts
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}  >
            <CardBody className="space-y-2">

              <div className="space-y-2">
                <div className="hidden">
                  {
                    profile?.role && (
                      <div>
                        <Typography variant="small" className="mb-1">
                          upby
                        </Typography>
                        <Input value={profile?.role} {...register("upby", { required: true })} />
                      </div>
                    )
                  }
                </div>

               
              </div>
              <div>
                <Typography variant="small" className="font-medium text-mainHeading font-heading mb-1">
                  Title*
                </Typography>
                <CustomInput
                  name="title"
                  label="Title"
                  register={register}
                  rules={{ required: error }}
                  errors={errors}
                />

                {errors.title && (
                  <Typography color="red" className="text-xs mt-1">{errors?.title?.message}</Typography>
                )}

              </div>
              <div>
                <Typography variant="small" className="font-medium text-mainHeading font-heading mb-1">
                  Short Summary*
                </Typography>
                <CustomInput
                  name="short_summary"
                  type="textarea"
                  label="Short Summary"
                  register={register}
                  rules={{ required: error }}
                  errors={errors}
                  rows
                />

                {errors.short_summary && (
                  <Typography color="red" className="text-xs mt-1">{errors?.short_summary?.message}</Typography>
                )}
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Typography variant="small" className="font-medium text-mainHeading font-heading pb-3">
                    Expert Image*
                  </Typography>

                  <ImageUploadField
                    name="coverimage"
                    control={control}
                    register={register}
                    label="Image*"
                    moduleTitle="drpdfimg"
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


                <div>
                  <Typography variant="small" className="font-medium text-mainHeading font-heading pb-3">
                    Expert PDF*
                  </Typography>

                  <PdfUploadField
                    name="pdflink"
                    control={control}
                    register={register}
                    label="pdf*"
                    moduleTitle="drpdfdoc"
                    rules={{
                      required: "pdf is required",
                      validate: {
                        isImage: (value) => {
                          if (!value) return "Please upload an pdf";
                          return true;
                        },
                      },
                    }}
                  />
                </div>
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



              <div className="flex gap-3 pt-4 pb-0">
                <MainButton fullWidth type="submit" variant='primary' >
                  + Add PDF
                </MainButton>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </>
  );
}
