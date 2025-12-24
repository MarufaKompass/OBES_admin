import { toast } from 'react-toastify';
import Modal from '@/components/modal/Modal'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"
import { Pencil, X, Loader2, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminProfile, editExpert, uploadImage } from "@/hooks/ReactQueryHooks";
import { CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";
import ImageUploadField from '@/components/upload/ImageUploadField';
import CustomInput from '@/components/input/CustomInput';
import DynamicSelect from '@/components/select/DynamicSelect';
import MainButton from '@/components/mainButton/MainButton';

const statusTypes = [
  { id: '1', label: 'Active', value: 'active' },
  { id: '2', label: 'inactive', value: 'inactive' },

];


export default function ModalExpertUpdate({ setShowModalEdit, showModalEdit, showModalExpert }) {
  const queryClient = useQueryClient();
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

                  <div className="space-y-2 grid md:grid-cols-2 grid-cols-1 gap-3">

                    <div className="space-y-2" >
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Doctor Name
                      </Typography>
                      <CustomInput
                        name="drname"
                        label="Doctor Name"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Expert Image
                      </Typography>

                      <ImageUploadField
                        name="drimg"
                        control={control}
                        register={register}
                        label="Expert Image*"
                        moduleTitle="obesexpertimg"

                      />
                    </div>
                  </div>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    <div className="space-y-2">

                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Hospital/Clinic
                      </Typography>
                      <CustomInput
                        name="hospital"
                        label="Doctor Name"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Organization
                      </Typography>
                      <CustomInput
                        name="add_org"
                        label="Organization Name"
                        register={register}
                        rules={{ required: true }}
                      />

                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Primary Designation
                      </Typography>
                      <CustomInput
                        name="designation"
                        label="Designation Name"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Secondary Designation
                      </Typography>
                      <CustomInput
                        name="add_desig"
                        label="Designation Name"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Email
                      </Typography>
                      <CustomInput
                        name="email"
                        label="Email"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Phone Number
                      </Typography>
                      <CustomInput
                        name="mobile"
                        label="Designation Name"
                        register={register}
                        rules={{ required: true }}
                      />
                    </div>
                  </div>


                  <div className="space-y-2 ">
                    <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                      Status
                    </Typography>

                    <DynamicSelect
                      name="status"
                      label="Select Status Type"
                      options={statusTypes}
                      register={register}
                      rules={{ required: true }}
                      placeholder="-- Select Status Type --"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <MainButton variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                      Cancel
                    </MainButton>

                    <MainButton fullWidth type="submit" variant="primary">
                      Edit Expert
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
