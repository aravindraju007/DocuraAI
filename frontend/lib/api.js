const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

async function upload(formData) {
  // Using /api/upload will proxy via next.config rewrites to backend
  return fetch("/api/upload", {
    method: "POST",
    body: formData
  });
}

async function ask(payload) {
  return fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export default {
  upload,
  ask
};
