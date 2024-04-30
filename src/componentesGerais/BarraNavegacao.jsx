import { Link } from 'react-router-dom'

export const BarraNavegacao = () => (
    <nav
        className="flex justify-between items-center gap-8 px-5 lg:px-20 py-2 lg:py-1 bg-white">


        <Link to={`/`} className="flex items-center justify-center gap-1">
            <img src='https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/logo.png' className="w-8 lg:w-10" alt="Logotipo do Finanças e Fundamentos, uma moeda amarela com duas letras efes, uma de cabeça para cima e outra de cabeça para baixo." />
            <span className="self-center text-base lg:text-xl font-semibold">Finanças e Fundamentos</span>
        </Link>

        <div>
            <ul className="flex flex-row items-center gap-12 p-4 bg-white rounded-b">
                <li>
                    <Link
                        to={`/comparador-empresas/`}
                        className="text-base text-gray-700 rounded hover:text-blue-700"
                    >
                        Comparador de Empresas
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/acoes/`}
                        className="text-base text-gray-700 rounded hover:text-blue-700"
                    >
                        Ações
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/macroeconomia/`}
                        className="text-base text-gray-700 rounded hover:text-blue-700"
                    >
                        Macroeconomia
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/cadastrese/`}
                        className="text-base text-gray-700 rounded hover:text-blue-700"
                    >
                        Cadastre-se
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/entrar/`}
                        className="text-base text-gray-700 rounded hover:text-blue-700"
                    >
                        Entrar
                    </Link>
                </li>
            </ul >
        </div >
    </nav >
)
