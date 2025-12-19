import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMediaComments,
  addMediaComment,
} from "../../features/MediaCommentSlice";
import MediaCommentItem from "./MediaCommentItem";
import { Send, MessageCircle } from "lucide-react";

function MediaCommentCard({ mediaId }) {
  const dispatch = useDispatch();
  const [mainInput, setMainInput] = useState("");

  const {
    items: comments,
    loading,
    error,
  } = useSelector((state) => state.mediaComments);

  useEffect(() => {
    if (mediaId) {
      dispatch(fetchMediaComments({ mediaId }));
    }
  }, [mediaId, dispatch]);

  const handlePost = async () => {
    if (!mainInput.trim()) return;

    await dispatch(
      addMediaComment({
        mediaId,
        content: mainInput,
        parentId: null,
      })
    );

    setMainInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <MessageCircle className="text-blue-500" size={24} />
        Doubt Solutions
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {comments?.length || 0}
        </span>
      </h2>

      {/* Media Input Area */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <textarea
            className="w-full border border-gray-200 bg-gray-50 rounded-lg pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder="Suggest a solution or ask a doubt..."
            rows="1"
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
          />
          <button
            onClick={handlePost}
            disabled={!mainInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-30 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center mb-4 text-sm">
          {typeof error === "string" ? error : "Failed to load media comments."}
        </div>
      )}

      <div className="space-y-4">
        {loading && (!comments || comments.length === 0) ? (
          /* Skeleton Loader */
          [1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            {comments?.map((comment) => (
              <MediaCommentItem
                key={comment._id}
                comment={comment}
                mediaId={mediaId}
              />
            ))}

            {(!comments || comments.length === 0) && !loading && (
              <div className="text-center py-10">
                <p className="text-gray-400">
                  No solutions provided yet. Help solve this doubt!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MediaCommentCard;
