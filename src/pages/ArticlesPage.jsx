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
        <section className='h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 px-5 lg:px-20 bg-gray-800'>

            {articles && articles.map(article => {
                return (
                    <article key={article.id} className=" justify-self-center min-h-[15rem] max-w-[16rem] flex flex-col rounded-lg shadow-lg bg-white my-5">
                        <div className='min-h-[4.5rem] w-full flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                            <h2 className='text-center'>{article.title}</h2>
                        </div>
                        <p className="min-h-[7rem] w-full text-gray-700 text-justify text-sm p-2">
                            {article.description}
                        </p>
                        <Link
                            to={article.id}
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