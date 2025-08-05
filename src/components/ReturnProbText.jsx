import React from "react";

function ReturnProbText({finalScore, somaTotalCriticas}) {
    if (finalScore < 3 && somaTotalCriticas < 2) {
        return (
            <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center">
                Probabilidade da avaliação: Baixo
            </p>
        );
    } else if (finalScore < 8 && somaTotalCriticas < 2) {
        return (
            <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center">
                Probabilidade da avaliação: Moderado
            </p>
        );
    } else {
        return (
            <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center">
                Probabilidade da avaliação: Alto
            </p>
        );
    }
}

export default ReturnProbText;