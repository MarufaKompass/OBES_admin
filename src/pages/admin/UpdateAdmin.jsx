import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import Modal from '@/components/modal/Modal'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { adminProfile, editAdmin, editCategory } from "@/hooks/ReactQueryHooks";
import { CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";
import DatePicker from '@/components/datepicker/Datepicker';

export default function UpdateAdmin({ setShowModalEdit, showModalEdit, selectedAdmin }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [smsNumber, setSmsNumber] = useState(null);
    console.log("selectedAdmin", selectedAdmin?.role)
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm()

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });


    const handleSmsNumber = (e) => {
        const newValue = e.target.value;
        setSmsNumber(newValue);
        setValue("smsmobile", newValue);
    };

    useEffect(() => {
        if (selectedAdmin && profile) {
            reset({
                fulname: selectedAdmin.fulname || "",
                ccode: selectedAdmin.ccode || "",
                logmobile: selectedAdmin.logmobile || "",
                smsmobile: selectedAdmin.smsmobile || "",
                ogender: selectedAdmin.ogender || "",
                logemail: selectedAdmin.logemail || "",
                dob: selectedAdmin.dob || "",
                role: selectedAdmin.role || "",

            });
        }
    }, [selectedAdmin, profile, reset]);




    const { mutateAsync } = useMutation({
        mutationFn: editAdmin,
        onSuccess: (res) => {
            queryClient.invalidateQueries(["adminList"]);
            toast.success(res.data.message);
            setShowModalEdit(false)
            reset();

        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Update failed")
        }
    });

    const onSubmit = async (data) => {
        console.log('data', data)
        await mutateAsync({
            editAdminData: data,
            role: profile?.role,

            id: selectedAdmin?.id,
            fulname: selectedAdmin.fulname,
            ccode: selectedAdmin.ccode,
            logmobile: selectedAdmin.logmobile,
            smsmobile: selectedAdmin.smsmobile,
            ogender: selectedAdmin.ogender,
            logemail: selectedAdmin.logemail,
            dob: selectedAdmin.dob,
            role: selectedAdmin.role,
        });

    };

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-4">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Admin Info
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
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                full Name
                                            </Typography>
                                            <Input
                                                type="text"

                                                {...register("fulname", { required: true })} />

                                        </div>

                                        <div className="space-y-2">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                Email
                                            </Typography>
                                            <Input
                                                type="email"

                                                {...register("logemail", { required: true })} />

                                        </div>

                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Typography className="font-poppins text-[14px] font-medium">
                                                Code
                                            </Typography>
                                            <Input
                                                name="ccode"
                                                value="88"
                                                {...register("ccode", { required: true })}
                                                className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                                            />
                                        </div>


                                        <div className="">
                                            <div>
                                                <Typography className="font-poppins  text-[14px] font-medium">
                                                    Mobile Number
                                                </Typography>
                                                <input
                                                    name="logmobile"
                                                    type="number"
                                                    autoComplete="logmobile"
                                                    {...register("logmobile", { required: true })}
                                                    onChange={handleSmsNumber}
                                                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="hidden">
                                        <div>
                                            <Typography className="font-poppins  text-[14px] font-medium">
                                                Role
                                            </Typography>
                                            <input
                                                name="role"
                                                type="text"
                                                autoComplete="role"
                                                {...register("role", { required: true })}
                                                className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                                            />
                                        </div>
                                    </div>




                                    {smsNumber && (
                                        <div className="">
                                            <label className="font-poppins  text-[14px]">
                                                sms Number
                                            </label>
                                            <input
                                                value={smsNumber}
                                                onChange={handleSmsNumber}
                                                name="smsmobile"
                                                type="number"
                                                autoComplete="smsmobile"
                                                placeholder="Mobile Number"
                                                {...register("smsmobile", { required: true })}
                                                className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                                            />
                                        </div>
                                    )}

                                    <div className="">

                                        <Typography className="font-poppins  text-[14px] font-medium">
                                            Select Gender
                                        </Typography>
                                        <div className='mt-2'>
                                            <Select
                                                label="Select gender"
                                                value={watch("ogender")}
                                                onChange={(val) => {
                                                    setValue("ogender", val, { shouldValidate: true });
                                                }}
                                            >
                                                <Option value="male">Male</Option>
                                                <Option value="female">Female</Option>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full ">
                                        <div className='mb-1'>
                                            <label className="text-[14px] font-poppins font-medium">
                                                Date Of Birth
                                            </label>
                                        </div>
                                        <Controller
                                            name="dob"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    showCalendar={showCalendar}
                                                    setShowCalendar={setShowCalendar}
                                                    {...field}
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    format="YYYY-MM-DD"
                                                    className="w-full mt-2"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Update Admin
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
