import { useState, useEffect, useRef } from "react";
import UploadZone from "./UploadZone";
import AnalysisPreview from "../dashboard/AnalysisPreview";
import CompareUploader from "../comparison/CompareUploader";

export default function HeroUploadSection() {
  const [analysis, setAnalysis] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [mode, setMode] = useState("analyze");
  const analysisRef = useRef(null);
  const comparisonRef = useRef(null);

  useEffect(() => {
    if (analysis) {
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [analysis]);

  useEffect(() => {
    if (comparison) {
      setTimeout(() => {
        comparisonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [comparison]);

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
          <span className="text-blue-400">You're Signing.</span>
        </h1>

        <p className="text-slate-400 text-lg lg:text-xl mt-6 max-w-3xl mx-auto">
          Upload contracts, detect hidden risks, understand worker rights,
          compare agreements, and receive AI-powered legal explanations.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            ⚡ AI Powered
          </div>

          <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            🔒 Privacy First
          </div>

          <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
            📄 PDF Reports
          </div>

          <div className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">
            ⚖ Worker Rights
          </div>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="flex bg-white/5 rounded-2xl p-2">
          <button
            onClick={() => setMode("analyze")}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === "analyze" ? "bg-indigo-600" : ""
            }`}
          >
            Analyze Contract
          </button>

          <button
            onClick={() => setMode("compare")}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === "compare" ? "bg-indigo-600" : ""
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
          />
        ) : (
          <CompareUploader
            setComparison={setComparison}
            uploadedFile={uploadedFile}
          />
        )}
      </div>

      {/* How NyayaAI Works */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          How NyayaAI Works
        </h2>

        <div className="flex items-center justify-center gap-3 flex-wrap lg:flex-nowrap">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/40 w-56">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="font-semibold">Upload</h3>
            <p className="text-sm text-slate-400 mt-2">
              Upload any gig worker contract.
            </p>
          </div>

          <div className="hidden lg:flex items-center text-2xl text-blue-400/70 semibold">
            →
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/40 w-56">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-semibold">Analyze</h3>
            <p className="text-sm text-slate-400 mt-2">
              AI detects risky legal clauses.
            </p>
          </div>

          <div className="hidden lg:flex items-center text-2xl text-blue-400/70 semibold">
            →
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/40 w-56">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="font-semibold">Rights</h3>
            <p className="text-sm text-slate-400 mt-2">
              Worker rights are identified automatically.
            </p>
          </div>

          <div className="hidden lg:flex items-center text-2xl text-blue-400/70 semibold">
            →
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/40 w-56">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold">Score</h3>
            <p className="text-sm text-slate-400 mt-2">
              Receive an AI-powered risk score.
            </p>
          </div>

          <div className="hidden lg:flex items-center text-2xl text-blue-400/70 semibold">
            →
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/40 w-56">
            <div className="text-4xl mb-4">📥</div>
            <h3 className="font-semibold">Report</h3>
            <p className="text-sm text-slate-400 mt-2">
              Download a professional PDF report.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose NyayaAI */}
      <section className="max-w-6xl mx-auto py-20">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose NyayaAI?
        </h2>

        <p className="text-slate-400 text-center max-w-3xl mx-auto mb-12">
          Built to help gig workers understand contracts quickly, identify legal
          risks, and make informed decisions before signing.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/40">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold text-blue-400">8</h3>
            <p className="mt-3 text-slate-300">Risk Categories</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-emerald-400">PDF</h3>
            <p className="mt-3 text-slate-300">Professional Reports</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/40">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-yellow-400">AI</h3>
            <p className="mt-3 text-slate-300">Contract Intelligence</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-purple-400">Fast</h3>
            <p className="mt-3 text-slate-300">Risk Analysis</p>
          </div>
        </div>
      </section>

      {analysis && mode === "analyze" && (
        <div ref={analysisRef} className="max-w-5xl mx-auto mt-16">
          <AnalysisPreview analysis={analysis} uploadedFile={uploadedFile} />
        </div>
      )}

      {/* Comparison Result */}
      {comparison && mode === "compare" && (
        <div ref={comparisonRef} className="max-w-5xl mx-auto mt-16">
          <div className="bg-white/5 rounded-3xl p-8">
            <div className="text-center mb-10">
              <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                AI Contract Comparison
              </div>

              <h2 className="text-4xl font-bold">Compare Two Contracts</h2>

              <p className="text-slate-400 mt-3">
                Side-by-side AI analysis to identify the safer agreement.
              </p>
            </div>
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
                      width: `${comparison.contract1_score}%`,
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
                      width: `${comparison.contract2_score}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
              <h3 className="text-emerald-400 font-semibold">Safer Contract</h3>

              <p className="text-3xl mt-2">{comparison.safer_contract}</p>

              <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5">
                <h3 className="text-indigo-400 font-semibold">
                  Score Difference
                </h3>

                <p className="text-3xl mt-2">{comparison.score_difference}</p>
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
              <h3 className="text-2xl font-bold text-center mb-8">
                Executive Comparison Summary
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
                  <h4 className="text-blue-400 font-semibold mb-2">
                    📄 Contract 1
                  </h4>

                  <p className="text-3xl font-bold">
                    {comparison.contract1_issues?.length || 0}
                  </p>

                  <p className="text-slate-400">Detected Issues</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10">
                  <h4 className="text-emerald-400 font-semibold mb-2">
                    📄 Contract 2
                  </h4>

                  <p className="text-3xl font-bold">
                    {comparison.contract2_issues?.length || 0}
                  </p>

                  <p className="text-slate-400">Detected Issues</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 border-l-4 border-l-indigo-500">
                <h4 className="text-xl font-bold text-indigo-300 mb-5">
                  🤖 AI Verdict
                </h4>

                <p className="text-slate-300 whitespace-pre-line leading-8">
                  {comparison.comparison_summary
                    ?.split("\n")
                    .filter(
                      (line) =>
                        line.trim() !== "" &&
                        !line.includes("Contract 1 contains") &&
                        !line.includes("Contract 2 contains") &&
                        !line.includes("while Contract 2"),
                    )
                    .map((line) => `• ${line}`)
                    .join("\n\n")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
