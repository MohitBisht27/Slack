import { useState, useEffect } from "react";
import { getImages, deleteMedia } from "../../api/MediaApi";
import { Trash2, Loader2 } from "lucide-react";

function ImageDoubtFeed() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteState, setDeleteState] = useState({
    id: null,
    isDeleting: false,
    showConfirm: false,
  });
  const handleDelete = async (mediaId) => {
    setDeleteState({
      id: mediaId,
      isDeleting: true,
      showConfirm: true,
    });

    try {
      await deleteMedia(mediaId);
      setData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== mediaId),
      }));
    } catch (error) {
      console.error("❌ Delete failed:", error);
      alert("Failed to delete. Please try again.");
    } finally {
      setDeleteState({
        id: null,
        isDeleting: false,
        showConfirm: false,
      });
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-gray-500 animate-pulse font-medium">
            Loading community doubts...
          </p>
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
            Everything looks clear! Check back later.
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
      </header>

      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {data.images.map((doubt) => (
          <article
            key={doubt._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative group transition-all hover:border-indigo-100"
          >
            {/* 🔴 DELETE UI (SAME AS ReelHeader) */}
            <div className="absolute top-4 right-4 z-10">
              {deleteState.showConfirm && deleteState.id === doubt._id ? (
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md animate-in fade-in slide-in-from-right-2">
                  <button
                    onClick={() =>
                      setDeleteState({
                        id: null,
                        isDeleting: false,
                        showConfirm: false,
                      })
                    }
                    className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={deleteState.isDeleting}
                    onClick={() => handleDelete(doubt._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {deleteState.isDeleting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setDeleteState({
                      id: doubt._id,
                      isDeleting: false,
                      showConfirm: true,
                    })
                  }
                  className="p-2 rounded-full bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-md opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {/* 🔴 Header */}
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

            {/* 🔴 Image */}
            <div className="relative aspect-video w-full bg-gray-100">
              <img
                src={doubt.imageUrl}
                alt={doubt.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 🔴 Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                {doubt.title}
              </h3>
              <p className="text-gray-600 mb-4">{doubt.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="font-medium text-indigo-600">
                  {doubt.likes?.length || 0} Likes
                </span>
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
