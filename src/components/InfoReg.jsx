import React from "react";
import { useReg } from "../context/RegContext";
import { useDate } from "../context/DateContext";

function InfoReg() {

    const { conclusionDate } = useDate();

    let finalDate = null;

    if (conclusionDate != undefined) {
        finalDate = (
            <p id="inicio" className="font-semibold pt-3 rounded-lg">Avaliação completa em {conclusionDate}<span className="font-normal"></span></p>
        );
    }

    const { nomeMae, nomeCrianca, idade, sexo, email } = useReg();

    return(
        <div id="dadosConsulta" className="bg-gray-300 text-center rounded-xl py-4 px-4 m-4 shadow-md lg:mx-auto">
            <h2 className="text-lg font-bold">Dados da Avaliação</h2>
            <div className="flex flex-row gap-5 py-2 text-justify">
                <div>
                    <p id="nomeMae" className="">Nome da Mãe: {nomeMae}<span className="font-normal"></span></p>
                    <p id="nomeCrianca" className="">Nome da Criança: {nomeCrianca}<span className="font-normal"></span></p>
                </div>
                <div>
                    <p id="idade" className="">Idade (Meses): {idade}<span className="font-normal"></span></p>
                    <p id="sexo" className="">Sexo: {sexo}<span className="font-normal"></span></p>
                </div>
            </div>
            <p id="email">Email: {email}<span className="font-normal"></span></p>
            {finalDate}
        </div>
    );
}

export default InfoReg;