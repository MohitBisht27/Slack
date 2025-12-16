import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="max-w-xl">
              <p className="text-gray-500 text-sm tracking-widest mb-1">GET INSTANT HELP</p>
              <h1 className="text-5xl font-bold text-gray-800  leading-tight mb-1 mt-1">
                Expert Doubt Solving Platform
              </h1>
              <p className='text-gray-600 text-sm tracking-widest mt-0 mb-4'>Ask Doubts. Get Answers. Learn Faster.</p>
              <button className="bg-teal-400 text-white px-10 py-4 rounded font-semibold hover:bg-teal-500 transition">
                MORE INFO
              </button>
            </div>
            <div className="w-1/2">
              <svg viewBox="0 0 500 400" className="w-full">
                {/* Laptop/Device */}
                <rect x="150" y="200" width="200" height="150" fill="#4A5EF6" rx="5"/>
                <rect x="160" y="210" width="180" height="120" fill="#E8F4FF"/>
                
                {/* Profile Card */}
                <rect x="300" y="80" width="150" height="180" fill="#5FD4C1" rx="10" transform="rotate(-10 375 170)"/>
                <circle cx="375" cy="120" r="30" fill="#4A5EF6"/>
                <rect x="340" y="160" width="70" height="8" fill="white" rx="4"/>
                <rect x="340" y="175" width="70" height="8" fill="white" rx="4"/>
                <circle cx="325" cy="200" r="15" fill="white"/>
                
                {/* Question marks floating */}
                <text x="100" y="120" fontSize="40" fill="#5FD4C1" fontWeight="bold">?</text>
                <text x="420" y="280" fontSize="35" fill="#5FD4C1" fontWeight="bold">?</text>
                
                {/* Social icons */}
                <circle cx="280" cy="90" r="20" fill="#5FD4C1"/>
                <circle cx="330" cy="50" r="20" fill="#5FD4C1"/>
                <circle cx="250" cy="120" r="20" fill="#5FD4C1"/>
                
                {/* Decorative leaves */}
                <ellipse cx="430" cy="320" rx="30" ry="50" fill="#5FD4C1" opacity="0.6"/>
                <ellipse cx="80" cy="350" rx="25" ry="45" fill="#5FD4C1" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero