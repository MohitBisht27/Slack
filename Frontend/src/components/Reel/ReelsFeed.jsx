import { useState, useEffect } from "react";
import ReelCard from "./ReelCard";
import { getReels } from "../../api/MediaApi";

export default function ReelsFeed() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const fetchReels = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError("");

    try {
      const response = await getReels(page, 5);
      const { reels: newReels, pagination } = response.data.data;

      setReels((prev) => {
        const existingIds = new Set(prev.map((r) => r._id));
        const uniqueNew = newReels.filter((r) => !existingIds.has(r._id));
        return [...prev, ...uniqueNew];
      });

      setHasMore(pagination.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("❌ Error fetching reels:", err);
      setError("Failed to load reels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveReel = (deletedId) => {
    setReels((prev) => prev.filter((reel) => reel._id !== deletedId));
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">
          Discovery Feed
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {reels.length === 0 && !loading && !error && (
            <p className="text-gray-500 text-center">No reels available.</p>
          )}

          {reels.map((reel) => (
            <ReelCard key={reel._id} reel={reel} onDelete={handleRemoveReel} />
          ))}
        </div>

        <div className="mt-8 text-center pb-8">
          {loading ? (
            <span className="animate-pulse text-gray-500">
              Loading amazing content...
            </span>
          ) : hasMore ? (
            <button
              onClick={fetchReels}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all shadow-sm active:scale-95"
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-400 text-sm">You’ve reached the end!</p>
          )}
        </div>
      </div>
    </div>
  );
}
