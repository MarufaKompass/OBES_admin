import { adminProfile, videoList } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Pencil, Upload } from 'lucide-react';
import ModalVideoEdit from './ModalVideoEdit';

export default function VideoList() {

    const [selectedVideo, setSelectedVideo] = useState(null)
    const [showModalEdit, setShowModalEdit] = useState(null)


    const handleShowingInfoEdit = (id) => {
        setSelectedVideo(id);
        setShowModalEdit(true)
    }

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });

    const { data: videoLists } = useQuery({
        queryKey: ['videoLists', profile?.role],
        queryFn: () => videoList(profile?.role)
    });


    return (
        <>
            <div>
                {videoLists?.length > 0 ? (
                    <div className="border rounded-lg">
                        <div className="px-6 py-4 border-b flex justify-between items-center font-semibold text-lg">
                            <span>Uploaded Videos ({videoLists?.length})</span>

                        </div>
                        <div className="p-6 space-y-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                            {videoLists.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex gap-4 p-4 border rounded-md hover:bg-gray-50 transition relative"
                                >
                                    <div className="flex gap-4">
                                        <div className="video-container">
                                            <iframe
                                                width="200px"
                                                height="100px"
                                                src={video?.link}
                                                title="Video Player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            // allowFullScreen
                                            ></iframe>
                                        </div>

                                        <div className="flex items-center">
                                            <div>
                                                <h3 className="font-medium">{video?.title}</h3>
                                                <p className="font-normal text-sm">{video?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='absolute top-3 left-48'>
                                        <div className="flex gap-2">

                                            <button className="mr-2 cursor-pointer border bg-primaryBg border-[#f1f1f1] p-2 rounded-full" onClick={() => handleShowingInfoEdit(video)}>
                                                <Pencil size={13} color='#fff' />
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="border border-dashed rounded-lg p-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium">No videos uploaded yet</h3>
                        <p className="text-gray-500">
                            Start by pasting a YouTube URL above to upload your first video
                        </p>
                        <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                            <span>Supports:</span>
                            <span className="border px-2 py-0.5 rounded">youtube.com</span>
                            <span className="border px-2 py-0.5 rounded">youtu.be</span>
                        </div>
                    </div>
                )}
            </div>
            <ModalVideoEdit selectedVideo={selectedVideo} showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit}></ModalVideoEdit>
        </>

    )
}
