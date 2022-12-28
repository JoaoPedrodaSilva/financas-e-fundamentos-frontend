import { useState, useEffect } from "react"
import { scaleTime, scaleLinear, extent, format } from "d3"
import { EixoX } from "./EixoX"
import { EixoY } from "./EixoY"
import { Marcadores } from "./Marcadores"
import { Legendas } from "./Legendas"


export const Grafico = ({ indicadorSelecionado, dadosCadastrais, historicoValores }) => {

    //declaring states and variables    
    const acessorioX = d => d.ano
    const [acessoriosY, setAcessoriosY] = useState([])
    const [configuracoesGrafico, setConfiguracoesGrafico] = useState(null)

    const larguraSVG = 700
    const alturaSVG = 400
    const margens = { cima: 40, direita: 60, baixo: 35, esquerda: 30 }
    const larguraInterna = larguraSVG - margens.direita - margens.esquerda
    const alturaInterna = alturaSVG - margens.cima - margens.baixo
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
    const reconfiguraGrafico = () => {
        const corAcessorios = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]

        if (indicadorSelecionado === "dre") {
            setConfiguracoesGrafico({
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - DRE (EM MILHÕES DE REAIS)`,
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(",")
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
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(".1f")
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
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(",.0%")
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
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(",.0%")
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
                tipo: "linha",
                titulo: `${dadosCadastrais.nome_empresarial} - PAYOUT`,
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(",.0%")
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
                fonteDados: "B3 S.A. - Brasil, Bolsa, Balcão",
                formatoAcessorioY: () => format(".1f")
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
                fonteDados: "IBGE - Instituto Brasileiro de Geografia e Estatística",
                formatoAcessorioY: () => format(",.0%")
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
                fonteDados: "BCB - Banco Central do Brasil",
                formatoAcessorioY: () => format(",.0%")
            })
            setAcessoriosY([
                {
                    acessorio: d => d.valor,
                    cor: corAcessorios[0],
                    legenda: "SELIC",
                    estaVisivel: true
                }
            ])
        }
    }


    useEffect(() => {
        reconfiguraGrafico()
    }, [dadosCadastrais, indicadorSelecionado])


    const escalaEixoX = scaleTime()
        .domain(extent(historicoValores, acessorioX))
        .range([0, larguraInterna])

    const escalaEixoY = scaleLinear()
        .domain([calculaValorMinimoDominioY(historicoValores, acessoriosY), calculaValorMaximoDominioY(historicoValores, acessoriosY)])
        .range([alturaInterna, 0])
        .nice()


    //rendering chart
    return (
        <div className="flex flex-col justify-around items-center">
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
                            formatoAcessorioY={configuracoesGrafico.formatoAcessorioY()}
                            corGrade={corGrade}
                        />

                        <Marcadores
                            dados={historicoValores}
                            configuracoesGrafico={configuracoesGrafico}
                            indicadorSelecionado={indicadorSelecionado}

                            escalaEixoX={escalaEixoX}
                            acessorioX={acessorioX}

                            escalaEixoY={escalaEixoY}
                            acessoriosY={acessoriosY}
                            formatoAcessorioY={configuracoesGrafico.formatoAcessorioY()}
                        />
                    </g>
                </svg>


                {/* Source */}
                <div className="flex self-end pr-2 text-white text-[0.4rem] mb-3">
                    <a
                        href="https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/empresas-listadas.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fonte: {configuracoesGrafico.fonteDados}
                    </a>
                </div>


                {/* Legends */}
                <Legendas
                    acessoriosY={acessoriosY}
                    setAcessoriosY={setAcessoriosY}
                />

            </>}
        </div>
    )
}

