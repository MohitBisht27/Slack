import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThumbsUp, Trash2, Edit, Send, X } from "lucide-react";
import {
  addComment,
  deleteComment,
  updateComment,
  toggleLike,
} from "../../features/CommentSlice";

function CommentItem({ comment, articleId, currentUserId }) {
  const dispatch = useDispatch();

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.content);

  const [localIsLiked, setLocalIsLiked] = useState(comment.isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(
    comment.likesCount || 0
  );

  useEffect(() => {
    setLocalIsLiked(comment.isLiked);
    setLocalLikesCount(comment.likesCount || 0);
    setEditText(comment.content);
  }, [comment]);

  // --- Handlers ---

  const handleLike = () => {
    const prevLiked = localIsLiked;
    setLocalIsLiked(!prevLiked);
    setLocalLikesCount((prev) => (prevLiked ? prev - 1 : prev + 1));

    dispatch(toggleLike({ commentId: comment._id, articleId }));
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    dispatch(
      addComment({
        articleId,
        content: replyText,
        parentId: comment._id,
      })
    );
    setIsReplying(false);
    setReplyText("");
  };

  const handleSubmitEdit = () => {
    if (!editText.trim()) return;
    dispatch(
      updateComment({
        commentId: comment._id,
        content: editText,
        articleId,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this comment?")) return;
    dispatch(deleteComment({ commentId: comment._id, articleId }));
  };

  // Check ownership
  const isOwner = currentUserId && comment.owner?._id === currentUserId;

  return (
    <div className="flex gap-3 mb-4 w-full animate-in fade-in duration-300">
      <img
        src={comment.owner?.avatar?.url || "https://via.placeholder.com/40"}
        alt="User"
        className="w-8 h-8 rounded-full object-cover mt-1"
      />

      <div className="flex-1">
        {/* Comment Bubble */}
        <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none relative group">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-semibold text-sm text-gray-900">
              {comment.owner?.username}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          {isEditing ? (
            <div className="space-y-2 mt-2">
              <input
                className="w-full border border-gray-300 rounded p-1 text-sm focus:border-blue-500 outline-none"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmitEdit}
                  className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs bg-gray-300 px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800 text-sm whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-medium select-none">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${
              localIsLiked ? "text-blue-600" : "hover:text-blue-600"
            }`}
          >
            <ThumbsUp size={12} fill={localIsLiked ? "currentColor" : "none"} />
            {localLikesCount > 0 ? localLikesCount : "Like"}
          </button>

          <button
            onClick={() => setIsReplying(!isReplying)}
            className="hover:text-blue-600 transition"
          >
            Reply
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="hover:text-green-600 flex items-center gap-1 transition"
              >
                <Edit size={12} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="hover:text-red-600 flex items-center gap-1 transition"
              >
                <Trash2 size={12} /> Delete
              </button>
            </>
          )}
        </div>

        {/* Reply Input */}
        {isReplying && (
          <div className="flex gap-2 mt-2 items-center animate-in slide-in-from-top-1 fade-in duration-200">
            <input
              autoFocus
              className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none text-sm py-1 bg-transparent"
              placeholder={`Reply to ${comment.owner?.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmitReply()}
            />
            <button
              onClick={handleSubmitReply}
              className="text-blue-600 p-1 hover:bg-blue-50 rounded"
            >
              <Send size={14} />
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="text-gray-400 p-1 hover:bg-gray-50 rounded"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 pl-4 border-l-2 border-gray-200">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                articleId={articleId}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
