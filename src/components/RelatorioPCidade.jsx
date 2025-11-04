// src/components/RelatorioResultados.jsx (bom renomear o arquivo também)

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supaBaseClient'; // Verifique o caminho para seu cliente Supabase

function RelatorioResultados() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        setLoading(true);
        
        // MUDANÇA 1: Chamando a função correta que acabamos de corrigir.
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

  return (
    // MUDANÇA 2: Atualizando a tabela para exibir os novos dados.
    <div className='mx-auto max-w-xl'>
      <h2 className='text-center text-2xl bg-gray-300 border border-black'>Distribuição de Resultados por Cidade</h2>
      <table className='w-full border-collapse'>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th className='p-8 border border-black'>Cidade</th>
            <th className='p-8 border border-black'>Baixo</th>
            <th className='p-8 border border-black'>Médio</th>
            <th className='p-8 border border-black'>Alto</th>
            <th className='p-8 border border-black'>Total</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr className='text-white' key={item.cidade}>
              <td className='px-8 py-2 border border-black'>{item.cidade}</td>
              <td className='px-8 py-2 border border-black'>{item.total_baixo}</td>
              <td className='px-8 py-2 border border-black'>{item.total_medio}</td>
              <td className='px-8 py-2 border border-black'>{item.total_alto}</td>
              <td className='px-8 py-2 border border-black'>{item.total_geral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RelatorioResultados;