import { useState, useEffect } from "react";
import { useScore } from "../context/ScoreContext";
import { useReg } from "../context/RegContext";
import ReactSpeedometer from "react-d3-speedometer";
import { calculateRiskLevel } from "../utils/RiskCalculator";
import ReturnRecCom from "../utils/ReturnRecCom";
import { supabase } from "../utils/supaBaseClient";

function ScoreResult() {
    const { finalScore, finalCriticas, respostas } = useScore();
    const { idade, cidade, sexo } = useReg();
    const valorCriticas = Object.values(finalCriticas);
    const somaTotalCriticas = valorCriticas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

    const [carregando, setCarregando] = useState(true);

    const resultado = calculateRiskLevel(finalScore, somaTotalCriticas);

    useEffect(() => {
        const saveResult = async () => {
            if (finalScore === null || finalScore === undefined) {
                setCarregando(false);
                return;
            }

            const isAlreadySaved = sessionStorage.getItem('resultSaved');
            if (isAlreadySaved) {
                setCarregando(false);
                return;
            }

            try {
                const { error } = await supabase
                    .from('Resultados')
                    .insert([
                        { 
                            score: finalScore,
                            criticas: somaTotalCriticas,
                            resultado: resultado,
                            respostas: respostas,
                            idade: idade,
                            cidade: cidade,
                            sexo: sexo
                        } 
                    ]);

                if (error) {
                    throw error;
                }

                sessionStorage.setItem('resultSaved', 'true');

            } catch (error) {
                console.error("Erro ao salvar o resultado:", error);
            } finally {
                setCarregando(false);
            }
        };

        saveResult();

    }, [finalScore, somaTotalCriticas, resultado, respostas]);


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

                <p id="prob-text" className="text-white text-lg font-medium my-8 text-center">
                    Risco {resultado}
                </p>

                <ReturnRecCom finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />
            
            </div>
        </>
    );
}

export default ScoreResult;