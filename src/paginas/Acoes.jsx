import axios from "../axios"
import { useState, useEffect } from "react"
import { Grafico } from "../componentes/Grafico"
import { useNavigate, useParams, Link } from "react-router-dom"


export const Acoes = () => {
    const navigate = useNavigate()
    const { codigo_base } = useParams()
    const [empresas, setEmpresas] = useState(null)
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null)
    const [graficoSelecionado, setGraficoSelecionado] = useState('lucro') // want to show the income chart as default

    // get all companies from database
    useEffect(() => {
        const fetchEmpresas = async () => {            
            try {
                const results = await axios.get(`/api/acoes/${codigo_base}`)
                setEmpresas(results.data.empresas)
                setEmpresaSelecionada(results.data.dadosCadastraisEmpresa)
                setGraficoSelecionado('lucro')
            } catch (error) {
                console.error(error)
            }
        }
        fetchEmpresas()
    }, [codigo_base])


    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-2 px-5 lg:px-20'>

            <div className="w-full sm:w-1/2 lg:max-w-xl flex flex-col gap-3">

                {/* selected company general data (tablet and desktop only) */}
                {empresaSelecionada && (
                    <div className="w-full sm:flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{empresaSelecionada.nome_empresarial}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Códigos de negociação: </span><br />{empresaSelecionada.codigos_negociacao}
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{empresaSelecionada.segmento_listagem}
                        </p>
                    </div>
                )}


                {/* companies dropdown */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={codigo_base}
                    onChange={event => navigate(`/acoes/${event.target.value}`)}
                >
                    {/* create an option for each company registered at the database */}
                    {empresas && empresas.map(empresa => (
                        <option key={empresa.codigo_base} value={empresa.codigo_base}>
                            {`${empresa.codigo_base} - ${empresa.nome_empresarial}`}
                        </option>
                    ))}
                </select>

                {/* types of chart dropdown */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={graficoSelecionado}
                    onChange={event => setGraficoSelecionado(event.target.value)}
                >
                    {empresaSelecionada &&
                        <>
                            <option value="lucro">LUCRO</option>
                            {empresaSelecionada.tem_grafico_divida && <option value="endividamento">ENDIVIDAMENTO</option>}
                            <option value="rentabilidade">RENTABILIDADE</option>
                            <option value="dados_cadastrais">DADOS CADASTRAIS</option>
                        </>
                    }
                </select>

                {/* learn-the-chart article link */}
                {
                    graficoSelecionado !== "dados_cadastrais" &&
                    <Link
                        to={graficoSelecionado === "lucro" ? `/artigos/17`
                            : graficoSelecionado === "endividamento" ? `/artigos/18`
                                : graficoSelecionado === "rentabilidade" ? `/artigos/19`
                                    : null}
                        className="text-xs sm:text-sm lg:text-lg text-center lg:text-left text-blue-500"
                    >
                        Clique aqui e aprenda a interpretar esse gráfico
                    </Link>
                }

            </div>


            <div className='w-full flex flex-col justify-center items-center gap-2'>
                {/* full general data */}
                <div className='w-full border border-white rounded p-1'>
                    {graficoSelecionado === 'dados_cadastrais' ? (
                        <div className="w-full h-full flex flex-col text-white px-2 sm:px-4 pt-2 sm:pt-4 text-sm sm:text-base lg:text-lg">
                            <p className="text-justify">
                                <span className="text-gray-400">Nome empresarial: </span>
                                {empresaSelecionada.nome_empresarial}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">CNPJ: </span>
                                {empresaSelecionada.cnpj}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Códigos de negociação: </span>
                                {empresaSelecionada.codigos_negociacao}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Segmento de listagem: </span>
                                {empresaSelecionada.segmento_listagem}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Escriturador: </span>
                                {empresaSelecionada.escriturador}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Classificação setorial: </span>
                                {empresaSelecionada.classificacao_setorial}
                            </p>
                            <p className="mt-2 mb-7 text-justify">
                                <span className="text-gray-400">Atividade principal: </span>
                                {empresaSelecionada.atividade_principal}
                            </p>
                            <p className="text-right text-[0.6rem]">
                                <a
                                    style={{ fill: "white" }}
                                    href="https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/empresas-listadas.htm"
                                    target="blank"
                                    rel="noopener noreferrer"
                                >
                                    Fonte: B3 S.A. - Brasil, Bolsa, Balcão
                                </a>
                            </p>
                        </div>

                        // charts
                    ) : (
                        <Grafico graficoSelecionado={graficoSelecionado} />
                    )}
                </div>
            </div>
        </section >
    )
}