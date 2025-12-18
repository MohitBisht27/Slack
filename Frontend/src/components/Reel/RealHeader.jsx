import { useState } from "react";
import { Trash2, Loader2, MoreHorizontal } from "lucide-react";
import { deleteMedia } from "../../api/MediaApi";

export default function ReelHeader({
  user,
  createdAt,
  reelId,
  onDeleteSuccess,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await deleteMedia(reelId);
      onDeleteSuccess(reelId);
    } catch (err) {
      console.error("❌ Error deleting reel:", err);
      alert("Failed to delete reel. Please try again.");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-white">
      {/* Left side: User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
          <img
            src={user?.avatar?.url || "https://via.placeholder.com/40"}
            alt={user?.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
            {user?.username || "Anonymous"}
          </h4>
          <p className="text-[11px] text-gray-500 font-medium">
            {new Date(createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right side: Delete Logic with Feedback */}
      <div className="flex items-center gap-2">
        {showConfirm ? (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
            <button
              disabled={isDeleting}
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(false);
              }}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              Cancel
            </button>
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isDeleting ? (
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
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
            title="Delete Reel"
          >
            <Trash2
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        )}
      </div>
    </div>
  );
}
