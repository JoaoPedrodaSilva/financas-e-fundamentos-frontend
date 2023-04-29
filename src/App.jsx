import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BarraNavegacao } from './componentesGerais/BarraNavegacao'
import { PaginaInicial } from './paginas/PaginaInicial'
import { Acoes } from './paginas/Acoes'
import { MacroEconomia } from './paginas/MacroEconomia'
import { Rodape } from './componentesGerais/Rodape'


export const App = () => (
    <BrowserRouter>
        <div className='flex flex-col w-screen h-screen'>
            <BarraNavegacao />
            <div className='basis-full bg-gray-800'>
                <Routes>
                    <Route path='/' element={<PaginaInicial />} />
                    <Route path='/acoes/:codigoBaseParametro' element={<Acoes />} />
                    <Route path='/macroeconomia/:indicadorParametro' element={<MacroEconomia />} />
                </Routes>
            </div>
            <Rodape />
        </div>
    </BrowserRouter>
)