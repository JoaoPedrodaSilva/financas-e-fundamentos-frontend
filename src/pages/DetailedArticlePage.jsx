import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../axios'

export const DetailedArticlePage = () => {
    const { id } = useParams()
    const [contents, setContents] = useState([])

    useEffect(() => {
        const getArticleAndContentsFromDatabase = async () => {
            try {
                const articleandContentsFromDatabase = await axios.get(`/api/artigos/${id}`)
                setContents(articleandContentsFromDatabase.data.contents)

            } catch (error) {
                console.log(error)
            }
        }
        getArticleAndContentsFromDatabase()
    }, [])


    return (
        <section className='h-full flex flex-col gap-1 px-5 lg:px-20 lg:text-lg text-white bg-gray-800'>
            
            {contents && contents.map(content => {

                // Title        
                if (content.content_type === '1') {
                    return <h1 key={content.id} className='text-center text-xl font-bold py-8'>{content.content}</h1>
                }

                // Subtitle        
                if (content.content_type === '2') {
                    return <h2 key={content.id} className='text-center font-bold pb-2'>{content.content}</h2>
                }

                // Simple Paragraph        
                if (content.content_type === '3') {
                    return <p key={content.id} className='indent-10 text-justify pb-2'>{content.content}</p>
                }

                // Last Paragraph        
                if (content.content_type === '4') {
                    return <p key={content.id} className='indent-10 text-justify pb-8'>{content.content}</p>
                }

                // Centered Paragraph        
                if (content.content_type === '5') {
                    return <p key={content.id} className='text-center pb-2'>{content.content}</p>
                }

                // Simple Link        
                if (content.content_type === '6') {
                    return <Link key={content.id} to={content.link_url} className="text-center pb-2 underline">{content.content}</Link>
                }

                // Last Link        
                if (content.content_type === '7') {
                    return <Link key={content.id} to={content.link_url} className="text-center pb-8 underline">{content.content}</Link>
                }

                // Portrait Image
                if (content.content_type === '8') {
                    return <img key={content.id} className='pb-8 lg:w-1/4 mx-auto' src={content.image_url} alt={content.content} />
                }

                // Landscape Image
                if (content.content_type === '9') {
                    return <img key={content.id} className='pb-8 lg:w-1/2 mx-auto' src={content.image_url} alt={content.content} />
                }

                //Anything else
                return ''

            })}

        </section>
    )
}