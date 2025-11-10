import React, { useState } from "react";
import { supabase } from "../utils/supaBaseClient";

function AdminLogin({ loginSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState(false);

    async function adminLogin(e) {

        e.preventDefault();
        setLoginError(false);

        try {
            const {data,error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setLoginError(true);
            } else {
                loginSuccess();
            }

        } catch (error) {
            
        }

    }

    return (
        <form onSubmit={adminLogin} className="flex flex-col py-10 my-5 shadow-lg rounded-lg gap-3 px-4 bg-gray-300 items-center mx-auto max-w-2xl">
            <t1>Insira as credenciais</t1>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-500 hover:bg-gray-600 px-5 py-1.5 rounded-lg text-white" />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-500 hover:bg-gray-600 px-5 py-1.5 rounded-lg text-white"  />
            <button className="bg-blue-600 text-white px-5 py-1 rounded-lg mt-3 hover:bg-blue-700" >Entrar</button>

            <p className={loginError ? "visible p-4 font-semibold bg-red-500 text-red-950 rounded-md" : "invisible"} >
                Houve uma falha no Login! Verifique o E-mail e Senha.
            </p>

        </form>
    );

}

export default AdminLogin;