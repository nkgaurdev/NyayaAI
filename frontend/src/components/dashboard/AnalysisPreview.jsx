export default function AnalysisPreview({ analysis }) {
  const issueCount = analysis?.issues?.length || 0;

  return (
    <div className="relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />

      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-slate-400 text-sm">
              Live AI Analysis
            </p>

            <h3 className="text-xl font-semibold mt-1">
              Contract Risk Engine
            </h3>
          </div>

          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Online
          </div>
        </div>

        {/* Main Score */}
        <div className="bg-black/30 rounded-2xl p-6 mb-6">
          <p className="text-slate-400 text-sm">
            Issues Found
          </p>

          <h2 className="text-6xl font-bold text-red-400 mt-2">
            {issueCount}
          </h2>

          <p className="text-slate-500 mt-2">
            {analysis ? "Contract Analyzed" : "Waiting For Upload"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-500/10 rounded-xl p-4 text-center">
            <h3 className="text-red-400 text-2xl font-bold">
              {issueCount}
            </h3>
            <p className="text-sm">Issues</p>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-4 text-center">
            <h3 className="text-yellow-400 text-2xl font-bold">
              {analysis ? "✓" : "-"}
            </h3>
            <p className="text-sm">Analyzed</p>
          </div>

          <div className="bg-green-500/10 rounded-xl p-4 text-center">
            <h3 className="text-green-400 text-2xl font-bold">
              {analysis ? "AI" : "-"}
            </h3>
            <p className="text-sm">Powered</p>
          </div>
        </div>

        {/* Worker Rights */}
        <div className="mt-8">
          <p className="text-slate-400 text-sm mb-3">
            Worker Rights
          </p>

          <div className="bg-white/5 rounded-xl px-4 py-3">
            {analysis?.worker_rights ||
              "Upload a contract to begin analysis"}
          </div>
        </div>

        {/* Issues Detected */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">
            Issues Detected
          </p>

          <div className="space-y-3">
            {analysis?.issues?.length > 0 ? (
              analysis.issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-red-400">
                    {issue.name}
                  </h4>

                  <p className="text-sm text-slate-300 mt-2">
                    {issue.reason}
                  </p>

                  <div className="mt-2 text-xs text-slate-500">
                    Severity: {issue.severity}
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

        {/* Explain Like I'm a Gig Worker */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">
            Explain Like I'm a Gig Worker
          </p>

          <div className="bg-white/5 rounded-xl px-4 py-3">
            {analysis?.plain_english ||
              "Waiting for analysis..."}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <p className="text-slate-400 text-sm mb-3">
            Recommendations
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            {typeof analysis?.recommendations === "string"
              ? analysis.recommendations
              : JSON.stringify(analysis?.recommendations || "No recommendations")}
          </div>
        </div>

      </div>
    </div>
  );
}