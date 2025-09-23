import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TagIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addEducation, adminProfile, uploadImage } from '@/hooks/ReactQueryHooks';
import { CheckCircle, Loader2 } from "lucide-react"
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Option } from "@material-tailwind/react";
import DynamicSelect from '@/components/select/DynamicSelect';
import CustomInput from '@/components/input/CustomInput';
import ImageUploadField from '@/components/upload/ImageUploadField';
import MainButton from '@/components/mainButton/MainButton';


const categoryTypes = [
  { id: '1', label: 'Adult', value: 'adult' },
  { id: '2', label: 'Child', value: 'child' },

];

const modNo = [
  { id: '1', label: 'M1', value: 'M1' },
  { id: '2', label: 'M2', value: 'M2' },
  { id: '2', label: 'M3', value: 'M3' },
  { id: '2', label: 'M4', value: 'M4' },

];
const modType = [
  { id: '1', label: 'Assessment', value: 'Assessment' },
  { id: '2', label: 'Education', value: 'Education' },
  { id: '2', label: 'Motivation', value: 'Motivation' },
  { id: '2', label: 'Life Style Modification', value: 'Life Style Modification' },

];



export default function EducationForm() {
  const [error, setError] = useState();
  const [preview, setPreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });



  const handleImageUpload = async (file) => {
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append('uploadimg', file);
      formData.append('moduletitle', 'obeseduimg'); // Add module name

      // Call your uploadImage API
      const response = await uploadImage(formData);

      if (response?.data?.data?.filename) {
        const imageUrl = response?.data?.data?.filename;
        setUploadedImageUrl(imageUrl);
        toast.success('Image uploaded successfully!');
        return imageUrl;
      } else {
        // throw new Error('No image URL returned from server');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error?.response?.data?.message || 'Image upload failed');
      return null;
    } finally {
      setImageUploading(false);
    }
  };



  const { mutateAsync } = useMutation({ mutationFn: addEducation });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("modnum", data.modnum);
    formData.append("modtype", data.modtype);
    formData.append("topic", data.topic);
    formData.append("mimage", data?.mimage);
    formData.append("modinfo", data?.modinfo);
    try {
      const res = await mutateAsync({ addEducationData: formData, role: profile?.role });
      toast.success(res.data.message);
      navigate('/dashboard/school/eduList');
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
            Education Form
          </Typography>
          <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
            Add Education asked title and image
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="space-y-4">
            <div className="">
              <div className="space-y-2">
                <Typography variant="small" className="font-medium text-mainHeading font-heading">
                  Select Category*
                </Typography>

                <DynamicSelect
                  name="category"
                  label="Select Category Type"
                  options={categoryTypes}
                  register={register}
                  rules={{ required: error }}
                  errors={errors}
                  placeholder="-- Select Category Type --"
                />
                {errors.category && (
                  <Typography color="red" className="text-xs ">
                    {errors.category.message}
                  </Typography>
                )}
              </div>
            </div>

            <div className="">
              <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                Select Module Number*
              </Typography>


              <DynamicSelect
                name="modnum"
                label="Select Module Number"
                options={modNo}
                register={register}
                rules={{ required: error }}
                errors={errors}
                placeholder="-- Select Module Number --"
              />
              {errors.modnum && (
                <Typography color="red" className="text-xs ">
                  {errors.modnum.message}
                </Typography>
              )}

            </div>
            <div className="">
              <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                Select Module Type*
              </Typography>
              <DynamicSelect
                name="modtype"
                label="Select Module Type"
                options={modType}
                register={register}
                rules={{ required: error }}
                errors={errors}
                placeholder="-- Select Module Type --"
              />
              {errors.modtype && (
                <Typography color="red" className="text-xs ">
                  {errors.modtype.message}
                </Typography>
              )}
            </div>

            <div>

              <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                Topic*
              </Typography>
              <CustomInput
                name="topic"
                label="Topic"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />

              {errors.topic && (
                <Typography color="red" className="text-xs mt-1">{errors.topic.message}</Typography>
              )}

            </div>
            {/* Image Upload */}

            <div className="space-y-2 mt-3">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading pb-1">
                Upload Image*
              </Typography>


              <ImageUploadField
                name="mimage"
                control={control}
                register={register}
                label="Expert Image*"
                moduleTitle="obeseduimg"
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
              <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                Module Information*
              </Typography>


              <CustomInput
                name="modinfo"
                label="mod info"
                register={register}
                rules={{ required: error }}
                errors={errors}
                rows
                type='textarea'
              />

              {errors.modinfo && (
                <Typography color="red" className="text-xs mt-1">{errors?.modinfo?.message}</Typography>
              )}
            </div>


            {/* Submit */}
            <MainButton fullWidth type="submit" variant="primary" >
              + Create Education
            </MainButton>
          </CardBody>
        </form>
      </Card>
    </div>


  )
}
