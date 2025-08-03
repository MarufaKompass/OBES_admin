
import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addDietCharts, adminProfile } from '@/hooks/ReactQueryHooks';


export default function AddDietChart() {
    const { handleNavigation } = useNavigator();

    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm();


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { mutateAsync } = useMutation({ mutationFn: addDietCharts });
    const onSubmit = async (data) => {
        console.log('data', data)

        try {
            const res = await mutateAsync({ addDietChartData: data, role: profile?.role });
            toast.success(res.data.message);
            handleNavigation('/dashboard/dietChart/dietChartLists');
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'add Diet Chart failed');
            reset();
        }
    };
    return (
        <>

            {/* <Title title="Add Faq"></Title> */}
            <div className="min-h-full flex items-center justify-center px-4 py-8 mt-4">
                <Card className="w-full mx-auto md:px-24 px-2 ">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="flex flex-col items-center bg-transparent"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                            <TagIcon className="h-6 w-6 text-primaryBg" />
                        </div>
                        <Typography variant="h4" color="blue-gray" className='font-poppins'>
                            Add New Frequently Asked Questions
                        </Typography>
                        <Typography color="gray" className="text-center font-normal text-sm font-poppins">
                            Create a new frequently asked questions for your posts
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}  >
                        <CardBody className="space-y-3">

                            <div className='grid grid-cols-2 gap-4'>
                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium pb-1">
                                        Calorie (বাংলা)
                                    </Typography>
                                    <Input label="Calorie (Bangla)"   {...register("calorybn", { required: true })} />
                                </div>
                                <div className="space-y-2">

                                    <Typography variant="small" color="blue-gray" className="font-medium pb-1">
                                        Calorie (English)
                                    </Typography>
                                    <Input label="Calorie (English)" type="number"     {...register("caloryen", { required: true })} />
                                </div>

                            </div>
                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Breakfast (বাংলা)
                                    </Typography>
                                    <Textarea label="Breakfast (Bangla)"
                                        type="text"
                                        {...register("breakfastbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Breakfast (English)
                                    </Typography>
                                    <Textarea label="Breakfast (English)"
                                        type="text"
                                        {...register("breakfasten", { required: true })} />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Morning Snacks (বাংলা)
                                    </Typography>
                                    <Textarea label="Morning Snacks (বাংলা)"
                                        type="text"
                                        {...register("morn_snacksbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Morning Snacks (English)
                                    </Typography>
                                    <Textarea label="Morning Snacks (English)"
                                        type="text"
                                        {...register("morn_snacksen", { required: true })} />
                                </div>
                            </div>





                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Lunch (বাংলা)
                                    </Typography>
                                    <Textarea label="Lunch (বাংলা)"
                                        type="text"
                                        {...register("lunchbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Lunch  (English)
                                    </Typography>
                                    <Textarea label="Lunch (English)"
                                        type="text"
                                        {...register("lunchen", { required: true })} />
                                </div>
                            </div>







                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Afternoon Snacks (বাংলা)
                                    </Typography>
                                    <Textarea label="Afternoon (বাংলা)"
                                        type="text"
                                        {...register("anoon_snacksbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Afternoon Snacks (English)
                                    </Typography>
                                    <Textarea label="Afternoon (English)"
                                        type="text"
                                        {...register("anoon_snacksen", { required: true })} />
                                </div>
                            </div>








                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Dinner (বাংলা)
                                    </Typography>
                                    <Textarea label="Dinner (বাংলা)"
                                        type="text"
                                        {...register("dinnerbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Dinner Snacks (English)
                                    </Typography>
                                    <Textarea label="Dinner (English)"
                                        type="text"
                                        {...register("dinneren", { required: true })} />
                                </div>
                            </div>



                            <div className='grid grid-cols-2 gap-4'>

                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Before Sleep (বাংলা)
                                    </Typography>
                                    <Textarea label="Before Sleep (বাংলা)"
                                        type="text"
                                        {...register("sleep_milkbn", { required: true })} />
                                </div>


                                <div className="space-y-2">
                                    <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                        Before Sleep (English)
                                    </Typography>
                                    <Textarea label="Before Sleep (English)"
                                        type="text"
                                        {...register("sleep_milken", { required: true })} />
                                </div>
                            </div>


                            <div className="flex gap-3 pt-4 pb-6">
                                {/* <Button variant="outlined" fullWidth >
                                    Cancel
                                </Button> */}

                                <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                                    + Add Diet Chart
                                </Button>
                            </div>
                        </CardBody>
                    </form>
                </Card>
            </div>
        </>
    )
}
