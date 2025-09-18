import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { TagIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardBody, Typography, Button, Input } from "@material-tailwind/react";

import useNavigator from '@/components/navigator/useNavigate';
import { addQuestion, adminProfile, CategoryView } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomInput from '@/components/input/CustomInput';
import DynamicSelect from '@/components/select/DynamicSelect';
import MainButton from '@/components/mainButton/MainButton';

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
  const [error, setError] = useState();
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
    watch,
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


  const qtype = watch("qatype");

  useEffect(() => {
    selectQuestionId({ target: { value: qtype } });
  }, [qtype]);




  const { mutateAsync } = useMutation({ mutationFn: addQuestion });

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const res = await mutateAsync({ addQuesData: data, role: profile?.role });
      toast.success(res.data.message);
      handleNavigation('/dashboard/questionary/questionnaireLists');
      reset();
    } catch (err) {
      setError(err?.response?.data?.message);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-lg border border-gray-200 bg-white">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex flex-col items-center bg-[#7B1E19] pb-6 rounded-t-2xl"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 mt-4">
            <TagIcon className="h-6 w-6 text-white" />
          </div>
          <Typography variant="h4" className="font-semibold text-whiteHeading font-heading">
            Create New Questionnaire
          </Typography>
          <Typography className="text-center font-normal text-sm text-whiteHeading font-heading opacity-80">
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
              {/* <select
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
              {errors.catid && <p className="text-red-500 text-xs mt-1">Category is required</p>} */}



              <DynamicSelect
                name="catid"
                defaultValue={catId}
                onChange={categoryId}
                label="Select Category Type"
                options={catView?.map(cat => ({ value: cat.catid, label: cat.catname })) || []}
                register={register || ""}
                rules={{ required: error }}
                errors={errors}
                placeholder="-- Select Category Type --"
              />

              {errors.cat && (
                <Typography color="red" className="text-xs ">
                  {errors.cat.message}
                </Typography>
              )}


            </div>


            {/* Hidden Category ID Input for form */}
            {/* {catId && (
              <input type="hidden" value={catId} {...register("catid", { required: true })} />
            )}
 */}



            {/* Question English */}
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-mainHeading font-heading">
                Question (English)
              </Typography>
              {/* <Input
                label="Enter question in English"
                {...register("qeng", { required: true })}
                color={errors.qeng ? "red" : "blue"}
              /> */}

              <CustomInput
                name="qeng"
                label="Enter question in English"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />


              {errors.qeng && (
                <Typography color="red" className="text-xs mt-1">{errors.qeng.message}</Typography>
              )}
            </div>

            {/* Question Bangla */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                প্রশ্ন (বাংলা)
              </Typography>
              {/* <Input
                label="বাংলায় প্রশ্ন লিখুন"
                {...register("qbang", { required: true })}
                color={errors.qbang ? "red" : "blue"}
              />
              {errors.qbang && <p className="text-red-500 text-xs mt-1">Bangla question is required</p>} */}



              <CustomInput
                name="qbang"
                label="বাংলায় প্রশ্ন লিখুন"
                register={register}
                rules={{ required: error }}
                errors={errors}
              />


              {errors.qbang && (
                <Typography color="red" className="text-xs mt-1">{errors.qbang.message}</Typography>
              )}





            </div>

            {/* Question Type Select */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Select Question Type
              </Typography>
              {/* <select
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
              </select> */}

              <DynamicSelect
                name="qatype"
                label="Select Question Type"
                onChange={selectQuestionId}
                options={questionTypes}
                register={register}
                rules={{ required: error }}  // add message here
                errors={errors}
                placeholder="-- Select Question Type --"
              />

              {errors.qatype && (
                <Typography color="red" className="text-xs ">
                  {errors.qatype.message}
                </Typography>
              )}


            </div>

            {/* Options for question types needing options */}
            {(questionId === 'checkbox' || questionId === 'radio' || questionId === 'dropdown') && (
              <div>
                <div className="flex justify-end mb-4">
                  <Button
                    size="sm"
                    onClick={addOption}
                    className="capitalize bg-primary"
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
                          className={`w-full rounded-md border px-3 py-2 text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.qaoptioneng && errors.qaoptioneng[index] ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full rounded-md border px-3 py-2 text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.qaoptionbng && errors.qaoptionbng[index] ? 'border-red-500' : 'border-gray-300'
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
              {/* <select
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
              {errors.qstatus && <p className="text-red-500 text-xs mt-1">Status type is required</p>} */}



              <DynamicSelect
                name="qstatus"
                label="Select Question Type"
                options={statusTypes}
                register={register}
                rules={{ required: error }}
                errors={errors}
                placeholder="-- Select Status Type --"
              />

              {errors.qstatus && (
                <Typography color="red" className="text-xs ">
                  {errors.qstatus.message}
                </Typography>
              )}



            </div>

            {/* Hidden Question By input */}
            {profile?.role && (
              <input type="hidden" value={profile?.role} {...register("qby", { required: true })} />
            )}
          </CardBody>

          {/* Buttons */}
          <div className="flex gap-4 px-10 pb-10 pt-6 justify-end">
            <MainButton
              variant="outlined"
              onClick={() => reset()}

            >
              Cancel
            </MainButton>
            <MainButton
              type="submit"
              variant="primary"
            >
              Add Questionnaire
            </MainButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
