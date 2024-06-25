import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ExpenseResponseWithoutPagination } from "../types/expenseTypes";

import "../style/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MyChartProps {
  all_data: ExpenseResponseWithoutPagination;
}
const MyChart: React.FC<MyChartProps> = ({ all_data }) => {
  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const labels = all_data.results.map((item) => formatDateString(item.date));
  const amounts = all_data.results
    .filter((ele) => ele?.is_expense !== true)
    ?.map((el) => el?.amount);
  const expense = all_data.results
    .filter((ele) => ele?.is_expense === true)
    ?.map((el) => el?.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transaction History",
        data: amounts,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "green",
      },
      {
        label: "Expense",
        data: expense,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Balance History Line Chart",
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-card">
        <Line data={data} options={options} height={600} width={1800} />
      </div>
    </div>
  );
};

export default MyChart;
