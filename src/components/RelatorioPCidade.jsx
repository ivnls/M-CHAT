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
        color: '#FFFFFF',
      },
      title: {
        display: true,
        text: 'Casos de TEA p/ cidade',
        color: '#FFFFFF',
      },
    },
  };

  const data = {
    // Correção 1: Sem colchetes extras
    labels: dados.map(item => item.cidade), 
    datasets: [
      {
        label: 'Total de Casos',
        data: dados.map(item => item.total_geral), 
        borderWidth: 1,
        backgroundColor: '#0000BB', // Adicionei uma cor
      },

      {
        label: 'Risco Baixo',
        data: dados.map(item => item.total_baixo),
        borderWidth: 1,
        backgroundColor: '#00BB00',
      },

      {
        label: 'Risco Médio',
        data: dados.map(item => item.total_medio),
        borderWidth: 1,
        backgroundColor: '#BBBB00',
      },

      {
        label: 'Risco Alto',
        data: dados.map(item => item.total_alto),
        borderWidth: 1,
        backgroundColor: '#BB0000',
      }
      
    ],
  }

  return <Bar options={options} data={data} className='bg-slate-800 m-4 rounded-lg p-2'/>
}


export default RelatorioResultados;