import { toast } from 'react-toastify';
import React, { useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import Modal from '@/components/modal/Modal'
import CustomInput from '@/components/input/CustomInput';
import MainButton from '@/components/mainButton/MainButton';
import DynamicSelect from '@/components/select/DynamicSelect';
import { CardBody, Typography } from "@material-tailwind/react";
import ImageUploadField from '@/components/upload/ImageUploadField';
import { adminProfile, editEducation } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const categoryTypes = [
  { id: '1', label: 'Adult', value: 'adult' },
  { id: '2', label: 'Child', value: 'child' },

];

const modNo = [
  { id: '1', label: 'M1', value: 'M1' },
  { id: '2', label: 'M2', value: 'M2' },
  { id: '2', label: 'M3', value: 'M3' },
  { id: '2', label: 'M4', value: 'M4' },

];
const modType = [
  { id: '1', label: 'Assessment', value: 'Assessment' },
  { id: '2', label: 'Education', value: 'Education' },
  { id: '2', label: 'Motivation', value: 'Motivation' },
  { id: '2', label: 'Life Style Modification', value: 'Life Style Modification' },

];



export default function EducationEditForm({ showModalEdit, setShowModalEdit, selectedEdu }) {

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });



  useEffect(() => {
    if (selectedEdu) {
      reset({
        mimage: "",
        category: selectedEdu?.category,
        modnum: selectedEdu?.modnum,
        modtype: selectedEdu?.modtype,
        topic: selectedEdu?.topic,
        modinfo: selectedEdu?.modinfo,

      });

    }
  }, [selectedEdu, reset]);



  const { mutateAsync } = useMutation({ mutationFn: editEducation });

  const onSubmit = async (data) => {
    console.log('data', data);

    try {
      const res = await mutateAsync({ editEducationData: data, role: profile?.role, id: selectedEdu?.id });
      toast.success(res?.data?.message);
      queryClient.invalidateQueries(['eduList']);
      reset();
      setShowModalEdit(false);

    } catch (err) {
      toast.error(err?.res?.data?.message);
      reset();
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center bg-gray-100">
        <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

              <div className="flex gap-3 justify-between ml-6 border-b pb-4">
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
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

                    <div className="space-y-2">
                      <Typography variant="small" className="font-medium text-mainHeading font-heading">
                        Select Category*
                      </Typography>
                      <DynamicSelect
                        name="category"
                        label="Select Category Type"
                        options={categoryTypes}
                        register={register}
                        rules={{ required: true }}
                        placeholder="-- Select Category Type --"
                      />
                    </div>
                    <div >
                      <Typography variant="small" className="font-medium text-mainHeading font-heading pb-2">
                        Select Module Number*
                      </Typography>
                      <DynamicSelect
                        name="modnum"
                        label="Select Module Number"
                        options={modNo}
                        register={register}
                        rules={{ required: true }}
                        placeholder="-- Select Module Number --"
                      />
                    </div>
                  </div>
                  <div >
                    <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                      Select Module Type*
                    </Typography>
                    <DynamicSelect
                      name="modtype"
                      label="Select Module Type"
                      options={modType}
                      register={register}
                      rules={{ required: true }}
                      placeholder="-- Select Module Type --"
                    />
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                      Topic*
                    </Typography>
                    <CustomInput
                      name="topic"
                      label="Topic"
                      register={register}
                      rules={{ required: true }}
                    />
                  </div>
                  <div className="space-y-2 mt-3">
                    <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading pb-1">
                      Upload Image*
                    </Typography>

                    <ImageUploadField
                      name="mimage"
                      control={control}
                      register={register}
                      label="Expert Image*"
                      moduleTitle="obeseduimg"

                    />
                  </div>

                  <div>
                    <Typography variant="small" className="font-medium text-mainHeading font-heading pb-1">
                      Module Information*
                    </Typography>

                    <CustomInput
                      name="modinfo"
                      label="mod info"
                      register={register}
                      rules={{ required: true }}
                      errors={errors}
                      rows
                      type='textarea'
                    />

                    {errors.modinfo && (
                      <Typography color="red" className="text-xs mt-1">{errors?.modinfo?.message}</Typography>
                    )}
                  </div>
                  {/* Submit */}
                  <MainButton fullWidth type="submit" variant="primary" >
                    + Update Education
                  </MainButton>
                </CardBody>
              </form>

            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
