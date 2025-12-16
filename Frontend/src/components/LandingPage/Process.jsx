import React from 'react'

const Process = () => {
  return (
    <section id="process" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Our process</h2>
          <div className="w-16 h-1 bg-teal-400 mx-auto mb-16"></div>
          
          <div className="flex justify-center gap-20 mt-16">
            <div className="max-w-xs">
              <div className="text-8xl font-light text-teal-400 mb-6">1</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ask Question</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your doubt with detailed description. Our AI instantly categorizes and routes it to the right expert.
              </p>
            </div>
            <div className="max-w-xs">
              <div className="text-8xl font-light text-teal-400 mb-6">2</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive step-by-step explanations from verified tutors within minutes. Interactive whiteboard included.
              </p>
            </div>
            <div className="max-w-xs">
              <div className="text-8xl font-light text-teal-400 mb-6">3</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Learn Better</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your solution history anytime. Build your personal knowledge base and track learning progress.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Process