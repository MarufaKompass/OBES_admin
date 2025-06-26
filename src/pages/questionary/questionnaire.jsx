import { toast } from 'react-toastify';
import React, { useState } from "react";
import { TagIcon, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { Card, CardHeader, CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addQuestion, CategoryView, userProfile } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";



const questionTypes = [
  { qId: '1', label: 'Input', value: 'input' },
  { qId: '2', label: 'Checkbox', value: 'checkbox' },
  { qId: '3', label: 'Radio', value: 'radio' },
  { qId: '4', label: 'Dropdown', value: 'dropdown' },
];
const statusTypes = [
  { qId: '1', label: 'Draft', value: 'draft' },
  { qId: '2', label: 'Published', value: 'published' },
  { qId: '3', label: 'Archived', value: 'archived' },

];

export default function Questionnaire() {
  const [catId, setCatId] = useState('');

  const [options, setOptions] = useState([{ qaoptioneng: '', qaoptionbng: '' }]);
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
  const [questionId, setQuestionId] = useState('');
  // console.log("questionId", questionId)
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

  const { data: userprofile } = useQuery({
    queryKey: ['userprofile'],
    queryFn: userProfile
  });


  const { data: catView } = useQuery({
    queryKey: ['catView', userprofile?.role],
    queryFn: () => CategoryView(userprofile?.role)
  });

  const { mutateAsync } = useMutation({ mutationFn: addQuestion });

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const res = await mutateAsync({ addQuesData: data, role: userprofile?.role });
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

      <div className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-16 mt-4">
        <Card className="w-full max-w-xl">
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
                  className="border py-[10px] px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px] text-[#688794]"
                >
                  <option value="" disabled>
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
                <Input label="Question English" type="text"   {...register("qeng", { required: true })} />
              </div>
              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  প্রশ্ন (বাংলা)
                </Typography>
                <Input label="প্রশ্ন বাংলা" type="text"   {...register("qbang", { required: true })} />
              </div>

              <div className="space-y-2">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Select Question Type
                </Typography>
                <select
                  {...register("qatype", { required: true })}
                  label="Select Category"
                  value={questionId}
                  onChange={selectQuestionId}
                  className="border py-[10px] px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px] text-[#688794]"
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

              <div className="space-y-2">
                {
                  (questionId === 'checkbox' || questionId === 'radio' || questionId === 'dropdown') ?
                    (
                      <>
                        <div className='flex justify-end'>

                          <button
                            type="button"
                            onClick={addOption}
                            className="text-white bg-primaryBg hover:bg-primaryBg px-4 py-[6px] text-[12px] rounded-[4px] mb-4"
                          >
                            + Add Option
                          </button>
                        </div>
                        {options.map((_, index) => (
                          <div key={index} className="grid grid-cols-2 gap-4 relative">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Option (English)
                              </label>
                              <input
                                type="text"
                                {...register(`qaoptioneng[${index}]`, { required: true })}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="Enter English option"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                অপশন (বাংলা)
                              </label>
                              <input
                                type="text"
                                {...register(`qaoptionbng[${index}]`, { required: true })}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="বাংলা অপশন লিখুন"
                              />
                            </div>

                            <div>
                              {options.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  className="absolute top-0 right-2 text-red-600 hover:text-red-800 text-[12px]"
                                  title="Delete option"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          </div>


                        ))}

                      </>
                    ) : questionId === 'input' ? (
                      <>
                        <div className="grid grid-cols-2 gap-4 relative hidden">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Option (English)
                            </label>
                            <input
                              type="text"
                              {...register('qaoptioneng')}
                              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                              placeholder="Enter English option"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              অপশন (বাংলা)
                            </label>
                            <input
                              type="text"
                              {...register('qaoptionbng')}
                              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                              placeholder="বাংলা অপশন লিখুন"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )
                }

              </div>
              <div className="space-y-2 ">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Select Status Type
                </Typography>
                <select
                  {...register("qstatus", { required: true })}
                  label="Select Category"
                  className="border py-[10px] px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px] text-[#688794]"
                >
                  <option >
                    -- Select Question Type --
                  </option>
                  {statusTypes?.map((status) => (
                    <option key={status?.qId} value={status?.value} >
                      {status?.label}
                    </option>
                  ))}
                </select>
              </div>

              {userprofile?.role && (
                <div className="space-y-2 hidden">
                  <Typography variant="small" color="blue-gray" className="font-medium" >
                    Question By
                  </Typography>
                  <Input label="category by" type="text" marginTop='10px' value={userprofile?.role}  {...register("qby", { required: true })} />
                </div>
              )}


              <div className="flex gap-3 pt-4">
                <Button variant="outlined" fullWidth>
                  Cancel
                </Button>

                <Button fullWidth type="submit" className='bg-primaryBg'>
                  Add Questionnaires
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </>

  )
}
