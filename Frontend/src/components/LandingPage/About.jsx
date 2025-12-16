import React from 'react'

const About = () => {
  return (
    <div><section id="about" className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-16">
            <div className="w-1/2">
              <svg viewBox="0 0 400 400" className="w-full">
                {/* Three students illustration */}
                <ellipse cx="100" cy="350" rx="40" ry="10" fill="#5FD4C1" opacity="0.3"/>
                <ellipse cx="200" cy="350" rx="40" ry="10" fill="#5FD4C1" opacity="0.3"/>
                <ellipse cx="300" cy="350" rx="40" ry="10" fill="#5FD4C1" opacity="0.3"/>
                
                {/* Student 1 - Left */}
                <rect x="75" y="250" width="50" height="90" fill="#2C3E50" rx="5"/>
                <circle cx="100" cy="220" r="35" fill="#8B6F47"/>
                <circle cx="100" cy="200" r="30" fill="#5FD4C1"/>
                <rect x="70" y="260" width="60" height="50" fill="#5FD4C1" rx="5"/>
                
                {/* Student 2 - Center */}
                <rect x="175" y="240" width="50" height="100" fill="#2C3E50" rx="5"/>
                <circle cx="200" cy="210" r="35" fill="#D4A574"/>
                <circle cx="200" cy="190" r="30" fill="#F4E4D7"/>
                <rect x="170" y="250" width="60" height="55" fill="#5FD4C1" rx="5"/>
                <circle cx="190" cy="280" r="15" fill="#5FD4C1"/>
                
                {/* Student 3 - Right */}
                <rect x="275" y="250" width="50" height="90" fill="#2C3E50" rx="5"/>
                <circle cx="300" cy="220" r="35" fill="#8B6F47"/>
                <circle cx="300" cy="200" r="30" fill="#F4E4D7"/>
                <rect x="270" y="260" width="60" height="50" fill="#5FD4C1" rx="5"/>
                <circle cx="315" cy="280" r="15" fill="#5FD4C1"/>
                
                {/* Decorative leaves */}
                <ellipse cx="50" cy="320" rx="25" ry="40" fill="#5FD4C1" opacity="0.6"/>
                <ellipse cx="350" cy="310" rx="30" ry="45" fill="#5FD4C1" opacity="0.6"/>
              </svg>
            </div>
            <div className="w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">About us</h2>
              <div className="w-16 h-1 bg-teal-400 mb-8"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are a team of passionate educators and technologists committed to making quality education accessible to everyone. Our platform connects students with expert tutors for instant doubt resolution.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over 10,000 verified tutors and 1 million doubts solved, we're revolutionizing how students learn and overcome academic challenges.
              </p>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default About