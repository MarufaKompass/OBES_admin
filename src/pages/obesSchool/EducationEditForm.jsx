import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'
import { editEducation } from '@/hooks/ReactQueryHooks';
import { useMutation } from '@tanstack/react-query';

export default function EducationEditForm({ showModalEdit, setShowModalEdit, selectedEdu }) {
    console.log(" selectedEdu", selectedEdu)
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            category: selectedEdu?.category || "",
            modnum: selectedEdu?.modnum || "",
            modtype: selectedEdu?.modtype || "",
            topic: selectedEdu?.topic || "",
            modinfo: selectedEdu?.modinfo || "",
            mimage: selectedEdu?.mimage || "",

        },
    });


    useEffect(() => {
        if (selectedEdu) {
            reset({
                category: selectedEdu?.category,
                modnum: selectedEdu?.modnum,
                modtype: selectedEdu?.modtype,
                topic: selectedEdu?.topic,
                modinfo: selectedEdu?.modinfo,
                mimage: selectedEdu?.mimage,

            });
        }
    }, [selectedEdu, reset]);


    const { mutateAsync } = useMutation({ mutationFn: editEducation });
    const onSubmit = async (data) => {
        console.log('data', data)
        try {
            const res = await mutateAsync({ editEducationData: data, role: profile?.role, id: selectedEdu?.id });
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
                                    className=" text-[#000] cursor-pointer"
                                >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardBody className="space-y-1">

                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            Category
                                        </Typography>
                                        <Input label="" type="text" {...register("category", { required: true })} />

                                    </div>



                                    {/* Answer EN */}
                                    <div>
                                        <Typography variant="small" className="mb-1">
                                            Title
                                        </Typography>
                                        <Input label="" type='number' {...register("modnum", { required: true })} />

                                    </div>


                                    <div className="">
                                        <Typography variant="small" className="mb-2">
                                            Select Status
                                        </Typography>
                                        <Controller
                                            name="modnum"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <div>
                                                    <Typography variant="small" className="mb-2">Select Status</Typography>
                                                    <Select
                                                        label="Select Status"
                                                        value={field.value || ""}   // bind value
                                                        onChange={(val) => field.onChange(val)} // bind onChange
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
