import { useState, useEffect } from "react";
import { getImages, deleteMedia, toggleMediaLike } from "../../api/MediaApi";
import { Trash2, Loader2, MessageSquare, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import MediaCommentCard from "../CommentCard/MediaCommentCard";

function ImageDoubtFeed() {
  const { user, isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openCommentsId, setOpenCommentsId] = useState(null);

  const [deleteState, setDeleteState] = useState({
    id: null,
    isDeleting: false,
    showConfirm: false,
  });

  const [likeLoading, setLikeLoading] = useState({});

  const toggleComments = (id) => {
    setOpenCommentsId(openCommentsId === id ? null : id);
  };

  const handleLike = async (mediaId) => {
    if (!isAuthenticated) return alert("Please login to like doubts!");
    if (likeLoading[mediaId]) return;

    const originalData = { ...data };

    setData((prev) => ({
      ...prev,
      images: prev.images.map((img) => {
        if (img._id === mediaId) {
          const currentlyLiked = img.isLiked;
          return {
            ...img,
            isLiked: !currentlyLiked,
            likesCount: currentlyLiked
              ? img.likesCount - 1
              : img.likesCount + 1,
          };
        }
        return img;
      }),
    }));

    setLikeLoading((prev) => ({ ...prev, [mediaId]: true }));

    try {
      const response = await toggleMediaLike(mediaId);
      const serverIsLiked = response.data.data.isLiked;

      setData((prev) => ({
        ...prev,
        images: prev.images.map((img) =>
          img._id === mediaId ? { ...img, isLiked: serverIsLiked } : img
        ),
      }));
    } catch (error) {
      console.error("❌ Like failed:", error);
      setData(originalData);
    } finally {
      setLikeLoading((prev) => ({ ...prev, [mediaId]: false }));
    }
  };

  const handleDelete = async (mediaId) => {
    setDeleteState({ id: mediaId, isDeleting: true, showConfirm: true });
    try {
      await deleteMedia(mediaId);
      setData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== mediaId),
      }));
    } catch (error) {
      console.error("❌ Delete failed:", error);
    } finally {
      setDeleteState({ id: null, isDeleting: false, showConfirm: false });
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
          <p className="text-gray-500 font-medium">
            Loading community doubts...
          </p>
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
        {data?.images?.map((doubt) => (
          <article
            key={doubt._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative group transition-all"
          >
            {/* --- DELETE LOGIC (Existing) --- */}
            <div className="absolute top-4 right-4 z-10">
              {deleteState.showConfirm && deleteState.id === doubt._id ? (
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
                  <button
                    onClick={() =>
                      setDeleteState({
                        id: null,
                        isDeleting: false,
                        showConfirm: false,
                      })
                    }
                    className="text-xs text-gray-500 px-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(doubt._id)}
                    className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md"
                  >
                    {deleteState.isDeleting ? (
                      <Loader2 size={14} className="animate-spin" />
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
                  className="p-2 rounded-full bg-white/90 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="p-4 flex items-center gap-3">
              <img
                src={
                  doubt.user?.avatar?.url || "https://via.placeholder.com/40"
                }
                className="w-10 h-10 rounded-full object-cover"
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
                {/* --- UPDATED LIKE BUTTON --- */}
                <button
                  onClick={() => handleLike(doubt._id)}
                  disabled={likeLoading[doubt._id]}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all active:scale-90 ${
                    doubt.isLiked
                      ? "text-red-500 bg-red-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    size={22}
                    fill={doubt.isLiked ? "currentColor" : "none"}
                    className={likeLoading[doubt._id] ? "animate-pulse" : ""}
                  />
                  <span className="font-bold">{doubt.likesCount || 0}</span>
                </button>

                <button
                  onClick={() => toggleComments(doubt._id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold shadow-sm transition-all active:scale-95 ${
                    openCommentsId === doubt._id
                      ? "bg-gray-200 text-gray-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <MessageSquare size={18} />
                  {openCommentsId === doubt._id ? "Close" : "Solve Doubt"}
                </button>
              </div>

              {openCommentsId === doubt._id && (
                <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
                  <MediaCommentCard mediaId={doubt._id} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ImageDoubtFeed;
