import axios from "../axios"
import { useState, useEffect } from "react"
import { Grafico } from "../componentes/Grafico"
import { DadosCadastrais } from "../componentes/DadosCadastrais"
import { useNavigate, useParams, Link } from "react-router-dom"


export const Acoes = () => {
    const navigate = useNavigate()
    const { codigo_base } = useParams()
    const [empresas, setEmpresas] = useState(null)
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null)
    const [graficoSelecionado, setGraficoSelecionado] = useState("dre") // want to show the dre chart as default

    // get all companies from database
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const results = await axios.get(`/api/acoes/${codigo_base}`)
                setEmpresas(results.data.empresas)
                setEmpresaSelecionada(results.data.dadosCadastraisEmpresa)
                setGraficoSelecionado("dre")
            } catch (error) {
                console.error(error)
            }
        }
        fetchEmpresas()
    }, [codigo_base])


    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-2 px-5 lg:px-20'>

            <div className="w-full sm:w-1/2 lg:max-w-xl flex flex-col gap-3">

                {/* selected company basic registration data (tablet and desktop only) */}
                {empresaSelecionada && (
                    <div className="w-full hidden sm:flex flex-col text-white px-1 lg:text-lg">
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
                            <option value="dre">DRE (RECEITA/LUCRO)</option>
                            {!empresaSelecionada.instituicao_financeira && <option value="endividamento">ENDIVIDAMENTO</option>}
                            <option value="rentabilidade">RENTABILIDADE (ROE/ROA)</option>
                            <option value="eficiencia">EFICIÊNCIA (MARGENS)</option>
                            <option value="payout">PAYOUT</option>
                            {!empresaSelecionada.instituicao_financeira && <option value="liquidez">LIQUIDEZ</option>}
                            <option value="dados_cadastrais">DADOS CADASTRAIS</option>
                        </>
                    }
                </select>

                {/* learn-the-chart article link */}
                {
                    (
                        graficoSelecionado !== "dados_cadastrais" &&
                        graficoSelecionado !== "eficiencia" &&
                        graficoSelecionado !== "payout" &&
                        graficoSelecionado !== "liquidez"
                    ) &&
                    <Link
                        to={graficoSelecionado === "dre" ? `/artigos/17`
                            : graficoSelecionado === "endividamento" ? `/artigos/18`
                                : graficoSelecionado === "rentabilidade" ? `/artigos/19`
                                    : null}
                        className="text-xs sm:text-sm lg:text-lg text-center lg:text-left text-blue-500"
                    >
                        Clique aqui e aprenda a interpretar esse gráfico
                    </Link>
                }

            </div>


            {/* charts and complete registration data */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='w-full p-1'>
                    {graficoSelecionado === 'dados_cadastrais' ? (
                        <DadosCadastrais empresaSelecionada={empresaSelecionada} />
                    ) : (
                        <Grafico graficoSelecionado={graficoSelecionado} />
                    )}
                </div>
            </section>
        </section>
    )
}