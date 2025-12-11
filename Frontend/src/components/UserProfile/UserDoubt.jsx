import { useEffect, useState } from "react";
import { getMyProblems } from "../../api/ProblemApi";
import { getCurrentUser } from "../../api/UserApi";
import MyDoubtCard from "./ProfileDoubtCard.jsx";

export default function MyDoubtsFeed() {
  const [myDoubts, setMyDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchMyDoubts = async () => {
      try {
        const [userRes, myDoubtsRes] = await Promise.all([
          getCurrentUser(),
          getMyProblems(),
        ]);
        setMyDoubts(myDoubtsRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch your doubts.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyDoubts();
  }, []);

  if (loading)
    return (
      <div className="py-16 flex items-center justify-center text-slate-500">
        Loading your doubts...
      </div>
    );

  // if (error)
  //   return (
  //     <div className="py-16 flex items-center justify-center text-red-500">
  //       {error}
  //     </div>
  //   );

  if (!myDoubts.length)
    return (
      <div className="py-16 flex items-center justify-center text-slate-500">
        You haven&apos;t posted any doubts yet.
      </div>
    );

  return (
    <div
      className="grid gap-6 p-2"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gridAutoRows: "1fr",
      }}
    >
      {myDoubts.map((doubt) => (
        <MyDoubtCard key={doubt._id} doubt={doubt} />
      ))}
    </div>
  );
}
