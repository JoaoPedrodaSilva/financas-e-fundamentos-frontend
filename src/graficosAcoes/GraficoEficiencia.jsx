import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoEficiencia = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        historicoValores[historicoValores.length - 1].margemOperacional !== null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Margem Bruta",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false
            },
            {
                label: "Margem Operacional",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemOperacional),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false
            },
            {
                label: "Margem Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemAntesTributos),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: true
            },
            {
                label: "Margem Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false
            }]
        })

        historicoValores[historicoValores.length - 1].margemOperacional === null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Margem Bruta",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false
            },
            {
                label: "Margem Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemAntesTributos),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false
            },
            {
                label: "Margem Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false
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
                                    display: false,
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
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
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