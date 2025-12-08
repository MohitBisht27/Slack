import { useNavigate } from "react-router-dom";
import DoubtFeed from "../components/Doubt/DoubtFeed";
export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/ask-problem");
  }
  return (
    <div className="relative flex flex-col items-center mt-10">
      <button
        className="absolute -top-6 w-full max-w-2xl px-5 py-3 text-left text-gray-600 bg-gray-50 border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 hover:border-gray-300 transition duration-200"
        onClick={handleClick}
      >
        What do you want to ask or share?
      </button>

      <div className="w-full max-w-2xl mt-10">
        <DoubtFeed></DoubtFeed>
      </div>
    </div>
  );
}
