import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoComparadorEmpresas = ({ indicadorSelecionado, primeiraEmpresaDadosCadastrais, primeiraEmpresaHistoricoValores, segundaEmpresaDadosCadastrais, segundaEmpresaHistoricoValores, terceiraEmpresaDadosCadastrais, terceiraEmpresaHistoricoValores }) => {

    //states
    const cores = ["#ccccff", "#6666ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: primeiraEmpresaHistoricoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: primeiraEmpresaDadosCadastrais.codigoBase,
                data: primeiraEmpresaHistoricoValores.map(exercicioFinanceiro => {
                    return (
                        indicadorSelecionado === "receitaLiquida" ? exercicioFinanceiro.receitaLiquida
                            : indicadorSelecionado === "lucroBruto" ? exercicioFinanceiro.lucroBruto
                                : indicadorSelecionado === "lucroOperacional" ? exercicioFinanceiro.lucroOperacional
                                    : indicadorSelecionado === "lucroAntesTributos" ? exercicioFinanceiro.lucroAntesTributos
                                        : indicadorSelecionado === "lucroLiquido" ? exercicioFinanceiro.lucroLiquido
                                            : null
                    )
                }),
                backgroundColor: cores[0],
                borderColor: cores[0],
                pointStyle: "rectRounded"
            },
            {
                label: segundaEmpresaDadosCadastrais.codigoBase,
                data: segundaEmpresaHistoricoValores.map(exercicioFinanceiro => {
                    return (
                        indicadorSelecionado === "receitaLiquida" ? exercicioFinanceiro.receitaLiquida
                            : indicadorSelecionado === "lucroBruto" ? exercicioFinanceiro.lucroBruto
                                : indicadorSelecionado === "lucroOperacional" ? exercicioFinanceiro.lucroOperacional
                                    : indicadorSelecionado === "lucroAntesTributos" ? exercicioFinanceiro.lucroAntesTributos
                                        : indicadorSelecionado === "lucroLiquido" ? exercicioFinanceiro.lucroLiquido
                                            : null
                    )
                }),
                backgroundColor: cores[1],
                borderColor: cores[1],
                pointStyle: "rectRounded"
            },
            {
                label: terceiraEmpresaDadosCadastrais.codigoBase,
                data: terceiraEmpresaHistoricoValores.map(exercicioFinanceiro => {
                    return (
                        indicadorSelecionado === "receitaLiquida" ? exercicioFinanceiro.receitaLiquida
                            : indicadorSelecionado === "lucroBruto" ? exercicioFinanceiro.lucroBruto
                                : indicadorSelecionado === "lucroOperacional" ? exercicioFinanceiro.lucroOperacional
                                    : indicadorSelecionado === "lucroAntesTributos" ? exercicioFinanceiro.lucroAntesTributos
                                        : indicadorSelecionado === "lucroLiquido" ? exercicioFinanceiro.lucroLiquido
                                            : null
                    )
                }),
                backgroundColor: cores[2],
                borderColor: cores[2],
                pointStyle: "rectRounded"
            }]
        })
    }, [primeiraEmpresaDadosCadastrais, segundaEmpresaDadosCadastrais, terceiraEmpresaDadosCadastrais, indicadorSelecionado])


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
                        hoverRadius: 0,
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
                                    color: "white",
                                    callback: value => value.toLocaleString("pt-BR")
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                },
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    color: "white"
                                },
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                //incluir nome do indicador
                                text: `${primeiraEmpresaDadosCadastrais.codigoBase}   X   ${segundaEmpresaDadosCadastrais.codigoBase}   X   ${terceiraEmpresaDadosCadastrais.codigoBase}`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                //se todos os dados forem nulos, a tooltip nem aparecem. O ideal era que a tooltip aparecesse com a mensagem abaixo.
                                callbacks: {
                                    label: context => context.raw !== null ?
                                        `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões` :
                                        `${context.dataset.label}: Dados não disponibilizados pela empresa`,
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