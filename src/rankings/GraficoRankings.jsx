import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoRankings = ({ indicadorSelecionado, anoSelecionado, setorSelecionado, dadosCompletosDoSetorSelecionado, dadosCompletosDoSetorSelecionadoSeparadosPorAno }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [datasets, setDatasets] = useState(null)
    const [quantidadeDeEmpresas, setQuantidadeDeEmpresas] = useState(25)
    const [configuraGrafico, setConfiguraGrafico] = useState(null)


    const mostraAnoPorAnoNaTooltip = (codigoBase, dadosCompletosDoSetorSelecionadoSeparadosPorAno) => {
        let dadosParaTooltip = []
        dadosCompletosDoSetorSelecionadoSeparadosPorAno.map(cadaAno => {

            if (cadaAno.codigoBase === codigoBase) {

                dadosCompletosDoSetorSelecionado.map(cadaEmpresa => {

                    if (cadaEmpresa.codigoBase === codigoBase && dadosParaTooltip.length === 0) {
                        dadosParaTooltip.push(indicadorSelecionado.descricao)
                        dadosParaTooltip.push(`Média do período: R$ ${cadaEmpresa[indicadorSelecionado.propriedade].toLocaleString("pt-BR")} milhões`)
                    }
                })

                dadosParaTooltip.push(`${cadaAno.ano}: R$ ${cadaAno[indicadorSelecionado.propriedade].toLocaleString("pt-BR")} milhões`)
            }
        })
        return dadosParaTooltip
    }


    //datasets
    useEffect(() => {
        setDatasets({
            labels: dadosCompletosDoSetorSelecionado.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => `${cadaEmpresa.nomeEmpresarial} - ${cadaEmpresa.codigoBase}`),
            datasets: [{
                data: dadosCompletosDoSetorSelecionado.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => cadaEmpresa[indicadorSelecionado.propriedade]),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })
    }, [indicadorSelecionado, dadosCompletosDoSetorSelecionado])


    //Configura Gráfico
    //configure chart
    useEffect(() => {
        {
            (() => {
                switch (true) {
                    case indicadorSelecionado.propriedade === "receitaLiquida"
                        || indicadorSelecionado.propriedade === "lucroOperacional"
                        || indicadorSelecionado.propriedade === "lucroLiquido"
                        || indicadorSelecionado.propriedade === "patrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: indicadorSelecionado.descricao,
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${indicadorSelecionado.descricao}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case indicadorSelecionado.propriedade === "dividaLiquidaPeloEbitda"
                        || indicadorSelecionado.propriedade === "dividaBrutaPeloPatrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: indicadorSelecionado.descricao,
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${indicadorSelecionado.descricao}: ${Math.round(context.raw * 100)}%`
                        })
                        break


                    case indicadorSelecionado.propriedade === "margemOperacional"
                        || indicadorSelecionado.propriedade === "margemLiquida"
                        || indicadorSelecionado.propriedade === "capexPeloFCO"
                        || indicadorSelecionado.propriedade === "payout"
                        || indicadorSelecionado.propriedade === "retornoPeloPatrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: indicadorSelecionado.descricao,
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${indicadorSelecionado.descricao}: ${Math.round(context.raw * 100)}%`
                        })
                        break
                }
            })()
        }
    }, [indicadorSelecionado])


    return (
        <div className='w-full'>
            {datasets &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={datasets}
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        borderWidth: 0,
                        borderRadius: 10,
                        categoryPercentage: .7,
                        barPercentage: 1,
                        interaction: {
                            mode: 'index'
                        },
                        scales: {
                            x: {
                                position: "bottom",
                                title: configuraGrafico.tituloEixoX,
                                ticks: {
                                    color: "white",
                                    callback: value => configuraGrafico.labelEixoX(value)
                                },
                                grid: {
                                    display: true,
                                    color: "rgba(255,255,255,0.05)"
                                }
                            },
                            y: {
                                position: 'left',
                                ticks: {
                                    color: "white"
                                },
                                grid: {
                                    display: true,
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: setorSelecionado === "Todos" && anoSelecionado === "MediaDosTresUltimosAnos"
                                    ? `${configuraGrafico.tituloGrafico} de Todos os Setores - Média dos últimos 3 anos`
                                    : setorSelecionado === "Todos" && anoSelecionado === "MediaDosCincoUltimosAnos"
                                        ? `${configuraGrafico.tituloGrafico} de Todos os Setores - Média dos últimos 5 anos`
                                        : setorSelecionado === "Todos" && anoSelecionado !== "MediaDosTresUltimosAnos" && anoSelecionado !== "MediaDosCincoUltimosAnos"
                                            ? `${configuraGrafico.tituloGrafico} de Todos os Setores em ${anoSelecionado}`

                                            : setorSelecionado !== "Todos" && anoSelecionado === "MediaDosTresUltimosAnos"
                                                ? `${configuraGrafico.tituloGrafico} do Setor de ${setorSelecionado} - Média dos últimos 3 anos`
                                                : setorSelecionado !== "Todos" && anoSelecionado === "MediaDosCincoUltimosAnos"
                                                    ? `${configuraGrafico.tituloGrafico} do Setor de ${setorSelecionado} - Média dos últimos 5 anos`
                                                    : setorSelecionado !== "Todos" && anoSelecionado !== "MediaDosTresUltimosAnos" && anoSelecionado !== "MediaDosCincoUltimosAnos"
                                                        ? `${configuraGrafico.tituloGrafico} do Setor de ${setorSelecionado} em ${anoSelecionado}`
                                                        : null,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => context.raw === null
                                        ? `${context.dataset.label}: Dados não disponibilizados pela empresa`
                                        : mostraAnoPorAnoNaTooltip(context.label.slice(-4), dadosCompletosDoSetorSelecionadoSeparadosPorAno),
                                    labelTextColor: context => context.raw < 0 ? "red" : "white"
                                }
                            },
                            legend: {
                                display: false,
                                position: "bottom",
                                labels: {
                                    padding: 15,
                                    color: "white",
                                    usePointStyle: true,
                                    pointStyleWidth: 30
                                }
                            },
                            plugins: {
                                colors: {
                                    forceOverride: true
                                }
                            }
                        }
                    }}
                />
            }
        </div>
    )
} 