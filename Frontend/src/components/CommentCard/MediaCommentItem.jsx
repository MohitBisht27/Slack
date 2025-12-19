import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  updateMediaComment,
  deleteMediaComment,
  addMediaComment,
  toggleMediaLike,
} from "../../features/MediaCommentSlice";
import {
  ThumbsUp,
  Trash2,
  Edit,
  Send,
  MessageSquare,
  X,
  CornerDownRight,
} from "lucide-react";

const MediaCommentItem = ({ comment, mediaId, depth = 0 }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const isOwner = user?._id === (comment.owner?._id || comment.owner);

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }
    await dispatch(
      updateMediaComment({
        commentId: comment._id,
        content: editContent,
        mediaId,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this solution?")) {
      dispatch(deleteMediaComment({ commentId: comment._id, mediaId }));
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await dispatch(
      addMediaComment({ mediaId, content: replyContent, parentId: comment._id })
    );
    setReplyContent("");
    setIsReplying(false);
  };

  const handleLike = () => {
    dispatch(toggleMediaLike({ commentId: comment._id, mediaId }));
  };

  return (
    <div className={`group mb-4 ${depth > 0 ? "ml-6 md:ml-10" : ""}`}>
      <div
        className={`p-4 rounded-xl border transition-all ${
          depth > 0
            ? "bg-blue-50/30 border-blue-100"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        {/* User Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={
                comment.owner?.avatar?.url ||
                `https://ui-avatars.com/api/?name=${
                  comment.owner?.username || "U"
                }`
              }
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-200 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-900">
                {comment.owner?.username || "Learner"}
                {isOwner && (
                  <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                    You
                  </span>
                )}
              </p>
            </div>
          </div>
          {depth > 0 && <CornerDownRight size={16} className="text-gray-300" />}
        </div>

        {/* Content */}
        <div className="mb-4">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border border-blue-400 rounded-lg p-2 text-sm outline-none"
                rows="2"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 pt-2 border-t border-gray-50 text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs ${
              comment.isLiked
                ? "text-blue-600 font-bold"
                : "hover:text-blue-600"
            }`}
          >
            <ThumbsUp
              size={14}
              className={comment.isLiked ? "fill-current" : ""}
            />
            {comment.likesCount || 0}
          </button>

          <button
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center gap-1.5 text-xs hover:text-blue-600"
          >
            <MessageSquare size={14} /> Reply
          </button>

          {isOwner && (
            <div className="flex items-center gap-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditContent(comment.content);
                }}
                className="hover:text-green-600"
              >
                <Edit size={14} />
              </button>
              <button onClick={handleDelete} className="hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Reply Input */}
        {isReplying && (
          <div className="mt-4 flex gap-2">
            <input
              placeholder="Suggest a clarification..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleReply()}
            />
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={14} />
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="p-2 text-gray-400"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <MediaCommentItem
              key={reply._id}
              comment={reply}
              mediaId={mediaId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCommentItem;
