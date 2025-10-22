import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { SquarePen, X } from "lucide-react";
import { useForm } from "react-hook-form"
import Modal from '@/components/modal/Modal'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { adminProfile, editCategory } from "@/hooks/ReactQueryHooks";
import { CardBody, Typography, Input } from "@material-tailwind/react";
import MainButton from '@/components/mainButton/MainButton';
import CustomInput from '@/components/input/CustomInput';

export default function ModalCategoryEdit({ setShowModalEdit, showModalEdit, selectedCategory }) {
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
        if (selectedCategory && profile) {
            reset({
                catname: selectedCategory.catname || "",
                catbangla: selectedCategory.catbangla || "",
                catby: profile?.logmobile || "",
            });
        }
    }, [selectedCategory, profile, reset]);




    const { mutateAsync } = useMutation({
        mutationFn: editCategory,
        onSuccess: (res) => {
            queryClient.invalidateQueries(["catView"]);
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
            editCategoryData: data,
            role: profile?.role,
            catid: selectedCategory?.catid
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
                                        Update Category
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


                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                            Category Name (English)
                                        </Typography>

                                        <CustomInput
                                            name="catname"
                                            register={register}
                                            rules={{ required: true }}
                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                            ক্যাটাগরি নাম (বাংলা)
                                        </Typography>


                                        <CustomInput
                                            name="catbangla"
                                            register={register}
                                            rules={{ required: true }}
                                        />
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
                                            Update Category
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
