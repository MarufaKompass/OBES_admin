import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

export default function MessageCard({ dashboard }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Define all 12 months
  const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Map dashboard data into an object for easy lookup
  const dataMap = {};
  dashboard?.MonthQA?.forEach(item => {
    dataMap[item.month] = item.total_respondents;
  });

  // Prepare datasets
  const respondentData = allMonths.map(month => dataMap[month] || 0);

  const data = {
    labels: allMonths,
    datasets: [
      // Background gray bars
      {
        label: "Base",
        data: Array(12).fill(Math.max(...respondentData) || 1), // same height for all, so gray shows behind
        backgroundColor: "rgba(200, 200, 200, 0.3)",
        borderRadius: 4,
        borderSkipped: false,
      },
      // Actual dynamic values
      {
        label: "Total Respondents",
        data: respondentData,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly QA Survey Respondents",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 30 }
      },
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Respondents" },
        ticks: { stepSize: 1 }
      },
      x: {
        title: { display: true, text: "Months" }
      }
    }
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new ChartJS(chartRef.current, {
      type: "bar",
      data,
      options
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [dashboard]);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Monthly  QA
      </h2> */}
      <div className="relative h-96 mb-6">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  );
}
