import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export default function CompareUploader({ setComparison }) {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCompare = async () => {
    if (!file1 || !file2) {
      alert("Please select both contracts");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();

    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/compare-contracts`,
        formData,
      );

      setComparison(response.data.comparison);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        error?.message ||
        "Unknown comparison error";
      setErrorMessage(`Comparison failed: ${message}`);
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 font-medium">Comparison Error</p>
          <p className="text-white mt-1 break-all">{errorMessage}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contract 1 */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Contract 1</h3>

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              h-40
              border-2
              border-dashed
              border-indigo-500/30
              rounded-2xl
              cursor-pointer
              hover:border-indigo-500
              hover:bg-white/5
              transition
            "
          >
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile1(e.target.files[0])}
            />

            <div className="text-5xl mb-3">📄</div>

            {file1 ? (
              <>
                <p className="text-emerald-400 text-sm font-medium text-center px-3">
                  {file1.name}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile1(null);
                  }}
                  className="
                    mt-3
                    px-3
                    py-1
                    rounded-lg
                    bg-red-500/20
                    text-red-400
                    text-xs
                    hover:bg-red-500/30
                  "
                >
                  Remove File
                </button>
              </>
            ) : (
              <p className="text-slate-300">Click to upload PDF</p>
            )}
          </label>
        </div>

        {/* Contract 2 */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Contract 2</h3>

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              h-40
              border-2
              border-dashed
              border-indigo-500/30
              rounded-2xl
              cursor-pointer
              hover:border-indigo-500
              hover:bg-white/5
              transition
            "
          >
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile2(e.target.files[0])}
            />

            <div className="text-5xl mb-3">📄</div>

            {file2 ? (
              <>
                <p className="text-emerald-400 text-sm font-medium text-center px-3">
                  {file2.name}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile2(null);
                  }}
                  className="
                    mt-3
                    px-3
                    py-1
                    rounded-lg
                    bg-red-500/20
                    text-red-400
                    text-xs
                    hover:bg-red-500/30
                  "
                >
                  Remove File
                </button>
              </>
            ) : (
              <p className="text-slate-300">Click to upload PDF</p>
            )}
          </label>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleCompare}
          disabled={loading}
          className="
            px-8
            py-4
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            disabled:opacity-50
            font-semibold
            transition
          "
        >
          {loading ? "Comparing Contracts..." : "Compare Contracts"}
        </button>
      </div>
    </div>
  );
}
