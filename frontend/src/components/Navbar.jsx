export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8">
      <h1 className="text-2xl font-bold">NyayaAI</h1>

      <div className="flex gap-6 items-center">
        <button className="text-slate-300">Features</button>

        <button className="text-slate-300">Compare</button>

        <button className="bg-blue-600 px-5 py-2 rounded-xl">Upload</button>
      </div>
    </nav>
  );
}
