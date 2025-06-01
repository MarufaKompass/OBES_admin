import { toast } from 'react-toastify';
import React, { useState } from "react";
import { TagIcon } from "lucide-react";
import { useForm } from "react-hook-form"
import { Card, CardHeader, CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addQuestion, CategoryView, userProfile } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function Questionnaire() {
  const [catId, setCatId] = useState('');


  const categoryId = (e) => {
    setCatId(e.target.value)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { handleNavigation } = useNavigator();



  const { data: catView } = useQuery({
    queryKey: ['catView'],
    queryFn: CategoryView
  });

  const { mutateAsync } = useMutation({ mutationFn: addQuestion });
  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const res = await mutateAsync(data);
      toast.success(res.data.message);
      handleNavigation('dashboard/questionary/questionnaireLists');
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
      reset();
    }
  };
  const { data: userprofile } = useQuery({
    queryKey: ['userprofile'],
    queryFn: userProfile
  });
  console.log("userprofile", userprofile?.logmobile)
  return (
    <>
      <Typography variant="h4" color="blue-gray" className="mb-12 mt-12">Add Questionnaires</Typography>
      <div className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader
            floated={false}
            shadow={false}
            className="flex flex-col items-center bg-transparent"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <TagIcon className="h-6 w-6 text-primaryBg" />
            </div>
            <Typography variant="h4" color="blue-gray">
              Add New Questionnaires
            </Typography>
            <Typography color="gray" className="text-center font-normal text-sm">
              Create a new Question for your posts
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}  >
            <CardBody className="space-y-6">
              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Select Category
                </Typography>
                <select
                  label="Select Category"
                  value={catId}
                  onChange={categoryId}
                  className="border py-2 px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px]"
                >
                  <option value="" disabled >
                    -- Select Category --
                  </option>
                  {catView?.map((category) => (
                    <option key={category?.catid} value={category?.catid} >
                      {category?.catname}
                    </option>
                  ))}
                </select>
              </div>
              {
                catId && (
                  <div className="space-y-2 hidden">
                    <Input label="Question name" value={catId}   {...register("catid", { required: true })} />
                  </div>
                )
              }

              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Question (English)
                </Typography>
                <Input label="Question name" type="text"   {...register("qeng", { required: true })} />
              </div>
              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  প্রশ্ন (বাংলা)
                </Typography>
                <Input label="Question name" type="text"   {...register("qbang", { required: true })} />
              </div>
              <div className="space-y-2 hidden">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Question By
                </Typography>
                {
                  userprofile?.logmobile && (
                    <Input label="category by" type="number"   {...register("qby", { required: true })} />
                  )
                }

              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outlined" fullWidth>
                  Cancel
                </Button>

                <Button fullWidth type="submit" className='bg-primaryBg'>
                  Add Category
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </>

  )
}
