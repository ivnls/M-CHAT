import React from "react";
import { useScore } from "../context/ScoreContext";
import ReactSpeedometer from "react-d3-speedometer";
import ReturnRecCom from "./ReturnRecCom";
import ReturnProbText from "./ReturnProbText";

function ScoreResult() {

    const { finalScore, finalCriticas } = useScore();

    const valorCriticas = Object.values(finalCriticas);
    const somaTotalCriticas = valorCriticas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

    return (
        <div className="flex flex-col">
            <ReturnProbText finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />

            <div className="mx-auto pt-8">
                <ReactSpeedometer minValue={0} maxValue={25} height={250} width={300} value={finalScore} segments={5} startColor="#00AA00" endColor="#FF0000" valueTextFontSize={20} needleColor="#aed6f1"/>
            </div>

            <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center mb-4">
                Pontuação Crítica: {somaTotalCriticas}
            </p>

            <ReturnRecCom finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />
        </div>
    );
}

export default ScoreResult;