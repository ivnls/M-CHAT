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
        <>
            <div className="flex flex-col">
                <ReturnProbText finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />

                <div className="flex mx-auto gap-10 my-10 align-middle">
                    <div className="py-2 px-4 mt-8 bg-gray-200 rounded-xl text-black items-center">
                        <p id="prob-text" className="text-lg font-medium mt-4 text-center mb-4">
                            Score Final: {finalScore}
                        </p>
                        <p id="prob-text" className="text-lg font-medium mt-4 text-center mb-4">
                            Pontuação Crítica: {somaTotalCriticas}
                        </p>
                    </div>
                    <div>
                        <ReactSpeedometer minValue={0} maxValue={25} height={160} width={300} value={finalScore} segments={5}  startColor="#00AA00" endColor="#FF0000" valueTextFontSize={1} needleColor="#aed6f1" textColor="#FFFFFF"/>
                    </div>
                </div>



                <ReturnRecCom finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />
            </div>
        </>
    );
}

export default ScoreResult;