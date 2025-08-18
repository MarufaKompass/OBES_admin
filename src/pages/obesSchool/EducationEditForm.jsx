import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'
import { adminProfile, editEducation } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function EducationEditForm({ showModalEdit, setShowModalEdit, selectedEdu }) {
    const [preview, setPreview] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            category: selectedEdu?.category,
            modnum: selectedEdu?.modnum,
            modtype: selectedEdu?.modtype,
            topic: selectedEdu?.topic,
            mimage: selectedEdu?.mimage || null,
            modinfo: selectedEdu?.modinfo || "",

        },
    });

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    useEffect(() => {
        if (selectedEdu) {
            reset({
                category: selectedEdu?.category,
                modnum: selectedEdu?.modnum,
                modtype: selectedEdu?.modtype,
                topic: selectedEdu?.topic,
                mimage: selectedEdu?.mimage || null,
                modinfo: selectedEdu?.modinfo,

            });

        }
    }, [selectedEdu, reset]);

    const { mutateAsync } = useMutation({ mutationFn: editEducation });

    const onSubmit = async (data) => {
        console.log('data', data);
        // const formData = new FormData();
        // formData.append("mimage", data.mimage);

        try {
            const res = await mutateAsync({ editEducationData: data, role: profile?.role, id: selectedEdu?.id });
            toast.success(res.data.message);
            handleNavigation('/questionary/questionnaireLists');
            reset();
            showModalEdit(false)
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
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Obes School
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer">
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardBody className="space-y-4">

                                    <div >
                                        <Typography variant="small" className="mb-1">
                                            Category
                                        </Typography>
                                        <Input label="" type="text" {...register("category", { required: true })} />

                                    </div>

                                    <div >
                                        <Typography variant="small" className="mb-1">
                                            Module Type
                                        </Typography>
                                        <Input label="" type='text' {...register("modtype", { required: true })} />
                                    </div>
                                    <div >
                                        <Typography variant="small" className="mb-1">
                                            Module Topic
                                        </Typography>
                                        <Input label="" type='text' {...register("topic", { required: true })} />
                                    </div>



                                    <div>
                                        <div>
                                            <div>
                                                <Typography variant="small" className="mb-2">
                                                    Module Image
                                                </Typography>
                                                <Controller
                                                    name="mimage"
                                                    control={control}
                                                    defaultValue={null}
                                                    render={({ field: { onChange } }) => (
                                                        <>
                                                            <Input
                                                                type="file"
                                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        onChange(file);
                                                                        setPreview(URL.createObjectURL(file));
                                                                    } else {
                                                                        onChange(null);
                                                                        setPreview(null);
                                                                    }
                                                                }}
                                                                label="Choose File"
                                                            />

                                                        </>
                                                    )}
                                                />
                                            </div>

                                            {preview && (
                                                <div className="mt-4">
                                                    <img src={preview} alt="Preview" className="h-40 object-cover rounded-md" />
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            Short Summary
                                        </Typography>
                                        <Textarea label="" rows={4}  {...register("modinfo", { required: true })} />
                                    </div>
                                    <div >
                                        <Typography variant="small" className="mb-2">
                                            Select Status
                                        </Typography>
                                        <Controller
                                            name="modnum"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <div>

                                                    <Select
                                                        label="Select Status"
                                                        value={field.value || ""}   
                                                        onChange={(val) => field.onChange(val)}
                                                    >
                                                        <Option value="M1">M1</Option>
                                                        <Option value="M2">M2</Option>
                                                        <Option value="M3">M3</Option>
                                                        <Option value="M4">M4</Option>
                                                    </Select>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    {/* Submit */}
                                    <Button fullWidth type="submit" className='bg-primaryBg font-poppins text-[14px]' >
                                        + Update Education
                                    </Button>
                                </CardBody>
                            </form>

                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}
