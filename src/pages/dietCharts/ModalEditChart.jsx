import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import { adminProfile, editDietChart } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardBody className="space-y-8 p-6">

                                    {/* Calorie Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Typography className="font-semibold text-[18px] text-gray-700 mb-2">
                                                Calorie (বাংলা)
                                            </Typography>
                                            <Input label="Calorie (Bangla)" {...register("calorybn", { required: true })} />
                                        </div>
                                        <div>
                                            <Typography className="font-semibold text-[18px] text-gray-700 mb-2">
                                                Calorie (English)
                                            </Typography>
                                            <Input type="number" label="Calorie (English)" {...register("caloryen", { required: true })} />
                                        </div>
                                    </div>

                                    {/* Meals Section */}
                                    {[
                                        { bn: "breakfastbn", en: "breakfasten", label: "Breakfast" },
                                        { bn: "morn_snacksbn", en: "morn_snacksen", label: "Morning Snacks" },
                                        { bn: "lunchbn", en: "lunchen", label: "Lunch" },
                                        { bn: "anoon_snacksbn", en: "anoon_snacksen", label: "Afternoon Snacks" },
                                        { bn: "dinnerbn", en: "dinneren", label: "Dinner" },
                                        { bn: "sleep_milkbn", en: "sleep_milken", label: "Before Sleep" },
                                    ].map((meal, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Typography className="font-semibold text-[18px] text-gray-700 mb-2">
                                                    {meal.label} (বাংলা)
                                                </Typography>
                                                <Textarea label={`${meal.label} (Bangla)`} {...register(meal.bn, { required: true })} />
                                            </div>
                                            <div>
                                                <Typography className="font-semibold text-[18px] text-gray-700 mb-2">
                                                    {meal.label} (English)
                                                </Typography>
                                                <Textarea label={`${meal.label} (English)`} {...register(meal.en, { required: true })} />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button type="submit" fullWidth className="bg-primaryBg text-white font-semibold py-4 text-lg rounded-lg">
                                            + Update Diet Chart
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





















