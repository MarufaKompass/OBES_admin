
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addFaq, adminProfile } from '@/hooks/ReactQueryHooks';
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';


export default function AddFaq() {
    const { handleNavigation } = useNavigator();
    const [error, setError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { mutateAsync } = useMutation({ mutationFn: addFaq });
    const onSubmit = async (data) => {
        console.log('data', data)

        try {
            const res = await mutateAsync({ addFaqData: data, role: profile?.role });
            toast.success(res.data.message);
            handleNavigation('/dashboard/faq/faqLists');
            reset();
        } catch (err) {
            setError(err?.response?.data?.message);
            reset();
        }
    };
    return (
        <>
            <div className="h-screen flex items-center justify-center px-4 mt-4 bg-background shadow-xl rounded-2xl">
                <Card className="w-full mx-auto md:max-w-lg shadow-lg rounded-2xl border ">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="flex flex-col items-center bg-[#7B1E19] pb-6 rounded-t-2xl"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 mt-4">
                            <TagIcon className="h-6 w-6 text-white" />
                        </div>
                        <Typography variant="h4" className="font-semibold text-whiteHeading font-heading">
                            Add New Frequently Asked Questions
                        </Typography>
                        <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
                            Create a new frequently asked questions for your posts
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}  >
                        <CardBody className="space-y-6">
                            <div className="space-y-2">
                                <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                    FAQ Question (English)
                                </Typography>
                                <CustomInput
                                    name="faqen"
                                    label="FAQ Question (English)"
                                    register={register}
                                    rules={{ required: error }}
                                    errors={errors}
                                />

                                {errors.faqen && (
                                    <Typography color="red" className="text-xs mt-1">{errors.faqen.message}</Typography>
                                )}

                            </div>
                            <div className="space-y-2">
                                <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                    FAQ Answer (English)
                                </Typography>
                                <CustomInput
                                    name="fansen"
                                    label="FAQ Answer (English)"
                                    register={register}
                                    rules={{ required: error }}
                                    errors={errors}
                                    type='textarea'
                                    rows
                                />
                                {errors.faqen && (
                                    <Typography color="red" className="text-xs mt-1">{errors.fansen.message}</Typography>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                    FAQ  প্রশ্ন (বাংলা)
                                </Typography>
                                <CustomInput
                                    name="faqbn"
                                    label="FAQ  প্রশ্ন (বাংলা)"
                                    register={register}
                                    rules={{ required: error }}
                                    errors={errors}
                                />

                                {errors.faqbn && (
                                    <Typography color="red" className="text-xs mt-1">{errors.faqbn.message}</Typography>
                                )}

                            </div>
                            <div className="space-y-2">

                                <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                    FAQ উত্তর (বাংলা)
                                </Typography>
                                <CustomInput
                                    name="fansbn"
                                    label=" FAQ উত্তর (বাংলা)"
                                    register={register}
                                    rules={{ required: error }}
                                    errors={errors}
                                    type='textarea'
                                    rows
                                />

                                {errors.fansbn && (
                                    <Typography color="red" className="text-xs mt-1">{errors.fansbn.message}</Typography>
                                )}
                            </div>

                            <div className="space-y-2 hidden">
                                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                    Category By
                                </Typography>
                                {
                                    profile?.logmobile && (
                                        <Input type="number" value={profile?.logmobile}  {...register("faqby", { required: true })} />
                                    )
                                }
                            </div>
                            <div className=" pt-4 pb-6">
                                <MainButton fullWidth type="submit" variant='primary' >
                                    + Add FAQ
                                </MainButton>
                            </div>
                        </CardBody>
                    </form>
                </Card>
            </div>
        </>
    )
}
