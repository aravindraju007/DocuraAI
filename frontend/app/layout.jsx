import "../styles/globals.css";

export const metadata = {
  title: "Multi-PDF Chat AI",
  description: "Ask questions across multiple PDFs — zero cost stack (Ollama + ChromaDB)."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-4">
            Built with ❤️ — Ollama · ChromaDB · FastAPI
          </footer>
        </div>
      </body>
    </html>
  );
}
