export default function FormTextarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        placeholder="Tell us about yourself..."
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
}
