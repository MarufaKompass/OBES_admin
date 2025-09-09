import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export default function RegistrationCards({ dashboard }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 1️⃣ Generate last 7 days (YYYY-MM-DD)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split("T")[0]);
  }

  // 2️⃣ Map dashboard data to dates
  const dataMap = {};
  dashboard?.WeekUsrReg?.forEach(item => {
    dataMap[item.date] = item.total_users;
  });

  // 3️⃣ Prepare dataset values (fill 0 if no data)
  const values = last7Days.map(date => dataMap[date] || 0);

  // 4️⃣ Chart.js data
  const data = {
    labels: last7Days,
    datasets: [
      {
        label: "Total Users",
        data: values,
        borderColor: "rgba(0, 200, 150, 1)",  
        backgroundColor: "rgba(0, 200, 150, 0.4)", 
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgba(0, 150, 100, 1)",
        pointBorderColor: "#fff",
        borderWidth: 2,
      }
    ]
  };

  // 5️⃣ Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Users Registration Date",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 30 },
      },
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Users" },
        ticks: { stepSize: 1 }
      },
      x: {
        title: { display: true, text: "Date" }
      }
    }
  };

  // 6️⃣ Render chart
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
      <div className="relative h-96 mb-6">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  );
}
