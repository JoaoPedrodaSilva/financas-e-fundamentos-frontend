import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoMacroeconomia = ({ indicadorSelecionado, dadosCadastrais, historicoValores }) => {
    console.log(dadosCadastrais)
    
    //states
    const cores = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]
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
                                    label: context => `${context.dataset.label}: ${context.raw}`
                                }
                            },
                            legend: {
                                display: false,
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