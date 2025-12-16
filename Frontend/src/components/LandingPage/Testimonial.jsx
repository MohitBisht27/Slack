import React from 'react'

const Testimonial = () => {
  return (
    <div><section id="testimonials" className="bg-gradient-to-br from-blue-500 to-blue-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <path d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z" fill="white"/>
            <path d="M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z" fill="white"/>
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-6xl text-blue-300">"</div>
          </div>
          
          <p className="text-white text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            This platform transformed my learning experience! I used to struggle with complex math problems for hours. Now I get expert help within minutes and actually understand the concepts. My grades improved from B to A+!
          </p>
          
          <p className="text-teal-300 text-xl font-semibold mb-12">PRIYA SHARMA</p>
          
          <div className="flex justify-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">PS</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">RK</div>
            </div>
            <div className="w-20 h-20 rounded-full bg-white overflow-hidden border-4 border-teal-400 shadow-xl -mt-2">
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">AJ</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">SK</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">MN</div>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default Testimonial