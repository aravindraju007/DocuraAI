export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white text-lg font-bold shadow">
          PDF
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Multi-PDF Chat AI</h1>
          <p className="text-sm text-gray-500">Ask questions across all uploaded PDFs — zero cost stack.</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <a
          href="https://ollama.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-3 py-1 border rounded-md text-primary"
        >
          Docs
        </a>
      </div>
    </header>
  );
}
