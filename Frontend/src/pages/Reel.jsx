import ReelsFeed from "../components/Reel/ReelsFeed";

export default function Reel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            🎥 Explore Reels
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Watch and share short knowledge clips from our community
          </p>
        </header>

        <ReelsFeed />
      </div>
    </div>
  );
}
