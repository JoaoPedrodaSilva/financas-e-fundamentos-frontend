import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CommunityPage } from './pages/CommunityPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { DetailedArticlePage } from './pages/DetailedArticlePage'
import { StocksPage } from './pages/StocksPage'

const App = () => {
    return (
        <BrowserRouter>
            <div className='flex flex-col w-screen h-screen'>
                <Navbar />
                <div className='basis-full bg-gray-800'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/sobre' element={<AboutPage />} />
                        <Route path='/comunidade' element={<CommunityPage />} />
                        <Route path='/artigos' element={<ArticlesPage />} />
                        <Route path='/artigos/:id' element={<DetailedArticlePage />} />
                        <Route path='/acoes/:code' element={<StocksPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App