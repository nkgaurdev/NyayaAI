import { useRef, useState } from "react";
import axios from "axios";

export default function UploadZone({ setAnalysis }) {
  const fileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

const handleFileChange = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  setSelectedFile(file);
  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-pdf",
      formData
    );

    setAnalysis(response.data.analysis);

    console.log(response.data);

    console.log(response.data.analysis);

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

  return (
    <div className="mt-10">
      <div
        className="
        border-2
        border-dashed
        border-slate-700
        rounded-3xl
        p-10
        text-center
        bg-white/[0.02]
        hover:bg-white/[0.04]
        transition
      "
      >
        <h3 className="text-xl font-semibold">
          Upload Contract
        </h3>

        <p className="text-slate-400 mt-2">
          PDF files only
        </p>

        <input
          type="file"
          accept=".pdf"
          ref={fileRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => fileRef.current.click()}
          className="
            mt-6
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
          "
        >
          Select PDF
        </button>

        {selectedFile && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 font-medium">
              Selected File
            </p>



            <p className="text-white mt-1">
              {selectedFile.name}
            </p>
          </div>
        )}

        {loading && (
  <div className="mt-4 text-blue-400">
    Analyzing Contract...
  </div>
)}
      </div>
    </div>
  );
}