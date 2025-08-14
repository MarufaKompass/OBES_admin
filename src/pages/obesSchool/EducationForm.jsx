import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { TagIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addEducation, adminProfile } from '@/hooks/ReactQueryHooks';
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Option } from "@material-tailwind/react";
export default function EducationForm() {
     const [preview, setPreview] = useState(null);
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

      const { mutateAsync } = useMutation({ mutationFn: addEducation });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("modnum", data.modnum);
        formData.append("modtype", data.modtype);
        formData.append("topic", data.topic);
        formData.append("mimage", data?.mimage );
        formData.append("modinfo", data?.modinfo);
    
        console.log("Form Data:", formData);
        
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
                        Add Education Form
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
                            {/* <Typography variant="small" className="mb-1">
                                Issue Number
                            </Typography> */}
                            <Input label="bmi" type="text" value="BMI" {...register("topic", { required: true })} />
                            
                        </div>
                        {/* Image Upload */}
                        <div className="">
                            <div>
                                <div>
                                    <div>
                                        <Typography variant="small" className="mb-2">
                                            Upload Image
                                        </Typography>
                                        <Controller
                                            name="mimage"
                                            control={control}
                                            defaultValue={null}
                                            // rules={{
                                            //     required: "Image is required",
                                            //     validate: {
                                            //         isImage: (file) => {
                                            //             if (!file) return true; // Skip if no file (handled by required)
                                            //             const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                                            //             return validTypes.includes(file.type) || "File must be an image (JPEG, PNG, JPG, GIF, SVG)";
                                            //         }
                                            //     }
                                            // }}
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
                                        {/* {preview && (
                                            <div className="mt-4">
                                                <img src={preview} alt="Preview" className="h-40 object-cover rounded-md" />
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>

                        </div>


                             <div>
                            <Typography variant="small" className="mb-1">
                                Module Information
                            </Typography>
                            <Textarea label="Module Information"  rows={4} {...register("modinfo", { required: true })} />
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
