// A função agora tem um nome claro que descreve o que ela faz.
export const calculateRiskLevel = (finalScore, somaTotalCriticas) => {
    // Adicionamos uma verificação para o caso de os valores ainda não terem carregado.
    if (finalScore === null || finalScore === undefined) {
        return "Calculando..."; 
    }

    if (finalScore < 3 && somaTotalCriticas < 2) {
        return "Baixo";
    } else if (finalScore < 8 && somaTotalCriticas < 2) {
        return "Médio";
    }
    
    // Todos os outros casos, incluindo quando somaTotalCriticas é 2 ou mais.
    return "Alto";
};