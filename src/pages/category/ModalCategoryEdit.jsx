import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import Modal from '@/components/modal/Modal'
import { useMutation,useQueryClient , useQuery } from "@tanstack/react-query";
import { adminProfile, editCategory } from "@/hooks/ReactQueryHooks";
import { CardBody, Typography, Button, Input } from "@material-tailwind/react";

export default function ModalCategoryEdit({ setShowModalEdit, showModalEdit, selectedCategory }) {
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
  if (selectedCategory && profile) {
    reset({
      catname: selectedCategory.catname || "",
      catbangla: selectedCategory.catbangla || "",
      catby: profile?.logmobile || "",
    });
  }
}, [selectedCategory, profile, reset]);




    const { mutateAsync } = useMutation({
         mutationFn: editCategory,
         onSuccess: (res) => {
            queryClient.invalidateQueries(["catView"]);
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
            editCategoryData: data,
            role: profile?.role,
            catid: selectedCategory?.catid 
        });

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
                                            profile?.logmobile && (
                                                <Input label="category by" type="number"  {...register("catby", { required: true })}
                                                    value={profile?.logmobile} />
                                            )
                                        }

                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Update Category
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
