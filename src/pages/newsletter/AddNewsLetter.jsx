import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { TagIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addNewsletter, adminProfile, uploadImage } from '@/hooks/ReactQueryHooks';
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Option } from "@material-tailwind/react";
import { Loader2, CheckCircle } from "lucide-react";
export default function AddNewsLetter() {
    const [preview, setPreview] = useState(null);
    const [pdfName, setPdfName] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const [pdfUploading, setPdfUploading] = useState(false);
    const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
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


    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setValue("published_date", today);
    }, [setValue]);


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });


    useEffect(() => {
        if (uploadedImageUrl) {
            setValue("coverimage", uploadedImageUrl);
        }
    }, [uploadedImageUrl, setValue]);

    useEffect(() => {
        if (uploadedPdfUrl) {
            setValue("pdfdoc", uploadedPdfUrl);
        }
    }, [uploadedPdfUrl, setValue]);


    const handleImageUpload = async (file) => {
        if (!file) return;

        setImageUploading(true);

        try {
            const formData = new FormData();
            formData.append('uploadimg', file);
            formData.append('moduletitle', 'newsletterimg');

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




    const handlePdfUpload = async (file) => {
        if (!file) return;

        setPdfUploading(true);

        try {
            const formData = new FormData();
            formData.append('uploadimg', file);
            formData.append('moduletitle', 'newspdfdoc');

            // Call your uploadImage API
            const response = await uploadImage(formData);

            if (response?.data?.data?.filename) {
                const pdfUrl = response?.data?.data?.filename;
                setUploadedPdfUrl(pdfUrl);
                toast.success('Pdf uploaded successfully!');
                return pdfUrl;
            } else {
                // throw new Error('No image URL returned from server');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Pdf upload failed');
            return null;
        } finally {
            setPdfUploading(false);
        }
    };



    const { mutateAsync } = useMutation({ mutationFn: addNewsletter });

    const onSubmit = async (data) => {
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
            const res = await mutateAsync({ addNewsletterData: formData, role: profile?.role });
            toast.success(res.data.message);
            navigate('/dashboard/newsletter/newsletterLists');
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
                        <div className="hidden">
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
                        <div class="grid grid-cols-2 gap-4">


                            <div>
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
                                    {uploadedImageUrl && (
                                        <div>
                                            <Input
                                                {...register("coverimage", { required: true })}
                                                type="text"
                                                readOnly
                                            />
                                        </div>
                                    )}

                                </div>
                            </div>




                            <div>
                                <div className="space-y-2 mt-3">
                                    <Typography variant="small" color="blue-gray" className="font-medium pb-3">
                                        Upload Pdf*
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
                                                                await handlePdfUpload(file);
                                                            } else {
                                                                onChange(null);
                                                                setPreview(null);
                                                                setUploadedImageUrl('');
                                                            }
                                                        }}
                                                        label="Choose File"
                                                    />

                                                    {/* Upload Status Indicator */}
                                                    {pdfUploading && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                                        </div>
                                                    )}
                                                </div>


                                                {pdfUploading && (
                                                    <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Uploading image...
                                                    </p>
                                                )}

                                                {uploadedPdfUrl && !pdfUploading && (
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
                                    {uploadedPdfUrl && (
                                        <div>
                                            <Input
                                                {...register("pdfdoc", { required: true })}
                                                type="text"
                                                readOnly
                                            />
                                        </div>
                                    )}

                                </div>
                            </div>


                        </div>



                        <div className="">
                            <Typography variant="small" className="mb-2">
                                Select Status
                            </Typography>
                            <Select label="Select Status" {...register("status", { required: true })}
                                value={watch("status") || ""}
                                onChange={(value) => setValue("status", value)} >
                                <Option value="published">Published</Option>
                                <Option value="draft">Draft</Option>

                            </Select>
                            {errors.status && (
                                <Typography variant="small" color="red" className="mt-1">
                                    This field is required
                                </Typography>
                            )}
                        </div>

                        <div className='hidden'>
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
