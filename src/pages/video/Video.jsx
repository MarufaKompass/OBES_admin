
import VideoList from "./VideoList";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addVideo, adminProfile } from "@/hooks/ReactQueryHooks";
import { Upload, Link as LinkIcon} from "lucide-react";

export default function Videos() {

  const { mutateAsync } = useMutation({ mutationFn: addVideo ,
       onSuccess: () => {
      queryClient.invalidateQueries(['videoLists']);
    }
  });
  const { register,handleSubmit,reset, formState: { errors }} = useForm()



  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

const onSubmit = async (data) => {
  console.log('data', data)
  try {
    const res = await mutateAsync({ addVideoData: data, role: profile?.role });
    toast.success(res.data.message);
    console.log(res);
    reset();
  } catch (err) {
    reset();
  }
};

  return (
    <div className="mx-auto p-6 space-y-6 bg-white mt-12">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <h1 className="text-3xl font-bold">YouTube Link Upload</h1>
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
                    label="https://www.youtube.com/embed?v=..."
                    className="flex-1 px-3 py-2 border rounded-md "

                  />
                </div>
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
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
              {step}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Uploaded Videos */}
      <VideoList></VideoList>
    </div>
  )
}
