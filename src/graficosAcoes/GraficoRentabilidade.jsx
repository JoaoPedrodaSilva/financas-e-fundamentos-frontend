import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoRentabilidade = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "ROE",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.retornoPeloPatrimonioLiquido),
                backgroundColor: cores[0],
                borderColor: cores[0],
                borderWidth: 3,
                yAxisID: 'y',
                hidden: false
            },
            {
                label: "ROA",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.retornoPelosAtivos),
                backgroundColor: cores[1],
                borderColor: cores[1],
                borderWidth: 3,
                yAxisID: 'y',
                hidden: true
            },
            {
                label: "Lucro Líquido",
                type: "bar",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[2],
                borderColor: cores[2],
                borderWidth: 0,
                yAxisID: 'y1',
                hidden: false
            },
            {
                label: "Patrimônio Líquido",
                type: "bar",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                backgroundColor: cores[3],
                borderColor: cores[3],
                borderWidth: 0,
                yAxisID: 'y1',
                hidden: false
            },
            {
                label: "Ativos",
                type: "bar",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoTotal),
                backgroundColor: cores[4],
                borderColor: cores[4],
                borderWidth: 0,
                yAxisID: 'y1',
                hidden: true
            }]
        })
    }, [dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Line
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        responsive: true,
                        tension: 0.4,
                        radius: 2,
                        hoverRadius: 4,
                        borderRadius: 10,
                        categoryPercentage: .7,
                        barPercentage: 1,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    // color: "rgba(255,255,255,0.05)"
                                    color: "transparent"
                                }
                            },
                            y: {
                                position: 'right',
                                ticks: {
                                    maxTicksLimit: 6,
                                    color: "white",
                                    callback: value => `${(value * 100).toFixed(0)}%`
                                },
                                grid: {
                                    // color: "rgba(255,255,255,0.05)"
                                    color: "transparent"
                                }
                            },
                            y1: {
                                position: 'left',
                                ticks: {
                                    maxTicksLimit: 6,
                                    color: "white",
                                    callback: value => value.toLocaleString("pt-BR")
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                },
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    color: "white"
                                },
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => {
                                        if (context.dataset.type === "bar") {
                                            return `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                                        } else {
                                            return `${context.dataset.label}: ${(Math.round(context.raw * 100)).toFixed(0)}%`
                                        }
                                    }
                                }
                            },
                            legend: {
                                labels: {
                                    padding: 25,
                                    color: "white"
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