import React, { useEffect, useState } from "react";
import { getAllProblem } from "../../api/ProblemApi";
import DoubtCard from "./DoubtCard";

export default function DoubtFeed() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoubts() {
      try {
        const response = await getAllProblem();
        const result = response.data?.data || [];
        setDoubts(result);
      } catch (error) {
        console.error("Failed to fetch doubts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoubts();
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
        <DoubtCard key={d._id} doubt={d} />
      ))}
    </div>
  );
}
