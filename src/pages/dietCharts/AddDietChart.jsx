import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import useNavigator from '@/components/navigator/useNavigate';
import { addDietCharts, adminProfile } from '@/hooks/ReactQueryHooks';
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';

export default function AddDietChart() {
    const { handleNavigation } = useNavigator();
    const [error, setError] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
            setError(err?.response?.data?.message || 'Add Diet Chart failed');
            reset();
        }
    };

    return (
        <>
            <div className=" py-6 flex items-center justify-center px-4 mt-4 bg-background shadow-xl rounded-2xl">
                <Card className="w-full mx-auto md:max-w-2xl shadow-lg rounded-2xl border ">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="flex flex-col items-center bg-[#7B1E19] pb-6 rounded-t-2xl"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 mt-4">
                            <TagIcon className="h-6 w-6 text-white" />
                        </div>
                        <Typography variant="h4" className="font-semibold text-whiteHeading font-heading">
                            Daily Food Diary
                        </Typography>
                        <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
                            দৈনিক খাদ্য ডায়েরি • Track your meals in both languages
                        </Typography>
                    </CardHeader>
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
                                        rules={{ required: error }}
                                        errors={errors}
                                    />

                                    {errors.calorybn && (
                                        <Typography color="red" className="text-xs mt-1">{errors.calorybn.message}</Typography>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                        Calorie (English)
                                    </Typography>
                                    <CustomInput
                                        name="caloryen"
                                        label="Calorie (English)"
                                        register={register}
                                        rules={{ required: error }}
                                        errors={errors}
                                    />

                                    {errors.caloryen && (
                                        <Typography color="red" className="text-xs mt-1">{errors.caloryen.message}</Typography>
                                    )}

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
                                        rules={{ required: error }}
                                        errors={errors}
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
                                        rules={{ required: error }}
                                        errors={errors}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.morn_snacksbn && (
                                        <Typography color="red" className="text-xs mt-1">{errors.morn_snacksbn.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.morn_snacksen && (
                                        <Typography color="red" className="text-xs mt-1">{errors.morn_snacksen.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.lunchbn && (
                                        <Typography color="red" className="text-xs mt-1">{errors.lunchbn.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.lunchen && (
                                        <Typography color="red" className="text-xs mt-1">{errors.lunchen.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.anoon_snacksbn && (
                                        <Typography color="red" className="text-xs mt-1">{errors.anoon_snacksbn.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.anoon_snacksen && (
                                        <Typography color="red" className="text-xs mt-1">{errors.anoon_snacksen.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
                                        rows
                                    />
                                    {errors.dinnerbn && (
                                        <Typography color="red" className="text-xs mt-1">{errors.dinnerbn.message}</Typography>
                                    )}
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
                                        rules={{ required: error }}
                                        errors={errors}
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
                                        rules={{ required: error }}
                                        errors={errors}
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
                                        rules={{ required: error }}
                                        errors={errors}
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
                                        Create diet Chart
                                    </MainButton>
                                </div>

                            </div>
                        </CardBody>
                    </form>
                </Card>
            </div>

        </>


    );
}
