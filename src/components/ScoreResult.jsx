import React from "react";
import { useScore } from "../context/ScoreContext";
import ReactSpeedometer from "react-d3-speedometer";

function ScoreResult() {

    const { finalScore } = useScore();

    let probTextResult = "";
    let recommendationComponent = null;

    if (finalScore < 3) {
        probTextResult = "Probabilidade da avaliação: Baixo";
        recommendationComponent = (
            <div id="rec-text-baixo" className="bg-green-200 border border-green-600 text-green-950 px-8 py-8 rounded-lg mx-8 transition-opacity duration-500 ease-in-out">
                <h1 className="font-bold text-lg">Risco Baixo</h1>
                <p className="mt-2">Quando a criança obtém uma pontuação de 0 a 2 na escala M-CHAT, o risco de desenvolver o Transtorno do Espectro Autista (TEA) é considerado baixo. Nesses casos:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>É improvável que a criança desenvolva autismo.</li>
                    <li>Não há necessidade de medidas de intervenção imediata.</li>
                    <li>Caso a criança tenha menos de 24 meses, recomenda-se repetir o teste em uma etapa futura, pois o desenvolvimento infantil pode apresentar variações ao longo do tempo.</li>
                </ul>
            </div>
        );
    } else if (finalScore < 8) {
        probTextResult = "Probabilidade da avaliação: Moderado";
        recommendationComponent = (
            <div id="rec-text-moderado" className="bg-yellow-200 border border-yellow-600 text-yellow-950 px-8 py-8 rounded-lg mx-8 transition-opacity duration-500 ease-in-out">
                <h1 className="font-bold text-lg">Risco Moderado</h1>
                <p className="mt-2">Crianças que obtêm uma pontuação entre 3 e 7 se enquadram no grupo de risco moderado. Nesse cenário, é fundamental adotar algumas medidas importantes:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Realizar uma coleta minuciosa da história da criança, observando detalhadamente o início e a evolução de sintomas que possam indicar autismo.</li>
                    <li>Avaliar atentamente os comportamentos observados no dia a dia, como interações sociais, comunicação e comportamentos repetitivos.</li>
                    <li>Dependendo da avaliação inicial, pode ser indicada uma reavaliação com um especialista para confirmação diagnóstica.</li>
                </ul>
            </div>
        );
    } else {
        probTextResult = "Probabilidade da avaliação: Alto";
        recommendationComponent = (
            <div id="rec-text-alto" className="bg-red-200 border border-red-600 text-red-950 px-8 py-8 rounded-lg mx-8 transition-opacity duration-500 ease-in-out">
                <h1 className="font-bold text-lg">Risco Alto</h1>
                <p className="mt-2">Pontuações entre 8 e 20 indicam um alto risco de Transtorno do Espectro Autista. Diante dessa situação:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>É essencial agendar uma consulta com um especialista, como um neurologista pediátrico ou psiquiatra infantil.</li>
                    <li>O profissional irá realizar uma avaliação detalhada para confirmar ou descartar o diagnóstico de autismo.</li>
                    <li>Caso confirme-se o diagnóstico, indica-se o tratamento mais adequado, considerando as necessidades específicas da criança.</li>
                </ul>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center">{probTextResult}</p>
            
            <div className="mx-auto pt-8">
                <ReactSpeedometer minValue={0} maxValue={20} height={250} width={300} value={finalScore} segments={10} startColor="#00AA00" endColor="#FF0000" valueTextFontSize={20} needleColor="#aed6f1"/>
            </div>

            {recommendationComponent}
        </div>
    );
}

export default ScoreResult;