import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoRankings = ({ indicadorSelecionado, dadosFinanceirosDeTodasEmpresas }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    const [quantidadeDeEmpresas, setQuantidadeDeEmpresas] = useState(15)


    useEffect(() => {
        setDadosFinanceiros({
            labels: dadosFinanceirosDeTodasEmpresas.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => cadaEmpresa.codigoBase),
            datasets: [{
                // label: false,
                data: dadosFinanceirosDeTodasEmpresas.slice(0, quantidadeDeEmpresas).map(cadaEmpresa => cadaEmpresa.lucroLiquido),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })
    }, [indicadorSelecionado])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        indexAxis: 'y',
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
                                    callback: value => value.toLocaleString("pt-BR"),                                    
                                },
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    color: "white"
                                },
                                grid: {
                                    display: true,
                                    color: "rgba(255,255,255,0.05)"
                                }
                            },
                            y: {
                                position: 'right',
                                ticks: {
                                    color: "white"
                                },
                                grid: {
                                    display: true,
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                // text: `${dadosCadastrais.codigoBase} - DRE`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => `Lucro Líquido: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
                                    labelTextColor: context => context.raw < 0 ? "red" : "white"
                                }
                            },
                            legend: {
                                display: false,
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