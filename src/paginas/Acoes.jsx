import axios from "../axios"
import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GraficoDRE } from "../graficosAcoes/GraficoDRE"
import { GraficoEndividamento } from "../graficosAcoes/GraficoEndividamento"
import { GraficoRentabilidade } from "../graficosAcoes/GraficoRentabilidade"
import { GraficoEficiencia } from "../graficosAcoes/GraficoEficiencia"
import { GraficoPayout } from "../graficosAcoes/GraficoMomento"
import { GraficoLiquidez } from "../graficosAcoes/GraficoLiquidez"
import { DadosCadastrais } from "../componentesGerais/DadosCadastrais"


export const Acoes = () => {
    const navigate = useNavigate()
    const { codigoBaseParametro } = useParams(null)
    const [empresas, setEmpresas] = useState(null)
    const [empresaSelecionada, setEmpresaSelecionada] = useState("")
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("dre") // want to show the dre chart as default


    // get all companies from database
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const results = await axios.get(`/api/acoes/${codigoBaseParametro}`)
                const empresas = results.data.empresas
                const dadosCadastrais = empresas.filter(empresa => empresa.codigo_base === codigoBaseParametro)[0]

                const historicoValores = results.data.dadosEmpresaSelecionada.map(exercicioFinanceiro => {
                    const { ativoTotal, patrimonioLiquido, receitaLiquida, lucroBruto, lucroOperacional, lucroAntesTributos, lucroLiquido, dividaLiquidaPeloEbitda, dividaBrutaPeloPatrimonioLiquido, retornoPeloPatrimonioLiquido, retornoPelosAtivos, margemBruta, margemOperacional, margemAntesTributos, margemLiquida, capexPeloFCO, capexPelaDA, payout, liquidezImediata, liquidezSeca, liquidezCorrente, liquidezGeral } = calculaIndicadores(exercicioFinanceiro, dadosCadastrais)

                    return ({
                        ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                        ativoTotal,
                        patrimonioLiquido,
                        receitaLiquida,
                        lucroBruto,
                        lucroOperacional,
                        lucroAntesTributos,
                        lucroLiquido,
                        dividaLiquidaPeloEbitda,
                        dividaBrutaPeloPatrimonioLiquido,
                        retornoPeloPatrimonioLiquido,
                        retornoPelosAtivos,
                        margemBruta,
                        margemOperacional,
                        margemAntesTributos,
                        margemLiquida,
                        capexPeloFCO,
                        capexPelaDA,
                        payout,
                        liquidezImediata,
                        liquidezSeca,
                        liquidezCorrente,
                        liquidezGeral
                    })
                })

                setEmpresas(empresas)
                setEmpresaSelecionada({ dadosCadastrais, historicoValores })

                if (dadosCadastrais.instituicao_financeira && (indicadorSelecionado === "endividamento" || indicadorSelecionado === "liquidez")) {
                    setIndicadorSelecionado("dre")
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchEmpresas()
    }, [codigoBaseParametro])


    //render in case of no data
    if (!empresaSelecionada) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <section className="w-full sm:w-1/2 lg:max-w-xl flex flex-col gap-3">


                {/* selected company basic registration data (tablet and desktop only) */}
                {empresaSelecionada && (
                    <div className="w-full hidden sm:flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{empresaSelecionada.dadosCadastrais.nome_empresarial}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Códigos de negociação: </span><br />{empresaSelecionada.dadosCadastrais.codigos_negociacao}
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{empresaSelecionada.dadosCadastrais.segmento_listagem}
                        </p>
                    </div>
                )}


                {/* companies dropdown */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={empresaSelecionada && empresaSelecionada.dadosCadastrais.codigo_base}
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
                    value={indicadorSelecionado}
                    onChange={event => setIndicadorSelecionado(event.target.value)}
                >
                    {empresaSelecionada &&
                        <>
                            <option value="dre">DRE (RECEITA/LUCRO)</option>

                            {!empresaSelecionada.dadosCadastrais.instituicao_financeira && <option value="endividamento">ENDIVIDAMENTO</option>}

                            <option value="rentabilidade">RENTABILIDADE (ROE/ROA)</option>

                            {!empresaSelecionada.dadosCadastrais.holding && <option value="eficiencia">EFICIÊNCIA (MARGENS)</option>}

                            <option value="momento">MOMENTO</option>

                            {!empresaSelecionada.dadosCadastrais.instituicao_financeira && <option value="liquidez">LIQUIDEZ</option>}

                            <option value="dados_cadastrais">DADOS CADASTRAIS</option>
                        </>
                    }
                </select>
            </section>


            {/* charts and complete registration data */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    {(() => {
                        switch (indicadorSelecionado) {
                            case "dados_cadastrais":
                                return (
                                    <DadosCadastrais dadosCadastrais={empresaSelecionada.dadosCadastrais} />
                                )
                            case "dre":
                                return (
                                    <GraficoDRE
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            case "endividamento":
                                return (
                                    <GraficoEndividamento
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            case "rentabilidade":
                                return (
                                    <GraficoRentabilidade
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            case "eficiencia":
                                return (
                                    <GraficoEficiencia
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            case "momento":
                                return (
                                    <GraficoPayout
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            case "liquidez":
                                return (
                                    <GraficoLiquidez
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
                                    />
                                )
                            default:
                                return (
                                    <GraficoDRE
                                        dadosCadastrais={empresaSelecionada.dadosCadastrais}
                                        historicoValores={empresaSelecionada.historicoValores}
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