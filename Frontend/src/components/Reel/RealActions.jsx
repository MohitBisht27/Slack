import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function ReelActions({ initialLikes }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors ${
            isLiked ? "text-red-500" : "text-gray-700 hover:text-red-500"
          }`}
        >
          <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{likesCount}</span>
        </button>
        <button className="text-gray-700 hover:text-blue-500 flex items-center gap-1.5">
          <MessageCircle size={24} />
        </button>
        <button className="text-gray-700 hover:text-green-500">
          <Share2 size={24} />
        </button>
      </div>
    </div>
  );
}
