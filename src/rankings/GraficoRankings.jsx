import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoRankings = ({ indicadorSelecionado, anoSelecionado, setorSelecionado, dadosDeTodasEmpresas }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    const [quantidadeDeEmpresas, setQuantidadeDeEmpresas] = useState(15)
    const [configuraGrafico, setConfiguraGrafico] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: dadosDeTodasEmpresas.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => cadaEmpresa.codigoBase),
            datasets: [{
                // label: false,
                data: dadosDeTodasEmpresas.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => cadaEmpresa[indicadorSelecionado]),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })
    }, [indicadorSelecionado, dadosDeTodasEmpresas])


    //Configura Gráfico
    //configure chart
    useEffect(() => {
        {
            (() => {
                switch (indicadorSelecionado) {
                    case "receitaLiquida":
                        setConfiguraGrafico({
                            tituloGrafico: "Receita Líquida",
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `Receita Líquida: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "lucroOperacional":
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Operacional",
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `Lucro Operacional: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "lucroLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Líquido",
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `Lucro Líquido: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "patrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "Patrimônio Líquido",
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `Patrimônio Líquido: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "margemOperacional":
                        setConfiguraGrafico({
                            tituloGrafico: "Margem Operacional",
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `Margem Operacional: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "margemLiquida":
                        setConfiguraGrafico({
                            tituloGrafico: "Margem Líquida",
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `Margem Líquida: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "capexPeloFCO":
                        setConfiguraGrafico({
                            tituloGrafico: "CAPEX / FCO",
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `CAPEX / FCO: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "payout":
                        setConfiguraGrafico({
                            tituloGrafico: "Payout",
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `Payout: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "retornoPeloPatrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "ROE",
                            tituloEixoX: {
                                display: false
                            },
                            labelEixoX: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `ROE: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    default:
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Líquido",
                            tituloEixoX: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoX: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `Lucro Líquido: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break
                }
            })()
        }
    }, [indicadorSelecionado])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
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
                                text: `${configuraGrafico.tituloGrafico} em ${anoSelecionado}`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => context.raw === null ?
                                        `${context.dataset.label}: Dados não disponibilizados pela empresa` :
                                        configuraGrafico.labelTooltip(context),

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