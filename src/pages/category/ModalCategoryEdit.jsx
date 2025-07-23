import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { CategoryView, editCategory, userProfile } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";


export default function ModalCategoryEdit({ setShowModalEdit, showModalEdit, selectedCategory }) {

    // console.log("selectedCategory", selectedCategory)

    const { handleNavigation } = useNavigator();



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { data: userprofile } = useQuery({
        queryKey: ['userprofile'],
        queryFn: userProfile
    });



 useEffect(() => {
  if (selectedCategory && userprofile) {
    reset({
      catname: selectedCategory.catname || "",
      catbangla: selectedCategory.catbangla || "",
      catby: userprofile?.logmobile || "",
    });
  }
}, [selectedCategory, userprofile, reset]);




    const { mutateAsync } = useMutation({ mutationFn: editCategory });

    const onSubmit = async (data) => {
        console.log('data', data)
        try {
            const res = await mutateAsync({ editCategoryData: data, role: userprofile?.role, catid: selectedCategory?.catid });
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

                            <div className="flex gap-3 justify-between ml-6">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Category
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
                                            Category Name (English)
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={selectedCategory?.catname}
                                            {...register("catname", { required: true })} />

                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            ক্যাটাগরি নাম (বাংলা)
                                        </Typography>
                                        <Input
                                            type="text"
                                            defaultValue={selectedCategory?.catbangla}
                                            {...register("catbangla", { required: true })}

                                        />
                                    </div>

                                    <div className="space-y-2 hidden">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Category By
                                        </Typography>
                                        {
                                            userprofile?.logmobile && (
                                                <Input label="category by" type="number"  {...register("catby", { required: true })}
                                                    value={userprofile?.logmobile} />
                                            )
                                        }

                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Add Category
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
