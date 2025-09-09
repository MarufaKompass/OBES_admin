import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

export default function ZoomableCard({dashboard}) {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Define all 12 months
const allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
  // Map dashboard data into an object for easy lookup
  const dataMap = {};
  dashboard?.WeeklyUsers?.forEach(item => {
  dataMap[item.weekday] = item.total_users;
});
// Prepare datasets
const respondentData = allDays.map(weekday => dataMap[weekday] || 0);

  const data = {
    labels: allDays,
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
         backgroundColor: "rgba(75, 192, 192, 0.8)",  
         borderColor: "rgba(75, 192, 192, 1)", 
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
        text: "Weekly Users Respondents",
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
  title: { display: true, text: "Days" }
}

    }
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new ChartJS(chartRef.current, {
      type: "line",
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
        Weekly Users Data
      </h2> */}
      <div className="relative h-96 mb-6">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  )
}
