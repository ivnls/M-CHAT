import React from "react";
import { useReg } from "../context/RegContext";
import { useScore } from "../context/ScoreContext";
import { useDate } from "../context/DateContext";

import ReturnRecCom from "../utils/ReturnRecCom";

import perguntas from "./db/perguntas.json";
import logo from "../assets/logo.svg";
import susLogo from "../assets/sus-logo.svg";
import ifrsLogo from "../assets/ifrs-logo.svg";
import altoFelizBrasao from "../assets/altofelizbrasao.svg";
import teacolheLogo from "../assets/teacolhe-logo.svg";
import labIdeias from "../assets/lab-ideias.svg"


function TemplateAvaliacao() {
    const { nomeMae, nomeCrianca, idade, sexo } = useReg(); //incluir email
    const { finalScore, respostas, finalCriticas } = useScore();
    const { conclusionDate } = useDate();

    const perguntasArray = Object.values(perguntas);

    const valorCriticas = Object.values(finalCriticas);
    const somaTotalCriticas = valorCriticas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

    return (
    <div className="p-4 bg-white shadow-lg w-[210mm]">
      <header className="flex items-center justify-between border-b-2 border-gray-200">
        <div>
            <img src={logo} alt="Logo Mchat" className="h-20" />
        </div>
        
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">Resultado da avaliação M-CHAT DIGITAL</h1>
          <p className="text-sm text-gray-500 mt-1">Data de Emissão: {conclusionDate}</p>
        </div>
      </header>

      <main>
        <div className="py-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-1">Informações</h2>
          <div className="grid grid-cols-2 gap-x-4">
            <p><strong>Nome da Mãe:</strong> {nomeMae}</p>
            <p><strong>Nome da Criança:</strong> {nomeCrianca}</p>
            <p><strong>Idade (meses):</strong> {idade}</p>
            <p><strong>Sexo:</strong> {sexo}</p>
            {/*<p><strong>Email:</strong> {email}</p>*/}
          </div>
        </div>


        <div className="flex items-center justify-center bg-gray-100 text-gray-900 px-4 pb-4 font-semibold text-lg rounded-lg  mb-4">
          <span className="relative bottom-px font-bold leading-none">
            Respostas do Questionário
          </span>
        </div>

        <table>
            <tbody className="flex flex-wrap justify-center">
                {perguntasArray.map((item, index) => (
                    <tr key={item.index || index} className="flex odd:bg-white even:bg-gray-50">
                        <td className="">
                          <div className="flex flex-col px-1 pb-2 text-sm font-bold border text-center">
                            {index + 1}
                            {respostas && respostas[index] !== undefined ? (
                                <span className={respostas[index] ? 'text-green-600' : 'text-red-600'}>
                                    {respostas[index] ? "Sim" : "Não"}
                                </span>
                            ) : (
                                <span className="text-gray-400">Nulo</span>
                            )}
                          </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="my-8 p-3 text-center bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold  text-gray-700">Resultado Final da Análise</h3>
          <div className="p-5 shadow-md rounded-md">
            <div className="flex felx-row justify-center gap-2 text-lg">
              <h4 className="font-semibold">Pontuação crítica:</h4>
              <span className="font-bold">{somaTotalCriticas}</span>
            </div>
          </div>    
          <p className="text-xl pt-2 pb-8 mx-auto font-semibold">Score: {finalScore}</p>
        </div>

        <ReturnRecCom finalScore={finalScore} somaTotalCriticas={somaTotalCriticas} />
        
      </main>

      <footer className="pt-2 mt-4 text-xs text-center text-white border-t bg-gray-600 rounded-md pb-2">
        <div className="flex flex-row items-center gap-5 px-5 pb-4 p-5 justify-center">
          <img src={susLogo} className="h-8 w-auto " alt="Logo do SUS" />
          <img src={ifrsLogo} className="h-14 w-auto" alt="Logo do IFRS" />
          <img src={altoFelizBrasao} className="h-10 w-auto" alt="Brasão de Alto Feliz" />
          <img src={teacolheLogo} className="h-10 w-auto" alt="Logo do TECAcolhe" /> 
          <img src={labIdeias} className="h-14 w-auto" alt="Logo do Laboratório de Ideias" />
        </div>
        <p>Este é um relatório gerado automaticamente. © MCHAT DIGITAL {new Date().getFullYear()}</p>
      </footer>

    </div>
    );
}

export default TemplateAvaliacao;