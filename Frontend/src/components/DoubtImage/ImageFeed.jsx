import { useState, useEffect } from "react";
import { getImages, deleteMedia } from "../../api/MediaApi";

function ImageDoubtFeed() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (mediaId) => {
    try {
      await deleteMedia(mediaId);
      setData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== mediaId),
      }));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getImages();
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="p-10 text-center text-gray-500 animate-pulse font-medium">
          Loading community doubts...
        </div>
      </div>
    );
  }

  if (!data?.images || data.images.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800">No doubts found</h2>
          <p className="mt-2 text-gray-500">
            Everything looks clear! Check back later or be the first to post a
            doubt.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Community Doubts
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Scroll through and help the community solve problems.
        </p>
      </header>

      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {data.images.map((doubt) => (
          <article
            key={doubt._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative group transition-all hover:border-indigo-100"
          >
            <button
              onClick={() => handleDelete(doubt._id)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 text-gray-400 hover:text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            <div className="p-4 flex items-center gap-3">
              <img
                src={
                  doubt.user?.avatar?.url || "https://via.placeholder.com/40"
                }
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-50"
                alt="avatar"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {doubt.user?.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(doubt.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="relative aspect-video w-full bg-gray-100">
              <img
                src={doubt.imageUrl}
                alt={doubt.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                {doubt.title}
              </h3>
              <p className="text-gray-600 mb-4">{doubt.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium text-indigo-600">
                    {doubt.likes?.length || 0} Likes
                  </span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold shadow-sm transition-all active:scale-95">
                  Solve Doubt
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ImageDoubtFeed;
