
import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addFaq, adminProfile } from '@/hooks/ReactQueryHooks';


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

    const { mutateAsync } = useMutation({ mutationFn: addFaq });
    const onSubmit = async (data) => {
        console.log('data', data)
        
        try {
            const res = await mutateAsync({ addFaqData: data, role: profile?.role });
            toast.success(res.data.message);
            handleNavigation('/dashboard/faq/faqLists');
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'add FAQ failed');
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
                        <CardBody className="space-y-6">
                            <div className="space-y-2">
                                <Typography variant="small" color="blue-gray" className="font-medium pb-1">
                                    FAQ Question (English)
                                </Typography>
                                <Input label="FAQ Question (English)" type="text"     {...register("faqen", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                    FAQ Answer (English)
                                </Typography>
                                <Textarea label=" FAQ Answer (English)"
                                    type="text"
                                    rows={4}
                                    {...register("fansen", { required: true })} />
                            </div>

                            <div className="space-y-2">
                                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                    FAQ  প্রশ্ন (বাংলা)
                                </Typography>
                                <Input label="FAQ  প্রশ্ন (বাংলা)"
                                    type="text"
                                    {...register("faqbn", { required: true })} />

                            </div>
                            <div className="space-y-2">
                                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                    FAQ  উত্তর  (বাংলা)
                                </Typography>
                                <Textarea label="FAQ  উত্তর  (বাংলা)"
                                    type="text"
                                    rows={4}
                                    {...register("fansbn", { required: true })} />

                            </div>

                            <div className="space-y-2 hidden">
                                <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                    Category By
                                </Typography>
                                <Input type="number" value={profile?.logmobile}  {...register("faqby", { required: true })} />
                            </div>
                            <div className="flex gap-3 pt-4 pb-6">
                                {/* <Button variant="outlined" fullWidth >
                                    Cancel
                                </Button> */}

                                <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                                    + Add FAQ
                                </Button>
                            </div>
                        </CardBody>
                    </form>
                </Card>
            </div>
        </>
    )
}
