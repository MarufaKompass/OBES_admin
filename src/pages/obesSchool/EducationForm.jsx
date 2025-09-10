import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TagIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addEducation, adminProfile, uploadImage } from '@/hooks/ReactQueryHooks';
import {  CheckCircle, Loader2 } from "lucide-react"
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Option } from "@material-tailwind/react";
export default function EducationForm() {
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
            toast.error(err?.response?.data?.message || 'add Newsletter failed');
            reset();
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center px-4 py-8 mt-4">
            <Card className="w-full mx-auto md:px-24 px-2">
                <CardHeader floated={false} shadow={false} className="flex flex-col items-center bg-transparent">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                        <TagIcon className="h-6 w-6 text-primaryBg" />
                    </div>
                    <Typography variant="h4" color="blue-gray">
                        Education Form
                    </Typography>
                    <Typography color="gray" className="text-center font-normal text-sm">
                        Add Education asked title and image
                    </Typography>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="space-y-6">
                        <div className="">
                            <Typography variant="small" className="mb-2">
                                Select Category
                            </Typography>
                            <Select label="Select Category" {...register("category", { required: true })}
                                value={watch("category") || ""}
                                onChange={(value) => setValue("category", value)} >
                                <Option value="Adult  ">Adult</Option>
                                <Option value="Child">Child</Option>
                                <Option value="Both">Both</Option>

                            </Select>
                        </div>
                        <div className="">
                            <Typography variant="small" className="mb-2">
                                Select Module Number
                            </Typography>
                            <Select label="Select Module Number" {...register("modnum", { required: true })}
                                value={watch("modnum") || ""}
                                onChange={(value) => setValue("modnum", value)} >
                                <Option value="M1">M1</Option>
                                <Option value="M2">M2</Option>
                                <Option value="M3">M3</Option>
                                <Option value="M4">M4</Option>

                            </Select>
                        </div>
                        <div className="">
                            <Typography variant="small" className="mb-2">
                                Select Module Type
                            </Typography>
                            <Select label="Select Module Type" {...register("modtype", { required: true })}
                                value={watch("modtype") || ""}
                                onChange={(value) => setValue("modtype", value)} >
                                <Option value="Assessment">Assessment</Option>
                                <Option value="Education">Education</Option>
                                <Option value="Motivation">Motivation</Option>
                                <Option value="Life Style Modification">Life Style Modification</Option>
                            </Select>
                        </div>

                        <div>
                              <Typography variant="small" className="mb-2">
                                Topic
                            </Typography>
                            <Input label="Topic" type="text"  {...register("topic", { required: true })} />
                        </div>
                        {/* Image Upload */}
    
                <div className="space-y-2 mt-3">
                  <Typography variant="small" color="blue-gray" className="font-medium pb-3">
                    Upload Image*
                  </Typography>

                  <Controller
                    name=""
                    control={control}
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
                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                            disabled={imageUploading}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                onChange(file);
                                setPreview(URL.createObjectURL(file));

                                // Auto-upload the image
                                await handleImageUpload(file);
                              } else {
                                onChange(null);
                                setPreview(null);
                                setUploadedImageUrl('');
                              }
                            }}
                            label="Choose File"
                          />

                          {/* Upload Status Indicator */}
                          {imageUploading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                            </div>
                          )}
                        </div>

                        {/* Upload Status Messages */}
                        {imageUploading && (
                          <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading image...
                          </p>
                        )}

                        {uploadedImageUrl && !imageUploading && (
                          <p className="text-green-500 text-sm mt-1 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Image uploaded successfully
                          </p>
                        )}

                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                      </>
                    )}
                  />


                </div>
                <div className='hidden'>
                  {
                    uploadedImageUrl && (
                      <div>
                        <Input
                          {...register("mimage", { required: true })}
                          type="text"
                          value={uploadedImageUrl}

                          rows={4}
                        />
                      </div>
                    )
                  }
                </div>
                        <div>
                            <Typography variant="small" className="mb-1">
                                Module Information
                            </Typography>
                            <Textarea label="Module Information" rows={4} {...register("modinfo", { required: true })} />
                            {errors.fansbn && <p className="text-red-500 text-sm">This field is required</p>}
                        </div>
                        {/* Submit */}
                        <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                            + Add Education
                        </Button>
                    </CardBody>
                </form>
            </Card>
        </div>
    )
}
