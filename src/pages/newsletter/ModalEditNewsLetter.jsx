import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { adminProfile, CategoryView, editQuestion, updateNewsletter } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function ModalEditNewsLetter({ setShowModalEdit, showModalEdit, selectedNewsLetterId }) {
    const [pdfName, setPdfName] = useState(null);
    const [preview, setPreview] = useState(null);
    const [issueNo, setIssueNo] = useState('');
    const [title, setTitle] = useState('');
    const [summery, setSummery] = useState('');
    const [status, setStatus] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        if (selectedNewsLetterId) {
            setIssueNo(selectedNewsLetterId?.issuenumber);
            setTitle(selectedNewsLetterId?.title);
            setSummery(selectedNewsLetterId?.short_summary);
            setStatus(selectedNewsLetterId?.setStatus);

        }

    }, [selectedNewsLetterId]);


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



    const { mutateAsync } = useMutation({ mutationFn: updateNewsletter });

    const onSubmit = async (data) => {
        console.log('data', data)
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
                                        issueNo && (
                                            <div>
                                                <Typography variant="small" className="mb-1">
                                                    Issue Number
                                                </Typography>
                                                <Input label="" defaultValue={issueNo} type="number" {...register("issuenumber", { required: true })} />
                                                {errors.faqen && <p className="text-red-500 text-sm">This field is required</p>}
                                            </div>
                                        )
                                    }


                                    {/* Answer EN */}
                                    {title && (
                                        <div>
                                            <Typography variant="small" className="mb-1">
                                                Title
                                            </Typography>
                                            <Input label="" defaultValue={title} {...register("title", { required: true })} />
                                            {errors.fansen && <p className="text-red-500 text-sm">This field is required</p>}
                                        </div>
                                    )
                                    }


                                    {/* FAQ BN */}

                                    {/* Answer BN */}
                                    {summery && (
                                        <div>
                                            <Typography variant="small" className="mb-1">
                                                Short Summary
                                            </Typography>
                                            <Textarea label="" rows={4} defaultValue={summery} {...register("short_summary", { required: true })} />
                                            {errors.fansbn && <p className="text-red-500 text-sm">This field is required</p>}
                                        </div>
                                    )}


                                    {/* Image Upload */}
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <div>
                                                <div>
                                                    <Typography variant="small" className="mb-2">
                                                        Upload Image
                                                    </Typography>
                                                    <Controller
                                                        name="coverimage"
                                                        control={control}
                                                        defaultValue={null}
                                                        // rules={{
                                                        //     required: "Image is required",
                                                        //     validate: {
                                                        //         isImage: (file) => {
                                                        //             if (!file) return true; 
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

                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <div>
                                                    <Typography variant="small" className="mb-2">
                                                        Upload PDF
                                                    </Typography>
                                                    <Controller
                                                        name="pdfdoc"
                                                        control={control}
                                                        defaultValue={null}
                                                        // rules={{
                                                        //     required: "PDF is required",
                                                        //     validate: {
                                                        //         isPDF: (file) => {
                                                        //             if (!file) return true;
                                                        //             return file.type === 'application/pdf' || "File must be a PDF";
                                                        //         }
                                                        //     }
                                                        // }}
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
                                        {/* 
                            {errors.status && (
                                <Typography variant="small" color="red" className="mt-1">
                                    This field is required
                                </Typography>
                            )} */}
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
