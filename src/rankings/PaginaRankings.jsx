import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from 'react'
import { GraficoRankings } from './GraficoRankings'

export const PaginaRankings = () => {
    const [setoresUnicos, setSetoresUnicos] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("receitaLiquida")
    const [anoSelecionado, setAnoSelecionado] = useState("2023")
    const [setorSelecionado, setSetorSelecionado] = useState("Bancos")
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    

    const ordenaPeloIndicadorSelecionado = (dadosQueSeraoOrdenados, indicadorQueSeraUsadoParaOrdenar) => {
        const emOrdemCrescente = dadosQueSeraoOrdenados.sort((primeiraEmpresa, segundaEmpresa) => {
            if (primeiraEmpresa[indicadorQueSeraUsadoParaOrdenar] < segundaEmpresa[indicadorQueSeraUsadoParaOrdenar]) {
                return -1;
            }
            if (primeiraEmpresa[indicadorQueSeraUsadoParaOrdenar] > segundaEmpresa[indicadorQueSeraUsadoParaOrdenar]) {
                return 1;
            }
            return 0;
        })
        return emOrdemCrescente.reverse()
    }


    //fetch and setState for all companies and its registration data - for purpose of finding all unique sectors registered at database and feed the select
    //busca e faz o setState de todas as empresas e seus dados cadastrais - para encontrar todos os setores únicos cadastrados no banco de dados e alimentar o select
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setSetoresUnicos(['Todos', ...new Set(data.dadosCadastraisDeTodasEmpresas.map(cadaEmpresa => cadaEmpresa.classificacaoSetorial))]))
            .catch(error => console.error(error))
    }, [])


    //fetch and setState for financial data of all the companies from specified sector and year
    //busca e faz o setState dos dados financeiros de todas as empresas do setor e ano selecionados
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rankings/${anoSelecionado}/${setorSelecionado}/`)
            .then(response => response.json())
            .then(data => setDadosFinanceiros(data.dadosRanking)
            )
            .catch(error => console.error(error))
    }, [anoSelecionado, setorSelecionado])
    

    //render while data are being fetched
    //renderiza enquanto os dados estão sendo buscados
    if (!dadosFinanceiros) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //render when data arrives
    //renderiza quando os dados chegarem
    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'> 
            <section className="w-full lg:max-w-xl flex flex-col gap-3">
                {/* metrics dropdown */}
                {/* dropdown dos indicadores */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={indicadorSelecionado}
                    onChange={event => setIndicadorSelecionado(event.target.value)}
                >
                    <>
                        <option value="receitaLiquida">RECEITA LÍQUIDA</option>
                        <option value="lucroOperacional">LUCRO OPERACIONAL</option>
                        <option value="lucroLiquido">LUCRO LÍQUIDO</option>
                        <option value="patrimonioLiquido">PATRIMÔNIO LÍQUIDO</option>
                        <option value="margemOperacional">MARGEM OPERACIONAL</option>
                        <option value="margemLiquida">MARGEM LÍQUIDA</option>
                        <option value="retornoPeloPatrimonioLiquido">ROE</option>
                        <option value="capexPeloFCO">CAPEX / FCO</option>
                        <option value="payout">PAYOUT</option>
                    </>
                </select>

                {/* year dropdown */}
                {/* dropdown dos anos */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={anoSelecionado}
                    onChange={event => setAnoSelecionado(event.target.value)}
                >
                    <>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="MediaDosTresUltimosAnos">Média dos últimos 3 anos</option>
                    </>
                </select>

                {/* setorial classification dropdown */}
                {/* dropdown da classificação setorial */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={setorSelecionado}
                    onChange={event => setSetorSelecionado(event.target.value)}
                >
                    <>
                        {setoresUnicos && setoresUnicos.map((cadaSetorUnico, index) => (
                            <option key={index} value={cadaSetorUnico}>{cadaSetorUnico.toUpperCase()}</option>
                        ))}
                    </>
                </select>
            </section>


            {/* charts and complete registration data */}
            {/* gráficos e dados cadastrais completos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    <GraficoRankings
                        indicadorSelecionado={indicadorSelecionado}
                        anoSelecionado={anoSelecionado}
                        setorSelecionado={setorSelecionado}
                        dadosFinanceirosProp={ordenaPeloIndicadorSelecionado(dadosFinanceiros, indicadorSelecionado)}
                    />
                </div>

                <div className='w-full text-white text-right text-xs'>
                    <a href="https://www.b3.com.br" target='_blank' rel='noreferrer'>
                        Fonte: B3 - Brasil, Bolsa, Balcão
                    </a>
                </div>
            </section>
        </section>
    )
}
