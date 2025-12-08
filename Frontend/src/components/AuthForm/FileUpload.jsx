export default function FileUpload({
  name,
  onChange,
  label = "Upload File",
  accept,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                   file:bg-blue-50 file:text-blue-700 file:font-semibold 
                   file:rounded-full file:px-4 file:py-2 
                   hover:file:bg-blue-100 cursor-pointer"
      />
    </div>
  );
}
