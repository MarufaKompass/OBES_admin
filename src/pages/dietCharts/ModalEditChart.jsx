import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import { adminProfile, editDietChart } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';

export default function ModalEditChart({ setShowModalEdit, showModalEdit, selectedDietData }) {
    console.log("selectedDietData", selectedDietData)
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
        if (selectedDietData && profile) {
            reset({
                calorybn: selectedDietData.calorybn || "",
                caloryen: selectedDietData.caloryen || "",

                breakfastbn: selectedDietData.breakfastbn || "",
                breakfasten: selectedDietData.breakfasten || "",

                morn_snacksbn: selectedDietData.morn_snacksbn || "",
                morn_snacksen: selectedDietData.morn_snacksen || "",

                lunchbn: selectedDietData.lunchbn || "",
                lunchen: selectedDietData.lunchen || "",

                anoon_snacksbn: selectedDietData.anoon_snacksbn || "",
                anoon_snacksen: selectedDietData.anoon_snacksen || "",

                dinnerbn: selectedDietData.dinnerbn || "",
                dinneren: selectedDietData.dinneren || "",

                sleep_milkbn: selectedDietData.sleep_milkbn || "",
                sleep_milken: selectedDietData.sleep_milken || "",

            });
        }
    }, [selectedDietData, profile, reset]);

    const { mutateAsync } = useMutation({ mutationFn: editDietChart });
    const onSubmit = async (data) => {
        try {
            const res = await mutateAsync({ editDietData: data, role: profile?.role, id: selectedDietData?.id });
            toast.success(res.data.message);
            queryClient.invalidateQueries(['newsList']);
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
                        <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-3">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Diet Chart
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer"
                                >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <CardBody className="space-y-2 px-5 py-8 ">
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Calorie (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="calorybn"
                                                label="Calorie (Bangla)"
                                                register={register}
                                                rules={{ required: true }}

                                            />


                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Calorie (English)
                                            </Typography>
                                            <CustomInput
                                                name="caloryen"
                                                label="Calorie (English)"
                                                register={register}
                                                rules={{ required: true }}

                                            />



                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Breakfast (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="breakfastbn"
                                                label="Breakfast (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}
                                                rows
                                            />
                                            {errors.breakfastbn && (
                                                <Typography color="red" className="text-xs mt-1">{errors.breakfastbn.message}</Typography>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Breakfast (English)
                                            </Typography>
                                            <CustomInput
                                                name="breakfasten"
                                                label="Breakfast (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}
                                                rows
                                            />
                                            {errors.breakfasten && (
                                                <Typography color="red" className="text-xs mt-1">{errors.breakfasten.message}</Typography>
                                            )}
                                        </div>

                                    </div>

                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Morning Snacks (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="morn_snacksbn"
                                                label="Morning Snacks (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Morning Snacks (English)
                                            </Typography>
                                            <CustomInput
                                                name="morn_snacksen"
                                                label="Morning Snacks (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>

                                    </div>
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Lunch (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="lunchbn"
                                                label="Lunch (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Lunch (English)
                                            </Typography>
                                            <CustomInput
                                                name="lunchen"
                                                label="Lunch (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>

                                    </div>

                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Afternoon Snacks (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="anoon_snacksbn"
                                                label="Afternoon Snacks (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Afternoon Snacks (English)
                                            </Typography>
                                            <CustomInput
                                                name="anoon_snacksen"
                                                label="Afternoon Snacks (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>

                                    </div>

                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Dinner (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="dinnerbn"
                                                label="Dinner (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />

                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Dinner (English)
                                            </Typography>
                                            <CustomInput
                                                name="dinneren"
                                                label="Dinner (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />
                                            {errors.dinneren && (
                                                <Typography color="red" className="text-xs mt-1">{errors.dinneren.message}</Typography>
                                            )}
                                        </div>

                                    </div>
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>

                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Before Sleep (বাংলা)
                                            </Typography>
                                            <CustomInput
                                                name="sleep_milkbn"
                                                label="Before Sleep (বাংলা)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />
                                            {errors.sleep_milkbn && (
                                                <Typography color="red" className="text-xs mt-1">{errors.sleep_milkbn.message}</Typography>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                                Before Sleep (English)
                                            </Typography>
                                            <CustomInput
                                                name="sleep_milken"
                                                label="Before Sleep (English)"
                                                register={register}
                                                type="textarea"
                                                rules={{ required: true }}

                                                rows
                                            />
                                            {errors.sleep_milken && (
                                                <Typography color="red" className="text-xs mt-1">{errors.sleep_milken.message}</Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <MainButton
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate('/dashboard/category/categoryLists')}
                                            className="border-accent  text-mainHeading" >
                                            Cancel
                                        </MainButton>

                                        <div className="w-full">
                                            <MainButton variant="primary" fullWidth type="submit">
                                                Update diet Chart
                                            </MainButton>
                                        </div>

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





















