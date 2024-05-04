import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoMacroeconomia = ({ dadosCadastraisIpcaDozeMeses, historicoValoresIpcaDozeMeses, dadosCadastraisSelicMeta, historicoValoresSelicMeta, dadosCadastraisEmbi, historicoValoresEmbi, dadosCadastraisDolarEua, historicoValoresDolarEua }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    

    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValoresDolarEua.map(cadaCompetencia => cadaCompetencia.competencia),
            datasets: [
                {
                    label: dadosCadastraisIpcaDozeMeses.indicador,
                    data: historicoValoresIpcaDozeMeses.map(cadaCompetencia => cadaCompetencia.valor),
                    backgroundColor: cores[0],
                    borderColor: cores[0],
                    yAxisID: "percentual"
                },
                {
                    label: dadosCadastraisSelicMeta.indicador,
                    data: historicoValoresSelicMeta.map(cadaCompetencia => cadaCompetencia.valor),
                    backgroundColor: cores[1],
                    borderColor: cores[1],
                    yAxisID: "percentual"
                },
                {
                    label: dadosCadastraisEmbi.indicador,
                    data: historicoValoresEmbi.map(cadaCompetencia => cadaCompetencia.valor),
                    backgroundColor: cores[2],
                    borderColor: cores[2],
                    yAxisID: "embi",
                },
                {
                    label: dadosCadastraisDolarEua.indicador,
                    data: historicoValoresDolarEua.map(cadaCompetencia => cadaCompetencia.valor),
                    backgroundColor: cores[3],
                    borderColor: cores[3],
                    yAxisID: "moeda",
                }]
        })
    }, [])


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
                            percentual: {
                                display: false,
                                position: 'right',
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                }
                            },
                            moeda: {
                                display: false,
                                position: 'right',
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                }
                            },
                            embi: {
                                display: false,
                                position: 'right',
                                ticks: {
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
                                    label: context => {
                                        return context.dataset.label === "SELIC META" ? `${context.dataset.label}: ${context.raw.replace(".", ",")}%` :
                                            context.dataset.label === "IPCA 12 MESES" ? `${context.dataset.label}: ${context.raw.replace(".", ",")}%` :
                                                context.dataset.label === "EMBI+" ? `${context.dataset.label}: ${context.raw}` :
                                                    context.dataset.label === "DÓLAR EUA" ? `${context.dataset.label}: R$ ${context.raw.replace(".", ",")}` :
                                                        null
                                    }
                                }
                            },
                            legend: {
                                display: true,
                                position: "bottom",
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