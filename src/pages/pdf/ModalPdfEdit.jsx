import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import Modal from '@/components/modal/Modal'
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';
import DynamicSelect from '@/components/select/DynamicSelect';
import PdfUploadField from '@/components/upload/PdfUploadField';
import ImageUploadField from '@/components/upload/ImageUploadField';
import { CardBody, Typography, Input } from "@material-tailwind/react";
import { adminProfile, updatePdf } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const statusTypes = [
    { qId: '1', label: 'Draft', value: 'draft' },
    { qId: '2', label: 'Published', value: 'published' },
    { qId: '3', label: 'Archived', value: 'archived' },
];

export default function ModalPdfEdit({ setShowModalEdit, showModalEdit, selectedPdfId }) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm()

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    useEffect(() => {
        if (selectedPdfId && profile) {
            reset({
         
                title: selectedPdfId?.title || "",
                short_summary: selectedPdfId?.short_summary || "",
                status: selectedPdfId?.status || "",
                upby: selectedPdfId?.upby || "",
                published_date: selectedPdfId?.published_date || "",
                coverimage: null,
                pdflink: null,


            });

        }
    }, [selectedPdfId, reset]);

    const { mutateAsync } = useMutation({ mutationFn: updatePdf });

    const onSubmit = async (data) => {
      
        try {
            const res = await mutateAsync({ updatePdfData: data, role: profile?.role, id: selectedPdfId?.id });
            toast.success(res.data.message);
            queryClient.invalidateQueries(['quesView']);
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
                                        Update Pdf
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer" >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}  >
                                <CardBody className="space-y-2">

                                    <div className="space-y-2">
                                        <div className="hidden">

                                            <div>
                                                <Input  {...register("upby", { required: true })} />
                                            </div>
                                            <div>
                                                <Input  {...register("published_date", { required: true })} />
                                            </div>
                                        
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
                                            rules={{ required: true }}
                                        />

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
                                            rules={{ required: true }}

                                            rows
                                        />


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
                                                moduleTitle="newsletterimg"

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
                                                moduleTitle="newspdfdoc"

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
                                            rules={{ required: true }}
                                            placeholder="-- Select Status Type --"
                                        />

                                    </div>
                                    <div className="flex gap-3 pt-4 pb-6">
                                        <MainButton fullWidth type="submit" variant='primary' >
                                            + Update PDF
                                        </MainButton>
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
