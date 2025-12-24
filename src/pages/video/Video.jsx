
import VideoList from "./VideoList";
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Link as LinkIcon } from "lucide-react";
import CustomInput from "@/components/input/CustomInput";
import MainButton from "@/components/mainButton/MainButton";
import { Typography, Input } from "@material-tailwind/react";
import DynamicSelect from "@/components/select/DynamicSelect";
import { addVideo, adminProfile } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery ,useQueryClient } from "@tanstack/react-query";

const statusTypes = [
    { qId: '1', label: 'Draft', value: 'draft' },
    { qId: '2', label: 'Published', value: 'published' },
    { qId: '3', label: 'Archived', value: 'archived' },
];

export default function Videos() {
  const [error, setError] = useState();
const queryClient = useQueryClient(); 

  const { mutateAsync } = useMutation({
    mutationFn: addVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(['videoLists']);
    }
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm()



  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const onSubmit = async (data) => {

    try {
      const res = await mutateAsync({ addVideoData: data, role: profile?.role });
      toast.success(res.data.message);
      reset();
    } catch (err) {
      setError(err?.response?.data?.message)

      reset();
    }
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-white mt-12 rounded-lg">
      {/* Header */}
      <div className="space-y-2 py-6">
        <h1 className="text-h3 font-bold mb-1 text-mainHeading font-heading">YouTube Link Upload</h1>
        <p className="text-paragraph text-paragraphFont font-heading">Upload YouTube videos by pasting their links below</p>
      </div>

      {/* Upload Form */}
      <div className="border rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b flex items-center gap-2 font-semibold text-lg text-mainHeading font-heading">
          <LinkIcon className="h-5 w-5" />
          Add YouTube Video
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <div>

                <div className="hidden">
                  {profile?.id && (
                    <Input
                      {...register("upby", { required: true })}
                      value={profile?.id} />
                  )}

                </div>
                <div className="space-y-2">
                  <Typography variant="small" className="text-mainHeading font-heading text-paragraphFont font-medium">
                    Video Title
                  </Typography>

                  <CustomInput
                    name="title"
                    label=" Video Title"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.title && (
                    <Typography color="red" className="text-xs mt-1">{errors.title.message}</Typography>
                  )}



                </div>
                <div className="space-y-2 mt-4">
                  <Typography variant="small" className="text-mainHeading font-heading text-paragraphFont font-medium">
                    Video Description
                  </Typography>
          

                  <CustomInput
                    name="description"
                    label="Video Description"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />

                  {errors.description && (
                    <Typography color="red" className="text-xs mt-1">{errors.description.message}</Typography>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <Typography variant="small" className="text-mainHeading font-heading text-paragraphFont font-medium">
                    Video Embed Link
                  </Typography>
              

                  <CustomInput
                    name="link"
                    label="Embedded youtube link"
                    register={register}
                    rules={{ required: error }}
                    errors={errors}
                  />



                  {errors.link && (
                    <Typography color="red" className="text-xs mt-1">{errors.link.message}</Typography>
                  )}
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
                    rules={{ required: error }}
                    errors={errors}
                    placeholder="-- Select Status Type --"
                  />

                  {errors.status && (
                    <Typography color="red" className="text-xs ">
                      {errors.status.message}
                    </Typography>
                  )}

                </div>
              </div>
              <div className="mt-4">
                <MainButton type="submit" variant="primary" fullWidth className="">
                  <Upload className="h-4 w-4 mr-2 " />
                  Submit
                </MainButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="border rounded-lg bg-gray-100 p-6 grid md:grid-cols-3 gap-6 text-sm">
        {[
          { step: 1, title: "Copy YouTube URL", desc: "Copy the link from any YouTube video" },
          { step: 2, title: "Paste & Upload", desc: "Paste the URL and click upload" },
          { step: 3, title: "Manage Videos", desc: "View and organize your uploaded videos" },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {step}
            </div>
            <div>
              <h3 className=" text-mainHeading font-heading text-paragraphFont font-bold">{title}</h3>
              <p className=" text-paragraph font-heading text-paragraphFont ">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Uploaded Videos */}
      <VideoList></VideoList>
    </div>
  )
}
