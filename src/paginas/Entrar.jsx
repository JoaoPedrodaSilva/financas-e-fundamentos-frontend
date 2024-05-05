import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Entrar = ({ setUsuarioAutenticado }) => {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    const autenticaUsuario = () => {
        setErro("")
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/entrar/`, {
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: usuario, senha: senha })
        })
            .then(response => response.json())
            .then(data => {
                if (data.usuarioAutenticado) {
                    navigate("/rotaProtegida")
                } else {
                    setUsuarioAutenticado(false)
                    setErro(data.erro)
                }
            })
            .catch(error => console.error(error))
    }


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rotaProtegida/`, { credentials: "include" })
            .then(response => response.json())
            .then(data => {
                if (data.usuarioAutenticado) {
                    setUsuarioAutenticado(true)
                    navigate("/rotaProtegida")
                } else {
                    setUsuarioAutenticado(false)                    
                }
            })
            .catch(error => console.error(error))
    }, [])


    return (
        <form
            onSubmit={event => event.preventDefault()}
            className="flex flex-col justify-center items-center gap-8 text-xl text-white p-10 mt-40"
        >
            <div className="flex gap-2">
                <label htmlFor="usuario">Usuário:</label>
                <input type="text"
                    id="usuario"
                    value={usuario}
                    onChange={event => setUsuario(event.target.value)}
                    maxLength={20}
                    required
                    className="px-1 rounded text-black"
                />
            </div>

            <div className="flex gap-2">
                <label htmlFor="senha">Senha:</label>
                <input type="password"
                    id="senha"
                    value={senha}
                    onChange={event => setSenha(event.target.value)}
                    maxLength={20}
                    required
                    className="px-1 rounded text-black"
                />
            </div>

            <button
                type="submit"
                className="px-4 rounded-lg p-1 bg-blue-400 hover:bg-blue-500 hover:text-white"
                onClick={autenticaUsuario}
            >
                Entrar
            </button>
            <p className="text-sm text-red-500">{erro}</p>
        </form>
    )
}
