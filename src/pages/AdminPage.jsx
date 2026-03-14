import React, { useState, useEffect } from "react";
import RelatorioResultados from "../components/RelatorioPCidade";
import AdminLogin from "../components/AdminLogin";
import { supabase } from "../utils/supaBaseClient";

function AdminPage() {
    const [isLogged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                const { data: perfil } = await supabase
                    .from('perfis')
                    .select('id')
                    .single();

                if (perfil) {
                    setLogged(true);
                } else {
                    await supabase.auth.signOut();
                }
            }
            setLoading(false);
        };

        checkSession();
    }, []);

    const hLoginSucess = () => {
        setLogged(true);
    }

    const hLogout = async () => {
        await supabase.auth.signOut();
        setLogged(false);
    }

    if (loading) {
        return <div className="flex h-screen justify-center items-center text-blue-600 font-bold">Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {!isLogged ? (
                <AdminLogin loginSuccess={hLoginSucess} />
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-end max-w-6xl mx-auto w-full">
                        <button 
                            onClick={hLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow-md"
                        >
                            Sair do Painel
                        </button>
                    </div>
                    <RelatorioResultados />
                </div>
            )}
        </div>
    );
}

export default AdminPage;