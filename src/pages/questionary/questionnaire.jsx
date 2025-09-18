import { toast } from 'react-toastify';
import React, { useState } from "react";
import { TagIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardBody, Typography, Button, Input } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addQuestion, adminProfile, CategoryView } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";

const questionTypes = [
  { qId: '1', label: 'Input', value: 'input' },
  { qId: '2', label: 'Checkbox', value: 'checkbox' },
  { qId: '3', label: 'Radio', value: 'radio' },
  { qId: '4', label: 'Dropdown', value: 'dropdown' },
  { qId: '5', label: 'Clock', value: 'clock' },
];
const statusTypes = [
  { qId: '1', label: 'Draft', value: 'draft' },
  { qId: '2', label: 'Published', value: 'published' },
  { qId: '3', label: 'Archived', value: 'archived' },
];

export default function Questionnaire() {
  const [catId, setCatId] = useState('');
  const [options, setOptions] = useState([{ qaoptioneng: '', qaoptionbng: '' }]);
  const [questionId, setQuestionId] = useState('');

  const addOption = () => {
    setOptions([...options, { qaoptioneng: '', qaoptionbng: '' }]);
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const categoryId = (e) => {
    setCatId(e.target.value)
  }
  const selectQuestionId = (e) => {
    setQuestionId(e.target.value)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { handleNavigation } = useNavigator();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const { data: catView } = useQuery({
    queryKey: ['catView', profile?.role],
    queryFn: () => CategoryView(profile?.role)
  });

  const { mutateAsync } = useMutation({ mutationFn: addQuestion });

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const res = await mutateAsync({ addQuesData: data, role: profile?.role });
      toast.success(res.data.message);
      handleNavigation('/dashboard/questionary/questionnaireLists');
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed');
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-lg border border-gray-200 bg-white">
        <CardHeader floated={false} shadow={false} className="flex flex-col items-center bg-transparent pt-10 pb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <TagIcon className="h-8 w-8 text-blue-600" />
          </div>
          <Typography variant="h3" color="blue-gray" className="font-semibold">
            Add New Questionnaire
          </Typography>
          <Typography color="gray" className="text-center font-normal text-md mt-1 max-w-md">
            Create a new question for your posts
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 pb-10">
          <CardBody className="space-y-8">
            {/* Category Select */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Select Category
              </Typography>
              <select
                value={catId}
                onChange={categoryId}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {catView?.map((category) => (
                  <option key={category?.catid} value={category?.catid}>
                    {category?.catname}
                  </option>
                ))}
              </select>
              {errors.catid && <p className="text-red-500 text-xs mt-1">Category is required</p>}
            </div>

            {/* Hidden Category ID Input for form */}
            {catId && (
              <input type="hidden" value={catId} {...register("catid", { required: true })} />
            )}

            {/* Question English */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Question (English)
              </Typography>
              <Input
                label="Enter question in English"
                {...register("qeng", { required: true })}
                color={errors.qeng ? "red" : "blue"}
              />
              {errors.qeng && <p className="text-red-500 text-xs mt-1">English question is required</p>}
            </div>

            {/* Question Bangla */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                প্রশ্ন (বাংলা)
              </Typography>
              <Input
                label="বাংলায় প্রশ্ন লিখুন"
                {...register("qbang", { required: true })}
                color={errors.qbang ? "red" : "blue"}
              />
              {errors.qbang && <p className="text-red-500 text-xs mt-1">Bangla question is required</p>}
            </div>

            {/* Question Type Select */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Select Question Type
              </Typography>
              <select
                {...register("qatype", { required: true })}
                value={questionId}
                onChange={selectQuestionId}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" disabled>
                  -- Select Question Type --
                </option>
                {questionTypes?.map((question) => (
                  <option key={question?.qId} value={question?.value} >
                    {question?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Options for question types needing options */}
            {(questionId === 'checkbox' || questionId === 'radio' || questionId === 'dropdown') && (
              <div>
                <div className="flex justify-end mb-4">
                  <Button
                    variant="gradient"
                    color="blue"
                    size="sm"
                    onClick={addOption}
                    className="capitalize"
                  >
                    + Add Option
                  </Button>
                </div>
                <div className="space-y-4">
                  {options.map((_, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end relative">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Option (English)
                        </label>
                        <input
                          type="text"
                          {...register(`qaoptioneng[${index}]`, { required: true })}
                          placeholder="Enter English option"
                          className={`w-full rounded-md border px-3 py-2 text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                            errors.qaoptioneng && errors.qaoptioneng[index] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          অপশন (বাংলা)
                        </label>
                        <input
                          type="text"
                          {...register(`qaoptionbng[${index}]`, { required: true })}
                          placeholder="বাংলা অপশন লিখুন"
                          className={`w-full rounded-md border px-3 py-2 text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                            errors.qaoptionbng && errors.qaoptionbng[index] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>

                      {options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="absolute top-0 right-0 mt-1 mr-1 text-red-600 hover:text-red-800 p-1 rounded-full transition"
                          title="Delete option"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Type Select */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Select Status Type
              </Typography>
              <select
                {...register("qstatus", { required: true })}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" className="font-medium text-mainHeading font-heading">
                  -- Select Status Type --
                </option>
                {statusTypes?.map((status) => (
                  <option key={status?.qId} value={status?.value} >
                    {status?.label}
                  </option>
                ))}
              </select>
              {errors.qstatus && <p className="text-red-500 text-xs mt-1">Status type is required</p>}
            </div>

            {/* Hidden Question By input */}
            {profile?.role && (
              <input type="hidden" value={profile?.role} {...register("qby", { required: true })} />
            )}
          </CardBody>

          {/* Buttons */}
          <div className="flex gap-4 px-10 pb-10 pt-6 justify-end">
            <Button
              variant="outlined"
              color="gray"
              onClick={() => reset()}
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-36 bg-blue-600 hover:bg-blue-700 transition"
            >
              Add Questionnaire
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
