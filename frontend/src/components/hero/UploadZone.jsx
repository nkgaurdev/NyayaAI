import { useRef, useState } from "react";
import axios from "axios";

export default function UploadZone({ setAnalysis }) {
  const fileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setCompleted(false);
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
      setCompleted(true);

      console.log(response.data);
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
          Upload Gig Worker Contract
        </h3>

        <p className="text-slate-400 mt-2">
          Uber • Swiggy • Zomato • Rapido • Freelancer Agreements
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
          disabled={loading}
          className="
            mt-6
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            disabled:opacity-50
          "
        >
          {loading ? "Analyzing..." : "Select PDF"}
        </button>

        {selectedFile && (
  <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">

    <p className="text-emerald-400 font-medium">
      Selected File
    </p>

    <p className="text-white mt-1 break-all">
      {selectedFile.name}
    </p>

    <button
      onClick={() => {
        setSelectedFile(null);
        setAnalysis(null);
        setCompleted(false);

        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }}
      className="
        mt-4
        px-4
        py-2
        rounded-lg
        bg-red-500/20
        text-red-400
        hover:bg-red-500/30
        transition
      "
    >
      Choose Another Contract
    </button>

  </div>
)}

        {loading && (
          <div className="mt-6">
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full animate-pulse w-full" />
            </div>

            <p className="mt-3 text-blue-400">
              Analyzing Contract...
            </p>
          </div>
        )}

        {completed && (
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-400 font-semibold">
              ✓ Analysis Complete
            </p>

            <p className="text-sm text-slate-300 mt-1">
              Contract successfully analyzed by NyayaAI
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-8 text-sm">
          <div className="bg-white/5 rounded-xl p-3">
            Detect Risks
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            Explain Rights
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            Generate Actions
          </div>
        </div>
      </div>
    </div>
  );
}