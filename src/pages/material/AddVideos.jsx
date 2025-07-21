
import React, { useState } from "react";
import { Upload, Link as LinkIcon, Play, X, Check, AlertCircle } from "lucide-react";


export default function AddVideos() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const mockVideo = {
        id: videoId,
        title: "Sample Video Title - How to Build Amazing UIs",
        thumbnail: `/placeholder.svg?height=180&width=320&query=youtube video thumbnail`,
        duration: "12:34",
        channel: "Tech Channel",
      };

      setUploadedVideos((prev) => [mockVideo, ...prev]);
      setSuccess("Video link uploaded successfully!");
      setUrl("");
      setIsLoading(false);
    }, 1500);
  };

  const removeVideo = (id) => {
    setUploadedVideos((prev) => prev.filter((video) => video.id !== id));
  };

  return (
  <div className="mx-auto p-6 space-y-6 bg-white">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">YouTube Link Upload</h1>
        <p className="text-gray-500">Upload YouTube videos by pasting their links below</p>
      </div>

      {/* Upload Form */}
      <div className="border rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b flex items-center gap-2 font-semibold text-lg">
          <LinkIcon className="h-5 w-5" />
          Add YouTube Video
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-100 text-red-700 p-3 rounded-md text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 bg-green-100 text-green-700 p-3 rounded-md text-sm">
                <Check className="h-4 w-4 mt-0.5" />
                <span>{success}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="border rounded-lg bg-gray-100 p-6 grid md:grid-cols-3 gap-6 text-sm">
        {[
          { step: 1, title: "Copy YouTube URL", desc: "Copy the link from any YouTube video" },
          { step: 2, title: "Paste & Upload", desc: "Paste the URL and click upload" },
          { step: 3, title: "Manage Videos", desc: "View and organize your uploaded videos" },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
              {step}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Uploaded Videos */}
      {uploadedVideos.length > 0 ? (
        <div className="border rounded-lg">
          <div className="px-6 py-4 border-b flex justify-between items-center font-semibold text-lg">
            <span>Uploaded Videos ({uploadedVideos.length})</span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              {uploadedVideos.length} video{uploadedVideos.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="p-6 space-y-4">
            {uploadedVideos.map((video) => (
              <div
                key={video.id}
                className="flex gap-4 p-4 border rounded-md hover:bg-gray-50 transition"
              >
                <div className="relative w-32 h-20 flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.channel}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="border px-2 py-0.5 rounded bg-white">ID: {video.id}</span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">Ready</span>
                  </div>
                </div>
                <button
                  onClick={() => removeVideo(video.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
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
  )
}
