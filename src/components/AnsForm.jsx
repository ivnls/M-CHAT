import React, { useState } from "react";
import perguntas from "./db/perguntas.json";
import { useNavigate } from "react-router-dom";
import Aviso from "./Aviso";
import { useScore } from "../context/ScoreContext";
import { useDate } from "../context/DateContext";

function AnsForm() {

    const { setScore, setCriticas, setRespostas } = useScore();
    const { setConclusionDate } = useDate();
    const navigate = useNavigate();

    const perguntasArray = Object.values(perguntas);

    const [respostasAtuais, setRespostasAtuais] = useState({});
    const [erros, setErros] = useState({});

    //Grupos de Críticas
    const gruposCriticas = {
        A: [0, 1],
        B: [6],
        C: [8],
        D: [12, 13, 14]
    };

    // esta função atualiza o estado local.
    const handleRespostaChange = (indexPergunta, valorResposta) => {
       
        setRespostasAtuais(respostasAnteriores => ({
            ...respostasAnteriores,
            [indexPergunta]: valorResposta
        }));
        // limpa o erro da pergunta ao ser respondida
        if (erros[indexPergunta]) {
            setErros(prevErros => {
                const novosErros = { ...prevErros };
                delete novosErros[indexPergunta];
                return novosErros;
            });
        }
    };

    // questionário enviado
    const envioQuestionario = (event) => {
        event.preventDefault();

        const novosErros = {};
        perguntasArray.forEach((pergunta, index) => {
            if (respostasAtuais[index] === undefined) {
                novosErros[index] = true;
            }
        });

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            return;
        }

        setErros({}); // Limpa os erros

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
    
    return(
        <>  
            <form onSubmit={envioQuestionario} className="flex flex-col justify-center bg-gray-200 shadow-md rounded-xl m-4 lg:m-8 px-4 py-8 lg:px-4 lg:py-10 lg:max-w-5xl lg:mx-auto" >
                <div className="bg-gray-300 p-4 text-center mb-3 rounded-md font-medium">
                    <p>Por favor, preencha as questões abaixo sobre como seu filho geralmente é. Por favor, tente responder todas as 23
                    questões. Caso o comportamento na questão seja raro (ex. você só observou uma ou duas vezes), por favor, responda
                    como se seu filho não fizesse o comportamento.</p>
                </div>
                
                {perguntasArray.map((item, index) => {

                    const respostaAtual = respostasAtuais[index];

                    let corDeFundo = '#FFFFFF';
                    if (respostaAtual === true) {
                        corDeFundo = '#EBF9EB';
                    } else if (respostaAtual === false) {
                        corDeFundo = '#FBEBEB';
                    }

                    return (
                        <div 
                            key={item.index}
                            id={`container-q${index}`} 
                            className="flex flex-col lg:flex-row items-center justify-start gap-2 lg:gap-4 pl-4 p-4 mb-3 rounded-lg shadow-sm border" 
                            style={{ backgroundColor: corDeFundo, borderColor: erros[index] ? 'red' : '#E5E7EB' }}
                        >

                            <p className="font-thin order-first mr-auto">
                                {index+1}
                            </p>

                            <span className="text-center text-base font-normal flex-1 lg:text-start lg:order-first">
                                {item.pergunta}
                            </span>
                            


                            <div className="flex items-center gap-4 lg:order-last">
                                <input 
                                    onChange={() => handleRespostaChange(index, true)}
                                    checked={respostaAtual === true}
                                    id={`q${index}-true`}
                                    type="radio"
                                    name={`q${index}`}
                                    className="true-checkbox w-5 h-5 accent-green-600" 
                                />
                                <label htmlFor={`q${index}-true`} className="text-green-600 font-medium cursor-pointer">Sim</label>

                                <input 
                                    onChange={() => handleRespostaChange(index, false)}
                                    checked={respostaAtual === false}
                                    id={`q${index}-false`} 
                                    type="radio"
                                    name={`q${index}`}
                                    className="red-checkbox w-5 h-5 accent-red-600"
                                />
                                <label htmlFor={`q${index}-false`} className="text-red-600 font-medium cursor-pointer">Não</label>
                            </div>

                            <div>
                                {erros[index] && (
                                    <p className="text-red-600 font-semibold mt-1 text-center lg:text-right lg:order-last">
                                        Por favor, responda esta pergunta.
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                <Aviso />

                <button type="submit" className="mt-6 px-4 mx-auto bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition">Concluir</button>

            </form>
        </>
    );
}

export default AnsForm;