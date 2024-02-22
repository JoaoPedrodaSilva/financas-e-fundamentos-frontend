import { Link } from "react-router-dom"

export const PaginaInicial = () => (
    <section className='h-full flex flex-col justify-center items-center gap-8 px-5 lg:px-20'>
        <Link
            to={`/acoes/`}
            className="text-md text-white text-2xl py-4 my-6 rounded hover:text-blue-700"
        >
            <h2 className="text-center pb-1">Ações</h2>
            <p className="text-center text-xl">Analise os fundamentos de cada empresa individualmente</p>
        </Link>
        <Link
            to={`/comparador-empresas/`}
            className="text-md text-white text-2xl py-4 my-6 rounded hover:text-blue-700"
        >
            <h2 className="text-center pb-1">Comparar Ações</h2>
            <p className="text-center text-xl">Compare os fundamentos de até três empresas</p>
        </Link>
        <Link
            to={`/macroeconomia/DÓLAR%20EUA`}
            className="text-md text-white text-2xl py-4 my-6 rounded hover:text-blue-700"
        >
            <h2 className="text-center pb-1">Macroeconomia</h2>
            <p className="text-center text-xl">Acompanhe os principais indicadores macroeconômicos</p>
        </Link>
    </section>
)
