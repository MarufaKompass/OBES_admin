import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button,
    Textarea
} from "@material-tailwind/react";
import { Utensils } from 'lucide-react';

import useNavigator from '@/components/navigator/useNavigate';
import { addDietCharts, adminProfile } from '@/hooks/ReactQueryHooks';

export default function AddDietChart() {
    const { handleNavigation } = useNavigator();

    const { register, handleSubmit, reset } = useForm();

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { mutateAsync } = useMutation({ mutationFn: addDietCharts });

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            const res = await mutateAsync({ addDietChartData: data, role: profile?.role });
            toast.success(res.data.message);
            handleNavigation('/dashboard/dietChart/dietChartLists');
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Add Diet Chart failed');
            reset();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <Card className="w-full  shadow-lg rounded-2xl">
                <CardHeader floated={false} shadow={false} className=" p-8 rounded-t-2xl">
                    <div className="flex flex-col items-center text-white">
                        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-primaryBg to-[#da4e52] bg-opacity-20 rounded-full shadow-md mb-4">
                            <Utensils className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold text-black font-poppins">Daily Food Diary</h1>
                        <p className="text-lg opacity-90 text-black font-poppins">
                            দৈনিক খাদ্য ডায়েরি • Track your meals in both languages
                        </p>
                    </div>
                </CardHeader>

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
                                + Add Diet Chart
                            </Button>
                        </div>
                    </CardBody>
                </form>
            </Card>
        </div>
    );
}
