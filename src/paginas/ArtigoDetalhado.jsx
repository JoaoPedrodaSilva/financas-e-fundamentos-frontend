import axios from '../axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BsArrowUpCircle } from 'react-icons/bs'


export const ArtigoDetalhado = () => {
    const { id } = useParams()
    const [conteudos, setConteudos] = useState(null)

    useEffect(() => {
        const fetchConteudos = async () => {
            try {
                const results = await axios.get(`/api/artigos/${id}`)
                setConteudos(results.data.conteudos)
            } catch (error) {
                console.error(error)
            }
        }
        fetchConteudos()
        
    }, [])


    //render in case of no data
    if (!conteudos) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 pt-40">
                <p className="text-white text-center">Carregando o conteúdo...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando o conteúdo..." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-col gap-1 px-5 lg:px-20 lg:text-lg text-white bg-gray-800'>
            {conteudos && conteudos.map(conteudo => {

                // Title        
                if (conteudo.tipo_conteudo === '1') {
                    return <h1 key={conteudo.id} className='text-center text-2xl font-bold py-8 text-yellow-400'>{conteudo.conteudo}</h1>
                }

                // Subtitle        
                if (conteudo.tipo_conteudo === '2') {
                    return <h2 key={conteudo.id} className='text-center font-bold pb-2 text-yellow-400'>{conteudo.conteudo}</h2>
                }

                // Simple Paragraph        
                if (conteudo.tipo_conteudo === '3') {
                    return <p key={conteudo.id} className='indent-10 text-justify pb-2'>{conteudo.conteudo}</p>
                }

                // Last Paragraph        
                if (conteudo.tipo_conteudo === '4') {
                    return <p key={conteudo.id} className='indent-10 text-justify pb-12'>{conteudo.conteudo}</p>
                }

                // Centered Paragraph        
                if (conteudo.tipo_conteudo === '5') {
                    return <p key={conteudo.id} className='text-xs text-center pb-2'>{conteudo.conteudo}</p>
                }

                // Simple Link        
                if (conteudo.tipo_conteudo === '6') {
                    return <Link reloadDocument key={conteudo.id} to={conteudo.url_link} className="text-xs text-center pb-2 underline">{conteudo.conteudo}</Link>
                }

                // Last Link        
                if (conteudo.tipo_conteudo === '7') {
                    return <Link reloadDocument key={conteudo.id} to={conteudo.url_link} className="text-xs text-center pb-12 underline">{conteudo.conteudo}</Link>
                }

                // Portrait Image
                if (conteudo.tipo_conteudo === '8') {
                    return <img key={conteudo.id} className='pb-12 mx-auto' src={conteudo.url_imagem} alt={conteudo.conteudo} />
                }

                // Landscape Image
                if (conteudo.tipo_conteudo === '9') {
                    return <img key={conteudo.id} className='pb-12 mx-auto' src={conteudo.url_imagem} alt={conteudo.conteudo} />
                }

                //Anything else
                return ''

            })}


            {/* back to top button */}
            <BsArrowUpCircle
                onClick={() => window.scroll({top: 0, behavior: 'smooth'})}
                className='self-end text-2xl cursor-pointer'
            />

        </section>
    )
}