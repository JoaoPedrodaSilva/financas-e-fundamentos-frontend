import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoDRE = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)
    

    useEffect(() => {
        !dadosCadastrais.instituicaoFinanceira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: true,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Operacional (EBIT)",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })

        dadosCadastrais.instituicaoFinanceira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })

        dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Lucro Operacional",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false,
                pointStyle: "rectRounded"
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
                                    display: false,
                                }
                            },
                            y: {
                                position: 'right',
                                ticks: {
                                    maxTicksLimit: 6,
                                    color: "white",
                                    callback: value => value.toLocaleString("pt-BR")
                                },
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    color: "white"
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `${dadosCadastrais.codigoBase} - DRE`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
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