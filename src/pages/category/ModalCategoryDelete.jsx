import React from 'react'
import { X } from "lucide-react";
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { adminProfile, deleteCategory } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function ModalCategoryDelete({ selectedCategory, showModalDelete, setShowModalDelete }) {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const queryClient = useQueryClient();

    const { mutate: deleteQues } = useMutation({
        mutationFn: ({ role, catid }) => deleteCategory({ role, catid }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['category']);
            setShowModalDelete(false);
        },
        onError: () => {
            toast.error("Failed to delete question");
        }
    });

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <ConfirmModal
                isOpen={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                title="Are You sure?"
                message="Do you really want to delete these Category? This process cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="outlined"
                icon={<X size={32} color="#7B1E19" />}
                iconColor="#7B1E19"
                onConfirm={() => deleteQues({ role: profile?.role, catid: selectedCategory?.catid })}
            />

        </div>
    )
}
