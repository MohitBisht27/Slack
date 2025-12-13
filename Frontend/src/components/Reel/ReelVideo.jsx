import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

export default function ReelVideo({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <div
      className="relative bg-black aspect-[9/16] cursor-pointer group"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        loop
        playsInline
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transition-transform transform hover:scale-110">
            <Play fill="white" className="text-white w-8 h-8 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
