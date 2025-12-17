import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../../features/CommentSlice";
import CommentItem from "./CommentItem";

function CommentCard({ articleId }) {
  const dispatch = useDispatch();
  const {
    items: comments,
    loading,
    error,
  } = useSelector((state) => state.comments);
  const [mainInput, setMainInput] = useState("");

  const { user } = useSelector((state) => state.auth || {});
  const currentUserId = user?._id;

  useEffect(() => {
    if (articleId) {
      dispatch(fetchComments(articleId));
    }
  }, [articleId, dispatch]);

  const handlePost = async () => {
    if (!mainInput.trim()) return;
    // Dispatch the thunk
    await dispatch(
      addComment({ articleId, content: mainInput, parentId: null })
    );
    setMainInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Comments ({comments.length})
      </h2>

      {/* Main Input */}
      <div className="flex gap-3 mb-8">
        {/* User Avatar (Optional) */}

        <div className="flex-1 flex gap-2">
          <input
            className="flex-1 border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
          />
          <button
            onClick={handlePost}
            disabled={!mainInput.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {typeof error === "string" ? error : "Something went wrong"}
        </p>
      )}

      {/* List */}
      {loading && comments.length === 0 ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              articleId={articleId}
              currentUserId={currentUserId}
            />
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-400 py-6">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
