import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X, Loader2, CheckCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { adminProfile, updateNewsletter, uploadImage } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function ModalEditNewsLetter({ setShowModalEdit, showModalEdit, selectedNewsLetterId }) {
    console.log("selectedNewsLetterId", selectedNewsLetterId)
    const queryClient = useQueryClient();
    const [pdfPreview, setPdfPreview] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [pdfUploading, setPdfUploading] = useState(false);
    const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

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
            setValue("pdflink", uploadedPdfUrl);
        }
    }, [uploadedPdfUrl, setValue]);




    useEffect(() => {
        if (selectedNewsLetterId) {
            reset({
                issuenumber: selectedNewsLetterId?.issuenumber
                    ? String(selectedNewsLetterId.issuenumber)
                    : "",
                title: selectedNewsLetterId?.title || "",
                short_summary: selectedNewsLetterId?.short_summary || "",
                status: selectedNewsLetterId?.status || "",
                coverimage: null,
                pdflink: null,


            });

        }
    }, [selectedNewsLetterId, reset]);


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
                reset()
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
                reset()
                toast.success('Pdf uploaded successfully!');
                return pdfUrl;
            } else {
                // throw new Error('No image URL returned from server');
            }
        } catch (error) {
            console.error('Pdf upload error:', error);
            toast.error(error?.response?.data?.message || 'Pdf upload failed');
            return null;
        } finally {
            setPdfUploading(false);
        }
    };




    const { mutateAsync } = useMutation({ mutationFn: updateNewsletter });

    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            const res = await mutateAsync({ updateNewsletterData: data, role: profile?.role, id: selectedNewsLetterId?.id });
            toast.success(res.data.message);
            queryClient.invalidateQueries(['quesView']);
            // handleNavigation('/dashboard/newsletter/newsletterLists');
            setShowModalEdit(false)
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'update failed');
            reset();
        }
    };


    return (
        <>
            <div className=" flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-3">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Newsletter
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer"
                                >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardBody className="space-y-3">
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
                                    {
                                        selectedNewsLetterId?.issuenumber && (

                                            <div>
                                                <Typography variant="small" className="mb-1">
                                                    Issue Number
                                                </Typography>
                                                <Input label="" type="number"  {...register("issuenumber", { required: true })} />
                                                {/* {errors.faqen && <p className="text-red-500 text-sm">This field is required</p>} */}
                                            </div>
                                        )
                                    }



                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            Title
                                        </Typography>
                                        <Input label=""  {...register("title", { required: true })} />
                                        {errors.fansen && <p className="text-red-500 text-sm">This field is required</p>}
                                    </div>






                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            Short Summary
                                        </Typography>
                                        <Textarea label="" rows={4} {...register("short_summary", { required: true })} />
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
                                                        required: "pdf is required",
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
                                                                            setPdfPreview(URL.createObjectURL(file));

                                                                            // Auto-upload the image
                                                                            await handlePdfUpload(file);
                                                                        } else {
                                                                            onChange(null);
                                                                            setPdfPreview(null);
                                                                            setUploadedPdfUrl('');
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
                                                                    pdf uploaded successfully
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
                                                            {...register("pdflink", { required: true })}
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
                                        <Select
                                            label="Select Status"
                                            value={watch("status")}
                                            onChange={(val) => setValue("status", val, { shouldValidate: true })}
                                        >
                                            <Option value="published">Published</Option>
                                            <Option value="draft">Draft</Option>
                                        </Select>

                                    </div>

                                    <div className='hidden'>
                                        <Typography variant="small" className="mb-4">
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

                                        {/* Hidden input to store date in form */}
                                        <input
                                            type="hidden"
                                            value={new Date().toISOString().split("T")[0]} // saves YYYY-MM-DD
                                            {...register("published_date")}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className='pt-4'>
                                        <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px] ' >
                                            + Update Newsletter
                                        </Button>
                                    </div>
                                </CardBody>
                            </form>

                        </div>
                    </div>
                </Modal>
            </div>
        </>

    )
}
