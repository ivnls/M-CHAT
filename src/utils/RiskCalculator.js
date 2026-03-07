export const calculateRiskLevel = (finalScore, somaTotalCriticas) => {

    if (finalScore === null || finalScore === undefined) {
        return "Calculando..."; 
    }

    if (finalScore < 3 && somaTotalCriticas < 2) {
        return "Baixo";
    } else if (finalScore < 8 && somaTotalCriticas < 2) {
        return "Médio";
    }
    
    return "Alto";
};