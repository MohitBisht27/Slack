export default function MyDoubtCard({ doubt }) {
  const dateStr = new Date(doubt.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <span className="inline-flex items-center text-[11px] font-semibold tracking-wide text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded border border-slate-100">
          Question
        </span>
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          {dateStr}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {doubt.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {doubt.content}
        </p>
      </div>
    </div>
  );
}
