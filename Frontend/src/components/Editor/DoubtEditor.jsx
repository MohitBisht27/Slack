import { useState } from "react";
import { addProblem } from "../../api/ProblemApi";
import { useNavigate } from "react-router-dom";
import FormInput from "../AuthForm/FormInput";
import FormTextarea from "../AuthForm/FormTextarea";
import SubmitButton from "../AuthForm/SubmitButton";
import { ChevronLeft } from "lucide-react";
function AskProblem() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.content.trim())
      newErrors.content = "Description is required.";
    if (formData.tags && formData.tags.length > 100)
      newErrors.tags = "Tags should be shorter than 100 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const problemData = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags
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
      setFormData({ title: "", content: "", tags: "" });
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Feed
        </button>
      </div>
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
          <FormInput
            label="Title"
            name="title"
            placeholder="e.g. How to reverse a linked list in Java?"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />

          <FormTextarea
            label="Description"
            name="content"
            placeholder="Describe your problem in detail..."
            value={formData.content}
            onChange={handleChange}
            error={errors.content}
          />

          <FormInput
            label="Tags (comma separated)"
            name="tags"
            placeholder="e.g. java, algorithms, data-structures"
            value={formData.tags}
            onChange={handleChange}
            error={errors.tags}
          />

          {/* Live Tag Preview */}
          {formData.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.split(",").map(
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

          <SubmitButton
            loading={isSubmitting}
            text={isSubmitting ? "Publishing..." : "Post Problem"}
          />
        </form>
      </div>
    </div>
  );
}

export default AskProblem;
