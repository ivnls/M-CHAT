import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function TermosPage() {

    const navigate = useNavigate();

    function retorar() {
        navigate(-1); //-1 voltar página anterior
    }

    return(
        <div className="flex flex-col justify-center mb-8">
            <Header subtitle={"Termos"} />

            <div className="bg-gray-200 rounded-xl p-4 my-8 mx-2 shadow-md">
            <p className="font-medium text-center">Este questionário (M-CHAT – Modified Checklist for Autism in Toddlers) é um instrumento de triagem destinado a identificar sinais de alerta para perturbações do espectro do autismo (PEA) em crianças entre 16 e 30 meses de idade.</p>
            <h1 className="font-bold">Importante:</h1>
            <p>Este teste não possui finalidade diagnóstica.</p>
            <ul className="list-disc pl-6">
                <li>O M-CHAT é uma ferramenta de rastreio que pode ser utilizada em avaliações periódicas de rotina (como nos cuidados primários de saúde), bem como por profissionais especializados em situações de suspeita.</li>
                <li>O resultado do questionário não substitui a avaliação clínica completa feita por profissionais da saúde qualificados, como médicos ou psicólogos especializados.</li>
                <li>Caso o resultado indique risco para PEA, recomenda-se buscar orientação profissional para uma avaliação mais detalhada.</li>
                <li>Ao prosseguir com o preenchimento do questionário, o(a) responsável declara estar ciente de que se trata de um instrumento de triagem e não de diagnóstico.</li>
            </ul>
            <h2 className="font-bold">Orientações para uso:</h2>
            <ul className="list-disc pl-6">
                <li>Preencha este questionário sobre o comportamento usual da criança. </li>
                <li>Responda a todas as questões. </li>
                <li>Se o comportamento descrito for raro (ex. foi observado uma ou duas vezes), responda como se a criança não o apresentasse. </li>  
            </ul>
            <h3 className="font-bold py-4">Como usar a ferramenta?</h3>
            <ul className="list-decimal ml-4">
                <div>
                    <li>Realizar o registro inicial.</li>
                    {/* Adicionar imagens para representação */}
                </div>
                <div>
                    <li>Responder às perguntas marcando para cada uma sim ou não, certifique-se de responder todas.</li>
                </div>
                <div>
                    <li>Conclua o questionário.</li>
                </div>
                <div>
                    <li>Você terá o resultado e as orientações aconselhadas.</li>
                </div>
            </ul>
            <p>Dica: Você pode realizar uma captura de tela do resultado para apresentar a um profissional.</p>
            </div>

            <button onClick={retorar} className="mt-2 px-4 mx-auto bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition">Voltar ao Cadastro</button>

        </div>
    )
}

export default TermosPage;