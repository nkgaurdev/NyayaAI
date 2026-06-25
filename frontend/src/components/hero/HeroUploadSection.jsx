import { useState } from "react";
import UploadZone from "./UploadZone";
import AnalysisPreview from "../dashboard/AnalysisPreview";
import CompareUploader from "../comparison/CompareUploader";

export default function HeroUploadSection() {
  const [analysis, setAnalysis] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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
          <UploadZone
              setAnalysis={setAnalysis}
              setUploadedFile={setUploadedFile}
/>        ) : (
          <CompareUploader
            setComparison={setComparison}
            uploadedFile={uploadedFile}
          />
        )}

      </div>

      {/* Analysis Result */}
      {analysis && mode === "analyze" && (
        <div className="max-w-5xl mx-auto mt-16">
          <AnalysisPreview
              analysis={analysis}
              uploadedFile={uploadedFile}
          />
        </div>
      )}

      {/* Comparison Result */}
      {comparison && mode === "compare" && (
        <div className="max-w-5xl mx-auto mt-16">

          <div className="bg-white/5 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Comparison Result
            </h2>

            <div className="space-y-6">

  <div className="bg-white/5 p-5 rounded-xl">

    <div className="flex justify-between mb-3">
      <h3>Contract 1 Risk Score</h3>
      <span className="font-bold text-2xl">
        {comparison.contract1_score}
      </span>
    </div>

    <div className="w-full bg-white/10 rounded-full h-4">
      <div
        className="bg-red-500 h-4 rounded-full transition-all duration-700"
        style={{
          width: `${comparison.contract1_score}%`
        }}
      />
    </div>

  </div>

  <div className="bg-white/5 p-5 rounded-xl">

    <div className="flex justify-between mb-3">
      <h3>Contract 2 Risk Score</h3>
      <span className="font-bold text-2xl">
        {comparison.contract2_score}
      </span>
    </div>

    <div className="w-full bg-white/10 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-700"
        style={{
          width: `${comparison.contract2_score}%`
        }}
      />
    </div>

  </div>

</div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">

              <h3 className="text-emerald-400 font-semibold">
                Safer Contract
              </h3>

              <p className="text-3xl mt-2">
                {comparison.safer_contract}
              </p>


              <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5">

  <h3 className="text-indigo-400 font-semibold">
    Score Difference
  </h3>

  <p className="text-3xl mt-2">
    {comparison.score_difference}
  </p>

</div>



            </div>
          <div className="mt-6 bg-white/5 rounded-xl p-5">

        <div className="mt-6 grid md:grid-cols-2 gap-6">

  {/* Contract 1 Issues */}
  <div className="bg-white/5 rounded-xl p-5">

    <h3 className="text-lg font-semibold mb-4">
      Contract 1 Issues
    </h3>

    <div className="space-y-3">
      {comparison.contract1_issues?.map((issue, index) => (
  <div
    key={index}
    className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
  >
    <div className="flex justify-between items-center">
      <span>{issue.name}</span>

      <span
        className={`px-2 py-1 rounded text-xs ${
          issue.severity === "High"
            ? "bg-red-500/20 text-red-400"
            : issue.severity === "Medium"
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {issue.severity}
      </span>
    </div>
  </div>
))}
    </div>

  </div>

  {/* Contract 2 Issues */}
  <div className="bg-white/5 rounded-xl p-5">

    <h3 className="text-lg font-semibold mb-4">
      Contract 2 Issues
    </h3>

    <div className="space-y-3">
      {comparison.contract2_issues?.map((issue, index) => (
        <div
          key={index}
          className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3"
        >
          <div className="flex justify-between items-center">
            <span>{issue.name}</span>

            <span
              className={`px-2 py-1 rounded text-xs ${
                issue.severity === "High"
                  ? "bg-blue-500/20 text-blue-400"
                  : issue.severity === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {issue.severity}
            </span>
          </div>
        </div>
      ))}
    </div>

  </div>

</div>
  <h3 className="text-lg font-semibold mb-3">
    Executive Comparison Summary
  </h3>

  
  <p className="text-slate-300 whitespace-pre-line">
    {comparison.comparison_summary}
  </p>
</div>
          </div>

        </div>
      )}

    </section>
  );
}