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
    <div className="h-screen flex items-center justify-center px-4 mt-4 bg-background shadow-xl rounded-2xl">
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
              {errors.catid && (
                <Typography color="red" className="text-xs ">
                  {errors.catid.message}
                </Typography>
              )}
            </div>
            {/* Question English */}
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-mainHeading font-heading">
                Question (English)
              </Typography>
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

              <DynamicSelect
                name="qatype"
                label="Select Question Type"
                onChange={selectQuestionId}
                options={questionTypes}
                register={register}
                rules={{ required: error }}
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
            {questionId && (
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
                                defaultValue={options[index]?.qaoptioneng}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-[#414141]"
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
                                defaultValue={options[index]?.qaoptionbng}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm  text-[#414141]"
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
                    ) : questionId === 'input' || questionId === 'clock' ? (
                      <>
                        <div className=" grid-cols-2 gap-4 relative hidden">
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
            )}

            {/* Status Type Select */}
            <div className="space-y-1">
              <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                Select Status Type
              </Typography>

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
