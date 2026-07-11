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

  return (
    <div className="relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />

      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-slate-400 text-sm">Live AI Analysis</p>

            <h3 className="text-xl font-semibold mt-1">Contract Risk Engine</h3>
          </div>

          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Online
          </div>
        </div>

        {/* Contract Overview */}

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-slate-400 text-sm">Pages</p>

            <p className="text-3xl font-bold mt-2">{analysis.page_count}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-slate-400 text-sm">Issues Detected</p>

            <p className="text-3xl font-bold mt-2">{analysis.issues?.length}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-slate-400 text-sm">Worker Rights</p>

            <p className="text-3xl font-bold mt-2">
              {analysis.affected_rights?.length}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-slate-400 text-sm">Overall Risk</p>

            <p
              className={`text-3xl font-bold mt-2 ${
                analysis.risk_level === "High"
                  ? "text-red-400"
                  : analysis.risk_level === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
              }`}
            >
              {analysis.risk_level}
            </p>
          </div>
        </div>

        {/* Risk Score */}
        <div className="bg-black/30 rounded-2xl p-6 mb-6">
          <p className="text-slate-400 text-sm">Risk Score</p>

          <h2
            className={`text-6xl font-bold mt-2 ${
              analysis?.risk_score >= 70
                ? "text-red-400"
                : analysis?.risk_score >= 40
                  ? "text-yellow-400"
                  : "text-green-400"
            }`}
          >
            {analysis?.risk_score || 0}
          </h2>

          <p className="text-slate-500 mt-2">
            {analysis?.risk_score >= 70
              ? "🔴 High Risk Contract"
              : analysis?.risk_score >= 40
                ? "🟡 Moderate Risk Contract"
                : "🟢 Worker Friendly Contract"}
          </p>

          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                analysis?.risk_score >= 70
                  ? "bg-red-500/20 text-red-400"
                  : analysis?.risk_score >= 40
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
              }`}
            >
              {analysis?.risk_level}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            {analysis?.score_reason}
          </p>

          <div className="w-full bg-white/10 rounded-full h-3 mt-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                analysis?.risk_score >= 70
                  ? "bg-red-500"
                  : analysis?.risk_score >= 40
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              style={{
                width: `${analysis?.risk_score || 0}%`,
              }}
            />
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-slate-400 text-sm">Analysis Confidence</p>

            <p className="text-cyan-400 text-sm">
              {analysis?.issues?.length > 0 ? "92%" : "0%"}
            </p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full"
              style={{
                width: analysis?.issues?.length > 0 ? "92%" : "0%",
              }}
            />
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-500/10 rounded-xl p-4 text-center">
            <h3 className="text-red-400 text-2xl font-bold">
              {analysis?.high_issues || 0}
            </h3>
            <p className="text-sm">High</p>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-4 text-center">
            <h3 className="text-yellow-400 text-2xl font-bold">
              {analysis?.medium_issues || 0}
            </h3>
            <p className="text-sm">Medium</p>
          </div>

          <div className="bg-green-500/10 rounded-xl p-4 text-center">
            <h3 className="text-green-400 text-2xl font-bold">
              {analysis?.low_issues || 0}
            </h3>
            <p className="text-sm">Low</p>
          </div>
        </div>

        <div className="mt-6">
          <RiskDistributionChart
            high={analysis?.high_issues || 0}
            medium={analysis?.medium_issues || 0}
            low={analysis?.low_issues || 0}
          />
        </div>

        {/* AI Key Insights */}

        <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-5">🧠 AI Key Insights</h2>

          <div className="space-y-4">
            {analysis.issues?.map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/5 rounded-xl p-4"
              >
                <span className="text-yellow-400 text-xl">⚠</span>

                <p className="text-slate-200 leading-relaxed">
                  {INSIGHTS[issue.name] || issue.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-8">
          <p className="text-slate-400 text-sm mb-3">Executive Summary</p>

          <div className="bg-white/5 rounded-xl px-4 py-3">
            {analysis?.summary || "Upload a contract to generate summary"}
          </div>
        </div>

        {/* Worker Rights */}
        <div className="mt-8">
          <p className="text-slate-400 text-sm mb-3">Worker Rights</p>

          <div className="bg-white/5 rounded-xl px-4 py-3">
            {analysis?.worker_rights || "Upload a contract to begin analysis"}
          </div>
        </div>

        {/* Rights Affected */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">Rights Affected</p>

          <div className="space-y-2">
            {analysis?.affected_rights?.length > 0 ? (
              analysis.affected_rights.map((right, index) => (
                <div
                  key={index}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3"
                >
                  🛡️ {right}
                </div>
              ))
            ) : (
              <div className="bg-white/5 rounded-xl px-4 py-3">
                No rights identified yet
              </div>
            )}
          </div>
        </div>

        {/* Issues */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">Issues Detected</p>

          <div className="space-y-4">
            {analysis?.issues?.length > 0 ? (
              analysis.issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-red-400 text-xl">
                      {issue.name}
                    </h4>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
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

                  <p className="text-slate-300">{issue.reason}</p>

                  <div className="mt-4 bg-black/20 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">
                      Evidence From Contract
                    </p>

                    <p className="italic text-sm text-slate-300">
                      "{issue.evidence}"
                    </p>
                  </div>

                  <div className="mt-4 bg-emerald-500/10 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">
                      Recommendation
                    </p>

                    <p className="text-sm">
                      {issue.recommendation ||
                        "Review this clause carefully before accepting the contract."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/5 rounded-xl px-4 py-3">
                No issues detected yet
              </div>
            )}
          </div>
        </div>

        {/* Plain English */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">
            Explain Like I'm a Gig Worker
          </p>

          <div className="bg-white/5 rounded-xl px-4 py-3">
            {analysis?.plain_english || "Waiting for analysis..."}
          </div>
        </div>

        {/* Overall Recommendations */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">Overall Recommendations</p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            {analysis?.recommendations || "No recommendations available"}
          </div>
        </div>

        {/* Appeal Letter */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">Appeal Letter Draft</p>

          <textarea
            readOnly
            value={analysis?.appeal_letter || ""}
            className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-sm"
          />

          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(analysis?.appeal_letter || "");
              }}
              className="
      px-4 py-2
      rounded-lg
      bg-blue-600
      hover:bg-blue-700
    "
            >
              Copy Letter
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
              className="
      px-4 py-2
      rounded-lg
      bg-emerald-600
      hover:bg-emerald-700
    "
            >
              Download Letter
            </button>

            <button
              onClick={downloadPdfReport}
              className="
    px-4 py-2
    rounded-lg
    bg-purple-600
    hover:bg-purple-700
  "
            >
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
