import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BarraNavegacao } from './componentesGerais/BarraNavegacao'
import { PaginaInicial } from './paginas/PaginaInicial'
// import { Cadastrese } from './paginas/Cadastrese'
import { Entrar } from './paginas/Entrar'
import { RotaProtegida } from './paginas/RotaProtegida'
import { TodasAcoes } from './paginas/TodasAcoes'
import { AcaoIndividual } from './paginas/AcaoIndividual'
import { ComparadorEmpresas } from './paginas/ComparadorEmpresas'
import { MacroEconomia } from './paginas/MacroEconomia'
import { Rodape } from './componentesGerais/Rodape'


export const App = () => {
    //states
    const [larguraTela, setLarguraTela] = useState(window.innerWidth)
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)

    //check screen width every resizing
    //checa a largura da tela a cada redimensionamento
    const handleRedimensionamento = () => {
        setTimeout(() => setLarguraTela(window.innerWidth), 10)
    }
    window.addEventListener('resize', handleRedimensionamento)
    useEffect(() => {
        return () => {
            window.removeEventListener('resize', handleRedimensionamento)
        }
    }, [larguraTela])


    //conditional rendering depending on width size
    //renderização condicional a depender do tamanho da tela
    return (
        <>
            {larguraTela < 768 ? (
                <section className='w-screen h-screen flex flex-col justify-center items-center gap-4 bg-gray-800'>
                    <div className="flex justify-center items-center gap-2 p-1 rounded bg-white">
                        <img src='https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/logo.png' className="w-6" alt="Logotipo do Finanças e Fundamentos, uma moeda amarela com duas letras efes, uma de cabeça para cima e outra de cabeça para baixo." />
                        <span className="self-center text-base font-semibold text-black">Finanças e Fundamentos</span>
                    </div>
                    <p className='text-white text-center'>
                        Nosso site funciona apenas em dispositivos com telas maiores que 768 pixels.
                    </p>
                </section>
            ) : (
                <BrowserRouter>
                    <div className='flex flex-col w-full h-screen'>
                        <BarraNavegacao
                            usuarioAutenticado={usuarioAutenticado}
                            setUsuarioAutenticado={setUsuarioAutenticado}
                        />
                        <div className='basis-full w-full bg-gray-800'>
                            <Routes>
                                <Route path='/' element={<PaginaInicial />} />
                                {/* <Route path='/cadastrese' element={<Cadastrese />} /> */}
                                <Route
                                    path='/entrar'
                                    element={<Entrar
                                        setUsuarioAutenticado={setUsuarioAutenticado}
                                    />}
                                />                                    
                                <Route
                                    path='/rotaProtegida'
                                    element={<RotaProtegida
                                        usuarioAutenticado={usuarioAutenticado}
                                        setUsuarioAutenticado={setUsuarioAutenticado}
                                    />}
                                />
                                <Route path='/acoes/' element={<TodasAcoes />} />
                                <Route path='/acoes/:codigoBaseParametro/' element={<AcaoIndividual />} />
                                <Route path='/comparador-empresas/' element={<ComparadorEmpresas />} />
                                <Route path='/macroeconomia/' element={<MacroEconomia />} />
                            </Routes>
                        </div>
                        <Rodape />
                    </div>
                </BrowserRouter>
            )}
        </>
    )
} 