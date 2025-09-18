import React from 'react'
import Modal from '@/components/modal/Modal';
import { X } from "lucide-react";
import { adminProfile, deleteQuestion } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import MainButton from '@/components/mainButton/MainButton';


export default function ModalDeleteQuestion({ selectedQuestion, showModalDelete, setShowModalDelete }) {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const queryClient = useQueryClient();

    const { mutate: deleteQues } = useMutation({
        mutationFn: ({ role, qid }) => deleteQuestion({ role, qid }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['questions']);
            setShowModalDelete(false);
        },
        onError: () => {
            toast.error("Failed to delete question");
        }
    });

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <Modal isOpen={showModalDelete} onClose={() => setShowModalDelete(false)}>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">
                        <div
                            onClick={() => setShowModalDelete(false)}
                            className=" text-[#000] ml-2 cursor-pointer flex justify-end"
                        >
                            <X size={24} />
                        </div>
                        <div className='flex justify-center'>

                            <div>
                                <div className='flex justify-center'>
                                    <div className='w-[70px] h-[70px] rounded-full  border-4 border-[#7B1E19] flex justify-center items-center'>
                                        <X size={32} color='#7B1E19' />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h2 className='mt-4 text-h3 text-mainHeading font-heading font-semibold'>Are You sure?</h2>
                                    <p className='mt-4 text-paragraphFont text-paragraph font-heading'>Do you really want to delete these Question? This <br></br>process cannot be undone.</p>
                                </div>
                                <div className='flex gap-3 justify-center mt-5'>
                                    <MainButton variant="outlined" onClick={() => setShowModalDelete(false)}>Cancel</MainButton>
                                    <MainButton variant="primary" onClick={() => deleteQues({ role: profile?.role, qid: selectedQuestion?.qid })}>Delete</MainButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
