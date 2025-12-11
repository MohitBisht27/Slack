import { useEffect, useState } from "react";
import { getAllProblem } from "../../api/ProblemApi";
import { getCurrentUser } from "../../api/UserApi";
import DoubtCard from "./DoubtCard";

export default function DoubtFeed() {
  const [doubts, setDoubts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [userRes, doubtRes] = await Promise.all([
          getCurrentUser(),
          getAllProblem(),
        ]);

        if (!isMounted) return;
        setCurrentUser(userRes.data.data);
        setDoubts(doubtRes.data?.data || []);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to fetch data");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading doubts...
      </div>
    );
  if (!doubts.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        No doubts found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col items-center space-y-6">
      {doubts.map((d) => (
        <DoubtCard
          key={d._id}
          doubt={d}
          currentUser={currentUser}
          onDeleteSuccess={() =>
            setDoubts((prev) => prev.filter((item) => item._id !== d._id))
          }
        />
      ))}
    </div>
  );
}
