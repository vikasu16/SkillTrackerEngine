import React from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarReport(props) {
  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Modular Bar Chart",
      },
    },
  };

  return (
    <div className="card-report-container">
      <div className="card">
        <h5 className="card-header header-format">Report</h5>
        <div className="card-body">
          <Bar options={option} data={props.details} />
        </div>
      </div>
    </div>
  );
}
