import React from 'react'

const Service = () => {
  return (
    <div><section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Services we offer</h2>
          <div className="w-16 h-1 bg-teal-400 mx-auto mb-16"></div>

          {/* Service 1 */}
          <div className="flex items-center gap-16 mb-20">
            <div className="w-1/2">
              <svg viewBox="0 0 400 350" className="w-full">
                {/* Social media tree concept */}
                <ellipse cx="200" cy="320" rx="60" ry="15" fill="#5FD4C1" opacity="0.3"/>
                
                {/* Tree trunk */}
                <rect x="180" y="180" width="40" height="140" fill="#8B6F47" rx="5"/>
                
                {/* Tree foliage with social icons */}
                <circle cx="200" cy="150" r="80" fill="#5FD4C1" opacity="0.9"/>
                
                {/* Social icons in circles */}
                <circle cx="200" cy="80" r="22" fill="white"/>
                <circle cx="160" cy="130" r="22" fill="white"/>
                <circle cx="240" cy="130" r="22" fill="white"/>
                <circle cx="180" cy="170" r="22" fill="white"/>
                <circle cx="220" cy="170" r="22" fill="white"/>
                <circle cx="200" cy="140" r="22" fill="white"/>
                
                {/* Students on sides */}
                <rect x="50" y="220" width="40" height="80" fill="#4A5EF6" rx="5"/>
                <circle cx="70" cy="200" r="25" fill="#F4E4D7"/>
                <rect x="45" y="230" width="50" height="45" fill="#FFD93D" rx="5"/>
                
                <rect x="310" y="220" width="40" height="80" fill="#4A5EF6" rx="5"/>
                <circle cx="330" cy="200" r="25" fill="#F4E4D7"/>
                <rect x="305" y="230" width="50" height="45" fill="#FFD93D" rx="5"/>
              </svg>
            </div>
            <div className="w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Live Tutoring Sessions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Connect with expert tutors in real-time through our interactive platform. Get personalized one-on-one attention and clarify all your doubts instantly.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our tutors use advanced whiteboard tools, screen sharing, and interactive features to ensure you understand every concept thoroughly.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex items-center gap-16 flex-row-reverse">
            <div className="w-1/2">
              <svg viewBox="0 0 400 350" className="w-full">
                {/* Analytics/Data visualization */}
                <ellipse cx="150" cy="320" rx="50" ry="12" fill="#5FD4C1" opacity="0.3"/>
                <ellipse cx="300" cy="320" rx="50" ry="12" fill="#5FD4C1" opacity="0.3"/>
                
                {/* Person 1 with magnifying glass */}
                <rect x="125" y="220" width="50" height="90" fill="#4A5EF6" rx="5"/>
                <circle cx="150" cy="200" r="30" fill="#F4E4D7"/>
                <rect x="120" y="230" width="60" height="55" fill="#FFD93D" rx="5"/>
                <circle cx="180" cy="180" r="35" fill="#5FD4C1" opacity="0.7"/>
                <circle cx="180" cy="180" r="25" fill="white" opacity="0.5"/>
                
                {/* Person 2 with charts */}
                <rect x="275" y="220" width="50" height="90" fill="#4A5EF6" rx="5"/>
                <circle cx="300" cy="200" r="30" fill="#F4E4D7"/>
                <rect x="270" y="230" width="60" height="55" fill="#6BCF7F" rx="5"/>
                
                {/* Floating charts/graphs */}
                <rect x="240" y="100" width="80" height="60" fill="#E8F4FF" rx="5" stroke="#4A5EF6" strokeWidth="2"/>
                <rect x="250" y="140" width="12" height="15" fill="#4A5EF6"/>
                <rect x="270" y="130" width="12" height="25" fill="#5FD4C1"/>
                <rect x="290" y="120" width="12" height="35" fill="#FFD93D"/>
                
                <circle cx="100" cy="120" r="35" fill="#E8F4FF" stroke="#4A5EF6" strokeWidth="2"/>
                <path d="M 100 120 L 100 85 M 100 120 L 130 105" stroke="#4A5EF6" strokeWidth="3"/>
                
                {/* Decorative leaf */}
                <ellipse cx="350" cy="270" rx="25" ry="40" fill="#5FD4C1" opacity="0.6"/>
              </svg>
            </div>
            <div className="w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">AI-Powered Smart Matching</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our intelligent algorithm analyzes your question and matches you with the most qualified tutor in seconds. Get accurate solutions faster than ever.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Track your learning analytics, identify weak areas, and get personalized recommendations to improve your academic performance.
              </p>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default Service