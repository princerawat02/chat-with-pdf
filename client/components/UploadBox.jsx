import { useId, useState } from "react";
import api from "../src/services/api";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const inputId = useId();

  const uploadFile = async () => {
    if (!file || uploading) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");
      setStatus("idle");

      const res = await api.post("/upload", formData);

      setMessage(res.data.message || "PDF uploaded successfully.");
      setStatus("success");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Upload failed.");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/8 bg-slate-900/70 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
            Upload PDF
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Add a document
          </h2>
        </div>
        <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {file ? "Ready" : "Idle"}
        </div>
      </div>

      <label
        htmlFor={inputId}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const droppedFile = event.dataTransfer.files?.[0] || null;
          if (droppedFile) {
            setFile(droppedFile);
            setMessage("");
            setStatus("idle");
          }
        }}
        className="group flex min-h-55 cursor-pointer flex-col justify-center rounded-3xl border border-dashed border-white/10 bg-white/3 px-5 py-6 text-center transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/5"
      >
        <input
          id={inputId}
          type="file"
          accept=".pdf"
          className="sr-only"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
            setMessage("");
            setStatus("idle");
          }}
        />

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.06)] transition duration-200 group-hover:scale-105 group-hover:bg-cyan-300/15">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12" />
            <path d="m8 7 4-4 4 4" />
            <path d="M4 15.5v2A2.5 2.5 0 0 0 6.5 20h11A2.5 2.5 0 0 0 20 17.5v-2" />
          </svg>
        </div>

        <div className="mt-5 space-y-2">
          <p className="text-base font-medium text-white sm:text-lg">
            Drag and drop your PDF here
          </p>
          <p className="text-sm leading-6 text-slate-400">
            Or click to browse from your device.
          </p>
        </div>
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200">
          {file ? file.name : "No file selected"}
        </div>
        <div className="text-sm text-slate-400">
          {file ? "Ready to upload" : "Upload a single PDF to begin"}
        </div>
      </div>

      <button
        type="button"
        onClick={uploadFile}
        disabled={!file || uploading}
        className="mt-5 inline-flex w-full items-center justify-center rounded-[18px] bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(34,211,238,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-700 disabled:text-slate-400"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {message && (
        <div
          className={`mt-4 rounded-[18px] border px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border-rose-400/20 bg-rose-400/10 text-rose-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default UploadBox;
