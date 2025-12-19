import { useState } from "react";
import ReelHeader from "./RealHeader";
import ReelVideo from "./ReelVideo";
import ReelActions from "./RealActions";
import ReelInfo from "./ReelInfo";
import MediaCommentCard from "../CommentCard/MediaCommentCard";

export default function ReelCard({ reel, onDelete }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden max-w-[480px] mx-auto relative transition-all">
      <ReelHeader
        user={reel.user}
        createdAt={reel.createdAt}
        reelId={reel._id}
        onDeleteSuccess={onDelete}
      />

      <ReelVideo videoUrl={reel.videoUrl} />

      <div className="p-4">
        <ReelActions
          initialLikes={reel.likes || 0}
          onCommentClick={() => setShowComments(!showComments)}
          isCommentOpen={showComments}
        />

        <ReelInfo
          title={reel.title}
          description={reel.description}
          tags={reel.tags}
        />
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <MediaCommentCard mediaId={reel._id} />
          </div>
        )}
      </div>
    </div>
  );
}
