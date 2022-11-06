import axios from '../axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


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

    //render in case of no data
    if (!articles) {
        return (
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="An animation, showing the chart is being loaded." />
            </div>
        )
    }

    return (
        <section className='h-full flex flex-wrap justify-center items-center gap-x-8 px-5 lg:px-20 bg-gray-800'>

            {articles && articles.map(article => {
                return (
                    <article key={article.id} className="w-full max-w-sm min-h-[15rem] flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                        <div className='w-full min-h-[4.5rem] flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                            <h2 className='text-center'>{article.title}</h2>
                        </div>
                        <p className="w-full text-gray-700 text-center p-2">
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