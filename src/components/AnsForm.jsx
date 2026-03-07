import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import perguntas from "./db/perguntas.json";

import Aviso from "./Aviso";
import { useScore } from "../context/ScoreContext";
import { useDate } from "../context/DateContext";

function AnsForm() {

    const { setScore, setCriticas, setRespostas } = useScore();
    const { setConclusionDate } = useDate();
    const navigate = useNavigate();

    const perguntasArray = Object.values(perguntas);
    const total = perguntasArray.length;

    const [respostasAtuais, setRespostasAtuais] = useState({});
    const [erroAtual, setErroAtual] = useState(false);
    const [perguntaAtual, setPerguntaAtual] = useState(0);

    const gruposCriticas = {
        A: [1],
        B: [6],
        C: [8],
        D: [12, 13, 14]
    };

    const handleRespostaChange = (indexPergunta, valorResposta) => {
        setRespostasAtuais(prev => ({
            ...prev,
            [indexPergunta]: valorResposta
        }));
        setErroAtual(false);
    };

    const avancar = () => {
        if (respostasAtuais[perguntaAtual] === undefined) {
            setErroAtual(true);
            return;
        }
        if (perguntaAtual < total - 1) {
            setTimeout(() => {
                setPerguntaAtual(p => p + 1);
                setErroAtual(false);
            }, 250);
        }
    };

    const voltar = () => {
        if (perguntaAtual > 0) {
            setTimeout(() => {
                setPerguntaAtual(p => p - 1);
                setErroAtual(false);
            }, 250);
        }
    };

    const envioQuestionario = (event) => {
        event.preventDefault();

        if (respostasAtuais[perguntaAtual] === undefined) {
            setErroAtual(true);
            return;
        }

        const contagemCriticas = { A: 0, B: 0, C: 0, D: 0 };
        let scoreCalculado = 0;

        perguntasArray.forEach((pergunta, index) => {
            const respostaUsuario = respostasAtuais[index];

            if (respostaUsuario === pergunta.resposta) {
                scoreCalculado++;
            }

            if (!respostaUsuario) {
                for (const grupo in gruposCriticas) {
                    if (gruposCriticas[grupo].includes(index)) {
                        contagemCriticas[grupo]++;
                        break;
                    }
                }
            }
        });

        const finalizationDate = new Date().toLocaleString("pt-BR");
        const respostasFinais = perguntasArray.map((_, index) => respostasAtuais[index]);

        setScore(scoreCalculado);
        setRespostas(respostasFinais);
        setCriticas(contagemCriticas);
        setConclusionDate(finalizationDate);

        navigate("/resultado");
    };

    const item = perguntasArray[perguntaAtual];
    const respostaAtual = respostasAtuais[perguntaAtual];
    const progresso = Math.round(((perguntaAtual + 1) / total) * 100);

    // Cor de fundo do card conforme resposta
    let corDeFundo = "#FFFFFF";
    if (respostaAtual === true) corDeFundo = "#EBF9EB";
    else if (respostaAtual === false) corDeFundo = "#FBEBEB";

    return (
        <form
            onSubmit={envioQuestionario}
            className="flex flex-col justify-center bg-gray-200 shadow-md rounded-xl m-4 lg:m-8 px-4 py-8 lg:px-8 lg:py-8 lg:max-w-3xl lg:mx-auto"
        >
            {/* Aviso */}
            <div className="bg-gray-300 p-4 text-center mb-6 rounded-md font-medium text-sm">
                <p>
                    Por favor, preencha as questões abaixo sobre como seu filho geralmente é.
                    Responda todas as {total} questões. Caso o comportamento seja raro, responda
                    como se seu filho não fizesse o comportamento.
                </p>
            </div>

            {/* Progresso */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Questão {perguntaAtual + 1} de {total}</span>
                    <span>{progresso}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progresso}%` }}
                    />
                </div>

                <div className="flex justify-center gap-1 mt-3 flex-wrap">
                    {perguntasArray.map((_, i) => {
                        const respondida = respostasAtuais[i] !== undefined;
                        const ativa = i === perguntaAtual;
                        return (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-200 ${
                                    ativa
                                        ? "w-4 h-4 bg-blue-600 ring-2 ring-blue-300"
                                        : respondida
                                        ? "w-3 h-3 bg-green-400 mt-0.5"
                                        : "w-3 h-3 bg-gray-400 mt-0.5"
                                }`}
                            />
                        );
                    })}
                </div>
            </div>

            <div
                style={{ backgroundColor: corDeFundo, borderColor: erroAtual ? "red" : "#E5E7EB" }}
                className="flex flex-col items-center gap-6 px-6 py-8 rounded-xl shadow-sm border min-h-52"
            >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest self-start">
                    Questão {perguntaAtual + 1}
                </p>

                <p className="text-center text-base font-normal flex-1 leading-relaxed">
                    {item.pergunta}
                </p>

                <div className="flex items-center gap-8">
                    <label
                        htmlFor={`q${perguntaAtual}-true`}
                        className={`flex items-center gap-2 cursor-pointer font-semibold px-5 py-2 rounded-lg border-2 transition-all ${
                            respostaAtual === true
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600"
                        }`}
                    >
                        <input
                            onChange={() => handleRespostaChange(perguntaAtual, true)}
                            checked={respostaAtual === true}
                            id={`q${perguntaAtual}-true`}
                            type="radio"
                            name={`q${perguntaAtual}`}
                            className="w-4 h-4 accent-green-600"
                        />
                        Sim
                    </label>

                    <label
                        htmlFor={`q${perguntaAtual}-false`}
                        className={`flex items-center gap-2 cursor-pointer font-semibold px-5 py-2 rounded-lg border-2 transition-all ${
                            respostaAtual === false
                                ? "bg-red-100 border-red-500 text-red-700"
                                : "border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-600"
                        }`}
                    >
                        <input
                            onChange={() => handleRespostaChange(perguntaAtual, false)}
                            checked={respostaAtual === false}
                            id={`q${perguntaAtual}-false`}
                            type="radio"
                            name={`q${perguntaAtual}`}
                            className="w-4 h-4 accent-red-600"
                        />
                        Não
                    </label>
                </div>

                {erroAtual && (
                    <p className="text-red-600 font-semibold text-sm">
                        Por favor, responda esta questão antes de continuar.
                    </p>
                )}
            </div>

            {/* Navegação */}
            <div className="flex justify-between mt-6 gap-4">
                <button
                    type="button"
                    onClick={voltar}
                    disabled={perguntaAtual === 0}
                    className="px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-600 font-medium hover:bg-gray-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ← Anterior
                </button>

                {perguntaAtual < total - 1 ? (
                    <button
                        type="button"
                        onClick={avancar}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    >
                        Próxima →
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
                    >
                        Concluir ✓
                    </button>
                )}
            </div>
        </form>
    );
}

export default AnsForm;