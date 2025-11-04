import React from "react";

import labIdeias from "../assets/lab-ideias.svg"

function Footer() {
    return (
    
    <footer className="flex items-center gap-x-3 justify-center border-t-8 bg-gradient-to-b from-blue-950 to-cyan-600 border-slate-800 py-4 rounded-t-3xl text-white font-semibold">
        &copy; M-CHAT DIGITAL {new Date().getFullYear()} | 
        <img src={labIdeias} className="h-16 lg:h-24 w-20"></img>
    </footer>

    );
}

export default Footer;