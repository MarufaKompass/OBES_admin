import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X, Loader2, CheckCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'
import { adminProfile, editEducation, uploadImage } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EducationEditForm({ showModalEdit, setShowModalEdit, selectedEdu }) {
  const [preview, setPreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
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
    if (uploadedImageUrl) {
      setValue("mimage", uploadedImageUrl);
    }
  }, [uploadedImageUrl, setValue]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append('uploadimg', file);
      formData.append('moduletitle', 'obeseduimg');

      // Call your uploadImage API
      const response = await uploadImage(formData);

      if (response?.data?.data?.filename) {
        const imageUrl = response?.data?.data?.filename;
        setUploadedImageUrl(imageUrl);
        toast.success('Image uploaded successfully!');
        return imageUrl;
      } else {
        // throw new Error('No image URL returned from server');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error?.response?.data?.message || 'Image upload failed');
      return null;
    } finally {
      setImageUploading(false);
    }
  };


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
                    <Typography variant="small" className="mb-2">
                      Select Category
                    </Typography>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div>
                          <Select
                            label="Select Category"
                            value={field.value || ""}
                            onChange={(val) => field.onChange(val)}>
                            <Option value="Adult">Adult</Option>
                            <Option value="Child">Child</Option>
                            <Option value="Both">Both</Option>
                          </Select>
                        </div>
                      )}
                    />
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



                  <div className="space-y-2 mt-3">
                    <Typography variant="small" color="blue-gray" className="font-medium pb-3">
                      Upload Image*
                    </Typography>

                    <Controller
                      name=""
                      control={control}
                      rules={{
                        required: "Image is required",
                        validate: {
                          isImage: (file) => {
                            if (!file) return true;
                            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                            return validTypes.includes(file.type) || "File must be an image (JPEG, PNG, JPG, GIF, SVG)";
                          }
                        }
                      }}
                      render={({ field: { onChange }, fieldState: { error } }) => (
                        <>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                              disabled={imageUploading}
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  onChange(file);
                                  setPreview(URL.createObjectURL(file));

                                  // Auto-upload the image
                                  await handleImageUpload(file);
                                } else {
                                  onChange(null);
                                  setPreview(null);
                                  setUploadedImageUrl('');
                                }
                              }}
                              label="Choose File"
                            />

                            {/* Upload Status Indicator */}
                            {imageUploading && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                              </div>
                            )}
                          </div>


                          {imageUploading && (
                            <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading image...
                            </p>
                          )}

                          {uploadedImageUrl && !imageUploading && (
                            <p className="text-green-500 text-sm mt-1 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Image uploaded successfully
                            </p>
                          )}

                          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                        </>
                      )}
                    />
                  </div>


                  <div className='hidden'>
                    {uploadedImageUrl && (
                      <div>
                        <Input
                          {...register("mimage", { required: true })}
                          type="text"
                          readOnly
                        />
                      </div>
                    )}

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
                            onChange={(val) => field.onChange(val)}>
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
