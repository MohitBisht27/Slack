import React from 'react'

const Contact = () => {
  return (
    <>
        <section className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">I need more info!</h2>
          <div className="w-16 h-1 bg-teal-400 mx-auto mb-12"></div>
          
          <form  className="flex gap-4 max-w-xl mx-auto">
            <input
              type="email"
              
              
              placeholder="Insert your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-teal-400 outline-none text-gray-700"
              required
            />
            <button
              type="submit"
              className="bg-teal-400 text-white px-12 py-4 rounded-full font-semibold hover:bg-teal-500 transition"
            >
              SEND
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact