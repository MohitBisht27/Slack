export default function SubmitButton({ loading, text }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </>
      ) : (
        text
      )}
    </button>
  );
}
