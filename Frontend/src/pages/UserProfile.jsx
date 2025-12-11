// import ProfileCard from "../components/UserProfile/UserCard";
// import MyDoubtsFeed from "../components/UserProfile/UserDoubt";

// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Profile Card Section */}
//         <div className="mb-8">
//           <ProfileCard />
//         </div>

//         {/* Divider */}
//         <div className="relative mb-8">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-slate-200"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 text-sm text-slate-500 font-medium">
//               Activity
//             </span>
//           </div>
//         </div>

//         {/* Posted Doubts Section */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                 <svg
//                   className="w-6 h-6 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 Posted Doubts
//               </h2>
//               <p className="text-sm text-slate-500 mt-1">
//                 Questions you've asked the community
//               </p>
//             </div>
//           </div>

//           {/* Doubts Feed Container */}
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <MyDoubtsFeed />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import ProfileCard from "../components/UserProfile/UserCard";
import MyDoubtsFeed from "../components/UserProfile/UserDoubt";
import { Activity } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Profile Section - Centered and Heroic */}
        <div className="mb-16">
          <ProfileCard />
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Activity History
            </h2>
            <p className="text-sm text-slate-500">
              Recent problems you have posted
            </p>
          </div>
        </div>

        {/* Feed Section - No wrapper, direct grid */}
        <div className="min-h-[300px]">
          <MyDoubtsFeed />
        </div>
      </div>
    </div>
  );
}
