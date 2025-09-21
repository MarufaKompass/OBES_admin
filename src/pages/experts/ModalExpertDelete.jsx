import React from 'react'
import { X } from "lucide-react";
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { adminProfile, deleteExpert } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function ModalExpertDelete({ showModalExpert, showModalDelete, setShowModalDelete }) {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const queryClient = useQueryClient();

    const { mutate: expertDelete } = useMutation({
        mutationFn: ({ role, id }) => deleteExpert({ role, id }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['expert']);
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
                message="Do you really want to delete these Expert? This process cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="outlined"
                icon={<X size={32} color="#7B1E19" />}
                iconColor="#7B1E19"
                onConfirm={() => expertDelete({ role: profile?.role, id: showModalExpert?.id })}
            />
        </div>
    )
}
