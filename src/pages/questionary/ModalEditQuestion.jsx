import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form"
import { CardBody, Typography, Button, Input, Select, Option } from "@material-tailwind/react";
import Modal from '@/components/modal/Modal'

import useNavigator from '@/components/navigator/useNavigate';
import { CategoryView, editQuestion, userProfile } from "@/hooks/ReactQueryHooks";
import { useMutation, useQuery } from "@tanstack/react-query";



const questionTypes = [
    { qId: '1', qatype: 'Input', value: 'input' },
    { qId: '2', qatype: 'Checkbox', value: 'checkbox' },
    { qId: '3', qatype: 'Radio', value: 'radio' },
    { qId: '4', qatype: 'Dropdown', value: 'dropdown' },
];
const statusTypes = [
    { qId: '1', qstatus: 'Draft', value: 'draft' },
    { qId: '2', qstatus: 'Published', value: 'published' },
    { qId: '3', qstatus: 'Archived', value: 'archived' },

];

export default function ModalEditQuestion({ setShowModalEdit, showModalEdit, selectedQuestion }) {
    const { handleNavigation } = useNavigator();
    const [catId, setCatId] = useState("");
    const [status, setStatus] = useState("");
    const [questionId, setQuestionId] = useState('');
    const [options, setOptions] = useState([{ qaoptioneng: '', qaoptionbng: '' }]);

    const addOption = () => {
        setOptions([...options, { qaoptioneng: '', qaoptionbng: '' }]);
    };

    useEffect(() => {
        if (selectedQuestion) {
            setCatId(selectedQuestion?.catid);
            setStatus(selectedQuestion?.qstatus);
            setQuestionId(selectedQuestion?.qatype);
            if (selectedQuestion?.qaoptioneng && selectedQuestion?.qaoptionbng) {
                const engOptions = selectedQuestion?.qaoptioneng;
                const bngOptions = selectedQuestion?.qaoptionbng;

                const combinedOptions = engOptions.map((eng, index) => ({
                    qaoptioneng: eng,
                    qaoptionbng: bngOptions[index] || "",
                }));

                setOptions(combinedOptions);
            } else {
                setOptions([{ qaoptioneng: "", qaoptionbng: "" }]);
            }
        }

    }, [selectedQuestion]);


    const removeOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const categoryId = (e) => {
        setCatId(e.target.value)
    }
    const statusLevel = (e) => {
        setStatus(e.target.value)
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

    const { data: userprofile } = useQuery({
        queryKey: ['userprofile'],
        queryFn: userProfile
    });


    const { data: catView } = useQuery({
        queryKey: ['catView', userprofile?.role],
        queryFn: () => CategoryView(userprofile?.role)
    });



    const { mutateAsync } = useMutation({ mutationFn: editQuestion });

    const onSubmit = async (data) => {
        console.log('data', data)
        try {
            const res = await mutateAsync({ editQuesData: data, role: userprofile?.role, qid: selectedQuestion?.qid });
            toast.success(res.data.message);
            handleNavigation('/questionary/questionnaireLists');
            reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'update failed');
            reset();
        }
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">

                            <div className="flex gap-3 justify-between ml-6">
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
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Select Category
                                        </Typography>
                                        <select
                                            label="Select Category"
                                            {...register("catid", { required: true })}
                                            value={catId}
                                            onChange={categoryId}
                                            className="border py-[10px] px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px] text-[#688794]"
                                        >
                                            <option value="">
                                                -- Select Category --
                                            </option>
                                            {catView?.map((category) => (
                                                <option key={category?.catid} value={category?.catid} >
                                                    {category?.catname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Question (English)
                                        </Typography>
                                        <Input label="Question English" type="text" defaultValue={selectedQuestion?.qeng}   {...register("qeng", { required: true })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            প্রশ্ন (বাংলা)
                                        </Typography>
                                        <Input label="প্রশ্ন বাংলা" type="text" defaultValue={selectedQuestion?.qbang}   {...register("qbang", { required: true })} />
                                    </div>

                                    <div className="space-y-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Select Question Type
                                        </Typography>
                                        {
                                            questionId && (
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
                                                            {question?.qatype}
                                                        </option>
                                                    ))}
                                                </select>
                                            )
                                        }

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
                                                    ) : questionId === 'input' ? (
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
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Select Status Type
                                        </Typography>

                                        {
                                            status && (
                                                <select
                                                    {...register("qstatus", { required: true })}
                                                    label="Select Status"
                                                    value={status}
                                                    onChange={statusLevel}
                                                    className="border py-[10px] px-2 border-[#B0BEC5] rounded-[6px] w-full text-[14px] text-[#688794]"
                                                >
                                                    <option value="">
                                                        -- Select Status Type --
                                                    </option>
                                                    {statusTypes?.map((status) => (
                                                        <option key={status?.qId} value={status?.value} >
                                                            {status?.qstatus}
                                                        </option>
                                                    ))}
                                                </select>
                                            )
                                        }

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
                                        <Button variant="outlined" fullWidth onClose={() => setShowModalEdit(false)}>
                                            Cancel
                                        </Button>

                                        <Button fullWidth type="submit" className='bg-primaryBg'>
                                            Add Questionnaires
                                        </Button>
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
