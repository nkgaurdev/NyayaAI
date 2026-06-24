import { useState } from "react";
import UploadZone from "./UploadZone";
import AnalysisPreview from "../dashboard/AnalysisPreview";
import CompareUploader from "../comparison/CompareUploader";

export default function HeroUploadSection() {
  const [analysis, setAnalysis] = useState(null);
  const [comparison, setComparison] = useState(null);

  const [mode, setMode] = useState("analyze");

  return (
    <section className="py-4">

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center">

        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
          AI-Powered Contract Intelligence
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
          Know What
          <br />
          <span className="text-blue-400">
            You're Signing.
          </span>
        </h1>

        <p className="text-slate-400 text-lg lg:text-xl mt-6 max-w-3xl mx-auto">
          Upload contracts, detect hidden risks,
          understand worker rights, compare agreements,
          and receive AI-powered legal explanations.
        </p>

      </div>

      {/* Mode Switch */}
      <div className="max-w-3xl mx-auto mt-6">

        <div className="flex bg-white/5 rounded-2xl p-2">

          <button
            onClick={() => setMode("analyze")}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === "analyze"
                ? "bg-indigo-600"
                : ""
            }`}
          >
            Analyze Contract
          </button>

          <button
            onClick={() => setMode("compare")}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === "compare"
                ? "bg-indigo-600"
                : ""
            }`}
          >
            Compare Contracts
          </button>

        </div>

      </div>

      {/* Upload Area */}
      <div className="max-w-5xl mx-auto mt-8">

        {mode === "analyze" ? (
          <UploadZone setAnalysis={setAnalysis} />
        ) : (
          <CompareUploader
            setComparison={setComparison}
          />
        )}

      </div>

      {/* Analysis Result */}
      {analysis && mode === "analyze" && (
        <div className="max-w-5xl mx-auto mt-16">
          <AnalysisPreview analysis={analysis} />
        </div>
      )}

      {/* Comparison Result */}
      {comparison && mode === "compare" && (
        <div className="max-w-5xl mx-auto mt-16">

          <div className="bg-white/5 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Comparison Result
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-white/5 p-5 rounded-xl">
                <h3>Contract 1 Score</h3>
                <p className="text-5xl mt-2">
                  {comparison.contract1_score}
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl">
                <h3>Contract 2 Score</h3>
                <p className="text-5xl mt-2">
                  {comparison.contract2_score}
                </p>
              </div>

            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">

              <h3 className="text-emerald-400 font-semibold">
                Safer Contract
              </h3>

              <p className="text-3xl mt-2">
                {comparison.safer_contract}
              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}