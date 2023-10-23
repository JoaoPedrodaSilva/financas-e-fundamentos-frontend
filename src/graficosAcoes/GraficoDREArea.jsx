import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoDREArea = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: cores[0],
                borderColor: cores[0],
                order: 3
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: cores[1],
                borderColor: cores[1],
                order: 2
            },
            {
                label: "Lucro Operacional (EBIT)",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: cores[2],
                borderColor: cores[2],
                order: 1
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[3],
                borderColor: cores[3],
                order: 0
            },
            ]
        })
    }, [dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Line
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/logo.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        fill: true,
                        borderWidth: 0,
                        tension: 0.4,
                        radius: 0,
                        hoverRadius: 0,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            y: {
                                position: 'right',
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    font: {
                                        size: 11
                                    },
                                },
                                ticks: {
                                    maxTicksLimit: 6
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.dataset.label}: R$ ${context.raw} milhões`
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