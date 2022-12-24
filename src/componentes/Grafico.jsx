import axios from "../axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { scaleLinear, extent, format } from "d3"


//importing chart components to build the chart
import { Titulo } from "./componentesGrafico/Titulo"
import { EixoX } from "./componentesGrafico/EixoX"
import { EixoY } from "./componentesGrafico/EixoY"
import { Marcadores } from "./componentesGrafico/Marcadores"
import { Legendas } from "./componentesGrafico/Legendas"
import { Fonte } from "./componentesGrafico/Fonte"


export const Grafico = ({ graficoSelecionado }) => {

    //declaring states and variables   
    const { codigo_base } = useParams()
    const [dadosCadastraisEmpresa, setDadosCadastraisEmpresa] = useState(null)
    const [dadosFinanceirosEmpresa, setDadosFinanceirosEmpresa] = useState(null)
    const [tituloGrafico, setTituloGrafico] = useState(null)
    const [acessorioX] = useState(() => d => d.ano)
    const [acessoriosY, setAcessoriosY] = useState(null)
    const [formatoAcessorioY, setFormatoAcessorioY] = useState(null)

    const larguraSVG = 700
    const alturaSVG = 450
    const margens = { cima: 40, direita: 60, baixo: 35, esquerda: 30 }
    const larguraInterna = larguraSVG - margens.direita - margens.esquerda
    const alturaInterna = alturaSVG - margens.cima - margens.baixo
    const corGrade = "stroke-slate-700"


    //declaring general functions
    const calculaValorMaximoDominioY = (dadosFinanceirosEmpresa, acessoriosY) => {
        const tempAcessoriosVisiveis = []
        dadosFinanceirosEmpresa.map(exercicioFinanceiro => {
            acessoriosY.map(acessorioY => {
                if (acessorioY.estaVisivel) {
                    tempAcessoriosVisiveis.push(acessorioY.acessorio(exercicioFinanceiro))
                }
            })
        })
        return Math.max(...tempAcessoriosVisiveis)
    }
    const calculaValorMinimoDominioY = (dadosFinanceirosEmpresa, acessoriosY) => {
        const tempAcessoriosVisiveis = []
        dadosFinanceirosEmpresa.map(exercicioFinanceiro => {
            acessoriosY.map(acessorioY => {
                if (acessorioY.estaVisivel) {
                    tempAcessoriosVisiveis.push(acessorioY.acessorio(exercicioFinanceiro))
                }
            })
        })
        return Math.min(...tempAcessoriosVisiveis)
    }
    const atualizaAcessoriosY = () => {
        const corAcessorios = ["#d6d6ff", "#4747ff", "#000066", "blue"]

        if (graficoSelecionado === "dre") {
            setAcessoriosY([
                {
                    acessorio: d => d.receitaLiquida,
                    cor: corAcessorios[0],
                    legenda: "Receita líquida",
                    estaVisivel: false
                },
                {
                    acessorio: d => d.lucroBruto,
                    cor: corAcessorios[1],
                    legenda: "Lucro Bruto",
                    estaVisivel: false
                },
                {
                    acessorio: d => d.lucroOperacional,
                    cor: corAcessorios[2],
                    legenda: "Lucro operacional (EBIT)",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.lucroLiquido,
                    cor: corAcessorios[3],
                    legenda: "Lucro líquido",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'endividamento') {
            setAcessoriosY([
                {
                    acessorio: d => d.dividaLiquidaPeloEbitda,
                    cor: corAcessorios[0],
                    legenda: "Dívida líquida / ebitda",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.dividaBrutaPeloPatrimonioLiquido,
                    cor: corAcessorios[1],
                    legenda: "Dívida bruta / pat. líquido",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'rentabilidade') {
            setAcessoriosY([
                {
                    acessorio: d => d.retornoPeloPatrimonioLiquido,
                    cor: corAcessorios[0],
                    legenda: "Retorno / pat. líquido (ROE)",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.retornoPelosAtivos,
                    cor: corAcessorios[1],
                    legenda: "Retorno / ativos (ROA)",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'eficiencia') {
            setAcessoriosY([
                {
                    acessorio: d => d.margemBruta,
                    cor: corAcessorios[0],
                    legenda: "Margem Bruta",
                    estaVisivel: false
                },
                {
                    acessorio: d => d.margemOperacional,
                    cor: corAcessorios[1],
                    legenda: "Margem Operacional",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.margemLiquida,
                    cor: corAcessorios[2],
                    legenda: "Margem Líquida",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'payout') {
            setAcessoriosY([
                {
                    acessorio: d => d.payout,
                    cor: corAcessorios[0],
                    legenda: "Payout",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'liquidez') {
            setAcessoriosY([
                {
                    acessorio: d => d.liquidezImediata,
                    cor: corAcessorios[0],
                    legenda: "Liquidez Imediata",
                    estaVisivel: false
                },
                {
                    acessorio: d => d.liquidezCorrente,
                    cor: corAcessorios[1],
                    legenda: "Liquidez Corrente",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.liquidezGeral,
                    cor: corAcessorios[2],
                    legenda: "Liquidez Geral",
                    estaVisivel: true
                }                
            ])
        }
    }
    const atualizaTipoGrafico = () => {
        if (graficoSelecionado === "dre") {
            setTituloGrafico('DRE (EM MILHÕES DE REAIS)')
            setFormatoAcessorioY(() => format(","))
        } else if (graficoSelecionado === 'endividamento') {
            setTituloGrafico('ENDIVIDAMENTO')
            setFormatoAcessorioY(() => format(".1f"))
        } else if (graficoSelecionado === 'rentabilidade') {
            setTituloGrafico('RENTABILIDADE')
            setFormatoAcessorioY(() => format(",.0%"))
        } else if (graficoSelecionado === 'eficiencia') {
            setTituloGrafico('EFICIÊNCIA')
            setFormatoAcessorioY(() => format(",.0%"))
        } else if (graficoSelecionado === 'payout') {
            setTituloGrafico('PAYOUT')
            setFormatoAcessorioY(() => format(",.0%"))
        } else if (graficoSelecionado === 'liquidez') {
            setTituloGrafico('LIQUIDEZ')
            setFormatoAcessorioY(() => format(".1f"))
        }
    }

    //declaring fundamentalist metric functions
    const calculaDividaLiquidaPeloEbitda = (dadosFinanceirosEmpresa) => {
        const dividaLiquida = Number(dadosFinanceirosEmpresa.emprestimos_curto_prazo) + Number(dadosFinanceirosEmpresa.emprestimos_longo_prazo) - Number(dadosFinanceirosEmpresa.caixa_e_equivalentes)
        const ebitda = Number(dadosFinanceirosEmpresa.lucro_operacional) + Number(dadosFinanceirosEmpresa.depreciacao_e_amortizacao)

        if (dividaLiquida <= 0 || ebitda <= 0) {
            return 0
        }

        return Number((dividaLiquida / ebitda).toFixed(2))
    }
    const calculaDividaBrutaPeloPatrimonioLiquido = (dadosFinanceirosEmpresa) => {
        const dividaBruta = Number(dadosFinanceirosEmpresa.emprestimos_curto_prazo) + Number(dadosFinanceirosEmpresa.emprestimos_longo_prazo)
        const patrimonioLiquido = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante) - Number(dadosFinanceirosEmpresa.passivo_circulante) + Number(dadosFinanceirosEmpresa.passivo_nao_circulante)

        if (patrimonioLiquido <= 0) {
            return 0
        }
        return Number((dividaBruta / patrimonioLiquido).toFixed(2))
    }
    const calculaRetornoPeloPatrimonioLiquido = (dadosFinanceirosEmpresa) => {
        const patrimonioLiquido = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante) - Number(dadosFinanceirosEmpresa.passivo_circulante) + Number(dadosFinanceirosEmpresa.passivo_nao_circulante)

        const retornoPeloPatrimonioLiquido = Number(dadosFinanceirosEmpresa.lucro_liquido) / patrimonioLiquido

        if (retornoPeloPatrimonioLiquido <= 0) {
            return 0
        }
        return Number(retornoPeloPatrimonioLiquido.toFixed(2))

    }
    const calculaRetornoPelosAtivos = (dadosFinanceirosEmpresa) => {
        const ativos = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante)

        const retornoPelosAtivos = Number(dadosFinanceirosEmpresa.lucro_liquido) / ativos

        if (retornoPelosAtivos <= 0) {
            return 0
        }
        return Number(retornoPelosAtivos.toFixed(2))
    }
    const calculaMargemBruta = (dadosFinanceirosEmpresa) => {
        const margemBruta = Number(dadosFinanceirosEmpresa.lucro_bruto) / Number(dadosFinanceirosEmpresa.receita_liquida)

        if (margemBruta <= 0) {
            return 0
        }
        return Number(margemBruta.toFixed(2))
    }
    const calculaMargemOperacional = (dadosFinanceirosEmpresa) => {
        const margemOperacional = Number(dadosFinanceirosEmpresa.lucro_operacional) / Number(dadosFinanceirosEmpresa.receita_liquida)

        if (margemOperacional <= 0) {
            return 0
        }
        return Number(margemOperacional.toFixed(2))
    }
    const calculaMargemLiquida = (dadosFinanceirosEmpresa) => {
        const margemLiquida = Number(dadosFinanceirosEmpresa.lucro_liquido) / Number(dadosFinanceirosEmpresa.receita_liquida)

        if (margemLiquida <= 0) {
            return 0
        }
        return Number(margemLiquida.toFixed(2))
    }
    const calculaPayout = (dadosFinanceirosEmpresa) => {
        const payout = Number(dadosFinanceirosEmpresa.provento_distribuido) / Number(dadosFinanceirosEmpresa.lucro_liquido)

        if (payout <= 0) {
            return 0
        }
        return Number(payout.toFixed(2))
    }
    const calculaLiquidezImediata = (dadosFinanceirosEmpresa) => {
        const liquidezImediata = Number(dadosFinanceirosEmpresa.caixa_e_equivalentes) / Number(dadosFinanceirosEmpresa.passivo_circulante)

        if (liquidezImediata <= 0) {
            return 0
        }
        return Number(liquidezImediata.toFixed(2))
    }    
    const calculaLiquidezCorrente = (dadosFinanceirosEmpresa) => {
        const liquidezCorrente = Number(dadosFinanceirosEmpresa.ativo_circulante) / Number(dadosFinanceirosEmpresa.passivo_circulante)

        if (liquidezCorrente <= 0) {
            return 0
        }
        return Number(liquidezCorrente.toFixed(2))
    }
    const calculaLiquidezGeral = (dadosFinanceirosEmpresa) => {
        const liquidezGeral = (Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_realizavel_longo_prazo)) / (Number(dadosFinanceirosEmpresa.passivo_circulante) + Number(dadosFinanceirosEmpresa.passivo_nao_circulante))

        if (liquidezGeral <= 0) {
            return 0
        }
        return Number(liquidezGeral.toFixed(2))
    }



    // Every time the selected company changes, this useEffect do the following:
    // 1 - get the selected company registration and financial data from the database 
    // 2 - make default YAccessors visible
    useEffect(() => {
        const fetchDadosEmpresa = async () => {
            try {
                const results = await axios.get(`/api/acoes/${codigo_base}`)

                const tempDadosFinanceirosEmpresa = []

                results.data.dadosFinanceirosEmpresa.map(exercicioFinanceiro => {
                    tempDadosFinanceirosEmpresa.push({
                        ano: Number(exercicioFinanceiro.ano),
                        receitaLiquida: Number(exercicioFinanceiro.receita_liquida),
                        lucroBruto: Number(exercicioFinanceiro.lucro_bruto),
                        lucroOperacional: Number(exercicioFinanceiro.lucro_operacional),
                        lucroLiquido: Number(exercicioFinanceiro.lucro_liquido),
                        dividaLiquidaPeloEbitda: calculaDividaLiquidaPeloEbitda(exercicioFinanceiro),
                        dividaBrutaPeloPatrimonioLiquido: calculaDividaBrutaPeloPatrimonioLiquido(exercicioFinanceiro),
                        retornoPeloPatrimonioLiquido: calculaRetornoPeloPatrimonioLiquido(exercicioFinanceiro),
                        retornoPelosAtivos: calculaRetornoPelosAtivos(exercicioFinanceiro),
                        margemBruta: calculaMargemBruta(exercicioFinanceiro),
                        margemOperacional: calculaMargemOperacional(exercicioFinanceiro),
                        margemLiquida: calculaMargemLiquida(exercicioFinanceiro),
                        payout: calculaPayout(exercicioFinanceiro),
                        liquidezImediata: calculaLiquidezImediata(exercicioFinanceiro),
                        liquidezCorrente: calculaLiquidezCorrente(exercicioFinanceiro),
                        liquidezGeral: calculaLiquidezGeral(exercicioFinanceiro)                        
                    })
                })

                setDadosCadastraisEmpresa(results.data.dadosCadastraisEmpresa)
                setDadosFinanceirosEmpresa(tempDadosFinanceirosEmpresa)
                atualizaAcessoriosY()

            } catch (error) {
                console.error(error)
            }
        }
        fetchDadosEmpresa()
    }, [codigo_base])

    // change chartTitle, YAccessors and YAccessorTickFormat every time the selected chart changes
    useEffect(() => {
        atualizaAcessoriosY()
        atualizaTipoGrafico()
    }, [graficoSelecionado])


    //render in case of no data
    if (!dadosCadastraisEmpresa || !dadosFinanceirosEmpresa) {
        return (
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //declaring scales
    const escalaEixoX = scaleLinear()
        .domain(extent(dadosFinanceirosEmpresa, acessorioX))
        .range([0, larguraInterna])
        .nice()

    const escalaEixoY = scaleLinear()
        .domain([calculaValorMinimoDominioY(dadosFinanceirosEmpresa, acessoriosY), calculaValorMaximoDominioY(dadosFinanceirosEmpresa, acessoriosY)])
        .range([alturaInterna, 0])
        .nice()


    //rendering chart
    return (
        <div className="flex flex-col justify-around items-center">
            <Titulo
                tituloGrafico={tituloGrafico}
                nomeEmpresarial={dadosCadastraisEmpresa.nome_empresarial}
            />

            <svg
                preserveAspectRatio="xMinYMin meet"
                viewBox={`0 0 ${larguraSVG} ${alturaSVG}`}
                className="border border-white rounded"
            >
                <g transform={`translate(${margens.esquerda}, ${margens.cima})`}>
                    <EixoX
                        escalaEixoX={escalaEixoX}
                        alturaInterna={alturaInterna}
                        corGrade={corGrade}
                    />

                    <EixoY
                        escalaEixoY={escalaEixoY}
                        larguraInterna={larguraInterna}
                        formatoAcessorioY={formatoAcessorioY}
                        corGrade={corGrade}
                    />

                    <Marcadores
                        dados={dadosFinanceirosEmpresa}
                        graficoSelecionado={graficoSelecionado}

                        escalaEixoX={escalaEixoX}
                        acessorioX={acessorioX}

                        escalaEixoY={escalaEixoY}
                        acessoriosY={acessoriosY}
                        formatoAcessorioY={formatoAcessorioY}
                    />
                </g>
            </svg>

            <Fonte />

            <Legendas
                acessoriosY={acessoriosY}
                setAcessoriosY={setAcessoriosY}
                calculaValorMaximoDominioY={calculaValorMaximoDominioY}
                graficoSelecionado={graficoSelecionado}
            />

        </div>
    )
}

