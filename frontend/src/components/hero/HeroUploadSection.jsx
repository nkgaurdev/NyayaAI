import { useState } from "react";
import UploadZone from "./UploadZone";
import AnalysisPreview from "../dashboard/AnalysisPreview";

export default function HeroUploadSection() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <section className="py-8">

      {/* Hero Section */}
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

        <p className="text-slate-400 text-lg lg:text-xl mt-8 max-w-3xl mx-auto">
          Upload contracts, detect hidden risks,
          understand worker rights, compare agreements,
          and receive AI-powered legal explanations.
        </p>

      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto mt-10">
        <UploadZone setAnalysis={setAnalysis} />
      </div>

      {/* Analysis Section */}
      {analysis && (
        <div className="max-w-5xl mx-auto mt-16">
          <AnalysisPreview analysis={analysis} />
        </div>
      )}

    </section>
  );
}