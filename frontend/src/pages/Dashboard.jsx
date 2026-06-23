import Navbar from "../components/Navbar";
import HeroUploadSection from "../components/hero/HeroUploadSection";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8">

        <Navbar />

        <HeroUploadSection />

      </div>

    </div>
  );
}