import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../axios'

export const DetailedArticlePage = () => {
    const { id } = useParams()
    const [contents, setContents] = useState(null)

    useEffect(() => {
        const getContentsFromDatabase = async () => {
            try {
                const articleandContentsFromDatabase = await axios.get(`/api/artigos/${id}`)
                setContents(articleandContentsFromDatabase.data.contents)
            } catch (error) {
                console.log(error)
            }
        }
        getContentsFromDatabase()
    }, [])


    //render in case of no data
    if (!contents) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 pt-40">
                <p className="text-white text-center">Carregando o conteúdo...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="An animation, showing the chart is being loaded." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-col gap-1 px-5 lg:px-20 lg:text-lg text-white bg-gray-800'>
            
            {contents && contents.map(content => {

                // Title        
                if (content.content_type === '1') {
                    return <h1 key={content.id} className='text-center text-2xl font-bold py-8 text-yellow-400'>{content.content}</h1>
                }

                // Subtitle        
                if (content.content_type === '2') {
                    return <h2 key={content.id} className='text-center font-bold pb-2 text-yellow-400'>{content.content}</h2>
                }

                // Simple Paragraph        
                if (content.content_type === '3') {
                    return <p key={content.id} className='indent-10 text-justify pb-2'>{content.content}</p>
                }

                // Last Paragraph        
                if (content.content_type === '4') {
                    return <p key={content.id} className='indent-10 text-justify pb-12'>{content.content}</p>
                }

                // Centered Paragraph        
                if (content.content_type === '5') {
                    return <p key={content.id} className='text-xs text-center pb-2'>{content.content}</p>
                }

                // Simple Link        
                if (content.content_type === '6') {
                    return <Link reloadDocument key={content.id} to={content.link_url} className="text-xs text-center pb-2 underline">{content.content}</Link>
                }

                // Last Link        
                if (content.content_type === '7') {
                    return <Link reloadDocument key={content.id} to={content.link_url} className="text-xs text-center pb-12 underline">{content.content}</Link>
                }

                // Portrait Image
                if (content.content_type === '8') {
                    return <img key={content.id} className='pb-12 mx-auto' src={content.image_url} alt={content.content} />
                }

                // Landscape Image
                if (content.content_type === '9') {
                    return <img key={content.id} className='pb-12 mx-auto' src={content.image_url} alt={content.content} />
                }

                //Anything else
                return ''

            })}

        </section>
    )
}