import ReelHeader from "./RealHeader";
import ReelVideo from "./ReelVideo";
import ReelActions from "./RealActions";
import ReelInfo from "./ReelInfo";

export default function ReelCard({ reel }) {
  console.log(reel);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden max-w-[480px] mx-auto relative">
      <ReelHeader user={reel.user} createdAt={reel.createdAt} />
      <ReelVideo videoUrl={reel.videoUrl} />
      <div className="p-4">
        <ReelActions initialLikes={reel.likes || 0} />
        <ReelInfo
          title={reel.title}
          description={reel.description}
          tags={reel.tags}
        />
      </div>
    </div>
  );
}
