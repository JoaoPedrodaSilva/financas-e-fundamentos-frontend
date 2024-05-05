import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RotaProtegida = ({ usuarioAutenticado, setUsuarioAutenticado }) => {
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rotaProtegida/`, { credentials: "include" })
            .then(response => response.json())
            .then(data => {
                if (data.usuarioAutenticado) {
                    setUsuarioAutenticado(true)
                } else {
                    setUsuarioAutenticado(false)
                    navigate("/entrar")
                }
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <div className="flex items-center justify-center text-white text-2xl p-10">
            {usuarioAutenticado ? `Rota Protegida - Usuário Autenticado` : navigate("/entrar")}
        </div>
    )
}
