import { useEffect } from "react"


export const Cadastrese = () => {

    //get route
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/cadastrese/`, { credentials: "include" })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }, [])


    //post
    const cadastraNovoUsuario = () => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/cadastrese/`, {
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: "Novo Usuário", senha: "123" })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    return (
        <div
            onClick={cadastraNovoUsuario}
            className="flex justify-center items-center text-xl text-white p-10"
        >
            Cadastre-se
        </div>
    )
}
