import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const options = {
  interaction: {
    callbacks: {
      title: () => "",
      label: ({ formattedValue }) => formattedValue,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "point",
      backgroundColor: "white",
      bodyColor: "#8c8c8b",
      bodyFont: {
        weight: 500,
      },
      borderColor: "rgba(0, 0, 0, 0.08)",
      borderWidth: 2,
      cornerRadius: 0,
      padding: {
        top: 4,
        bottom: 4,
        left: 8,
        right: 8,
      },
      displayColors: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "white",
        font: {
          size: 12,
          weight: "500",
        },
        padding: 0,
      },
    },
    y: {
      display: false,
    },
  },
};

const BarChart = ({ dataElements }) => {
  const chartRef = useRef();
  const data = {
    labels: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "Recipe 1 - Moyenne globale",
        backgroundColor: ["#8b00f7"],
        data: [
          dataElements.customAmount,
          dataElements.category6Amount,
          dataElements.category7Amount,
          dataElements.category8Amount,
          dataElements.category9Amount,
        ],
        order: 1,
      },
    ],
  };

  return (
    <div>
      <Bar type="bar" ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default BarChart;
