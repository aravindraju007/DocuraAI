export default function DocumentList({ documents = [], onToggle = () => {} }) {
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="font-medium mb-3">Uploaded Documents</h3>
      <ul className="space-y-2">
        {documents.map((d, i) => (
          <li key={i} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{d.name}</div>
              <div className="text-xs text-gray-400">Uploaded {new Date(d.uploadedAt).toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggle(d.name)}
                className="text-sm px-2 py-1 border rounded-md"
              >
                Toggle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
