import { useState } from "react";
import CompareUploader from "../components/comparison/CompareUploader";

export default function CompareContracts() {
  const [comparison, setComparison] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">Compare Contracts</h1>

      <p className="text-slate-400 mb-10">
        Upload two contracts and compare worker risks.
      </p>

      <CompareUploader setComparison={setComparison} />
      <div className="my-12 border-t border-white/10" />
      {comparison && (
        <div className="mt-10 bg-white/5 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-2">AI Comparison Report</h2>

          <p className="text-slate-400 mb-8">
            Side-by-side risk assessment of both agreements.
          </p>

          {/* Scores */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="font-semibold text-slate-400">Contract 1 Score</h3>

              <p className="text-5xl mt-3 text-red-400">
                {comparison.contract1_score}
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="font-semibold text-slate-400">Contract 2 Score</h3>

              <p className="text-5xl mt-3 text-red-400">
                {comparison.contract2_score}
              </p>
            </div>
          </div>

          {/* Issue Counts */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="font-semibold text-slate-400">
                Contract 1 Issues
              </h3>

              <p className="text-4xl mt-3 text-yellow-400">
                {comparison.contract1_issues}
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="font-semibold text-slate-400">
                Contract 2 Issues
              </h3>

              <p className="text-4xl mt-3 text-yellow-400">
                {comparison.contract2_issues}
              </p>
            </div>
          </div>

          {/* Difference */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-blue-400">Score Difference</h3>

            <p className="text-3xl mt-2">{comparison.score_difference}</p>
          </div>

          {/* Winner */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
            <h3 className="font-semibold text-emerald-400">Safer Contract</h3>

            <p className="text-3xl mt-2 font-bold">
              {comparison.safer_contract}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
