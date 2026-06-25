import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function RiskDistributionChart({
  high,
  medium,
  low
}) {

  const data = {
    labels: [
      "High",
      "Medium",
      "Low"
    ],
    datasets: [
      {
        data: [
          high,
          medium,
          low
        ],
        backgroundColor: [
          "#ef4444",
          "#facc15",
          "#22c55e"
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,


    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#ffffff",
          padding: 20,
          font: {
            size: 14
          }
        }
      }
    },

    cutout: "72%"
  };

  return (

    <div className="bg-white/5 rounded-2xl p-6">

      <h3 className="text-xl font-semibold mb-6">
        Risk Distribution
      </h3>

      <div className="max-w-xs h-64 mx-auto">

  <Doughnut
    data={data}
    options={options}
  />

</div>

    </div>

  );

}