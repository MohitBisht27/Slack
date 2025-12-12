import { useState } from "react";
import {
  HelpCircle,
  Clock,
  MessageCircle,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

import CommentCard from "../CommentCard/CommentCard";
import { deleteProblem } from "../../api/ProblemApi";
import AuthorInfo from "./AuthorInfo";
export default function DoubtCard({ doubt, currentUser, onDeleteSuccess }) {
  const [solving, setSolving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const canDelete = currentUser && doubt.author?._id === currentUser._id;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteProblem(doubt._id);
      if (response.status === 200) {
        setDeleteMessage({ type: "success", text: "Deleted successfully!" });
        onDeleteSuccess?.();
      } else {
        setDeleteMessage({ type: "error", text: "Failed to delete doubt." });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
      setTimeout(() => setDeleteMessage(null), 3000);
    }
  };
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{doubt.title}</h2>
              <p className="text-blue-100 text-sm mt-1">
                Asked by {doubt.author?.username || "Anonymous"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <AuthorInfo doubt={doubt} />

        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">Question</h3>
          <p className="text-slate-900 leading-relaxed">{doubt.content}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setSolving(!solving)}
            className={`flex-1 ${
              solving
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            } text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
          >
            {solving ? (
              <>
                <XCircle className="w-4 h-4" /> Cancel
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" /> Solve
              </>
            )}
          </button>
          {canDelete && (
            <>
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              ) : (
                <div className="flex-1 flex items-center gap-2 justify-between">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    {isDeleting ? <>Deleting...</> : "Confirm Delete"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 border border-slate-300 text-slate-600 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {deleteMessage && (
          <div
            className={`mt-4 p-3 rounded-xl text-center text-sm ${
              deleteMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {deleteMessage.text}
          </div>
        )}

        {solving && (
          <div className="mt-6 border-t border-slate-200 pt-4 animate-in fade-in slide-in-from-top-2">
            <CommentCard articleId={doubt._id} />
          </div>
        )}
      </div>
    </div>
  );
}
