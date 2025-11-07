import { useEffect, useState } from 'react';
import { supabase } from '../utils/supaBaseClient';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { color } from 'chart.js/helpers';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RelatorioResultados() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase.rpc('relatorio_resultado_por_cidade');

        if (error) {
          throw error;
        }

        setDados(data);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar dados do relatório:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, []);

  if (loading) {
    return <p>Carregando relatório...</p>;
  }

  if (error) {
    return <p className='text-red-600'>Erro ao carregar: {error}</p>;
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#999999', // NOVO: Cor das linhas do grid Y
        },
        ticks: {
          color: '#999999' // NOVO: Cor dos números do eixo Y (opcional)
        }
      },
      x: { // NOVO: Adicionei a configuração do eixo X
        grid: {
          color: '#999999', // NOVO: Cor das linhas do grid X
        },
        ticks: {
          color: '#CCCCCC' // NOVO: Cor das cidades no eixo X (opcional)
        }
      }
    },

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de Casos de TEA',
        color: '#FFFFFF',
      },
    },
  };

  const data = {
    // Correção 1: Sem colchetes extras
    labels: dados.map(item => item.cidade), 
    datasets: [
      {
        label: 'Casos de TEA p/ cidade',
        data: dados.map(item => item.total_geral), 
        borderWidth: 1,
        backgroundColor: '#0000FF', // Adicionei uma cor
      },

      {
        label: 'Risco baixo p/ cidade',
        data: dados.map(item => item.total_baixo),
        borderWidth: 1,
        backgroundColor: '#00FF00',
      },

      {
        label: 'Risco medio p/ cidade',
        data: dados.map(item => item.total_medio),
        borderWidth: 1,
        backgroundColor: '#FFFF00',
      },

      {
        label: 'Risco alto p/ cidade',
        data: dados.map(item => item.total_alto),
        borderWidth: 1,
        backgroundColor: '#FF0000',
      }
      
    ],
  }

  return <Bar options={options} data={data} />
}


export default RelatorioResultados;