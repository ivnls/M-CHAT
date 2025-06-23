import React from "react";
import { useReg } from "../context/RegContext";
import { useNavigate } from "react-router-dom";

function InfoReg() {

    const navigate = useNavigate();

    const { nomeMae, nomeCrianca, idade, sexo } = useReg();

    if (nomeMae === undefined || nomeMae === null) {
        navigate("/");
    }

    const data = new Date();
    const dataFormatada = data.toLocaleString("pt-BR");

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
            <p id="inicio" className="mb-4">Início da Consulta: {dataFormatada}<span className="font-normal"></span></p>
        </div>
    );
}

export default InfoReg;