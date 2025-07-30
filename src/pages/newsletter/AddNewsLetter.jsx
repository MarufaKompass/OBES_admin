import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Option } from "@material-tailwind/react";
import { TagIcon } from "@heroicons/react/24/solid";
import { addNewsletter, adminProfile } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export default function AddNewsLetter() {
    const [preview, setPreview] = useState(null);
    const [pdfName, setPdfName] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Format: "2025-07-30"
        setValue("published_date", today);
    }, [setValue]);


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });



    const { mutateAsync } = useMutation({ mutationFn: addNewsletter });

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        const formData = new FormData();
        formData.append("issuenumber", data.issuenumber);
        formData.append("title", data.title);
        formData.append("short_summary", data.short_summary);
        formData.append("status", data.status);
        formData.append("upby", data.upby);
        formData.append("coverimage", data?.coverimage);
         formData.append("pdfdoc", data?.pdfdoc);
        formData.append("published_date", data?.published_date);
    try {
      const result = await mutateAsync(formData);
      toast.success('Newsletter added successfully!');
      // Reset form
      setPreview(null);
      setPdfName(null);
    } catch (error) {
      toast.error('Failed to add newsletter');
    }

        try {
            const res = await mutateAsync({ addNewsletterData: data, role: profile?.role });
            toast.success(res.data.message);
            handleNavigation('/dashboard/faq/faqLists');
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
                        Add Newsletter
                    </Typography>
                    <Typography color="gray" className="text-center font-normal text-sm">
                        Add Newsletter asked title and image
                    </Typography>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="space-y-6">
                        <div className="">
                            {
                                profile?.role && (
                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            upby
                                        </Typography>
                                        <Input value={profile?.role} {...register("upby", { required: true })} />
                                        {errors.upby && <p className="text-red-500 text-sm">This field is required</p>}
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            <Typography variant="small" className="mb-1">
                                Issue Number
                            </Typography>
                            <Input label="Issue number" type="number" {...register("issuenumber", { required: true })} />
                            {errors.faqen && <p className="text-red-500 text-sm">This field is required</p>}
                        </div>

                        {/* Answer EN */}
                        <div>
                            <Typography variant="small" className="mb-1">
                                Title
                            </Typography>
                            <Input label="Title" rows={4} {...register("title", { required: true })} />
                            {errors.fansen && <p className="text-red-500 text-sm">This field is required</p>}
                        </div>

                        {/* FAQ BN */}

                        {/* Answer BN */}
                        <div>
                            <Typography variant="small" className="mb-1">
                                Short Summary
                            </Typography>
                            <Textarea label="Short Summery" rows={4} {...register("short_summary", { required: true })} />
                            {errors.fansbn && <p className="text-red-500 text-sm">This field is required</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <div>
                                <Typography variant="small" className="mb-2">
                                    Upload Image
                                </Typography>
                                <Controller
                                    name="coverimage"
                                    control={control}
                                    defaultValue={null}
                                    rules={{
                                        required: "Image is required",
                                        validate: {
                                            isImage: (file) => {
                                                if (!file) return true; // Skip if no file (handled by required)
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
                                {preview && (
                                    <div className="mt-4">
                                        <img src={preview} alt="Preview" className="h-40 object-cover rounded-md" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                    <div>
  <Typography variant="small" className="mb-2">
    Upload PDF
  </Typography>
  <Controller
    name="pdfdoc"
    control={control}
    defaultValue={null}
    rules={{ 
      required: "PDF is required",
      validate: {
        isPDF: (file) => {
          if (!file) return true; // Skip if no file (handled by required)
          return file.type === 'application/pdf' || "File must be a PDF";
        }
      }
    }}
    render={({ field: { onChange }, fieldState: { error } }) => (
      <>
        <Input
          type="file"
          accept="application/pdf"
          label="Upload PDF"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              onChange(file);
              setPdfName(file.name);
            } else {
              onChange(null);
              setPdfName(null);
            }
          }}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        {pdfName && (
          <p className="mt-2 text-sm text-gray-700">Selected PDF: {pdfName}</p>
        )}
      </>
    )}
  />
</div>
                        </div>

                        <div className="">
                            <Typography variant="small" className="mb-2">
                                Select Status
                            </Typography>
                            <Select label="Select Status" {...register("status", { required: true })}
                                value={watch("status") || ""}
                                onChange={(value) => setValue("status", value)}  >
                                <Option value="published">Published</Option>
                                <Option value="draft">Draft</Option>

                            </Select>
                            {errors.status && (
                                <Typography variant="small" color="red" className="mt-1">
                                    This field is required
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" className="mb-4">
                                Today's Date
                            </Typography>

                            {/* Read-only date display */}
                            <Typography variant="paragraph" className="mb-2">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </Typography>

                            <input
                                type="hidden"
                                {...register("published_date")}
                            />
                        </div>


                        {/* Submit */}
                        <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                            + Add Newsletter
                        </Button>
                    </CardBody>
                </form>
            </Card>
        </div>
    );
}
