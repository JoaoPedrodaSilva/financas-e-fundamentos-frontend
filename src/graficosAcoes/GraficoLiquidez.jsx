import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoLiquidez = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        historicoValores[historicoValores.length - 1].liquidezSeca !== null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Liquidez Imediata",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezImediata),
                backgroundColor: cores[0],
                borderColor: cores[0]
            },
            {
                label: "Liquidez Seca",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezSeca),
                backgroundColor: cores[1],
                borderColor: cores[1]
            },
            {
                label: "Liquidez Corrente",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezCorrente),
                backgroundColor: cores[2],
                borderColor: cores[2]
            },
            {
                label: "Liquidez Geral",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezGeral),
                backgroundColor: cores[3],
                borderColor: cores[3]
            }]
        })

        historicoValores[historicoValores.length - 1].liquidezSeca === null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Liquidez Imediata",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezImediata),
                backgroundColor: cores[0],
                borderColor: cores[0]
            },
            {
                label: "Liquidez Corrente",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezCorrente),
                backgroundColor: cores[1],
                borderColor: cores[1]
            },
            {
                label: "Liquidez Geral",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.liquidezGeral),
                backgroundColor: cores[2],
                borderColor: cores[2]
            }]
        })
    }, [dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
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