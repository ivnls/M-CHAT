import React from "react";
import { useReg } from "../context/RegContext";
import { useScore } from "../context/ScoreContext";

function InfoReg() {

    const { data } = useScore();

    let finalDate = null;

    if (data != undefined) {
        finalDate = (
            <p id="inicio" className="mb-4 bg-green-300 rounded-lg">Avaliação completa em {data}<span className="font-normal"></span></p>
        );
    }

    const { nomeMae, nomeCrianca, idade, sexo } = useReg();

    return(
        <div id="dadosConsulta" className="bg-gray-300 text-center rounded-xl pt-4 px-4 m-4 shadow-md mx-auto">
            <h2 className="text-lg font-bold">Dados da Consulta</h2>
            <div className="flex flex-row gap-5 py-5 text-justify">
                <div>
                    <p id="nomeMae" className="">Nome da Mãe: {nomeMae}<span className="font-normal"></span></p>
                    <p id="nomeCrianca" className="">Nome da Criança: {nomeCrianca}<span className="font-normal"></span></p>
                </div>
                <div>
                    <p id="idade" className="">Idade (Meses): {idade}<span className="font-normal"></span></p>
                    <p id="sexo" className="">Sexo: {sexo}<span className="font-normal"></span></p>
                </div>
            </div>
            {finalDate}
        </div>
    );
}

export default InfoReg;