import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { adminProfile, editExpert } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function ModalExpertUpdate({ setShowModalEdit, showModalEdit, showModalExpert }) {
    const queryClient = useQueryClient();
    const [preview, setPreview] = useState(null);
    const { handleNavigation } = useNavigator();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm()



    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });



    useEffect(() => {
        if (showModalExpert && profile) {
            reset({
                drname: showModalExpert?.drname || "",
                drimg: "",
                hospital: showModalExpert?.hospital || "",
                designation: showModalExpert?.designation || "",
                add_desig: showModalExpert?.add_desig || "",
                add_org: showModalExpert?.add_org || "",
                email: showModalExpert?.email || "",
                mobile: showModalExpert?.mobile || "",
                status: showModalExpert?.status || "",

            });

        }
    }, [showModalExpert, profile, reset]);




    const { mutateAsync } = useMutation({ mutationFn: editExpert });

    const onSubmit = async (data) => {
        try {
            const res = await mutateAsync({
                editExpertData: data,
                role: profile?.role,
                id: showModalExpert?.id
            });
            toast.success(res.data.message);
            handleNavigation('/dashboard/experts/expertsList');
            queryClient.invalidateQueries(['experts']);
            setShowModalEdit(false)
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
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-4">

                            <div className="flex gap-3 justify-between ml-6 border-b  pb-4">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Experts
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
                                <CardBody className="space-y-4">
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Doctor Name
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.drname}
                                            {...register("drname", { required: true })} />
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="font-medium pb-3">
                                            Experts Image
                                        </Typography>
                                        <Controller
                                            name="drimg"
                                            control={control}
                                            defaultValue={null}
                                            render={({ field: { onChange }, fieldState: { error } }) => (
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
                                                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Hospital/Clinic
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.hospital}
                                            {...register("hospital", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Primary Designation
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.designation}
                                            {...register("designation", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Secondary Designation
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.add_desig}
                                            {...register("add_desig", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Organization
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.add_org}
                                            {...register("add_org", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Email Address
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.email}
                                            {...register("email", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Phone Number
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={showModalExpert?.mobile}
                                            {...register("mobile", { required: true })}

                                        />
                                    </div>
                                    <div className="space-y-2 ">
                                        <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                                            Status
                                        </Typography>
                                        <Controller
                                            name="status"
                                            control={control}
                                            defaultValue={showModalExpert?.status}
                                            render={({ field }) => (
                                                <Select
                                                    label="Select Status"
                                                    value={field.value}
                                                    onChange={(value) => field.onChange(value)}
                                                >
                                                    <Option value="active">Active</Option>
                                                    <Option value="inactive">Inactive</Option>
                                                </Select>
                                            )}
                                        /> </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Edit Expert
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
