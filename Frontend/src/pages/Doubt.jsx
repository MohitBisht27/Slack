import { useNavigate } from "react-router-dom";
import DoubtFeed from "../components/Doubt/DoubtFeed";
import {
  MessageSquarePlus,
  Code,
  Image as ImageIcon,
  Search,
} from "lucide-react";
export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/ask-problem");
  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-5 mb-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={handleClick}
            className="group flex-1 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:ring-4 hover:ring-indigo-50/50 text-left py-3 px-5 rounded-full transition-all duration-200 flex items-center gap-3"
          >
            <Search
              size={18}
              className="text-slate-400 group-hover:text-indigo-500 transition-colors"
            />
            <span className="text-slate-500 font-medium text-sm group-hover:text-slate-700">
              What is your doubt today?
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between pt-2 px-1">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all text-sm font-semibold group"
          >
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 transition-colors">
              <MessageSquarePlus size={18} />
            </div>
            Ask Question
          </button>

          <button
            onClick={handleClick}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all text-sm font-semibold group"
          >
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <Code size={18} />
            </div>
            Share Code
          </button>

          <button
            onClick={() => navigate("/mediaForm")}
            className="flex items-center gap-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-xl transition-all text-sm font-semibold group"
          >
            <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600 group-hover:bg-sky-200 transition-colors">
              <ImageIcon size={18} />
            </div>
            Media
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl space-y-6">
        <DoubtFeed />
      </div>
    </div>
  );
}
