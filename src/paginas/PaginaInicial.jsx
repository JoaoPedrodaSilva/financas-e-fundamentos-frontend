import { Link } from "react-router-dom"

export const PaginaInicial = () => (
    <section className='h-full flex flex-col justify-center items-center gap-8 px-5 lg:px-20'>
        <Link
            to={`/acoes/`}
            className="text-md text-white text-2xl py-4 my-6 rounded hover:text-blue-700"
        >
            Ações
        </Link>

        <Link
            to={`/macroeconomia/DÓLAR%20EUA`}
            className="text-md text-white text-2xl py-4 my-6 rounded hover:text-blue-700"
        >
            Macroeconomia
        </Link>
    </section>
)
