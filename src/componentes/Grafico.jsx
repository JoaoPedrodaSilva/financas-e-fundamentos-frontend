import axios from "../axios"
import { useState, useEffect } from "react"
import { scaleLinear, extent, format } from "d3"


//importing chart components to build the chart
import { Titulo } from "./componentesGrafico/Titulo"
import { EixoX } from "./componentesGrafico/EixoX"
import { EixoY } from "./componentesGrafico/EixoY"
import { Marcadores } from "./componentesGrafico/Marcadores"
import { Legenda } from "./componentesGrafico/Legenda"
import { Fonte } from "./componentesGrafico/Fonte"
import { useParams } from "react-router-dom"


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
    const margens = { cima: 40, direita: 60, baixo: 80, esquerda: 30 }
    const larguraInterna = larguraSVG - margens.direita - margens.esquerda
    const alturaInterna = alturaSVG - margens.cima - margens.baixo


    //declaring functions
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
        if (graficoSelecionado === 'lucro') {
            setAcessoriosY([
                {
                    acessorio: d => d.receitaLiquida,
                    cor: "#d6d6ff",
                    legenda: "Receita líquida",
                    estaVisivel: false
                },
                {
                    acessorio: d => d.lucroOperacional,
                    cor: "#4747ff",
                    legenda: "Lucro operacional (EBIT)",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.lucroLiquido,
                    cor: "#000066",
                    legenda: "Lucro líquido",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'endividamento') {
            setAcessoriosY([
                {
                    acessorio: d => d.dividaLiquidaPeloEbitda,
                    cor: "#d6d6ff",
                    legenda: "Dívida líquida / ebitda",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.dividaBrutaPeloPatrimonioLiquido,
                    cor: "#4747ff",
                    legenda: "Dívida bruta / pat. líquido",
                    estaVisivel: true
                }
            ])
        } else if (graficoSelecionado === 'rentabilidade') {
            setAcessoriosY([
                {
                    acessorio: d => d.retornoPeloPatrimonioLiquido,
                    cor: "#d6d6ff",
                    legenda: "Retorno / pat. líquido (ROE)",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.retornoPelosAtivos,
                    cor: "#4747ff",
                    legenda: "Retorno / ativos (ROA)",
                    estaVisivel: true
                }
            ])
        }
    }
    const atualizaTipoGrafico = () => {
        if (graficoSelecionado === 'lucro') {
            setTituloGrafico('LUCRO (EM MILHÕES DE REAIS)')
            setFormatoAcessorioY(() => format(","))
        } else if (graficoSelecionado === 'endividamento') {
            setTituloGrafico('ENDIVIDAMENTO')
            setFormatoAcessorioY(() => format(".1f"))
        } else if (graficoSelecionado === 'rentabilidade') {
            setTituloGrafico('RENTABILIDADE')
            setFormatoAcessorioY(() => format(",.0%"))
        }
    }
    const calculaDividaLiquidaPeloEbitda = (dadosFinanceirosEmpresa) => {
        const dividaLiquida = Number(dadosFinanceirosEmpresa.emprestimos_curto_prazo) + Number(dadosFinanceirosEmpresa.emprestimos_longo_prazo) - Number(dadosFinanceirosEmpresa.caixa_e_equivalentes)
        const ebitda = Number(dadosFinanceirosEmpresa.lucro_operacional) + Number(dadosFinanceirosEmpresa.depreciacao_e_amortizacao)

        if (dividaLiquida <= 0 || ebitda <= 0) {
            return 0
        }
        
        return (dividaLiquida / ebitda).toFixed(2)
    }
    const calculaDividaBrutaPeloPatrimonioLiquido = (dadosFinanceirosEmpresa) => {
        const dividaBruta = Number(dadosFinanceirosEmpresa.emprestimos_curto_prazo) + Number(dadosFinanceirosEmpresa.emprestimos_longo_prazo)
        const patrimonioLiquido = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante) - Number(dadosFinanceirosEmpresa.passivo_circulante) + Number(dadosFinanceirosEmpresa.passivo_nao_circulante)

        if (patrimonioLiquido <= 0) {
            return 0
        }
        return (dividaBruta / patrimonioLiquido).toFixed(2)
    }
    const calculaRetornoPeloPatrimonioLiquido = (dadosFinanceirosEmpresa) => {
        const patrimonioLiquido = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante) - Number(dadosFinanceirosEmpresa.passivo_circulante) + Number(dadosFinanceirosEmpresa.passivo_nao_circulante)

        const retornoPeloPatrimonioLiquido = Number(dadosFinanceirosEmpresa.lucro_liquido) / patrimonioLiquido

        if (retornoPeloPatrimonioLiquido <= 0) {
            return 0
        }
        return retornoPeloPatrimonioLiquido.toFixed(2)

    }
    const calculaRetornoPelosAtivos = (dadosFinanceirosEmpresa) => {
        const ativos = Number(dadosFinanceirosEmpresa.ativo_circulante) + Number(dadosFinanceirosEmpresa.ativo_nao_circulante)

        const retornoPelosAtivos = Number(dadosFinanceirosEmpresa.lucro_liquido) / ativos

        if (retornoPelosAtivos <= 0) {
            return 0
        }
        return retornoPelosAtivos.toFixed(2)
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
                        lucroBruto: Number(exercicioFinanceiro.bruto),
                        lucroOperacional: Number(exercicioFinanceiro.lucro_operacional),
                        lucroLiquido: Number(exercicioFinanceiro.lucro_liquido),
                        dividaLiquidaPeloEbitda: calculaDividaLiquidaPeloEbitda(exercicioFinanceiro),
                        dividaBrutaPeloPatrimonioLiquido: calculaDividaBrutaPeloPatrimonioLiquido(exercicioFinanceiro),
                        retornoPeloPatrimonioLiquido: calculaRetornoPeloPatrimonioLiquido(exercicioFinanceiro),
                        retornoPelosAtivos: calculaRetornoPelosAtivos(exercicioFinanceiro),
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
        <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox={`0 0 ${larguraSVG} ${alturaSVG}`}
        >            
            <g transform={`translate(${margens.esquerda}, ${margens.cima})`}>
                <Titulo
                    tituloGrafico={tituloGrafico}
                    nomeEmpresarial={dadosCadastraisEmpresa.nome_empresarial}
                    larguraInterna={larguraInterna}
                />

                <EixoX
                    escalaEixoX={escalaEixoX}
                    alturaInterna={alturaInterna}
                />

                <EixoY
                    escalaEixoY={escalaEixoY}
                    larguraInterna={larguraInterna}
                    formatoAcessorioY={formatoAcessorioY}
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

                <Legenda
                    acessoriosY={acessoriosY}
                    setAcessoriosY={setAcessoriosY}
                    calculaValorMaximoDominioY={calculaValorMaximoDominioY}
                    graficoSelecionado={graficoSelecionado}
                />

                <Fonte />
            </g>
        </svg>
    )
}

