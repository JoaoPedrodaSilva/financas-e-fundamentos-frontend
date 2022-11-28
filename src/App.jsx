import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BarraNavegacao } from './componentes/BarraNavegacao'
import { PaginaInicial } from './paginas/PaginaInicial'
import { Sobre } from './paginas/Sobre'
import { Comunidade } from './paginas/Comunidade'
import { Artigos } from './paginas/Artigos'
import { ArtigoDetalhado } from './paginas/ArtigoDetalhado'
import { Acoes } from './paginas/Acoes'
import { Rodape } from './componentes/Rodape'

export const App = () => (
    <BrowserRouter>
        <div className='flex flex-col w-screen h-screen'>
            <BarraNavegacao />
            <div className='basis-full bg-gray-800'>
                <Routes>
                    <Route path='/' element={<PaginaInicial />} />
                    <Route path='/sobre' element={<Sobre />} />
                    <Route path='/comunidade' element={<Comunidade />} />
                    <Route path='/artigos' element={<Artigos />} />
                    <Route path='/artigos/:id' element={<ArtigoDetalhado />} />
                    <Route path='/acoes/:codigo_base' element={<Acoes />} />
                </Routes>
            </div>
            <Rodape />
        </div>
    </BrowserRouter>
)