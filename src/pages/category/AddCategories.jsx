import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { TagIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from '@tanstack/react-query';
import { addCategory, adminProfile } from '@/hooks/ReactQueryHooks';
import { Card, CardHeader, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import MainButton from '@/components/mainButton/MainButton';
import CustomInput from '@/components/input/CustomInput';

export default function AddCategories() {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const navigate = useNavigate();
  const { mutateAsync } = useMutation({ mutationFn: addCategory });

  const onSubmit = async (data) => {
    try {
      const res = await mutateAsync({ addCatData: data, role: profile?.role });
      toast.success(res.data.message);
      navigate('/dashboard/category/categoryLists');
      reset();
    } catch (err) {
      // toast.error(err?.response?.data?.message || 'Add category failed');
      setError(err?.response?.data?.message)
      reset();
    }
  };

  if (profileLoading) return <div className="flex justify-center items-center h-screen"><span>Loading...</span></div>;
  if (profileError) return <div className="flex justify-center items-center h-screen"><span>Error loading profile.</span></div>;

  return (
    <div className="h-screen flex items-center justify-center px-4 mt-4 bg-background shadow-xl rounded-2xl">
      <Card className="w-full mx-auto md:max-w-lg shadow-lg rounded-2xl border ">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex flex-col items-center bg-[#7B1E19] pb-6 rounded-t-2xl"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 mt-4">
            <TagIcon className="h-6 w-6 text-white" />
          </div>
          <Typography variant="h4" className="font-semibold text-whiteHeading font-heading">
            Create New Category
          </Typography>
          <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
            Create a new category for your posts
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CardBody className="space-y-6 px-5 py-8 ">
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-mainHeading font-heading">
                Category Name (English)
              </Typography>
              <CustomInput
                name="catname"
                label="Category name (English)"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />

              {errors.catname && (
                <Typography color="red" className="text-xs mt-1">{errors.catname.message}</Typography>
              )}
            </div>
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-mainHeading font-heading">
                ক্যাটাগরি নাম (বাংলা)
              </Typography>
              <CustomInput
                name="catbangla"
                label="ক্যাটাগরি নাম (বাংলা)"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />
              {errors.catbangla && (
                <Typography color="red" className="text-xs mt-1">{errors.catbangla.message}</Typography>
              )}
            </div>
          <div className='hidden'>
              {profile?.logmobile && (
               <CustomInput
               type='number'
                name="catby"
                label="ক্যাটাগরি নাম (বাংলা)"
                defaultValue={profile?.logmobile}
                register={register}
                rules={{ required: error }}
                errors={errors}
              />            
            )}
          </div>
            <div className="flex gap-3 pt-6">
              <MainButton
                variant="outlined"
                fullWidth

                onClick={() => navigate('/dashboard/category/categoryLists')}
                className="border-accent  text-mainHeading"
                disabled={isSubmitting}
              >
                Cancel
              </MainButton>

              <div className="w-full">
                <MainButton variant="primary" fullWidth type="submit">
                  {isSubmitting ? 'Creating...' : 'Create Category'}
                </MainButton>
              </div>

            </div>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
