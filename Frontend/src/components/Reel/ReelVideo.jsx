import { useState, useEffect, useRef } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export default function ReelVideo({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative bg-black aspect-[9/16] cursor-pointer group overflow-hidden rounded-xl"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
      />

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="text-white w-5 h-5" />
        ) : (
          <Volume2 className="text-white w-5 h-5" />
        )}
      </button>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
            <Play fill="white" className="text-white w-8 h-8 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
