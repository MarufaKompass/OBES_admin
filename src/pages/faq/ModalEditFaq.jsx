import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { SquarePen, X } from "lucide-react";
import Modal from '@/components/modal/Modal'
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';
import { adminProfile, editFaq } from "@/hooks/ReactQueryHooks";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CardBody, Typography, Input } from "@material-tailwind/react";

export default function ModalEditFaq({ selectedFaq, showModalEdit, setShowModalEdit }) {
    console.log("selectedFaq", selectedFaq)
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });


    useEffect(() => {
        if (selectedFaq && profile) {
            reset({
                faqen: selectedFaq.faqen || "",
                fansen: selectedFaq.fansen || "",
                faqbn: selectedFaq.faqbn || "",
                fansbn: selectedFaq.fansbn || "",
                faqby: profile?.logmobile || "",
            });
        }
    }, [selectedFaq, profile, reset]);

    const { mutateAsync } = useMutation({
        mutationFn: editFaq,
        onSuccess: (res) => {
            queryClient.invalidateQueries(["faqViews"]);
            toast.success(res.data.message);
            setShowModalEdit(false)
            reset();

        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Update failed")
        }
    });

    const onSubmit = async (data) => {
        console.log('data', data)
        await mutateAsync({
            editFaqData: data,
            role: profile?.role,
            id: selectedFaq?.faqid
        });

    };

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-4">
                                <div className="flex gap-3 ">
                                    <div className="flex items-center">
                                        <SquarePen size={24} color="#7B1E19" />
                                    </div>
                                    <Typography color="#333" className="text-h5 font-bold font-heading">
                                        Update Faq
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer"
                                >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}  >
                                <CardBody className="space-y-6">
                                    <div>
                                        <div className="space-y-2">
                                            <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                                FAQ Question (English)
                                            </Typography>

                                            <CustomInput
                                                name="faqen"
                                                register={register}
                                                rules={{ required: true }}
                                            />
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                                FAQ Answer (English)
                                            </Typography>
                                            <CustomInput
                                                name="fansen"
                                                type="textarea"
                                                register={register}
                                                rules={{ required: true }}
                                                rows
                                            />
                                        </div>

                                        <div className="space-y-2 mt-4">
                                            <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                                FAQ  প্রশ্ন (বাংলা)
                                            </Typography>

                                            <CustomInput
                                                name="faqbn"
                                                register={register}
                                                rules={{ required: true }}
                                            />

                                        </div>

                                        <div className="space-y-2 mt-4">
                                            <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                                FAQ উত্তর (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="fansbn"
                                                type="textarea"
                                                register={register}
                                                rules={{ required: true }}
                                                rows
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 hidden">
                                        {
                                            profile?.logmobile && (
                                                <Input label="category by" type="number"  {...register("catby", { required: true })}
                                                    value={profile?.logmobile} />
                                            )
                                        }
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <MainButton variant="outlined" fullWidth >
                                            Cancel
                                        </MainButton>

                                        <MainButton fullWidth type="submit" >
                                            Update FAQ
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
