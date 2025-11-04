async function buscarCidades() {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios';

  try {
    // 1. Faz a requisição para a URL
    const response = await fetch(url);
    
    // 2. Converte a resposta para o formato JSON
    const cidades = await response.json();

    // 3. (Opcional, mas recomendado) Ordena as cidades por nome
    cidades.sort((a, b) => a.nome.localeCompare(b.nome));
    
    console.log(cidades); // Veja o resultado no console
    return cidades;

  } catch (error) {
    console.error('Falha ao buscar os municípios:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Para usar a função:
buscarCidadesDoRS();