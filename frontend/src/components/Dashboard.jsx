/*
  Visualização de um mini-dash, com gráfico que mostra evolução de adoções
*/

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/dashboard")
      .then(res => setDados(res.data));
  }, []);

  const data = {
    labels: dados.map(d => new Date(d.mes).toLocaleDateString()),
    datasets: [{
      label: "Adoções por mês",
      data: dados.map(d => d.total)
    }]
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div style={{width: "500px", margin: "auto"}}>
        <Bar data={data} />
      </div>
    </div>
  );
}