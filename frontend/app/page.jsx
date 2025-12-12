"use client";
import { useState } from "react";
import Header from "../components/Header";
import UploadDropzone from "../components/UploadDropzone";
import DocumentList from "../components/DocumentList";
import ChatWindow from "../components/ChatWindow";

export default function Page() {
  const [documents, setDocuments] = useState([]); // local list of uploaded files metadata
  const [activeDocIds, setActiveDocIds] = useState([]); // if you later implement per-doc queries
  const [latestAnswer, setLatestAnswer] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1 space-y-4">
          <UploadDropzone
            onUploaded={(fileMeta) => {
              setDocuments((s) => [fileMeta, ...s]);
            }}
          />
          <DocumentList documents={documents} onToggle={(id) => {
            setActiveDocIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
          }} />
        </div>

        <div className="lg:col-span-2">
          <ChatWindow
            onAnswer={(ans) => setLatestAnswer(ans)}
            latestAnswer={latestAnswer}
          />
        </div>
      </div>
    </div>
  );
}
