import ProfileCard from "../components/UserProfile/UserCard";
import MyDoubtsFeed from "../components/UserProfile/UserDoubt";
import { Activity } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Profile Section - Centered and Heroic */}
        <div className="mb-16">
          <ProfileCard />
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Activity History
            </h2>
            <p className="text-sm text-slate-500">
              Recent problems you have posted
            </p>
          </div>
        </div>

        {/* Feed Section - No wrapper, direct grid */}
        <div className="min-h-[300px]">
          <MyDoubtsFeed />
        </div>
      </div>
    </div>
  );
}
