"use client";
import { useState } from "react";
import api from "../lib/api";

export default function UploadDropzone({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const upload = async () => {
    if (!file) return setMessage("Select a PDF first.");
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await api.upload(form);
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setMessage("Uploaded — indexed " + (data.chunks ?? "unknown") + " chunks");
      // create simple metadata to show in UI
      onUploaded({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <label className="block text-sm font-medium text-gray-700">Upload PDF(s)</label>
      <div className="mt-2 flex items-center gap-2">
        <input
          aria-label="Upload PDF"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={upload}
          disabled={loading}
          className="ml-auto bg-primary text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">{message}</p>
      <p className="mt-2 text-xs text-gray-400">Tip: upload multiple PDFs — the backend indexes them together.</p>
    </div>
  );
}
