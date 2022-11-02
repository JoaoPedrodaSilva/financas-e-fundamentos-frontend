// import axios from '../axios'
// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export const ArticlesPage = () => {
    // const [articles, setArticles] = useState([])

    // useEffect(() => {
    //     const getAllArticlesFromDatabase = async () => {
    //         try {
    //             const articlesFromDatabase = await axios.get('/api/artigos')
    //             setArticles(articlesFromDatabase.data.articles)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getAllArticlesFromDatabase()
    // }, [])

    return (
        <section className='h-full flex flex-wrap justify-center items-center gap-x-8 px-5 lg:px-20 bg-gray-800'>

            {/* Balance Sheet */}
            <article className="w-full sm:w-1/2 lg:w-1/4 flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                <div className='w-full flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                    <h2 className='text-center'>Balanço Patrimonial</h2>
                </div>
                <p className="w-full text-gray-700 text-center p-2">
                    Entenda o balanço patrimonial das empresas e aprenda a extrair os dados necessários para fazer sua própria análise.
                </p>
                <Link
                    to='/artigos/balanco-patrimonial'
                    className="w-1/2 self-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded"
                >
                    Saiba mais
                </Link>
            </article>

            {/* Income Metrics */}
            <article className="w-full sm:w-1/2 lg:w-1/4 flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                <div className='w-full flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                    <h2 className='text-center'>Lucratividade</h2>
                </div>
                <p className="w-full text-gray-700 text-center p-2">
                    Aprenda a interpretar os principais indicadores de lucratividade e decida, por conta própria, se deve investir em determinada empresa ou não.
                </p>
                <Link
                    to='/artigos/indicadores-de-lucratividade'
                    className="w-1/2 self-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded"
                >
                    Saiba mais
                </Link>
            </article>

            {/* Debt Metrics */}
            <article className="w-full sm:w-1/2 lg:w-1/4 flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                <div className='w-full flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                    <h2 className='text-center'>Endividamento</h2>
                </div>
                <p className="w-full text-gray-700 text-center p-2">
                    Aprenda a interpretar os principais indicadores de endividamento e decida, por conta própria, se deve investir em determinada empresa ou não.
                </p>
                <Link
                    to='/artigos/indicadores-de-endividamento'
                    className="w-1/2 self-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded"
                >
                    Saiba mais
                </Link>
            </article>

            {/* Eficiency Metrics */}
            <article className="w-full sm:w-1/2 lg:w-1/4 flex flex-col justify-between rounded-lg shadow-lg bg-white my-5">
                <div className='w-full flex items-center justify-center bg-blue-700 text-white text-xl font-semibold rounded-t-lg p-2'>
                    <h2 className='text-center'>Eficiência</h2>
                </div>
                <p className="w-full text-gray-700 text-center p-2">
                    Aprenda a interpretar os principais indicadores de eficiencia e decida, por conta própria, se deve investir em determinada empresa ou não.
                </p>
                <Link
                    to='/artigos/indicadores-de-eficiencia'
                    className="w-1/2 self-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 rounded"
                >
                    Saiba mais
                </Link>
            </article>

            {/* {articles && articles.map(article => {
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
            })} */}

        </section >
    )
}