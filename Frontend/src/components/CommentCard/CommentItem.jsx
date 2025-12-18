import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  updateComment,
  deleteComment,
  addComment,
  toggleLike,
} from "../../features/CommentSlice";
import {
  ThumbsUp,
  Trash2,
  Edit,
  Send,
  MessageSquare,
  X,
  CornerDownRight,
} from "lucide-react";

const CommentItem = ({ comment, articleId, depth = 0 }) => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const currentUserId = user?._id || user?.id;
  const ownerId = comment.owner?._id || comment.owner;
  const isOwner =
    currentUserId && ownerId && String(currentUserId) === String(ownerId);

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }
    await dispatch(
      updateComment({
        commentId: comment._id,
        content: editContent,
        articleId,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment({ commentId: comment._id, articleId }));
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await dispatch(
      addComment({
        articleId,
        content: replyContent,
        parentId: comment._id,
      })
    );
    setReplyContent("");
    setIsReplying(false);
  };

  const handleLike = () => {
    dispatch(toggleLike({ commentId: comment._id, articleId }));
  };

  return (
    <div className={`group mb-4 ${depth > 0 ? "ml-6 md:ml-10" : ""}`}>
      <div
        className={`p-4 rounded-xl border transition-all ${
          depth > 0
            ? "bg-gray-50 border-gray-100"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        {/* HEADER: User Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={
                comment.owner?.avatar?.url ||
                `https://ui-avatars.com/api/?name=${
                  comment.owner?.username || "User"
                }`
              }
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-200 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-900">
                {comment.owner?.username || "Anonymous User"}
                {isOwner && (
                  <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                    You
                  </span>
                )}
              </p>
              <p className="text-[11px] text-gray-400">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </div>

          {depth > 0 && <CornerDownRight size={16} className="text-gray-300" />}
        </div>

        {/* BODY: Content or Edit Form */}
        <div className="mb-4">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border border-blue-400 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                rows="2"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>

        {/* FOOTER: Interaction Buttons */}
        <div className="flex items-center gap-5 pt-2 border-t border-gray-50 text-gray-500">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs transition-colors hover:text-blue-600 ${
              comment.isLiked ? "text-blue-600 font-bold" : ""
            }`}
          >
            <ThumbsUp
              size={14}
              className={comment.isLiked ? "fill-current" : ""}
            />
            {comment.likesCount || 0}
          </button>

          {/* Reply Toggle */}
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center gap-1.5 text-xs hover:text-blue-600 transition-colors"
          >
            <MessageSquare size={14} />
            Reply
          </button>

          {/* Edit/Delete (Only visible to owner) */}
          {isOwner && (
            <div className="flex items-center gap-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditContent(comment.content);
                }}
                className="text-gray-400 hover:text-green-600 transition-colors"
                title="Edit Comment"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete Comment"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* REPLY INPUT FIELD */}
        {isReplying && (
          <div className="mt-4 flex gap-2 animate-in slide-in-from-top-1 duration-200">
            <input
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleReply()}
            />
            <button
              onClick={handleReply}
              disabled={!replyContent.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={14} />
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* RECURSION: Render children replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              articleId={articleId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
