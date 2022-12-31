import { useState, useEffect } from "react"
import { scaleTime, scaleLinear, extent, formatLocale } from "d3"
import { EixoX } from "./EixoX"
import { EixoY } from "./EixoY"
import { Marcadores } from "./Marcadores"
import { Legendas } from "./Legendas"
import { Tooltip } from "./Tooltip"


export const Grafico = ({ indicadorSelecionado, dadosCadastrais, historicoValores }) => {

    const acessorioX = d => d.ano
    const [acessoriosY, setAcessoriosY] = useState([])
    const [configuracoesGrafico, setConfiguracoesGrafico] = useState(null)
    const [configuracoesTooltip, setConfiguracoesTooltip] = useState({estaVisivel: false, ano: null, acessoriosY: []})

    const larguraSVG = 700
    const alturaSVG = 400
    const margens = { cima: 40, direita: 60, baixo: 35, esquerda: 30 }
    const larguraInterna = larguraSVG - margens.direita - margens.esquerda
    const alturaInterna = alturaSVG - margens.cima - margens.baixo
    const larguraColuna = larguraInterna / historicoValores.length * 0.7
    const corGrade = "stroke-slate-700"


    const calculaValorMaximoDominioY = (historicoValores, acessoriosY) => {
        const tempAcessoriosVisiveis = []
        historicoValores.map(exercicioFinanceiro => {
            acessoriosY.map(acessorioY => {
                if (acessorioY.estaVisivel) {
                    tempAcessoriosVisiveis.push(acessorioY.acessorio(exercicioFinanceiro))
                }
            })
        })
        return Math.max(...tempAcessoriosVisiveis)
    }
    const calculaValorMinimoDominioY = (historicoValores, acessoriosY) => {
        const tempAcessoriosVisiveis = []
        historicoValores.map(exercicioFinanceiro => {
            acessoriosY.map(acessorioY => {
                if (acessorioY.estaVisivel) {
                    tempAcessoriosVisiveis.push(acessorioY.acessorio(exercicioFinanceiro))
                }
            })
        })
        return Math.min(...tempAcessoriosVisiveis)
    }
    const configuraGrafico = () => {
        const corAcessorios = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]
        const locale = formatLocale({
            decimal: ",",
            thousands: ".",
            grouping: [3],
            currency: ["R$ ", ""],
            minus: "\u2212",
            percent: "%"
        })

        if (indicadorSelecionado === "dre") {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - DRE (EM MILHÕES DE REAIS)`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(","),
                    tooltip: () => locale.format(",")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.receitaLiquida,
                    cor: corAcessorios[0],
                    legenda: "Receita líquida",
                    estaVisivel: true
                },
                {
                    acessorio: d => d.lucroBruto,
                    cor: corAcessorios[1],
                    legenda: "Lucro Bruto",
                    estaVisivel: true
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
        } else if (indicadorSelecionado === 'endividamento') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - ENDIVIDAMENTO`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(".2f"),
                    tooltip: () => locale.format(".2f")
                }
            })
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
        } else if (indicadorSelecionado === 'rentabilidade') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - RENTABILIDADE`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(",.0%"),
                    tooltip: () => locale.format(",.2%")
                }
            })
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
        } else if (indicadorSelecionado === 'eficiencia') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - EFICIÊNCIA`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(",.0%"),
                    tooltip: () => locale.format(",.2%")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.margemBruta,
                    cor: corAcessorios[0],
                    legenda: "Margem Bruta",
                    estaVisivel: true
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
        } else if (indicadorSelecionado === 'payout') {
            setConfiguracoesGrafico({
                tipo: "coluna",
                titulo: `${dadosCadastrais.nome_empresarial} - PAYOUT`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(",.0%"),
                    tooltip: () => locale.format(",.2%")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.payout,
                    cor: corAcessorios[0],
                    legenda: "Payout",
                    estaVisivel: true
                }
            ])
        } else if (indicadorSelecionado === 'liquidez') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - LIQUIDEZ`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(".2f"),
                    tooltip: () => locale.format(".2f")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.liquidezImediata,
                    cor: corAcessorios[0],
                    legenda: "Liquidez Imediata",
                    estaVisivel: true
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
        } else if (indicadorSelecionado === 'IPCA') {
            setConfiguracoesGrafico({
                tipo: "coluna",
                titulo: `IPCA`,
                urlFonteDados: "https://www.ibge.gov.br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(",.0%"),
                    tooltip: () => locale.format(",.2%")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "IPCA",
                    estaVisivel: true
                }
            ])
        } else if (indicadorSelecionado === 'SELIC') {
            setConfiguracoesGrafico({
                tipo: "coluna",
                titulo: `SELIC`,
                urlFonteDados: "https://www.bcb.gov.br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(",.0%"),
                    tooltip: () => locale.format(",.2%")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "SELIC",
                    estaVisivel: true
                }
            ])
        } else if (indicadorSelecionado === 'EMBI+') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `EMBI+`,
                urlFonteDados: "https://www.ipea.gov.br/portal/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(","),
                    tooltip: () => locale.format(",")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "EMBI+",
                    estaVisivel: true
                }
            ])
        } else if (indicadorSelecionado === 'IBOV') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `IBOV`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(","),
                    tooltip: () => locale.format(",")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "IBOV",
                    estaVisivel: true
                }
            ])
        } else if (indicadorSelecionado === 'DÓLAR EUA') {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `DÓLAR EUA`,
                urlFonteDados: "https://www.b3.com.br/pt_br/",
                formatoAcessorioY: {
                    eixoY: () => locale.format(".2f"),
                    tooltip: () => locale.format("$.2f")
                }
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "DÓLAR EUA",
                    estaVisivel: true
                }
            ])
        }
    }


    useEffect(() => {
        configuraGrafico()
    }, [dadosCadastrais, indicadorSelecionado])


    let escalaEixoX
    if (configuracoesGrafico && configuracoesGrafico.tipo === "linha") {
        escalaEixoX = scaleTime()
            .domain(extent(historicoValores, acessorioX))
            .range([0, larguraInterna])
    } else if (configuracoesGrafico && configuracoesGrafico.tipo === "coluna") {
        escalaEixoX = scaleTime()
            .domain(extent(historicoValores, acessorioX))
            .range([larguraColuna / 2, larguraInterna - larguraColuna / 2])
    }

    const escalaEixoY = scaleLinear()
        .domain([calculaValorMinimoDominioY(historicoValores, acessoriosY), calculaValorMaximoDominioY(historicoValores, acessoriosY)])
        .range([alturaInterna, 0])
        .nice()


    //rendering chart
    return (
        <div className="relative flex flex-col justify-around items-center">
            {configuracoesGrafico && <>

                {/* Title */}
                <h1 className="text-xs sm:text-base lg:text-xl text-white text-center mb-1">
                    {configuracoesGrafico.titulo}
                </h1>


                {/* Plotting area */}
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
                            formatoAcessorioY={configuracoesGrafico.formatoAcessorioY.eixoY()}
                            corGrade={corGrade}
                        />

                        <Marcadores
                            historicoValores={historicoValores}
                            configuracoesGrafico={configuracoesGrafico}
                            setConfiguracoesTooltip={setConfiguracoesTooltip}

                            escalaEixoX={escalaEixoX}
                            acessorioX={acessorioX}
                            larguraColuna={larguraColuna}

                            escalaEixoY={escalaEixoY}
                            acessoriosY={acessoriosY}
                            alturaInterna={alturaInterna}
                        />
                    </g>
                </svg>


                {/* Source */}
                <div className="flex self-end pr-2 text-white text-[0.4rem] sm:text-xs mb-3">
                    <a
                        href={configuracoesGrafico.urlFonteDados}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fonte: {configuracoesGrafico.urlFonteDados}
                    </a>
                </div>


                {/* Legends */}
                <Legendas
                    acessoriosY={acessoriosY}
                    setAcessoriosY={setAcessoriosY}
                />

                {configuracoesTooltip && configuracoesTooltip.estaVisivel &&
                    <Tooltip
                        configuracoesTooltip={configuracoesTooltip}
                        formatoAcessorioY={configuracoesGrafico.formatoAcessorioY.tooltip()}
                        indicadorSelecionado={indicadorSelecionado}
                    />
                }

            </>}
        </div>
    )
}

