import { toast } from 'react-toastify';
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import Modal from '@/components/modal/Modal';
import CustomInput from '@/components/input/CustomInput';
import { CardBody, Typography } from "@material-tailwind/react";
import DynamicSelect from '@/components/select/DynamicSelect';
import MainButton from '@/components/mainButton/MainButton';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminProfile, CategoryView, editQuestion } from "@/hooks/ReactQueryHooks";

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

export default function ModalEditQuestion({ setShowModalEdit, showModalEdit, selectedQuestion }) {
 

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()


    const queryClient = useQueryClient();
    const [catId, setCatId] = useState("");
    const [questionId, setQuestionId] = useState('');
  
    const [options, setOptions] = useState([{ qaoptioneng: '', qaoptionbng: '' }]);


    const categoryId = (e) => {
        setCatId(e.target.value)
    }

    const selectQuestionId = (e) => {
        setQuestionId(e.target.value)
    }


    const qtype = watch("qatype");

    useEffect(() => {
        selectQuestionId({ target: { value: qtype } });
    }, [qtype]);


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { data: catView } = useQuery({
        queryKey: ['catView', profile?.role],
        queryFn: () => CategoryView(profile?.role)
    });
    const addOption = () => {
        setOptions([...options, { qaoptioneng: '', qaoptionbng: '' }]);
    };



    useEffect(() => {
        if (selectedQuestion && profile) {
            reset({
                catid: selectedQuestion?.catid || "",
                qstatus: selectedQuestion?.qstatus || "",
                qatype: selectedQuestion?.qatype || "",
                qeng: selectedQuestion?.qeng || "",
                qbang: selectedQuestion?.qbang || "",
                qby: selectedQuestion?.qby || "",
                qaoptioneng: selectedQuestion?.qaoptioneng || [""],
                qaoptionbng: selectedQuestion?.qaoptionbng || [""],
            });
        }
    }, [selectedQuestion, profile, reset]);

    const removeOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };



    const { mutateAsync } = useMutation({ mutationFn: editQuestion });

    const onSubmit = async (data) => {
      
        try {
            const res = await mutateAsync({ editQuesData: data, role: profile?.role, qid: selectedQuestion?.qid });
            toast.success(res.data.message);
            queryClient.invalidateQueries(['quesView']);
            setShowModalEdit(false)
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Update failed")
            reset();
        }
    };
    return (
        <>
            <div className=" flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6 border-b pb-3">
                                <div className="flex gap-3 ">
                                    <Pencil size={24} color="#7B1E19" />
                                    <Typography color="#333" className=" text-xl font-bold">
                                        Update Question
                                    </Typography>
                                </div>
                                <div
                                    onClick={() => setShowModalEdit(false)}
                                    className=" text-[#000] cursor-pointer"
                                >
                                    <X size={32} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}  >
                                <CardBody className="space-y-6">
                                    <div className="space-y-2">

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
                                            rules={{ required: true }}
                                            placeholder="-- Select Category Type --"
                                        />

                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" className="font-medium text-mainHeading font-heading">
                                            Question (English)
                                        </Typography>
                                        <CustomInput
                                            name="qeng"
                                            label="Enter question in English"
                                            register={register}
                                            rules={{ required: true }}
                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                            প্রশ্ন (বাংলা)
                                        </Typography>
                                        <CustomInput
                                            name="qbang"
                                            label="বাংলায় প্রশ্ন লিখুন"
                                            register={register}
                                            rules={{ required: true }}
                                        />

                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                            Select Question Type
                                        </Typography>

                                        <DynamicSelect
                                            name="qatype"
                                            label="Select Question Type"
                                            register={register}
                                            onChange={selectQuestionId}
                                            options={questionTypes}
                                            defaultValue={questionId}
                                            placeholder="-- Select Question Type --"
                                        />
                                    </div>

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
                                                                    className="text-white bg-primary hover:bg-primary px-4 py-[6px] text-[12px] rounded-[4px] mb-4"
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
                                    <div className="space-y-2 ">
                                        <Typography variant="small" color="blue-gray" className="font-medium text-mainHeading font-heading">
                                            Select Status Type
                                        </Typography>
                                        <DynamicSelect
                                            name="qstatus"
                                            label="Select Question Type"
                                            options={statusTypes}
                                            register={register}
                                            // rules={{ required: true }}
                                            placeholder="-- Select Status Type --"
                                        />
                                    </div>
                                    <div className=''>
                                        {profile?.role && (
                                            <div className="space-y-2 ">
                                                <CustomInput
                                                    name="qby"
                                                    register={register}
                                                    rules={{ required: true }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <MainButton variant="outlined" fullWidth onClick={() => setShowModalEdit(false)}>
                                            Cancel
                                        </MainButton>
                                        <MainButton fullWidth type="submit" >
                                            Update Questionnaires
                                        </MainButton>
                                    </div>
                                </CardBody>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>

    )
}
