
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Upload, Link as LinkIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoctorVideo, adminProfile } from "@/hooks/ReactQueryHooks";
import { Typography, Input, Select, Option } from "@material-tailwind/react";
import ListsVideo from "./ListsVideo";
export default function AddVideos() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: addDoctorVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(['videoDoctorLists']);
    }
  });
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm()



  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const res = await mutateAsync({ addDoctorVideoData: data, role: profile?.role });
      toast.success(res.data.message);
       queryClient.invalidateQueries(['videoDoctorLists']);  
      reset();
    } catch (err) {
      reset();
    }
  };



  return (
    <div className="mx-auto p-6 mt-6 space-y-6 bg-white rounded-lg">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">YouTube Link Upload</h1>
        <p className="text-gray-500">Upload YouTube videos by pasting their links below</p>
      </div>

      {/* Upload Form */}
      <div className="border rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b flex items-center gap-2 font-semibold text-lg">
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
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Video Title
                  </Typography>
                  <Input label=" Video Title" type="text"     {...register("title", { required: true })} />
                </div>
                <div className="space-y-2 mt-4">
                  <Typography variant="small" color="blue-gray" className="font-medium ">
                    Video Description
                  </Typography>
                  <Input label="Video Description" type="text"     {...register("description", { required: true })} />
                </div>
                <div className="space-y-2 mt-4">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Video Embed Link
                  </Typography>
                  <Input
                    {...register("link", { required: true })}
                    type="url"
                    label="https://www.youtube.com/embed/..."
                    className="flex-1 px-3 py-2 border rounded-md "

                  />
                </div>
                <div className="space-y-2 ">
                  <Typography variant="small" color="blue-gray" className="font-medium font-poppins pb-1">
                    Status
                  </Typography>
                  <Controller
                    name="status"
                    control={control}

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
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primaryBg text-white px-10 py-2 rounded-md flex items-center gap-2 disabled:opacity-60 mt-4">
                  <>
                    <Upload className="h-4 w-4" />
                    Submit
                  </>
                </button>
              </div>
            </div>
          </form>
        <ListsVideo></ListsVideo>
        </div>
      </div>
    </div>
  )
}
