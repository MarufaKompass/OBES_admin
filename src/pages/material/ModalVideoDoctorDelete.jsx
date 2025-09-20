import React from 'react'
import { X } from "lucide-react";
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { adminProfile, deletedDoctorVideo } from '@/hooks/ReactQueryHooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function ModalVideoDoctorDelete({ selectedVideo, showModalDelete, setShowModalDelete }) {
    // console.log("selectedVideo", selectedVideo)
    const queryClient = useQueryClient();
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { mutate: videoDelete } = useMutation({
        mutationFn: ({ role, id }) => deletedDoctorVideo({ role, id }),
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['videoDoctorLists']);
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
                message="Do you really want to delete these Video? This process cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="outlined"
                icon={<X size={32} color="#7B1E19" />}
                iconColor="#7B1E19"
                onConfirm={() => videoDelete({ role: profile?.role, id: selectedVideo?.id })}
            />
        </div>
    )
}
