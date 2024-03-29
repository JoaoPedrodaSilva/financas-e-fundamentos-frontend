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
                    borderWidth: 3,
                    hidden: false,
                    pointStyle: "line"
                }, {
                    label: "CAPEX/FCO",
                    type: "bar",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                    backgroundColor: cores[1],
                    borderColor: cores[1],
                    borderWidth: 0,
                    hidden: false,
                    pointStyle: "rectRounded"
                },
                {
                    label: "CAPEX/D&A",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPelaDA),
                    type: "bar",
                    backgroundColor: cores[2],
                    borderColor: cores[2],
                    borderWidth: 0,
                    hidden: false,
                    pointStyle: "rectRounded"
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
                    borderWidth: 3,
                    hidden: false,
                    pointStyle: "line"
                }, {
                    label: "CAPEX/FCO",
                    type: "bar",
                    data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                    backgroundColor: cores[1],
                    borderColor: cores[1],
                    borderWidth: 0,
                    hidden: false,
                    pointStyle: "rectRounded"
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
                    borderWidth: 3,
                    hidden: false,
                    pointStyle: "line"
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
                        radius: 0,
                        hoverRadius: 0,
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
                            title: {
                                display: true,
                                text: `${dadosCadastrais.codigoBase} - MOMENTO`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => context.raw !== null ?
                                        `${context.dataset.label}: ${Math.round(context.raw * 100)}%` :
                                        `${context.dataset.label}: Dados não disponibilizados pela empresa`
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