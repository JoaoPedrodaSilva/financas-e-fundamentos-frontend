import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GraficoAcaoIndividual } from "./GraficoAcaoIndividual"
import { DadosCadastrais } from "./DadosCadastrais"



export const PaginaAcaoIndividual = () => {
    const navigate = useNavigate()
    const { codigoBaseParametro } = useParams(null)
    const [todasEmpresas, setTodasEmpresas] = useState(null)
    const [empresaSelecionada, setEmpresaSelecionada] = useState("")
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("dre") // want to show the dre chart as default - quero mostrar o grádico de DRE como padrão


    //fetch all companies - used to fill the comanies dropdown
    //busca todas as empresas - usado para preencher o dropdown de seleção de empresas
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`) //should make an api route to get only these 3 infos instead of all infos??
            .then(response => response.json())
            .then(data => {
                const empresas = data.empresas.map(empresa => ({
                    id: empresa.id,
                    codigoBase: empresa.codigo_base,
                    nomeEmpresarial: empresa.nome_empresarial,
                }))
                setTodasEmpresas(empresas)
            })
            .catch(error => console.error(error))
    }, [])


    //fetch selected company data
    //busca os dados da empresa selecionada
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/${codigoBaseParametro}/`)
            .then(response => response.json())
            .then(data => {
                const dadosCadastrais = {
                    id: data.dadosEmpresaSelecionada[0].id,
                    cnpj: data.dadosEmpresaSelecionada[0].cnpj,
                    codigoBase: data.dadosEmpresaSelecionada[0].codigo_base,
                    codigosNegociacao: data.dadosEmpresaSelecionada[0].codigos_negociacao,
                    nomeEmpresarial: data.dadosEmpresaSelecionada[0].nome_empresarial,
                    segmentoListagem: data.dadosEmpresaSelecionada[0].segmento_listagem,
                    escriturador: data.dadosEmpresaSelecionada[0].escriturador,
                    classificacaoSetorial: data.dadosEmpresaSelecionada[0].classificacao_setorial,
                    atividadePrincipal: data.dadosEmpresaSelecionada[0].atividade_principal,
                    instituicaoFinanceira: data.dadosEmpresaSelecionada[0].instituicao_financeira,
                    holding: data.dadosEmpresaSelecionada[0].holding
                }

                const historicoValores = data.dadosEmpresaSelecionada.map(exercicioFinanceiro => {
                    const { ativoCirculante, ativoNaoCirculante, ativoTotal, passivoCirculante, passivoNaoCirculante, passivoTotal, patrimonioLiquido, receitaLiquida, lucroBruto, lucroOperacional, lucroAntesTributos, lucroLiquido, dividaLiquidaPeloEbitda, dividaBrutaPeloPatrimonioLiquido, retornoPeloPatrimonioLiquido, retornoPelosAtivos, margemBruta, margemOperacional, margemAntesTributos, margemLiquida, capexPeloFCO, capexPelaDA, payout, liquidezImediata, liquidezSeca, liquidezCorrente, liquidezGeral } = calculaIndicadores(exercicioFinanceiro, dadosCadastrais)
                    return ({
                        ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                        ativoCirculante,
                        ativoNaoCirculante,
                        ativoTotal,
                        passivoCirculante,
                        passivoNaoCirculante,
                        passivoTotal,
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

                setEmpresaSelecionada({ dadosCadastrais, historicoValores })

                if (dadosCadastrais.instituicaoFinanceira && (indicadorSelecionado === "endividamento" || indicadorSelecionado === "liquidez")) {
                    setIndicadorSelecionado("dre")
                }
            })
            .catch(error => console.error(error))
    }, [codigoBaseParametro])


    //render in case of no data
    //renderiza caso não haja dados
    if (!empresaSelecionada) {
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
                {empresaSelecionada && (
                    <div className="w-full flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{empresaSelecionada.dadosCadastrais.nomeEmpresarial}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Códigos de negociação: </span><br />{empresaSelecionada.dadosCadastrais.codigosNegociacao}
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{empresaSelecionada.dadosCadastrais.segmentoListagem}
                        </p>
                    </div>
                )}


                {/* all companies dropdown */}
                {/* dropdown de todas as empresas */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={empresaSelecionada && empresaSelecionada.dadosCadastrais.codigoBase}
                    onChange={event => navigate(`/acoes/${event.target.value}`)}
                >
                    {todasEmpresas && todasEmpresas.map(empresa => (
                        <option key={empresa.id} value={empresa.codigoBase}>
                            {`${empresa.codigoBase} - ${empresa.nomeEmpresarial}`}
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
                    {empresaSelecionada &&
                        <>
                            <option value="dre">DRE (RECEITA/LUCRO)</option>

                            <option value="bp">BALANÇO PATRIMONIAL</option>

                            {!empresaSelecionada.dadosCadastrais.instituicaoFinanceira && !empresaSelecionada.dadosCadastrais.holding && <option value="endividamento">ENDIVIDAMENTO</option>}

                            <option value="rentabilidade">RENTABILIDADE (ROE/ROA)</option>

                            {!empresaSelecionada.dadosCadastrais.holding && <option value="eficiencia">EFICIÊNCIA (MARGENS)</option>}

                            <option value="momento">MOMENTO</option>

                            {!empresaSelecionada.dadosCadastrais.instituicaoFinanceira && !empresaSelecionada.dadosCadastrais.holding && <option value="liquidez">LIQUIDEZ</option>}

                            <option value="dados_cadastrais">DADOS CADASTRAIS</option>
                        </>
                    }
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
                                    <DadosCadastrais dadosCadastrais={empresaSelecionada.dadosCadastrais} />
                                )
                            default:
                                return (
                                    <GraficoAcaoIndividual
                                        indicadorSelecionado={indicadorSelecionado}
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