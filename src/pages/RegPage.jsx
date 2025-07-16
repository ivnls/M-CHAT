import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useReg } from "../context/RegContext";
import { useScore } from "../context/ScoreContext";
import { useDate } from "../context/DateContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function RegForm() {

    const navigate = useNavigate();
    const { registrar, resetReg } = useReg();
    const { resetScore } = useScore();
    const { resetDate } = useDate();

    useEffect(() => {
        // limpar dados do registro anterior
        resetReg();
        resetScore();
        resetDate();
    }, []);

    //termos
    const [termos, setTermos] = useState(false);
    
    //dados
    const [nomeMae, setNomeMae] = useState("");
    const [nomeCrianca, setNomeCrianca] = useState("");
    const [idade, setIdade] = useState("");
    const [sexo, setSexo] = useState("Masculino");
    // const [email, setEmail] = useState("");

    //erros
    const [erroIdade, setErroIdade] = useState("");
    const [erroTermos, setErroTermos] = useState("");
    const [erroNomeMae, setErroNomeMae] = useState("");
    const [erroNomeCrianca, setErroNomeCrianca] = useState("");
    // const [erroContaGoogle, setErroContaGoogle] = useState("");

    // const [emailVerificado, setEmailVerificado] = useState(false);

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

        // /\d/ -> procura numeros em uma string
        if (/\d/.test(nomeMae)) {
            setErroNomeMae("Digite um nome válido.");
            e++;
        } else if (!nomeMae.includes(" ")) {
            setErroNomeMae("Digite o nome completo.");
            e++;
        } else {
            setErroNomeMae("");
        }

        if (/\d/.test(nomeCrianca)) {
            setErroNomeCrianca("Digite um nome válido.");
            e++;
        } else if (!nomeCrianca.includes(" ")) {
            setErroNomeCrianca("Digite o nome completo.");
            e++;
        } else {
            setErroNomeCrianca("");
        }

        /*if (!emailVerificado) {
            setErroContaGoogle("Por favor, faça login com uma conta google.")
            e++;
        }*/

        if (e > 0) {
            return;
        }

        setNomeMae(nomeMae);
        setNomeCrianca(nomeCrianca);
        setIdade(idade);
        setSexo(sexo);

        registrar({ nomeMae, nomeCrianca, idade, sexo }); //incluir email caso em uso

        navigate('/questionario');
    }


    /*const ValidacaoGmail = (credenciais) => {
        const credenciaisDec = jwtDecode(credenciais.credential);
        if (credenciaisDec.email_verified) {
            setEmailVerificado(true);
            setEmail(credenciaisDec.email);
            setErroContaGoogle("");
        } else {
            erroContaGoogle("Por favor, use outra conta google.")
        }
        
    }*/

    return (
        <>
        
        <Header subtitle={"Registro"} />
        <form onSubmit={EnvioDoFormulario} className="bg-gray-200 text-center rounded-xl p-4 my-8 mx-2 shadow-md lg:p-8 lg:mx-auto lg:max-w-xl">

        <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>

        <div className="bg-red-700 rounded-md p-5 mb-5 max-w-md mx-auto">
            <p className="mx-2 text-white">O (M-CHAT) é um breve questionário referente ao desenvolvimento e comportamento utilizado em crianças dos 16 aos 30 meses, com o objetivo de rastrear as perturbações do espectro do autismo (PEA).
            </p>
            <p className="mx-2 mb-3 text-white">Pode ser aplicado tanto numa avaliação periódica de rotina (cuidados primários de saúde), como por profissionais especializados em casos de suspeita. 
            </p>
            <div className="flex justify-center gap-x-3 items-center">
                <input onChange={(e) => {e.target.checked ? setTermos(true) : setTermos(false)}} id="terms" className="h-5 w-5" type="checkbox"></input>
                <div>
                    <label className="text-white">Concordo com os </label>
                    <a href="/termos" className="text-blue-400 underline hover:text-blue-500">Termos</a>
                </div>    
            </div>
        </div>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroTermos}</p>


        <label className="block mb-2 font-medium">Nome da Mãe</label>
        <input onChange={(e) => {setNomeMae(e.target.value)}} type="text" id="nomeMae" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroNomeMae}</p>

        <label className="block mt-4 mb-2 font-medium">Nome Completo da Criança</label>
        <input onChange={(e) => {setNomeCrianca(e.target.value)}} type="text" id="nomeCrianca" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroNomeCrianca}</p>

        <label className="block mt-4 mb-2 font-medium">Idade em Meses</label>
        <input onChange={(e) => {setIdade(e.target.value)}} type="number" id="idade" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required></input>
        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroIdade}</p>


        <label className="block mt-4 mb-2 font-medium">Sexo</label>
        <select value={sexo} onChange={(e) => {setSexo(e.target.value)}} id="sexo" className="bg-white w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
        </select>

        {/*
        <label className="block mt-4 mb-2 font-medium">Login com Google</label>
        <div className={emailVerificado ? "hidden" : "visible flex justify-center"}>
            <GoogleLogin theme="filled_blue" shape="pill" text="continue_with" width="280" onSuccess={ValidacaoGmail} />
        </div>

        <div className={emailVerificado ? "flex justify-center mt-4 gap-1 visible" : "hidden"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
                <p>Conta Verificada</p>
            </div>

        <p className="text-red-700 bg-red-200 rounded-md my-2 mx-4">{erroContaGoogle}</p>
        */}

        <button type="submit" className="mt-6 px-10 bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition">Registrar</button>
        </form>

        </>
    );
}

export default RegForm;