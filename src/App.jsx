import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AboutPage } from './pages/AboutPage'
import { CommunityPage } from './pages/CommunityPage'
import { FiisPage } from './pages/FiisPage'
import { ArticlesPage } from './pages/ArticlesPage'
// import { DetailedArticlePage } from './pages/DetailedArticlePage'
import { IncomeMetrics } from './pages/articles/IncomeMetrics'
import { HomePage } from './pages/HomePage'
import { StocksPage } from './pages/StocksPage'

const App = () => {
    return (
        <BrowserRouter>
            <div className='flex flex-col w-screen h-screen overflow-auto bg-gray-800'>
                <Navbar />
                <div className='basis-full'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/sobre' element={<AboutPage />} />
                        <Route path='/comunidade' element={<CommunityPage />} />
                        <Route path='/fundosimobiliarios' element={<FiisPage />} />
                        <Route path='/artigos' element={<ArticlesPage />} />
                        <Route path='/artigos/indicadores-de-lucro' element={<IncomeMetrics />} />
                        {/* <Route path='/artigos/:id' element={<DetailedArticlePage />} />                         */}
                        <Route path='/acoes/:code' element={<StocksPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App