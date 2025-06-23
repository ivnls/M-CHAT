import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Aviso from "../components/Aviso";
import { useReg } from "../context/RegContext";

function RegForm() {

    //Aqui a página de registro é montada
    //***Quebrar em componentes

    const navigate = useNavigate();
    const { registrar, resetReg } = useReg();

    //termos
    const [termos, setTermos] = useState(false);
    
    //dados
    const [nomeMae, setNomeMae] = useState("");
    const [nomeCrianca, setNomeCrianca] = useState("");
    const [idade, setIdade] = useState("");
    const [sexo, setSexo] = useState("Masculino");

    //erros
    const [erroIdade, setErroIdade] = useState("");
    const [erroTermos, setErroTermos] = useState("");

    //só para guardar os dados do formulário em localStorages
    const EnvioDoFormulario = (event) => {
        event.preventDefault();
        
        //Verificação de inputs
        let e = 0;
        if(!termos) {
            setErroTermos("Você deve ler e aceitar os Termos.");
            e++;
        } else {
            setErroTermos("");
        }

        if (idade < 16 || idade > 30) {
            setErroIdade("A criança deve ter de 16 a 30 meses.");
            e++;
        } else {
            setErroIdade("");
        }

        if (e > 0) {
            return;
        }

        setNomeMae(nomeMae);
        setNomeCrianca(nomeCrianca);
        setIdade(idade);
        setSexo(sexo);

        registrar({ nomeMae, nomeCrianca, idade, sexo });

        navigate('/questionario');
    }

    return (
        <>
        
        <Header subtitle={"Registro"} />
        <form onSubmit={EnvioDoFormulario} className="bg-gray-200 text-center rounded-xl p-4 my-8 mx-2 shadow-md lg:p-8 lg:mx-auto lg:max-w-xl">

        <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>

        <div className="bg-red-700 rounded-md p-5 mb-5">
            <p className="mx-2 text-white">O (M-CHAT) é um breve questionário referente ao desenvolvimento e comportamento utilizado em crianças dos 16 aos 30 meses, com o objetivo de rastrear as perturbações do espectro do autismo (PEA).
            </p>
            <p className="mx-2 mb-3 text-white">Pode ser aplicado tanto numa avaliação periódica de rotina (cuidados primários de saúde), como por profissionais especializados em casos de suspeita. 
            </p>
            <div className="flex justify-center gap-x-3 items-center">
                <input onChange={(e) => {e.target.checked ? setTermos(true) : setTermos(false)}} id="terms" className="h-5 w-5" type="checkbox"></input>
                <div>
                    <label className="text-white">Concordo com os </label>
                    <a href="/termos" className="text-blue-400 underline hover:text-blue-500">Termos de Uso</a>
                </div>    
            </div>
        </div>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroTermos}</p>


        <label className="block mb-2 font-medium">Nome da Mãe</label>
        <input onChange={(e) => {setNomeMae(e.target.value)}} type="text" id="nomeMae" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>

        <label className="block mt-4 mb-2 font-medium">Nome Completo da Criança</label>
        <input onChange={(e) => {setNomeCrianca(e.target.value)}} type="text" id="nomeCrianca" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>

        <label className="block mt-4 mb-2 font-medium">Idade em Meses</label>
        <input onChange={(e) => {setIdade(e.target.value)}} type="number" id="idade" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroIdade}</p>


        <label className="block mt-4 mb-2 font-medium">Sexo</label>
        <select value={sexo} onChange={(e) => {setSexo(e.target.value)}} id="sexo" className="bg-white w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
        </select>

        <button type="submit" className="mt-6 px-10 bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition">Enviar</button>
        </form>
        </>
    );
}

export default RegForm;