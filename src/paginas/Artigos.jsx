import axios from '../axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export const Artigos = () => {
    const [artigos, setArtigos] = useState(null)

    useEffect(() => {
        const fetchArtigos = async () => {
            try {
                const results = await axios.get('/api/artigos')
                setArtigos(results.data.artigos)
            } catch (error) {
                console.error(error)
            }
        }
        fetchArtigos()
    }, [])


    //render in case of no data
    if (!artigos) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 pt-40">
                <p className="text-white text-center">Carregando os artigos...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando os artigos..." />
            </div>
        )
    }

    return (
        <section className='h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-x-5 px-5 lg:px-20 bg-gray-800'>

            {artigos && artigos.map(artigo => {
                return (
                    <article key={artigo.id} className="w-full justify-self-center max-w-sm min-h-[15rem] flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                        <div className='w-full min-h-[4.5rem] flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                            <h2 className='text-center'>{artigo.titulo}</h2>
                        </div>
                        <p className="w-full text-gray-700 text-center p-2">
                            {artigo.descricao}
                        </p>
                        <Link
                            to={artigo.id}
                            className="w-1/2 self-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Saiba mais
                        </Link>
                    </article>
                )
            })}

        </section >
    )
}