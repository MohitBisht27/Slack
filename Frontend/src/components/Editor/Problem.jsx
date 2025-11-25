import { useState } from "react";
import { addProblem } from "../../api/ProblemApi";

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

function AskProblem() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const problemData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    try {
      await addProblem(problemData);
      setStatus({
        type: "success",
        message: "Problem submitted successfully!",
      });
      setTitle("");
      setContent("");
      setTags("");

      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Something went wrong while posting.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-slate-900 p-6 text-white">
          <h1 className="text-2xl font-bold">Ask a Public Question</h1>
          <p className="text-slate-400 text-sm mt-1">
            Be specific and imagine you’re asking a question to another person.
          </p>
        </div>

        {/* Status Notification */}
        {status.message && (
          <div
            className={`p-4 text-sm font-medium text-center animate-fade-in
            ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border-b border-green-100"
                : "bg-red-50 text-red-700 border-b border-red-100"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to reverse a linked list in Java?"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Description
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your problem in detail..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700 placeholder-gray-400 min-h-[160px] resize-y"
              required
            />
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Tags{" "}
              <span className="text-gray-400 font-normal text-xs">
                (comma separated)
              </span>
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. java, algorithms, data-structures"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700 placeholder-gray-400"
            />
            {/* Live Tag Preview */}
            {tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.split(",").map(
                  (tag, index) =>
                    tag.trim() && (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium border border-blue-100"
                      >
                        #{tag.trim()}
                      </span>
                    )
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 shadow-md
                ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-[0.98]"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Publishing...
                </>
              ) : (
                "Post Problem"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AskProblem;
