import { Clock } from "lucide-react";

export default function AuthorInfo({ doubt }) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
      <img
        src={doubt.author?.avatar?.url}
        alt="Author"
        className="w-10 h-10 rounded-full object-cover"
      />
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
  );
}
