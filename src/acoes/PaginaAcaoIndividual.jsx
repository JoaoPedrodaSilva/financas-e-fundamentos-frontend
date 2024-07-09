import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GraficoAcaoIndividual } from "./GraficoAcaoIndividual"
import { DadosCadastrais } from "./DadosCadastrais"



export const PaginaAcaoIndividual = () => {
    const navigate = useNavigate()
    const { codigoBaseParametro } = useParams(null)
    const [dadosCadastraisDeTodasEmpresas, setDadosCadastraisDeTodasEmpresas] = useState(null)
    const [dadosCompletosDaEmpresaSelecionada, setDadosCompletosDaEmpresaSelecionada] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("dre")


    const voltaParaGraficoDRE = (dadosCompletosDaEmpresaSelecionada) => {
        if (dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira || dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding && (indicadorSelecionado === "endividamento" || indicadorSelecionado === "liquidez") || dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding && indicadorSelecionado === "eficiencia") {
            setIndicadorSelecionado("dre")
        }
    }


    //fetch all companies and its registration data - used to fill the companies dropdown
    //busca todas as empresas e seus dados cadastrais - usado para preencher o dropdown de seleção de empresas
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setDadosCadastraisDeTodasEmpresas(data.dadosCadastraisDeTodasEmpresas))
            .catch(error => console.error(error))
    }, [])


    //fetch selected company registration and financial data
    //busca os dados cadastrais e financeiros da empresa selecionada
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/${codigoBaseParametro}/`)
            .then(response => response.json())
            .then(data => {
                setDadosCompletosDaEmpresaSelecionada(data.dadosCompletosDaEmpresaSelecionada)
                voltaParaGraficoDRE(data.dadosCompletosDaEmpresaSelecionada)
            })
            .catch(error => console.error(error))
    }, [codigoBaseParametro])


    //render when data arrives
    //renderiza quando os dados chegarem
    if (!dadosCompletosDaEmpresaSelecionada || !dadosCadastraisDeTodasEmpresas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <section className="w-full lg:max-w-xl flex flex-col gap-3">

                {/* selected company basic registration data */}
                {/* dados cadastrais resumidos da empresa selecionada */}
                {dadosCompletosDaEmpresaSelecionada && (
                    <div className="w-full flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Códigos de negociação: </span><br />{dadosCompletosDaEmpresaSelecionada.dadosCadastrais.codigosNegociacao}
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{dadosCompletosDaEmpresaSelecionada.dadosCadastrais.segmentoListagem}
                        </p>
                    </div>
                )}


                {/* all companies dropdown */}
                {/* dropdown de todas as empresas */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={dadosCompletosDaEmpresaSelecionada.dadosCadastrais.codigoBase}
                    onChange={event => navigate(`/acoes/${event.target.value}`)}
                >
                    {dadosCadastraisDeTodasEmpresas.map(cadaEmpresa => (
                        <option key={cadaEmpresa.id} value={cadaEmpresa.codigoBase}>
                            {`${cadaEmpresa.codigoBase} - ${cadaEmpresa.nomeEmpresarial}`}
                        </option>
                    ))}
                </select>


                {/* types of chart dropdown */}
                {/* dropdown dos tipos de gráficos */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={indicadorSelecionado}
                    onChange={event => setIndicadorSelecionado(event.target.value)}
                >

                    <>
                        <option value="dre">DRE (RECEITA/LUCRO)</option>

                        <option value="bp">BALANÇO PATRIMONIAL</option>

                        {!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding && <option value="endividamento">ENDIVIDAMENTO</option>}

                        <option value="rentabilidade">RENTABILIDADE (ROE/ROA)</option>

                        {!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding && <option value="eficiencia">EFICIÊNCIA (MARGENS)</option>}

                        <option value="momento">MOMENTO</option>

                        {!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding && <option value="liquidez">LIQUIDEZ</option>}

                        <option value="dados_cadastrais">DADOS CADASTRAIS</option>
                    </>

                </select>
            </section>


            {/* charts and complete registration data */}
            {/* gráficos e dados cadastrais completos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    {(() => {
                        switch (indicadorSelecionado) {
                            case "dados_cadastrais":
                                return (
                                    <DadosCadastrais dadosCadastraisDaEmpresaSelecionada={dadosCompletosDaEmpresaSelecionada.dadosCadastrais} />
                                )
                            default:
                                return (
                                    <GraficoAcaoIndividual
                                        indicadorSelecionado={indicadorSelecionado}
                                        dadosCompletosDaEmpresaSelecionada={dadosCompletosDaEmpresaSelecionada}
                                    />
                                )
                        }
                    })()}
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