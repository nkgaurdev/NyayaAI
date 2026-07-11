import { useRef, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export default function UploadZone({ setAnalysis, setUploadedFile }) {
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCompleted(false);
    setSelectedFile(file);
    setUploadedFile(file);
    setLoading(true);
    setErrorMessage("");
    setLoadingStep(1);

    // Timings designed to sync perfectly with the 700ms CSS transitions
    setTimeout(() => setLoadingStep(2), 800);
    setTimeout(() => setLoadingStep(3), 1600);
    setTimeout(() => setLoadingStep(4), 2400);
    setTimeout(() => setLoadingStep(5), 3200);
    setTimeout(() => setLoadingStep(6), 4000);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/analyze-pdf`,
        formData,
      );
      setAnalysis({
        ...response.data.analysis,
        uploadedFile: file,
      });
      setCompleted(true);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        error?.message ||
        "Unknown upload error";

      const friendlyMessage =
        message.includes("organization_restricted") ||
        message.includes("restricted")
          ? "AI analysis is temporarily unavailable. Please try again in a moment or check your connection and API access."
          : `Upload failed: ${message}`;

      setErrorMessage(friendlyMessage);
    } finally {
      setLoadingStep(7); // Ends the pipeline animation
      setLoading(false);
    }
  };

  // Explicit Grid Definitions for perfect S-Curve alignment
  const workflowNodes = [
    {
      step: 1,
      icon: "📤",
      title: "Uploading PDF",
      col: "col-start-1",
      row: "row-start-1",
    },
    {
      step: 2,
      icon: "📖",
      title: "Extracting Text",
      col: "col-start-3",
      row: "row-start-1",
    },
    {
      step: 3,
      icon: "🧠",
      title: "Detecting Risks",
      col: "col-start-5",
      row: "row-start-1",
    },
    {
      step: 4,
      icon: "⚖️",
      title: "Mapping Rights",
      col: "col-start-5",
      row: "row-start-3",
    },
    {
      step: 5,
      icon: "📊",
      title: "Scoring Risk",
      col: "col-start-3",
      row: "row-start-3",
    },
    {
      step: 6,
      icon: "⏳",
      title: "Generating Report",
      col: "col-start-1",
      row: "row-start-3",
    },
  ];

  const workflowConnectors = [
    { source: 1, type: "right", col: "col-start-2", row: "row-start-1" },
    { source: 2, type: "right", col: "col-start-4", row: "row-start-1" },
    { source: 3, type: "down", col: "col-start-5", row: "row-start-2" },
    { source: 4, type: "left", col: "col-start-4", row: "row-start-3" },
    { source: 5, type: "left", col: "col-start-2", row: "row-start-3" },
  ];

  return (
    <div className="w-full">
      {/* --- DEFAULT UPLOAD AREA --- */}
      {!loading && !completed && (
        <div
          onClick={() => fileRef.current.click()}
          className="relative group cursor-pointer max-w-4xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="relative border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-[2rem] p-10 sm:p-14 text-center bg-[#0f172a]/60 backdrop-blur-xl transition-all duration-300 shadow-xl">
            <div className="w-20 h-20 mx-auto bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl relative z-10">📄</span>
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Upload Gig Worker Contract
            </h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Drag & drop or click to upload. Supports Uber, Swiggy, Zomato,
              Rapido, and standard Freelancer Agreements.
            </p>

            <input
              type="file"
              accept=".pdf"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 pointer-events-none"
            >
              Select PDF Document
            </button>
          </div>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {errorMessage && (
        <div className="mt-6 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/20 rounded-full text-red-400">
              ⚠️
            </div>
            <div>
              <p className="text-red-400 font-bold text-lg">Upload Failed</p>
              <p className="text-slate-300 mt-1 break-all">{errorMessage}</p>
              <button
                onClick={() => setErrorMessage("")}
                className="mt-4 px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ANIMATED WORKFLOW DIAGRAM --- */}
      {loading && (
        <div className="mt-6 rounded-[2rem] bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 sm:mb-14 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                </span>
                AI Analysis Engine
              </h3>
              <p className="text-slate-400 mt-1 text-sm font-mono truncate max-w-xs sm:max-w-md">
                Processing:{" "}
                <span className="text-slate-300">{selectedFile?.name}</span>
              </p>
            </div>
            <div className="text-indigo-400 font-mono text-xl font-bold bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
              {Math.min(Math.round((loadingStep / 6) * 100), 99)}%
            </div>
          </div>

          {/* 
            DESKTOP: Explicit CSS Grid S-Curve
            - 3 Node columns (1, 3, 5) separated by 2 Connector columns (2, 4)
            - 2 Node rows (1, 3) separated by 1 Connector row (2)
          */}
          <div
            className="hidden md:grid w-full max-w-5xl mx-auto z-0
                          grid-cols-[minmax(0,1fr)_minmax(40px,100px)_minmax(0,1fr)_minmax(40px,100px)_minmax(0,1fr)] 
                          grid-rows-[auto_minmax(40px,80px)_auto] items-center justify-items-center"
          >
            {/* Render Nodes */}
            {workflowNodes.map((node) => {
              const isActive = loadingStep === node.step;
              const isPast = loadingStep > node.step;

              return (
                <div
                  key={node.step}
                  className={`${node.col} ${node.row} w-full flex justify-center`}
                >
                  <div
                    className={`relative w-full max-w-[200px] rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-500 bg-[#0f172a] border ${
                      isActive
                        ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.25)] scale-110 z-20"
                        : isPast
                          ? "border-emerald-500/30 bg-emerald-500/5 z-10"
                          : "border-slate-800 opacity-50 z-0 scale-95"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl animate-pulse"></div>
                    )}

                    <div
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 transition-all duration-500 z-10 ${
                        isActive
                          ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                          : isPast
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-slate-800 text-slate-500 grayscale"
                      }`}
                    >
                      {isPast ? "✓" : node.icon}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-60"></div>
                      )}
                    </div>

                    <h4
                      className={`font-bold text-sm tracking-wide uppercase transition-colors z-10 ${isActive ? "text-indigo-300" : isPast ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {node.title}
                    </h4>
                  </div>
                </div>
              );
            })}

            {/* Render Sliding Connectors */}
            {workflowConnectors.map((conn, idx) => {
              const isFilled = loadingStep > conn.source;

              return (
                <div
                  key={idx}
                  className={`${conn.col} ${conn.row} w-full h-full flex items-center justify-center relative -z-10`}
                >
                  {/* Right Flow Arrow */}
                  {conn.type === "right" && (
                    <div className="w-full relative h-8 flex items-center">
                      <div className="absolute inset-x-0 h-1 bg-slate-800 rounded-full"></div>
                      <div
                        className="absolute left-0 h-1 bg-indigo-500 rounded-full transition-all duration-700 ease-in-out"
                        style={{ width: isFilled ? "100%" : "0%" }}
                      >
                        <div
                          className={`absolute -right-1 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-300 ${isFilled && loadingStep === conn.source + 1 ? "opacity-100 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "opacity-0"}`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Left Flow Arrow */}
                  {conn.type === "left" && (
                    <div className="w-full relative h-8 flex items-center">
                      <div className="absolute inset-x-0 h-1 bg-slate-800 rounded-full"></div>
                      <div
                        className="absolute right-0 h-1 bg-indigo-500 rounded-full transition-all duration-700 ease-in-out"
                        style={{ width: isFilled ? "100%" : "0%" }}
                      >
                        <div
                          className={`absolute -left-1 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-300 ${isFilled && loadingStep === conn.source + 1 ? "opacity-100 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "opacity-0"}`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Down Flow Arrow */}
                  {conn.type === "down" && (
                    <div className="h-full relative w-8 flex justify-center">
                      <div className="absolute inset-y-0 w-1 bg-slate-800 rounded-full"></div>
                      <div
                        className="absolute top-0 w-1 bg-indigo-500 rounded-full transition-all duration-700 ease-in-out"
                        style={{ height: isFilled ? "100%" : "0%" }}
                      >
                        <div
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-indigo-400 transition-opacity duration-300 ${isFilled && loadingStep === conn.source + 1 ? "opacity-100 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "opacity-0"}`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE: Sleek Vertical Timeline with Travelling Dot */}
          <div className="md:hidden relative pl-8 py-4 space-y-10">
            {/* Background Track */}
            <div className="absolute top-4 bottom-4 left-[39px] w-[3px] bg-slate-800 z-0 rounded-full"></div>

            {/* Animated Fill Line */}
            <div
              className="absolute top-4 left-[39px] w-[3px] bg-indigo-500 transition-all duration-700 ease-in-out z-0 rounded-full"
              style={{ height: `${Math.min((loadingStep - 1) * 20, 100)}%` }}
            >
              {/* Traveling Glowing Dot on Mobile */}
              {loadingStep > 0 && loadingStep < 7 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-indigo-300 rounded-full shadow-[0_0_15px_rgba(165,180,252,1)]"></div>
              )}
            </div>

            {workflowNodes.map((node) => {
              const isActive = loadingStep === node.step;
              const isPast = loadingStep > node.step;

              return (
                <div
                  key={node.step}
                  className="relative flex items-center gap-6 z-10"
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl transition-all duration-500 bg-[#0f172a] border-2 ${
                      isActive
                        ? "border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110"
                        : isPast
                          ? "border-emerald-500 text-emerald-400"
                          : "border-slate-800 text-slate-600"
                    }`}
                  >
                    {isPast ? "✓" : node.icon}
                  </div>
                  <div
                    className={`transition-all duration-500 ${isActive ? "opacity-100 translate-x-2" : "opacity-60"}`}
                  >
                    <h4
                      className={`font-bold text-base uppercase tracking-wider ${isActive ? "text-indigo-300" : isPast ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {node.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- COMPLETED STATE --- */}
      {completed && selectedFile && (
        <div className="mt-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/30 p-10 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            ✓
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-400 mb-3 tracking-tight">
            Analysis Complete
          </h3>
          <p className="text-slate-300 mb-8 max-w-sm mx-auto">
            Successfully processed and mapped{" "}
            <span className="font-semibold text-white break-all">
              {selectedFile.name}
            </span>
          </p>

          <button
            onClick={() => {
              setSelectedFile(null);
              setAnalysis(null);
              setUploadedFile(null);
              setCompleted(false);
              setLoadingStep(0);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="px-8 py-3 rounded-xl border-2 border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 transition-all duration-300 text-sm font-bold uppercase tracking-wider"
          >
            Analyze Another Contract
          </button>
        </div>
      )}
    </div>
  );
}
