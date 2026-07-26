import { useState } from "react";
import api from "../src/services/api";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file || uploading) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const res = await api.post("/upload", formData);

      setMessage(res.data.message || "PDF uploaded successfully.");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>Drag and drop or click here to browse</div>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
          setMessage("");
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFile = e.dataTransfer.files?.[0] || null;
          if (droppedFile) {
            setFile(droppedFile);
            setMessage("");
          }
        }}
      />

      <button type="button" onClick={uploadFile} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload PDFs"}
      </button>

      <div>Or Try a sample pdf</div>

      <div>{file ? file.name : "No file selected"}</div>

      {message && <div>{message}</div>}
    </div>
  );
}

export default UploadBox;
