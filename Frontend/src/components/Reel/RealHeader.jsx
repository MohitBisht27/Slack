import { MoreVertical } from "lucide-react";

export default function ReelHeader({ user, createdAt }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white z-10 relative">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar.url || "https://via.placeholder.com/40"}
          alt={user?.username}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            {user?.username}
          </h3>
          <p className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-900">
        <MoreVertical size={20} />
      </button>
    </div>
  );
}
