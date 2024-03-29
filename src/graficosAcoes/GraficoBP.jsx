import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoBP = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#ff7f7f", "#ff3232", "#ffb2b2"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        !dadosCadastrais.instituicaoFinanceira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Ativo Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoCirculante),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true,
                borderRadius: 0,
                stack: "stack 0",
                pointStyle: "rectRounded"                
            },
            {
                label: "Ativo Não Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoNaoCirculante),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false,
                borderRadius: 10,
                stack: "stack 0",
                pointStyle: "rectRounded"
            },
            {
                label: "Passivo Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.passivoCirculante),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: true,
                borderRadius: 0,
                stack: "stack 1",
                pointStyle: "rectRounded"
            },
            {
                label: "Passivo Não Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.passivoNaoCirculante),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false,
                borderRadius: 10,
                stack: "stack 1",
                pointStyle: "rectRounded"
            },
            {
                label: "Patrimonio Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false,
                borderRadius: 10,
                stack: "stack 2",
                pointStyle: "rectRounded"
            }]
        })

        dadosCadastrais.instituicaoFinanceira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Ativo Total",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoTotal),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false,
                borderRadius: 10,
                stack: "stack 0",
                pointStyle: "rectRounded"                
            },
            {
                label: "Passivo Total",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.passivoTotal),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false,
                borderRadius: 10,
                stack: "stack 1",
                pointStyle: "rectRounded"
            },
            {
                label: "Patrimonio Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false,
                borderRadius: 10,
                stack: "stack 2",
                pointStyle: "rectRounded"
            }]
        })

        dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Ativo Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoCirculante),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true,
                borderRadius: 0,
                stack: "stack 0",
                pointStyle: "rectRounded"                
            },
            {
                label: "Ativo Não Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ativoNaoCirculante),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false,
                borderRadius: 10,
                stack: "stack 0",
                pointStyle: "rectRounded"
            },
            {
                label: "Passivo Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.passivoCirculante),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: true,
                borderRadius: 0,
                stack: "stack 1",
                pointStyle: "rectRounded"
            },
            {
                label: "Passivo Não Circulante",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.passivoNaoCirculante),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false,
                borderRadius: 10,
                stack: "stack 1",
                pointStyle: "rectRounded"
            },
            {
                label: "Patrimonio Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false,
                borderRadius: 10,
                stack: "stack 2",
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
                                stacked: true,
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    display: false,
                                }
                            },
                            y: {
                                position: 'right',
                                stacked: true,
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
                                text: `${dadosCadastrais.codigoBase} - BALANÇO PATRIMONIAL`,
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