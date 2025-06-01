import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation } from '@tanstack/react-query';
import {Card,CardHeader,CardBody,Typography,Input,Button} from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addCategory } from '@/hooks/ReactQueryHooks';
import Title from '@/components/title/TopHeader';
export default function AddCategories() {
   const { handleNavigation } = useNavigator();
    const {
      register,
      handleSubmit,
      // formState: { errors },
      reset,
    } = useForm();
   const { mutateAsync } = useMutation({ mutationFn: addCategory});
  const onSubmit = async (data) => {
    console.log('data', data)
         try {
      const res = await mutateAsync(data);
       toast.success(res.data.message);
      handleNavigation('/');
       reset();
     } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
       reset();
    }
  };
  return (
<> 

        {/* <Title title="Category"></Title> */}
     <div className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-16 mt-4">
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
            Add New Category
          </Typography>
          <Typography color="gray" className="text-center font-normal text-sm">
            Create a new category for your posts
          </Typography>
        </CardHeader>
<form onSubmit={handleSubmit(onSubmit)}  >
        <CardBody className="space-y-6">
          <div className="space-y-2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Category Name (English)
            </Typography>
            <Input label="category name (English)"  type="text"      {...register("catname" , { required: true })}/>
          </div>

          <div className="space-y-2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              ক্যাটাগরি নাম (বাংলা)
            </Typography>
            <Input label="ক্যাটাগরি নাম (বাংলা)"    
                        type="text"
            {...register("catbangla" , { required: true })}/>

          </div>
          <div className="space-y-2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Category By
            </Typography>
            <Input label="category by"   type="number"   {...register("catby" , { required: true })}/>

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
