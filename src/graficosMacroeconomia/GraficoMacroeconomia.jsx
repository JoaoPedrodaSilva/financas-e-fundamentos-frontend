import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoMacroeconomia = ({ indicadorSelecionado, dadosCadastrais, historicoValores }) => {
    
    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Liquidez Imediata",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.valor),
                backgroundColor: cores[0],
                borderColor: cores[0]
            }]
        })
    }, [indicadorSelecionado, dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Line
                className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        responsive: true,
                        borderWidth: 3,
                        tension: 0.4,
                        radius: 2,
                        hoverRadius: 4,
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
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.dataset.label}: ${context.raw}`
                                }
                            },
                            legend: {
                                display: false,
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