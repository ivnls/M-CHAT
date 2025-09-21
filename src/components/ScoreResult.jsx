import { useState, useEffect } from "react";
import { useScore } from "../context/ScoreContext";
import ReactSpeedometer from "react-d3-speedometer";
import { calculateRiskLevel } from "../utils/RiskCalculator";
import { supabase } from "../utils/supaBaseClient";

function ScoreResult() {
    const { finalScore, finalCriticas, respostas } = useScore();
    const valorCriticas = Object.values(finalCriticas);
    const somaTotalCriticas = valorCriticas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

    const [carregando, setCarregando] = useState(true);
    const [saveAttempted, setSaveAttempted] = useState(false);

    const resultado = calculateRiskLevel(finalScore, somaTotalCriticas);

    useEffect(() => {
        const saveResult = async () => {
            if (saveAttempted || finalScore === null || finalScore === undefined) {
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('Resultados')
                    .insert([
                        { 
                            score: finalScore,
                            criticas: somaTotalCriticas,
                            resultado: resultado,
                            respostas: respostas
                        } 
                    ]);

                if (error) {
                    throw error;
                }

            } catch (error) {
                console.error("Erro ao salvar o resultado:", error);
            } finally {
                setCarregando(false);
            }
        };

        saveResult();

    }, []);


    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row mx-auto gap-10 my-10 align-middle items-center">
                    <div className="py-2 px-4 mt-8 bg-gray-200 rounded-xl text-black items-center">
                        <p className="text-lg font-medium mt-4 text-center mb-4">
                            Score Final: {finalScore}
                        </p>
                        <p className="text-lg font-medium mt-4 text-center mb-4">
                            Pontuação Crítica: {somaTotalCriticas}
                        </p>
                    </div>
                    <div>
                        <ReactSpeedometer minValue={0} maxValue={25} height={160} width={300} value={finalScore} segments={5}  startColor="#00AA00" endColor="#FF0000" valueTextFontSize={1} needleColor="#aed6f1" textColor="#FFFFFF"/>
                    </div>
                </div>

                <p id="prob-text" className="text-white text-lg font-medium mt-4 text-center">
                    {resultado}
                </p>
            
            </div>
        </>
    );
}

export default ScoreResult;