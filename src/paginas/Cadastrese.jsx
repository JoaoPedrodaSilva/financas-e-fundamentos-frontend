import { useEffect } from "react"

export const Cadastrese = () => {
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_DEV}api/cadastrese/`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }, [])

   const cadastraNovoUsuario = () => {
        fetch(`${import.meta.env.VITE_API_URL_DEV}api/cadastrese/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: 'Usuário Novo', senha: "123" })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

  return (
    <div
    onClick={cadastraNovoUsuario}
    className="flex justify-center items-center text-xl text-white p-10"
    >Cadastre-se</div>
  )
}
