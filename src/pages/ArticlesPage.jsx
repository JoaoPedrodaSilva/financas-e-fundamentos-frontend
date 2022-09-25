import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios'

export const ArticlesPage = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getAllArticlesFromDatabase = async () => {
            try {
                const articlesFromDatabase = await axios.get('/api/artigos')
                setArticles(articlesFromDatabase.data.articles)
            } catch (error) {
                console.log(error)
            }
        }
        getAllArticlesFromDatabase()
    }, [])

    return (
        <section className='h-full flex flex-wrap justify-center items-center gap-x-10 px-5 lg:px-20 bg-gray-800'>

            {articles && articles.map(article => {
                return (
                    <article key={article.id} className="flex flex-col h-80 w-56 sm:w-80 rounded-lg shadow-lg bg-white my-5">
                        <div className='basis-1/6 flex flex-col items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg py-4 px-5'>
                            <h2 className='text-center'>{article.title}</h2>
                        </div>
                        <p className="basis-3/6 text-gray-700 text-justify text-sm p-5">
                            {article.description}
                        </p>
                        <Link
                            to={article.id}
                            className="self-center text-center w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Saiba mais
                        </Link>
                    </article>
                )
            })}
        </section >
    )
}