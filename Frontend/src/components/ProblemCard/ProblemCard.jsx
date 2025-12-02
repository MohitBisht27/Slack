import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  User,
  Clock,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { getAllProblem } from "../../api/ProblemApi";

export default function DoubtFeed() {
  const [profile, setProfile] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoubts() {
      try {
        const response = await getAllProblem();
        const result = response.data;
        // console.log(result);
        const profile = result.data[0].author.avatar;
        // console.log(profile);
        const allDoubts = result.data;
        setProfile(profile);
        if (Array.isArray(allDoubts)) {
          setDoubts(allDoubts);
        }
      } catch (error) {
        console.error("Failed to fetch doubts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoubts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 animate-pulse text-lg">
          Loading doubts...
        </div>
      </div>
    );
  }

  if (doubts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 text-lg">No doubts found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col items-center space-y-6">
      {doubts.map((doubt) => (
        <div
          key={doubt._id}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
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
            {/* Author Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="bg-gradient-to-br p-[2px] rounded-full">
                <div className="bg-white rounded-full p-[2px]">
                  <img
                    src={doubt.author?.avatar || profile}
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  {doubt.author?.username || "Anonymous"}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(doubt.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Question */}
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-2">
                Question
              </h3>
              <p className="text-slate-900 leading-relaxed">{doubt.content}</p>
            </div>

            {/* Expanded Content */}
            {expandedId === doubt._id && (
              <div className="bg-slate-50 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="text-sm font-medium text-slate-500 mb-2">
                  More Details
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {doubt.content || "No additional details provided."}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() =>
                  setExpandedId(expandedId === doubt._id ? null : doubt._id)
                }
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {expandedId === doubt._id ? "Hide Details" : "View Details"}
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <CheckCircle className="w-4 h-4" />
                Solve
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-3 flex items-center justify-end text-sm text-slate-600 border-t border-slate-100">
            <span className="text-xs bg-slate-200 px-3 py-1 rounded-full">
              Views: {doubt.views}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
