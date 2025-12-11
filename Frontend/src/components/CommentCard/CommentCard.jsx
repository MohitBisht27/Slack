import { useEffect, useState } from "react";
import {
  addComment,
  getCommentsForArticle,
  updateComment,
  deleteComment,
  toggleCommentLike,
} from "../../api/CommentApi";
import { ThumbsUp, Trash2, Edit, Send } from "lucide-react";

function CommentCard({ articleId }) {
  const [comment, setComment] = useState("");
  const [replyMap, setReplyMap] = useState({});
  const [editMap, setEditMap] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [likeState, setLikeState] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!articleId) return;
    fetchComments();
  }, [articleId]);

  //Fetch all comments for this article
  async function fetchComments() {
    try {
      setLoading(true);
      const result = await getCommentsForArticle(articleId);
      const commentsArray =
        result?.data?.data?.docs && Array.isArray(result.data.data.docs)
          ? result.data.data.docs
          : [];
      setAllComments(commentsArray);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setAllComments([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Add top-level comment
  async function handleAddComment() {
    if (!comment.trim()) return;
    try {
      await addComment(articleId, comment);
      setComment("");
      await fetchComments();
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  }

  // ✅ Add reply
  async function handleAddReply(parentId) {
    if (!replyMap[parentId]?.trim()) return;
    try {
      await addComment(articleId, replyMap[parentId], parentId);
      setReplyMap((prev) => ({ ...prev, [parentId]: "" }));
      await fetchComments();
    } catch (error) {
      console.log("Error adding reply:", error);
    }
  }

  // ✅ Edit comment
  async function handleEdit(commentId) {
    const newContent = editMap[commentId];
    if (!newContent.trim()) return;
    try {
      await updateComment(commentId, { content: newContent });
      setEditMap((prev) => ({ ...prev, [commentId]: undefined }));
      await fetchComments();
    } catch (error) {
      console.log("Error updating comment:", error);
    }
  }

  // ✅ Delete comment
  async function handleDelete(commentId) {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  // ✅ Like / Unlike comment
  async function handleToggleLike(commentId) {
    try {
      const res = await toggleCommentLike(commentId);
      const liked = res.data?.data?.liked;
      setLikeState((prev) => ({ ...prev, [commentId]: liked }));
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  }

  // ✅ Handle text input changes
  function handleReplyChange(commentId, text) {
    setReplyMap((prev) => ({ ...prev, [commentId]: text }));
  }

  function handleEditChange(commentId, text) {
    setEditMap((prev) => ({ ...prev, [commentId]: text }));
  }

  const renderComment = (c, depth = 0) => {
    const liked = likeState[c._id];
    return (
      <div
        key={c._id}
        className={`border border-gray-200 p-3 rounded-lg shadow-sm mb-2 ${
          depth > 0 ? "ml-8 bg-gray-50" : ""
        }`}
      >
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={c.owner?.avatar?.url || "https://via.placeholder.com/40"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-medium text-gray-800">
              {c.owner?.username || "Anonymous"}
            </p>
            <p className="text-xs text-gray-500">
              {c.createdAt
                ? new Date(c.createdAt).toLocaleString()
                : "Unknown date"}
            </p>
          </div>
        </div>

        {/* Comment content or edit input */}
        {editMap[c._id] !== undefined ? (
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={editMap[c._id]}
              onChange={(e) => handleEditChange(c._id, e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
            />
            <button
              onClick={() => handleEdit(c._id)}
              className="bg-green-600 text-white text-xs px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() =>
                setEditMap((prev) => ({ ...prev, [c._id]: undefined }))
              }
              className="bg-gray-400 text-white text-xs px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-gray-700 mb-2">{c.content}</p>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => handleToggleLike(c._id)}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <ThumbsUp size={15} />
            {liked ? "Liked" : "Like"}
          </button>

          <button
            onClick={() =>
              setReplyMap((prev) => ({
                ...prev,
                [c._id]: prev[c._id] === undefined ? "" : undefined,
              }))
            }
            className="text-gray-600 hover:text-blue-600"
          >
            Reply
          </button>

          <button
            onClick={() =>
              setEditMap((prev) => ({
                ...prev,
                [c._id]: c.content,
              }))
            }
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <Edit size={14} /> Edit
          </button>

          <button
            onClick={() => handleDelete(c._id)}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>

        {/* Reply input box */}
        {replyMap[c._id] !== undefined && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyMap[c._id]}
              onChange={(e) => handleReplyChange(c._id, e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
            />
            <button
              onClick={() => handleAddReply(c._id)}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
              <Send size={14} />
            </button>
          </div>
        )}

        {Array.isArray(c.replies) &&
          c.replies.map((reply) => renderComment(reply, depth + 1))}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Comments</h2>

      {/* Add comment input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      {/* Display comments */}
      <div>
        {loading ? (
          <p className="text-gray-500 text-center">Loading comments...</p>
        ) : Array.isArray(allComments) && allComments.length > 0 ? (
          allComments.map((c) => renderComment(c))
        ) : (
          <p className="text-gray-500 text-center">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
