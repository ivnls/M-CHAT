import React from "react";
import { useReg } from "../context/RegContext";
import { useScore } from "../context/ScoreContext";
import { useDate } from "../context/DateContext";
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

    let probTextResult = "";
    let recommendationComponent = null;

    if (finalScore < 3 && somaTotalCriticas < 2) {
        probTextResult = "Probabilidade da avaliação: Baixo";
        recommendationComponent = (
            <div id="rec-text-baixo" className="bg-green-200 border border-green-600 text-green-950 px-8 py-8 rounded-lg mx-8 transition-opacity duration-500 ease-in-out">
                <h1 className="font-bold text-lg">Risco Baixo</h1>
                <p className="mt-2">Quando a criança obtém uma pontuação de 0 a 2 na escala M-CHAT, o risco de desenvolver o Transtorno do Espectro Autista (TEA) é considerado baixo. Nesses casos:</p>
                <ul className="list-inside mt-2 space-y-1">
                    <li className="bg-green-300 rounded-md pb-4">É improvável que a criança desenvolva autismo.</li>
                    <li className="bg-green-300 rounded-md pb-4">Não há necessidade de medidas de intervenção imediata.</li>
                    <li className="bg-green-300 rounded-md pb-4">Caso a criança tenha menos de 24 meses, recomenda-se repetir o teste em uma etapa futura, pois o desenvolvimento infantil pode apresentar variações ao longo do tempo.</li>
                </ul>
            </div>
        );
    } else if (finalScore < 8 && somaTotalCriticas < 2) {
        probTextResult = "Probabilidade da avaliação: Moderado";
        recommendationComponent = (
            <div id="rec-text-moderado" className="bg-yellow-200 border border-yellow-600 text-yellow-950 px-8 py-8 rounded-lg mx-8 transition-opacity duration-500 ease-in-out">
                <h1 className="font-bold text-lg">Risco Moderado</h1>
                <p className="mt-2">Crianças que obtêm uma pontuação entre 3 e 7 se enquadram no grupo de risco moderado. Nesse cenário, é fundamental adotar algumas medidas importantes:</p>
                <ul className="list-inside mt-2 space-y-1">
                    <li className="bg-yellow-300 rounded-md pb-4">Realizar uma coleta minuciosa da história da criança, observando detalhadamente o início e a evolução de sintomas que possam indicar autismo.</li>
                    <li className="bg-yellow-300 rounded-md pb-4">Avaliar atentamente os comportamentos observados no dia a dia, como interações sociais, comunicação e comportamentos repetitivos.</li>
                    <li className="bg-yellow-300 rounded-md pb-4">Dependendo da avaliação inicial, pode ser indicada uma reavaliação com um especialista para confirmação diagnóstica.</li>
                </ul>
            </div>
        );
    } else {
        probTextResult = "Probabilidade da avaliação: Alto";
        recommendationComponent = (
            <div id="rec-text-alto" className="bg-red-200 border border-red-600 text-red-950 px-4 py-4 rounded-lg mx-20 transition-opacity duration-500 ease-in-out text-justify">
                <h1 className="font-bold text-lg">Risco Alto</h1>
                <p className="mt-2">Pontuações entre 8 e 25 ou questões críticas maiores que 1 indicam um alto risco de Transtorno do Espectro Autista. Diante dessa situação:</p>
                <ul className="list-inside mt-2 space-y-1">
                    <li className="bg-red-300 rounded-md pb-4">É essencial agendar uma consulta.</li>
                    <li className="bg-red-300 rounded-md pb-4">O profissional irá realizar uma avaliação detalhada para confirmar ou descartar o diagnóstico de autismo.</li>
                    <li className="bg-red-300 rounded-md pb-4">Caso confirme-se o diagnóstico, indica-se o tratamento mais adequado, considerando as necessidades específicas da criança.</li>
                </ul>
            </div>
        );
    }

    return (

    
    <div className="p-4 bg-white shadow-lg w-[210mm]">
      <header className="flex items-center justify-between border-b-2 border-gray-200">
        <div>
            <img src={logo} alt="Logo Mchat" className="h-20" />
        </div>
        
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">Resultado da avaliação M-CHAT</h1>
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

        <div className="mt-4 text-center p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold  text-gray-700">Resultado Final da Análise</h3>
          <div className="p-5 shadow-md rounded-md">
            <div className="flex felx-row justify-center gap-2 text-lg">
              <h4 className="font-semibold">Pontuação crítica:</h4>
              <span className="font-bold">{somaTotalCriticas}</span>
                </div>
                {/*
                  {Object.entries(finalCriticas).map(([grupo, contagem]) => (
                      <span key={grupo} className="font-semibold text-lg pr-2">
                          Grupo {grupo}: <span className="font-bold text-blue-600">{contagem}</span>
                      </span>
                ))} */}
                </div>
          <p className="text-xl pt-2 pb-8 mx-auto font-semibold">Score: {finalScore}</p>

          {recommendationComponent}
        </div>
        
      </main>

      <footer className="pt-2 mt-4 text-xs text-center text-white border-t bg-gray-600 rounded-md pb-2">
        <div className="flex flex-row items-center gap-5 px-5 pb-4 p-5 justify-center">
          <img src={susLogo} className="h-8 w-auto " alt="Logo do SUS" />
          <img src={ifrsLogo} className="h-14 w-auto" alt="Logo do IFRS" />
          <img src={altoFelizBrasao} className="h-10 w-auto" alt="Brasão de Alto Feliz" />
          <img src={teacolheLogo} className="h-10 w-auto" alt="Logo do TECAcolhe" /> 
          <img src={labIdeias} className="h-14 w-auto" alt="Logo do Laboratório de Ideias" />
        </div>
        <p>Este é um relatório gerado automaticamente. © MCHAT {new Date().getFullYear()}</p>
      </footer>

    </div>
    );
}

export default TemplateAvaliacao;