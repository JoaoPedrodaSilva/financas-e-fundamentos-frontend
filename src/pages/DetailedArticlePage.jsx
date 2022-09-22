import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios'

export const DetailedArticlePage = () => {
    const { id } = useParams()
    const [article, setArticle] = useState({})
    const [contents, setContents] = useState([])

    useEffect(() => {
        const getArticleAndContentsFromDatabase = async () => {
            try {
                const articleandContentsFromDatabase = await axios.get(`/api/artigos/${id}`)
                setArticle(articleandContentsFromDatabase.data.article)
                setContents(articleandContentsFromDatabase.data.contents)

            } catch (error) {
                console.log(error)
            }
        }
        getArticleAndContentsFromDatabase()
    }, [])


    return (
        <section className='h-full flex flex-col justify-center items-start gap-1 px-5 sm:px-14 lg:px-40 bg-gray-800'>

            <h1 className='self-center text-white text-3xl font-semibold my-5'>{article && article.title}</h1>
            {contents && contents.map(content => {

                if (content.content_type === '1') {
                    return <p key={content.id} className='indent-10 text-white text-lg text-justify my-2 py-3'>{content.content}</p>
                }

                if (content.content_type === '4') {
                    return <img key={content.id} className='self-center w-5/6 lg:w-1/2 my-5' src={content.content} alt={content.image_alt} />
                }
                return ''

            })}

        </section>
    )
}