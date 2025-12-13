export default function ReelInfo({ title, description, tags }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-900 line-clamp-1">{title}</h4>
      <p className="text-sm text-gray-700 line-clamp-2">{description}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
