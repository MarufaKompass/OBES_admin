import { adminProfile, videoList } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Pencil, Upload,Trash2 } from 'lucide-react';
import ModalVideoEdit from './ModalVideoEdit';
import ModalVideoDelete from './ModalVideoDelete';

export default function VideoList() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleShowingInfoEdit = (video) => {
    setSelectedVideo(video);
    setShowModalEdit(true);
  };

  const handleShowingInfoDelete = (video) => {
    setSelectedVideo(video);
    setShowModalDelete(true);
  };

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile,
  });

  const { data: videoLists } = useQuery({
    queryKey: ['videoLists', profile?.role],
    queryFn: () => videoList(profile?.role),
  });

  return (
    <>
      <div>
        {videoLists?.length > 0 ? (
          <div className="rounded-xl border bg-white shadow-md">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-mainHeading font-heading">
                Uploaded Videos ({videoLists?.length})
              </h2>
            </div>

            {/* Videos Grid */}
            <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videoLists.map((video) => (
                <div
                  key={video.id}
                  className="relative rounded-xl border bg-white shadow-sm hover:shadow-lg transition p-4 flex flex-col"
                >
                  {/* Video */}
                  <div className="rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-44 rounded-lg"
                      src={video?.link}
                      title={video?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex-1">
                    <h3 className="text-lg font-semibold text-mainHeading font-heading  line-clamp-1">
                      {video?.title}
                    </h3>
                    <p className="text-sm text-paragraph font-heading mt-1 line-clamp-2">
                      {video?.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4">
                        <div className="absolute top-4 right-4 flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleShowingInfoEdit(video)}
                      className="p-2 rounded-full bg-primary text-white shadow hover:scale-105 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Delete Button */}
                    <button
                    onClick={() => handleShowingInfoDelete(video)}
                      className="p-2 rounded-full bg-red-500 text-white shadow hover:scale-105 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="border border-dashed rounded-xl p-12 text-center bg-gray-50">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mt-4">No videos uploaded yet</h3>
            <p className="text-gray-500 mt-1">
              Start by pasting a YouTube URL above to upload your first video.
            </p>
            <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mt-4">
              <span className="px-2 py-0.5 border rounded bg-white shadow-sm">youtube.com</span>
              <span className="px-2 py-0.5 border rounded bg-white shadow-sm">youtu.be</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <ModalVideoEdit
        selectedVideo={selectedVideo}
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      />

      <ModalVideoDelete 
      showModalDelete={showModalDelete}
      setShowModalDelete={setShowModalDelete}
      selectedVideo={selectedVideo}
      ></ModalVideoDelete>
    </>
  );
}
