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

  // Helper for dynamic colors
  const getSeverityBg = (severity) => {
    const s = severity?.toLowerCase();
    if (s === "high") return "bg-red-500/20 text-red-400 border-red-500/30";
    if (s === "medium")
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <section className="relative py-12 lg:py-20 text-slate-200 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO HEADER --- */}
      <div className="relative max-w-5xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AI-Powered Contract Intelligence
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          Know What <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            You're Signing.
          </span>
        </h1>

        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Upload contracts, detect hidden risks, understand worker rights,
          compare agreements, and receive AI-powered legal explanations in
          seconds.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { icon: "⚡", text: "AI Powered", color: "emerald" },
            { icon: "🔒", text: "Privacy First", color: "blue" },
            { icon: "📄", text: "PDF Reports", color: "purple" },
            { icon: "⚖️", text: "Worker Rights", color: "orange" },
          ].map((badge, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full bg-${badge.color}-500/10 border border-${badge.color}-500/20 text-${badge.color}-300 text-sm font-medium flex items-center gap-2`}
            >
              <span>{badge.icon}</span> {badge.text}
            </div>
          ))}
        </div>
      </div>

      {/* --- MODE SWITCHER --- */}
      <div className="relative max-w-md mx-auto mt-12 px-4">
        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-sm">
          <button
            onClick={() => setMode("analyze")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              mode === "analyze"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <span>🔍</span> Analyze Contract
          </button>
          <button
            onClick={() => setMode("compare")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              mode === "compare"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <span>⚖️</span> Compare Contracts
          </button>
        </div>
      </div>

      {/* --- UPLOAD AREA --- */}
      <div className="relative max-w-4xl mx-auto mt-8 px-4 z-10">
        <div className="bg-white/[0.02] border border-white/10 p-2 sm:p-4 rounded-[2rem] shadow-2xl backdrop-blur-xl">
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
      </div>

      {/* --- DYNAMIC RESULTS SECTION --- */}
      <div className="relative z-10 px-4">
        {analysis && mode === "analyze" && (
          <div
            ref={analysisRef}
            className="max-w-6xl mx-auto mt-20 pt-10 border-t border-white/10"
          >
            <AnalysisPreview analysis={analysis} uploadedFile={uploadedFile} />
          </div>
        )}

        {comparison && mode === "compare" && (
          <div
            ref={comparisonRef}
            className="max-w-6xl mx-auto mt-20 pt-10 border-t border-white/10"
          >
            <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
              {/* Card Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                  AI Contract Comparison
                </div>
                <h2 className="text-4xl font-extrabold text-white">
                  Versus Matchup
                </h2>
                <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                  Side-by-side AI analysis to identify the safer agreement for
                  you.
                </p>
              </div>

              {/* Top Summary / Winner Highlight */}
              <div className="grid lg:grid-cols-3 gap-6 mb-12 relative z-10">
                {/* Contract 1 Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">
                    Contract 1 Risk Score
                  </h3>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-5xl font-black text-white">
                      {comparison.contract1_score}
                    </span>
                    <span className="text-slate-500 mb-1">/100</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${comparison.contract1_score}%` }}
                    />
                  </div>
                  <p className="text-red-400 text-sm mt-3 font-medium">
                    {comparison.contract1_issues?.length || 0} issues detected
                  </p>
                </div>

                {/* The Winner Card */}
                <div className="bg-gradient-to-b from-emerald-500/20 to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 text-center flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-9xl opacity-10">
                    🏆
                  </div>
                  <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">
                    Recommended Safer Contract
                  </h3>
                  <p className="text-4xl font-black text-white my-2">
                    {comparison.safer_contract}
                  </p>
                  <div className="inline-block mt-4">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-sm font-semibold">
                      +{comparison.score_difference} pt advantage
                    </span>
                  </div>
                </div>

                {/* Contract 2 Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">
                    Contract 2 Risk Score
                  </h3>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-5xl font-black text-white">
                      {comparison.contract2_score}
                    </span>
                    <span className="text-slate-500 mb-1">/100</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${comparison.contract2_score}%` }}
                    />
                  </div>
                  <p className="text-blue-400 text-sm mt-3 font-medium">
                    {comparison.contract2_issues?.length || 0} issues detected
                  </p>
                </div>
              </div>

              {/* Side-by-Side Issues Comparison */}
              <div className="grid md:grid-cols-2 gap-8 mb-12 relative z-10">
                {/* Contract 1 Issues */}
                <div className="bg-black/20 border border-white/5 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <span className="text-red-400">📄</span> Contract 1 Issues
                  </h3>
                  <div className="space-y-4">
                    {comparison.contract1_issues?.length > 0 ? (
                      comparison.contract1_issues.map((issue, index) => (
                        <div
                          key={index}
                          className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-slate-200 font-medium text-sm leading-relaxed">
                              {issue.name}
                            </span>
                            <span
                              className={`shrink-0 px-2.5 py-1 border rounded-md text-xs font-bold uppercase tracking-wider ${getSeverityBg(issue.severity)}`}
                            >
                              {issue.severity}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 italic text-sm">
                        No issues detected.
                      </p>
                    )}
                  </div>
                </div>

                {/* Contract 2 Issues */}
                <div className="bg-black/20 border border-white/5 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <span className="text-blue-400">📄</span> Contract 2 Issues
                  </h3>
                  <div className="space-y-4">
                    {comparison.contract2_issues?.length > 0 ? (
                      comparison.contract2_issues.map((issue, index) => (
                        <div
                          key={index}
                          className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-slate-200 font-medium text-sm leading-relaxed">
                              {issue.name}
                            </span>
                            <span
                              className={`shrink-0 px-2.5 py-1 border rounded-md text-xs font-bold uppercase tracking-wider ${getSeverityBg(issue.severity)}`}
                            >
                              {issue.severity}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 italic text-sm">
                        No issues detected.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Verdict Blockquote */}
              <div className="relative bg-indigo-500/10 border-l-4 border-l-indigo-500 border-y border-r border-white/10 rounded-r-2xl p-8 z-10">
                <h4 className="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
                  <span>🤖</span> AI Executive Verdict
                </h4>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3 font-medium">
                  {comparison.comparison_summary
                    ?.split("\n")
                    .filter(
                      (line) =>
                        line.trim() !== "" &&
                        !line.includes("Contract 1 contains") &&
                        !line.includes("Contract 2 contains") &&
                        !line.includes("while Contract 2"),
                    )
                    .map((line, idx) => (
                      <p key={idx} className="flex items-start gap-3">
                        <span className="text-indigo-500 mt-1">✦</span>
                        <span>{line}</span>
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- HOW IT WORKS (Only show if not currently viewing results to save space, or keep it always) --- */}
      {!analysis && !comparison && (
        <>
          <section className="relative z-10 max-w-6xl mx-auto py-24 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How NyayaAI Works
              </h2>
              <p className="text-slate-400">
                Five simple steps to secure your gig work agreements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  icon: "📄",
                  title: "Upload",
                  desc: "Securely upload any gig worker contract.",
                },
                {
                  step: "02",
                  icon: "🤖",
                  title: "Analyze",
                  desc: "AI scans and detects risky legal clauses.",
                },
                {
                  step: "03",
                  icon: "⚖️",
                  title: "Rights",
                  desc: "Worker rights are identified instantly.",
                },
                {
                  step: "04",
                  icon: "📊",
                  title: "Score",
                  desc: "Receive an AI-powered safety score.",
                },
                {
                  step: "05",
                  icon: "📥",
                  title: "Report",
                  desc: "Download a professional PDF report.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors pointer-events-none">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-6 relative z-10">{item.icon}</div>
                  <h3 className="font-semibold text-white text-lg relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 relative z-10 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* --- WHY CHOOSE NYAYAAI --- */}
          <section className="relative z-10 max-w-6xl mx-auto pb-24 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose NyayaAI?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Built to help gig workers understand contracts quickly, identify
                legal risks, and make informed decisions before signing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "⚖️",
                  value: "8",
                  label: "Risk Categories",
                  color: "blue",
                },
                {
                  icon: "📄",
                  value: "PDF",
                  label: "Professional Reports",
                  color: "emerald",
                },
                {
                  icon: "🤖",
                  value: "AI",
                  label: "Contract Intelligence",
                  color: "yellow",
                },
                {
                  icon: "⚡",
                  value: "Fast",
                  label: "Risk Analysis",
                  color: "purple",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-white/5 rounded-3xl p-8 border border-white/10 text-center hover:bg-${stat.color}-500/5 hover:border-${stat.color}-500/30 transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <h3
                    className={`text-3xl font-black text-${stat.color}-400 mb-2`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-slate-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
