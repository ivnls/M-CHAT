async function buscarCidades() {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios';

  try {
    const response = await fetch(url);
    const cidades = await response.json();
    cidades.sort((a, b) => a.nome.localeCompare(b.nome));
    
    console.log(cidades);
    return cidades;

  } catch (error) {
    console.error('Falha ao buscar os municípios:', error);
    return [];
  }
}

buscarCidadesDoRS();