import { useNavigate } from "react-router-dom"

import { useContext, useEffect } from "react";

import { AuthContext } from "../../componentes/contexts/AuthContext";
import { ToastAlerts } from "../../utils/ToastAlerts";

function Perfil() {

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === '') {
            ToastAlerts('Você precisa estar logado', '')
            navigate('/login')
        }
    }, [usuario.token])

    return (
        <div className="py-16">
            <div className="mx-auto rounded-3xl overflow-hidden container font-semibold shadow-2xl">
                <p>Nome: {usuario.nome}</p>
                <p>Email: {usuario.usuario}</p>
            </div>
        </div>
    )
}

export default Perfil


