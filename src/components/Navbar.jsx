import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GrMenu, GrClose } from 'react-icons/gr'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

export const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [navbarWidth, setNavbarWidth] = useState(window.innerWidth)
    const menuRef = useRef(null)

    //always show menu on resizing above 1024px
    const handleResize = () => {
        setTimeout(() => setNavbarWidth(window.innerWidth), 10)
    }
    window.addEventListener('resize', handleResize)
    useEffect(() => {
        if (navbarWidth >= 1024) {
            setShowMenu(true)
            setShowSubMenu(false)
        }
        else {
            setShowMenu(false)
            setShowSubMenu(false)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [navbarWidth])


    return (
        <nav className="flex justify-between items-center gap-8 px-5 lg:px-20 py-2 lg:py-1 bg-white">

            {/* brand */}
            <Link to={`/`} className="flex items-center justify-center gap-1">
                <img src='https://financasefundamentos.s3.sa-east-1.amazonaws.com/logo.png' className="w-6 sm:w-8 lg:w-10" alt="Logotipo do Finanças e Fundamentos, uma moeda amarela com duas letras efes, uma de cabeça para cima e outra de cabeça para baixo." />
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
                    setShowMenu(showMenu ? false : true)
                    setShowSubMenu(false)
                }}
            >
                <span className="sr-only">Open main menu</span>
                {showMenu ?
                    <GrClose className='text-xl' /> :
                    <GrMenu className='text-xl' />
                }
            </button>

            {/* inline menu (desktop only) */}
            <div ref={menuRef} className={`${showMenu ? 'absolute lg:relative top-10 lg:top-auto right-0 lg:right-auto' : 'hidden'} `} id="navbar-default">
                <ul className="flex flex-col items-start lg:flex-row gap-4 px-6 py-4 bg-white rounded-b">
                    <li>
                        <Link
                            to={`/`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                setShowSubMenu(false)
                                navbarWidth < 768 && setShowMenu(false)
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/sobre`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                setShowSubMenu(false)
                                navbarWidth < 768 && setShowMenu(false)
                            }}
                        >
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/comunidade`}
                            className="text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => {
                                setShowSubMenu(false)
                                navbarWidth < 768 && setShowMenu(false)
                            }}
                        >
                            Comunidade
                        </Link>
                    </li>
                    <li>
                        {/* Submenu dropdown button */}
                        <button
                            id="dropdownNavbarLink"
                            data-dropdown-toggle="dropdownNavbar"
                            className="flex items-center gap-1 text-md text-gray-700 rounded hover:text-blue-700"
                            onClick={() => setShowSubMenu(showSubMenu ? false : true)}
                        >
                            Serviços
                            {showSubMenu ?
                                <IoIosArrowUp className='text-xl' /> :
                                <IoIosArrowDown className='text-xl' />
                            }
                        </button>
                        {/* Submenu items*/}
                        <div id="dropdownNavbar" className={`${showSubMenu ? 'absolute right-0 z-10 w-48 bg-white rounded ' : 'hidden'}`}>
                            <ul className="flex flex-col items-start gap-4 px-6 py-4 bg-white rounded " aria-labelledby="dropdownLargeButton">
                                <li>
                                    <Link
                                        to={`/artigos`}
                                        className="text-md text-gray-700 rounded hover:text-blue-700"
                                        onClick={() => {
                                            setShowSubMenu(false)
                                            navbarWidth < 768 && setShowMenu(false)
                                        }}
                                    >
                                        Artigos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/acoes/3`}
                                        className="text-md text-gray-700 rounded hover:text-blue-700"
                                        onClick={() => {
                                            setShowSubMenu(false)
                                            navbarWidth < 768 && setShowMenu(false)
                                        }}
                                    >
                                        Ações
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        to={`/fundosimobiliarios`}
                                        className="text-md text-gray-700 rounded hover:text-blue-700"
                                        onClick={() => {
                                            setShowSubMenu(false)
                                            navbarWidth < 768 && setShowMenu(false)
                                        }}
                                    >
                                        Fundos Imobiliários
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}