import React, { useState } from "react";
import perguntas from "./db/perguntas.json";
import { useNavigate } from "react-router-dom";
import Aviso from "./Aviso";
import { useScore } from "../context/ScoreContext";

function AnsForm() {

    const { setScore, setConclusionDate } = useScore();

    const navigate = useNavigate();
                                            //{ 0: true, 1: false, ...}
    const [respostas, setRespostas] = useState({});
    const [erros, setErros] = useState({});

    const handleRespostaChange = (indexPergunta, valorResposta) => {
        setRespostas(respostasAnteriores => ({
            ...respostasAnteriores, //isso cria uma cópia da lista antes da pergunta que foi respondida no chamado desta função
            [indexPergunta]: valorResposta //isso insere o valor
        }));
    }

    // questionário enviado
    const envioQuestionario = (event) => {
        event.preventDefault();

        const finalizationDate = new Date().toLocaleString("pt-BR");
    
        const perguntasNaoRespondidas = [];
        for (let i = 0; i < perguntas.length; i++) {
            if (respostas[i] === undefined) {
                perguntasNaoRespondidas.push(i);
            }
        }
    
        if (perguntasNaoRespondidas.length > 0) {
            const novosErros = {};
            perguntasNaoRespondidas.forEach(index => {
                novosErros[index] = true; 
            });
            setErros(novosErros);
            return;
        }
    
        //se tudo foi respondido limpa os erros e continua
        setErros({});
    
        let resNotEqual = 0;
        perguntas.forEach((perguntaOriginal, index) => {
            if (respostas[index] !== perguntaOriginal.resposta) {
                resNotEqual++;
            }
        });
        
        setConclusionDate(finalizationDate);
        setScore(resNotEqual);
        //localStorage.setItem("resNotEqual", resNotEqual);
        navigate("/resultado");
    };
    
    return(
        <>  
            <form onSubmit={envioQuestionario} className="flex flex-col justify-center bg-gray-200 shadow-md rounded-xl m-4 lg:m-8 px-4 py-8 lg:px-4 lg:py-10 lg:max-w-5xl lg:mx-auto" >
                {perguntas.map((item, index) => {

                    //cores de fundo conforme a resposta
                    let corDeFundo = 'white';
                    if (respostas[index] === true) {
                        corDeFundo = '#C7FFCA';
                    } else if (respostas[index] === false) {
                        corDeFundo = '#FFD1C7';
                    }

                    return (
                        <div key={index} id={`container-q${index}`} className="flex flex-col lg:flex-row items-center justify-start gap-6 pl-4 p-4 mb-3 rounded-lg shadow-sm border border-gray-200" style={{backgroundColor: corDeFundo}}>

                            <span className="text-gray-800 text-center text-base font-normal flex-1 lg:text-start lg:order-first">{item.pergunta}</span>

                            <div className ="flex items-center gap-4 lg:order-last">
                                <input onChange={() => handleRespostaChange(index, true)}
                                checked={respostas[index] === true}
                                id={`q${index}-true`}
                                type="radio"
                                name={`q${index}`}
                                className="true-checkbox w-5 h-5 accent-green-600" />
                                <label className="text-green-600 font-medium cursor-pointer">Sim</label>

                                <input onChange={() => handleRespostaChange(index, false)}
                                checked=  {respostas[index] === false}
                                id={`q${index}-false`} 
                                type="radio"
                                name={`q${index}`}
                                className="red-checkbox w-5 h-5 accent-red-600" />
                                <label className="text-red-600 font-medium cursor-pointer">Não</label>
                            </div>

                            

                            {erros[index] && (
                                <p className="text-red-800 bg-red-300 py-4 px-1 rounded-lg">
                                    Responda à pergunta
                                </p>
                            )}
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