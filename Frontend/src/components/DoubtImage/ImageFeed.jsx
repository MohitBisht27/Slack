import { useState, useEffect } from "react";
import { getImages } from "../../api/MediaApi";

function ImageDoubtFeed() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getImages();
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Loading community doubts...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Community Doubts
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Scroll through and help the community solve problems.
        </p>
      </header>

      {/* Vertical Feed Container */}
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {data?.images?.map((doubt) => (
          <article
            key={doubt._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* User Header */}
            <div className="p-4 flex items-center gap-3">
              <img
                src={
                  doubt.user?.avatar?.url || "https://via.placeholder.com/40"
                }
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-50"
                alt="avatar"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {doubt.user?.username || "Anonymous User"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(doubt.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Image Section - Standardized Aspect Ratio for Feed */}
            <div className="relative aspect-video w-full bg-gray-100">
              <img
                src={doubt.imageUrl}
                alt={doubt.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                {doubt.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {doubt.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {doubt.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-red-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">
                    {doubt.likes?.length || 0}
                  </span>
                </button>

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-95">
                  Solve Doubt
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ImageDoubtFeed;
