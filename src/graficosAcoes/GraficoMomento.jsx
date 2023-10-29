import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoPayout = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        historicoValores[historicoValores.length - 1].capexPelaDA !== null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [
                {
                    label: "Payout",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                    backgroundColor: cores[0],
                    borderColor: cores[0],
                    borderWidth: 3
                }, {
                    label: "CAPEX/FCO",
                    type: "bar",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                    backgroundColor: cores[1],
                    borderColor: cores[1],
                    borderWidth: 0
                },
                {
                    label: "CAPEX/D&A",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPelaDA),
                    type: "bar",
                    backgroundColor: cores[2],
                    borderColor: cores[2],
                    borderWidth: 0
                }]
        })

        historicoValores[historicoValores.length - 1].capexPelaDA === null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [
                {
                    label: "Payout",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                    backgroundColor: cores[0],
                    borderColor: cores[0],
                    borderWidth: 3
                }, {
                    label: "CAPEX/FCO",
                    type: "bar",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                    backgroundColor: cores[1],
                    borderColor: cores[1],
                    borderWidth: 0
                }]
        })

        historicoValores[historicoValores.length - 1].capexPeloFCO === null && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [
                {
                    label: "Payout",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                    backgroundColor: cores[0],
                    borderColor: cores[0],
                    borderWidth: 3
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