import React from 'react'
import Modal from '@/components/modal/Modal';
import { X } from "lucide-react";
import { adminProfile, deleteNewsletter } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


export default function ModalDeleteNewsletter({ selectedNewsLetterId, showModalDelete, setShowModalDelete }) {
    console.log(" selectedNewsLetterId", selectedNewsLetterId)
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const queryClient = useQueryClient();

    const { mutate: deleteQues } = useMutation({
        mutationFn: ({ role, id }) => deleteNewsletter({ role, id }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['newsletter']);
            setShowModalDelete(false);
        },
        onError: () => {
            toast.error("Failed to delete newsletter");
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
                                    <div className='w-[70px] h-[70px] rounded-full  border-2 border-[#7B1E19] flex justify-center items-center'>
                                        <X size={32} color='#7B1E19' />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h2 className='mt-4 text-[26px] text-[#333] font-[poppins] font-semibold'>Are You sure?</h2>
                                    <p className='mt-4 text-[14px] text-[#595959] font-[poppins]'>Do you really want to delete these newsletter? This <br></br>process cannot be undone.</p>
                                </div>
                                <div className='flex gap-3 justify-center mt-5'>
                                    <button className=' px-10 py-2 text-[#333] bg-[#f1f1f1]' onClick={() => setShowModalDelete(false)}>Cancel</button>
                                    <button className=' px-10 py-2 bg-[#7B1E19] text-white' onClick={() => deleteQues({ role: profile?.role, id: selectedNewsLetterId?.id })}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
