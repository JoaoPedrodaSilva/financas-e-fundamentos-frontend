import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoEficiencia = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Margem Bruta",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                backgroundColor: cores[0],
                borderColor: cores[0]
            },
            {
                label: "Margem Operacional",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemOperacional),
                backgroundColor: cores[1],
                borderColor: cores[1]
            },
            {
                label: "Margem Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                backgroundColor: cores[2],
                borderColor: cores[2]
            }]
        })
    }, [dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Line
                className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/logo.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        borderWidth: 3,
                        tension: 0.4,
                        radius: 3,
                        hoverRadius: 4,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            y: {
                                position: 'right',
                                ticks: {
                                    maxTicksLimit: 6
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
                                    padding: 25
                                }
                            }
                        }
                    }}
                />
            }
        </div>
    )
} 