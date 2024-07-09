import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const PaginaTodasAcoes = () => {
    const [dadosCadastraisDeTodasEmpresas, setDadosCadastraisDeTodasEmpresas] = useState(null)


    //fetch all companies and its registration data
    //busca todas as empresas e seus dados cadastrais
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setDadosCadastraisDeTodasEmpresas(data.dadosCadastraisDeTodasEmpresas))
            .catch(error => console.error(error))
    }, [])


    //render while data are being fetched
    //renderiza enquanto os dados estão sendo buscados
    if (!dadosCadastraisDeTodasEmpresas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //render when data arrives
    //renderiza quando os dados chegarem
    return (
        <section className='w-full grid grid-cols-4 justify-center items-center gap-2 my-4'>
            {dadosCadastraisDeTodasEmpresas.map(empresa => {
                return (
                    <Link to={`/acoes/${empresa.codigoBase}`} key={empresa.id}>
                        <article className='m-2 bg-white rounded-lg'>
                            <p className='text-center text-xl font-bold bg-blue-200 rounded-t-lg'>{empresa.codigoBase}</p>
                            <hr />
                            <p className='text-center p-2 text-sm'>{empresa.codigosNegociacao}</p>
                            <hr />
                            <p className='text-center p-2'>{empresa.nomeEmpresarial}</p>
                        </article>
                    </Link>
                )
            })}
        </section >
    )
}
