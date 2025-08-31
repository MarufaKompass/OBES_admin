import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { adminProfile, editVideo } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";


export default function ModalVideoEdit({ setShowModalEdit, showModalEdit, selectedVideo }) {
    const { handleNavigation } = useNavigator();
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
        if (selectedVideo && profile) {
            reset({
                title: selectedVideo.title || "",
                description: selectedVideo.description || "",
                link: selectedVideo.link || "",
                catby: profile?.logmobile || "",
            });
        }
    }, [selectedVideo, profile, reset]);




    const { mutateAsync } = useMutation({ mutationFn: editVideo });

    const onSubmit = async (data) => {
        console.log('data', data)
        try {
            const res = await mutateAsync({ editVideoData: data, role: profile?.role, id: selectedVideo?.id });
            toast.success(res.data.message);
            handleNavigation('/questionary/questionnaireLists');
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'update failed');
            reset();
        }
    };

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-3">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Video Link
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
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            video Title
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={selectedVideo?.title}
                                            {...register("title", { required: true })} />

                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Video Description
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={selectedVideo?.description}
                                            {...register("description", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Video Embed Link
                                        </Typography>
                                        <Input
                                            type="url"
                                            defaultValue={selectedVideo?.link}
                                            {...register("link", { required: true })}

                                        />
                                    </div>

                                    <div className="space-y-2 hidden">

                                        {
                                            profile?.logmobile && (
                                                <Input label="Video ID" type="number"  {...register("upby", { required: true })}
                                                    value={profile?.id} />
                                            )
                                        }

                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Update Video
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
