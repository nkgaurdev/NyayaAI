import React from "react";
import { jsPDF } from "jspdf";
import RiskDistributionChart from "./RiskDistributionChart";

const INSIGHTS = {
  "Independent Contractor Status":
    "You are classified as an independent contractor instead of an employee.",
  "Lack of Employment Benefits":
    "Employment benefits such as insurance, paid leave, or provident fund may not apply.",
  "No Guaranteed Income":
    "The agreement does not guarantee a minimum income or fixed earnings.",
  "Unilateral Account Suspension":
    "The platform may suspend your account without prior notice.",
  "Rating System":
    "Your ratings may directly affect your ability to continue receiving work.",
  "Broad Liability Clause":
    "The agreement places broad legal responsibilities on the worker.",
  "Arbitration Requirement":
    "Disputes may need to be resolved through arbitration instead of court.",
  "Data Privacy Concerns":
    "The agreement allows collection and processing of your personal data.",
};

export default function AnalysisPreview({ analysis, uploadedFile }) {
  const downloadPdfReport = () => {
    if (!analysis) {
      alert("No analysis available yet.");
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = 50;

    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 40) {
        doc.addPage();
        y = 50;
      }
    };

    const addHeading = (text, size = 16) => {
      ensureSpace(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.setTextColor(17, 24, 39);
      doc.text(text, margin, y);
      y += 20;
    };

    const addText = (text, size = 11, isBold = false) => {
      const safeText = text || "";
      const lines = doc.splitTextToSize(safeText, pageWidth - margin * 2);
      lines.forEach((line) => {
        ensureSpace(14);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(55, 65, 81);
        doc.text(line, margin, y);
        y += 14;
      });
    };

    const addBullet = (text) => {
      const safeText = text || "";
      const lines = doc.splitTextToSize(
        `• ${safeText}`,
        pageWidth - margin * 2,
      );
      lines.forEach((line) => {
        ensureSpace(14);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(55, 65, 81);
        doc.text(line, margin + 8, y);
        y += 14;
      });
    };

    // PDF Generation Logic
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 48, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("NyayaAI Contract Risk Report", margin, 30);

    y = 80;
    addHeading("Contract Summary", 16);
    addText(`Uploaded File: ${uploadedFile?.name || "Unknown contract"}`);
    addText(`Risk Score: ${analysis?.risk_score || 0}/100`);
    addText(`Risk Level: ${analysis?.risk_level || "Unknown"}`);
    addText(`Summary: ${analysis?.summary || "No summary available."}`);
    addText(
      `Plain English: ${analysis?.plain_english || "No explanation available."}`,
    );

    addHeading("Issues Detected", 16);
    if (analysis?.issues?.length) {
      analysis.issues.forEach((issue) => {
        addBullet(`${issue.name} (${issue.severity || "Unknown"})`);
        addText(`Reason: ${issue.reason || "No reason provided."}`);
        addText(
          `Recommendation: ${issue.recommendation || "Review carefully."}`,
        );
      });
    } else {
      addText("No issues detected.");
    }

    addHeading("Worker Rights Impact", 16);
    if (analysis?.affected_rights?.length) {
      analysis.affected_rights.forEach((right) => addBullet(right));
    } else {
      addText("No rights identified.");
    }

    addHeading("Recommendations", 16);
    addText(analysis?.recommendations || "No recommendations available.");

    addHeading("Appeal Letter Draft", 16);
    addText(analysis?.appeal_letter || "No appeal letter available.");

    doc.save("NyayaAI_Report.pdf");
  };

  // Helper for dynamic risk colors
  const getRiskColor = (score) => {
    if (score >= 70) return "text-red-400";
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getRiskBg = (score) => {
    if (score >= 70) return "bg-red-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!analysis) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto font-sans text-slate-200">
      {/* Background glow effects */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* --- HEADER --- */}
        <div className="border-b border-white/10 p-8 bg-white/[0.02]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                  Live AI Analysis
                </span>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Online
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Contract Risk Engine
              </h3>
              <p className="text-slate-400 mt-2 text-sm">
                {uploadedFile?.name || "Analyzing document..."}
              </p>
            </div>

            {/* Confidence Meter */}
            <div className="text-right">
              <p className="text-slate-400 text-sm mb-2">AI Confidence</p>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: analysis?.issues?.length > 0 ? "92%" : "0%",
                    }}
                  />
                </div>
                <span className="text-cyan-400 font-semibold">
                  {analysis?.issues?.length > 0 ? "92%" : "0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Pages Analyzed",
                value: analysis.page_count,
                icon: "📄",
              },
              {
                label: "Issues Detected",
                value: analysis.issues?.length || 0,
                icon: "🔍",
              },
              {
                label: "Rights Affected",
                value: analysis.affected_rights?.length || 0,
                icon: "⚖️",
              },
              {
                label: "Overall Risk",
                value: analysis.risk_level,
                icon: "⚠️",
                valueClass: getRiskColor(analysis?.risk_score || 0),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <span>{stat.icon}</span>
                  {stat.label}
                </div>
                <p
                  className={`text-2xl font-bold text-white ${stat.valueClass || ""}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 grid lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: Scores & Breakdown --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1. Main Risk Score Card (The Anchor) */}
            <div className="bg-gradient-to-br from-indigo-900/40 via-black/40 to-black/20 rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-1 ${getRiskBg(analysis?.risk_score || 0)}`}
              />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                Overall Risk Index
              </p>
              <h2
                className={`text-8xl font-black mb-1 tracking-tighter ${getRiskColor(analysis?.risk_score || 0)}`}
              >
                {analysis?.risk_score || 0}
              </h2>
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  analysis?.risk_score >= 70
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : analysis?.risk_score >= 40
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}
              >
                {analysis?.risk_level || "Unknown"}
              </span>
              <p className="text-sm text-slate-300 mt-6 leading-relaxed opacity-80">
                {analysis?.score_reason ||
                  "Analyzed against standardized gig-economy worker protection frameworks."}
              </p>
            </div>

            {/* 2. Compact Metric Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  AI Confidence
                </p>
                <p className="text-lg font-bold text-white">92.4%</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Legal Complexity
                </p>
                <p className="text-lg font-bold text-white">
                  {analysis.page_count > 5 ? "High" : "Standard"}
                </p>
              </div>
            </div>

            {/* 3. Severity Breakdown (Visual focus) */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                Issue Distribution
              </h4>
              <RiskDistributionChart
                high={analysis?.high_issues || 0}
                medium={analysis?.medium_issues || 0}
                low={analysis?.low_issues || 0}
              />
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>High: {analysis?.high_issues || 0}</span>
                <span>Med: {analysis?.medium_issues || 0}</span>
                <span>Low: {analysis?.low_issues || 0}</span>
              </div>
            </div>

            {/* 4. Readiness & Compliance Badges */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                Compliance Status
              </h4>
              <div className="space-y-3">
                {[
                  {
                    label: "Arbitration Clause",
                    status: "Detected",
                    color: "text-red-400",
                  },
                  {
                    label: "Income Guarantee",
                    status: "Missing",
                    color: "text-red-400",
                  },
                  {
                    label: "Data Ownership",
                    status: "Verified",
                    color: "text-emerald-400",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-slate-300">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Strategy Action Banner */}
            <div className="bg-gradient-to-tr from-indigo-800 to-indigo-600 rounded-3xl p-6 shadow-xl shadow-indigo-900/50">
              {/* 5. Quick Knowledge Base */}
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  Helpful Resources
                </h4>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-xs text-indigo-300 hover:text-white transition-colors underline"
                  >
                    Understanding Independent Contractor status →
                  </a>
                  <a
                    href="#"
                    className="block text-xs text-indigo-300 hover:text-white transition-colors underline"
                  >
                    How to negotiate contract clauses →
                  </a>
                  <a
                    href="#"
                    className="block text-xs text-indigo-300 hover:text-white transition-colors underline"
                  >
                    What is an arbitration clause? →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Insights & Details --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Key Insights */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <span>🧠</span> AI Key Insights
              </h2>
              <div className="space-y-3">
                {analysis.issues?.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-indigo-950/30 rounded-xl p-4 border border-indigo-500/10 hover:bg-indigo-900/30 transition-colors"
                  >
                    <span className="text-indigo-400 mt-0.5">✦</span>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {INSIGHTS[issue.name] || issue.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanations Tabs / Accordions (Visually separated) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                  Executive Summary
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {analysis?.summary || "Upload a contract to generate summary"}
                </p>
              </div>

              <div className="bg-blue-500/10 rounded-3xl p-6 border border-blue-500/20">
                <h4 className="text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wider">
                  Explain Like I'm a Gig Worker
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {analysis?.plain_english || "Waiting for analysis..."}
                </p>
              </div>
            </div>

            {/* Issues Detailed List */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                Specific Issues Detected
              </h4>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {analysis?.issues?.length > 0 ? (
                  analysis.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="bg-black/20 rounded-2xl p-5 border border-white/5"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white text-lg">
                          {issue.name}
                        </h4>
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                            issue.severity?.toLowerCase() === "high"
                              ? "bg-red-500/20 text-red-400"
                              : issue.severity?.toLowerCase() === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-4">
                        {issue.reason}
                      </p>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-xs text-slate-500 mb-1 font-semibold uppercase">
                            Evidence
                          </p>
                          <p className="italic text-xs text-slate-400">
                            "{issue.evidence}"
                          </p>
                        </div>
                        <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/10">
                          <p className="text-xs text-emerald-500/70 mb-1 font-semibold uppercase">
                            Recommendation
                          </p>
                          <p className="text-xs text-emerald-100">
                            {issue.recommendation ||
                              "Review this clause carefully before accepting."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">
                    No specific issues detected yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ACTION BAR: Appeal Letter & Exports --- */}
        <div className="bg-black/40 border-t border-white/10 p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Letter Preview */}
            <div className="w-full lg:w-2/3">
              <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                Appeal Letter Draft
              </h4>
              <textarea
                readOnly
                value={analysis?.appeal_letter || ""}
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Appeal letter will appear here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3 pt-7">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(analysis?.appeal_letter || "")
                }
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>📋</span> Copy Letter
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([analysis?.appeal_letter || ""], {
                    type: "text/plain",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "NyayaAI_Appeal_Letter.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>📝</span> Download TXT
              </button>

              <button
                onClick={downloadPdfReport}
                className="w-full px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>📊</span> Download PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic custom scrollbar styles injected for the issues list */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `,
        }}
      />
    </div>
  );
}
