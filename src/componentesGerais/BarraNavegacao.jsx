import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GrMenu, GrClose } from 'react-icons/gr'

export const BarraNavegacao = () => {
    const [mostraMenu, setMostraMenu] = useState(false)
    const [larguraNavbar, setLarguraNavbar] = useState(window.innerWidth)
    const menuRef = useRef(null)

    //always show menu on resizing above 1024px
    const handleRedimensionamento = () => {
        setTimeout(() => setLarguraNavbar(window.innerWidth), 10)
    }
    window.addEventListener('resize', handleRedimensionamento)
    useEffect(() => {
        if (larguraNavbar >= 1024) {
            setMostraMenu(true)
        }
        else {
            setMostraMenu(false)
        }
        return () => {
            window.removeEventListener('resize', handleRedimensionamento)
        }
    }, [larguraNavbar])


    return (
        <nav
            onMouseLeave={() => {
                larguraNavbar < 1024 && setMostraMenu(false)
            }}
            className="flex justify-between items-center gap-8 px-5 lg:px-20 py-2 lg:py-1 bg-white">

            {/* brand */}
            <Link to={`/`} className="flex items-center justify-center gap-1">
                <img src='https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/logo.png' className="w-6 sm:w-8 lg:w-10" alt="Logotipo do Finanças e Fundamentos, uma moeda amarela com duas letras efes, uma de cabeça para cima e outra de cabeça para baixo." />
                <span className="self-center text-base sm:text-lg lg:text-xl font-semibold">Finanças e Fundamentos</span>
            </Link>


            {/* hamburger menu icon (mobile and tablet only) */}
            <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="flex text-gray-800 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
                onClick={() => {
                    setMostraMenu(mostraMenu ? false : true)
                }}
            >
                <span className="sr-only">Open main menu</span>
                {mostraMenu ?
                    <GrClose className='text-xl' /> :
                    <GrMenu className='text-xl' />
                }
            </button>

            {/* inline menu (desktop only) */}
            <div
                ref={menuRef}
                className={`${mostraMenu ? 'absolute lg:relative top-10 lg:top-auto right-0 lg:right-auto z-50' : 'hidden'} `}
                id="navbar-default"
            >
                <ul className="flex flex-col items-center lg:flex-row gap-4 p-4 bg-white rounded-b">
                    <li>
                        <Link
                            to={`/`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                larguraNavbar < 1024 && setMostraMenu(false)
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/acoes/ABEV`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                larguraNavbar < 1024 && setMostraMenu(false)
                            }}
                        >
                            Ações
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/macroeconomia/DÓLAR EUA`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                larguraNavbar < 1024 && setMostraMenu(false)
                            }}
                        >
                            Macroeconomia
                        </Link>
                    </li>
                </ul >
            </div >
        </nav >
    )
}