import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoRankings = ({ indicadorSelecionado, dadosFinanceirosDeTodasEmpresas }) => {

    //states
    const cores = ["#ccccff", "#6666ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    const [configuraGrafico, setConfiguraGrafico] = useState(null)


    return (
        <div className='w-full'>
            {console.log(dadosFinanceirosDeTodasEmpresas)}

            
            {dadosFinanceirosDeTodasEmpresas &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceirosDeTodasEmpresas}
                    options={{
                        responsive: true,
                        borderWidth: 3,
                        tension: 0.4,
                        radius: 0,
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
                                    display: false,
                                }
                            },
                            y: {
                                position: 'right',
                                ticks: {
                                    color: "white",
                                    // callback: value => configuraGrafico.labelEixoY(value)
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                },
                                // title: configuraGrafico.tituloEixoY,
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                // text: `${configuraGrafico.tituloGrafico}`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                //se todos os dados forem nulos, a tooltip nem aparecem. O ideal era que a tooltip aparecesse com a mensagem abaixo.
                                callbacks: {
                                    // label: context => context.raw === null ?
                                    //     `${context.dataset.label}: Dados não disponibilizados pela empresa` :
                                    //     configuraGrafico.labelTooltip(context),
                                    labelTextColor: context => context.raw < 0 ? "red" : "white"
                                }

                            },
                            legend: {
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