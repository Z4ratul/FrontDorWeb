import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { BASE_URL } from "../../main";
import { useQuery } from "react-query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fetchRequests = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/request/partner/web`);
  console.log(data);
  return data;
};

const StatisticPage = () => {
  const { data: requests, error, isLoading } = useQuery("requests", fetchRequests);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;

  const monthlyCounts = Array(12).fill(0);

  requests.forEach((request) => {
    const month = new Date(request.openDate).getMonth();
    monthlyCounts[month]++;
  });

  const data = {
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    datasets: [
      {
        label: "Количество заявок",
        data: monthlyCounts,
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Количество заявок по месяцам за текущий год",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatisticPage;
