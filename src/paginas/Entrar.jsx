import { useEffect } from "react"

export const Entrar = () => {
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/entrar/`, { credentials: "include" })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }, [])

    const autenticaUsuario = () => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/entrar/`, {
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: 'Usuário Novo'})
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

  return (
    <div
    onClick={autenticaUsuario}
    className="flex justify-center items-center text-xl text-white p-10"
    >Entrar</div>
  )
}
