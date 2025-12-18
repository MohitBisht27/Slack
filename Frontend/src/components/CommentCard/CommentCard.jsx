import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../../features/CommentSlice";
import CommentItem from "./CommentItem";
import { Send } from "lucide-react";

function CommentCard({ articleId }) {
  const dispatch = useDispatch();
  const [mainInput, setMainInput] = useState("");

  const {
    items: comments,
    loading,
    error,
  } = useSelector((state) => state.comments);

  // Initial Fetch
  useEffect(() => {
    if (articleId) {
      dispatch(fetchComments(articleId));
    }
  }, [articleId, dispatch]);

  // Handle Main Post
  const handlePost = async () => {
    if (!mainInput.trim()) return;

    // Dispatch Thunk
    await dispatch(
      addComment({
        articleId,
        content: mainInput,
        parentId: null,
      })
    );

    setMainInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        Comments
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {comments.length}
        </span>
      </h2>

      {/* Main Input Area */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            className="w-full border border-gray-200 bg-gray-50 rounded-lg pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Write a thoughtful comment..."
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
          />
          <button
            onClick={handlePost}
            disabled={!mainInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center mb-4 text-sm">
          {typeof error === "string" ? error : "Failed to load comments."}
        </div>
      )}

      {/* Loading & List State */}
      <div className="space-y-4">
        {loading && comments.length === 0 ? (
          // Skeleton Loader
          [1, 2, 3].map((i) => (
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
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                articleId={articleId}
              />
            ))}

            {comments.length === 0 && !loading && (
              <div className="text-center py-10">
                <p className="text-gray-400">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
