import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CommunityPage } from './pages/CommunityPage'
// import { FiisPage } from './pages/FiisPage'
import { ArticlesPage } from './pages/ArticlesPage'
// import { DetailedArticlePage } from './pages/DetailedArticlePage'
import { IncomeStatement } from './pages/articles/IncomeStatement'
import { BalanceSheet } from './pages/articles/BalanceSheet'
import { CashFlowStatement } from './pages/articles/CashFlowStatement'
import { IncomeMetrics } from './pages/articles/IncomeMetrics'
import { DebtMetrics } from './pages/articles/DebtMetrics'
import { EficiencyMetrics } from './pages/articles/EficiencyMetrics'

import { StocksPage } from './pages/StocksPage'

const App = () => {
    return (
        <BrowserRouter>
            <div className='flex flex-col w-screen h-screen overflow-auto overflow-x-hidden bg-gray-800'>
                <Navbar />
                <div className='basis-full'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/sobre' element={<AboutPage />} />
                        <Route path='/comunidade' element={<CommunityPage />} />
                        {/* <Route path='/fundosimobiliarios' element={<FiisPage />} /> */}

                        <Route path='/artigos' element={<ArticlesPage />} />
                        <Route path='/artigos/demonstracao-de-resultados-do-exercicio' element={<IncomeStatement />} />
                        <Route path='/artigos/balanco-patrimonial' element={<BalanceSheet />} />
                        <Route path='/artigos/demonstracao-de-fluxo-de-caixa' element={<CashFlowStatement />} />
                        <Route path='/artigos/indicadores-de-lucratividade' element={<IncomeMetrics />} />
                        <Route path='/artigos/indicadores-de-endividamento' element={<DebtMetrics />} />
                        <Route path='/artigos/indicadores-de-eficiencia' element={<EficiencyMetrics />} />
                        {/* <Route path='/artigos/:id' element={<DetailedArticlePage />} /> */}

                        <Route path='/acoes/:code' element={<StocksPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App