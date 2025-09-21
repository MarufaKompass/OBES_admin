import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'
import { adminProfile, editDoctorVideo } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DynamicSelect from '@/components/select/DynamicSelect';
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';

const statusTypes = [
    { qId: '1', label: 'Draft', value: 'draft' },
    { qId: '2', label: 'Published', value: 'published' },
    { qId: '3', label: 'Archived', value: 'archived' },
];


export default function ModalVideoDoctorEdit({ setShowModalEdit, showModalEdit, selectedVideo }) {
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
        if (selectedVideo && profile) {
            reset({
                title: selectedVideo.title || "",
                description: selectedVideo.description || "",
                link: selectedVideo.link || "",
                status: selectedVideo?.status || "",
            });
        }
    }, [selectedVideo, profile, reset]);


    const { mutateAsync } = useMutation({ mutationFn: editDoctorVideo });

    const onSubmit = async (data) => {
        try {
            const res = await mutateAsync({ editVideoDoctorData: data, role: profile?.role, id: selectedVideo?.id });
            toast.success(res.data.message);
            setShowModalEdit(false)
            queryClient.invalidateQueries(['videoDoctorLists']);
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
                                        <Typography variant="small" color="blue-gray" className="text-mainHeading font-heading text-paragraphFont font-medium">
                                            video Title
                                        </Typography>
                                        <CustomInput
                                            name="title"
                                            label=" Video Title"
                                            register={register}
                                            rules={{ required: true }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="text-mainHeading font-heading text-paragraphFont font-medium">
                                            Video Description
                                        </Typography>

                                        <CustomInput
                                            name="description"
                                            label="Video Description"
                                            register={register}
                                            rules={{ required: true }}
                                        />

                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="text-mainHeading font-heading text-paragraphFont font-medium">
                                            Video Embed Link
                                        </Typography>


                                        <CustomInput
                                            name="link"
                                            label="Embedded youtube link"
                                            register={register}
                                            rules={{ required: true }}
                                        />
                                    </div>

                                    <div className="space-y-2 mt-3 ">
                                        <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                            Status
                                        </Typography>
                                        <DynamicSelect
                                            name="status"
                                            label="Select Question Type"
                                            options={statusTypes}
                                            register={register}
                                            rules={{ required: true }}
                                            placeholder="-- Select Status Type --"
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
                                        <MainButton variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </MainButton>

                                        <MainButton  variant="primary" fullWidth type="submit" >
                                            Update Video
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
