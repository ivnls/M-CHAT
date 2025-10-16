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

    const { nomeMae, nomeCrianca, idade, sexo } = useReg(); //incluir email

    return(
        <div id="dadosConsulta" className="bg-gray-300 text-center rounded-xl py-4 px-4 m-4 shadow-md max-w-md mx-auto">
            <h2 className="text-lg font-bold">Dados da Avaliação</h2>
            <div className="flex flex-row gap-5 py-2 text-left">
                <div>
                    <p id="nomeMae" className="font-semibold">Nome da Mãe: </p>
                    <span className="font-normal">{nomeMae}</span>
                    <p id="nomeCrianca" className="font-semibold">Nome da Criança: </p>
                    <span className="font-normal">{nomeCrianca}</span>
                </div>
                <div>
                    <p id="idade" className="font-semibold">Idade (Meses): </p>
                    <span className="font-normal">{idade}</span>
                    <p id="sexo" className="font-semibold">Sexo: </p>
                    <span className="font-normal">{sexo}</span>
                </div>
            </div>
            {finalDate}
        </div>
    );
}

export default InfoReg;