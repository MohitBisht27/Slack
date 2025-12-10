import { useState } from "react";
import {
  HelpCircle,
  Clock,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import CommentCard from "../CommentCard/CommentCard";
import AuthorInfo from "./AuthorInfo";
export default function DoubtCard({ doubt }) {
  const [solving, setSolving] = useState(false);

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
        </div>

        {solving && (
          <div className="mt-6 border-t border-slate-200 pt-4 animate-in fade-in slide-in-from-top-2">
            <CommentCard articleId={doubt._id} />
          </div>
        )}
      </div>

      <div className="bg-slate-50 px-6 py-3 flex items-center justify-end text-sm text-slate-600 border-t border-slate-100">
        <span className="text-xs bg-slate-200 px-3 py-1 rounded-full">
          Views: {doubt.views}
        </span>
      </div>
    </div>
  );
}
