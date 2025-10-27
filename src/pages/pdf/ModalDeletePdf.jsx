import React from 'react'
import { X } from "lucide-react";
import { adminProfile,deletePdf } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';


export default function ModalDeleteNewsletter({ selectedPdfId, showModalDelete, setShowModalDelete }) {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const queryClient = useQueryClient();

    const { mutate: deleteQues } = useMutation({
        mutationFn: ({ role, id }) => deletePdf({ role, id }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['pdf']);
            setShowModalDelete(false);
        },
        onError: () => {
            toast.error("Failed to delete newsletter");
        }
    });

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <ConfirmModal
                isOpen={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                title="Are You sure?"
                message="Do you really want to delete these Pdf? This process cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="outlined"
                icon={<X size={32} color="#7B1E19" />}
                iconColor="#7B1E19"
                onConfirm={() => deleteQues({ role: profile?.role, id: selectedPdfId?.id })}
            />
        </div>
    )
}
