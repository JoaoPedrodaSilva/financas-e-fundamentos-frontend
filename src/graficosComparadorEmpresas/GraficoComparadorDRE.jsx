import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoComparadorDRE = ({ primeiraEmpresaDadosCadastrais, primeiraEmpresaHistoricoValores, segundaEmpresaDadosCadastrais, segundaEmpresaHistoricoValores, terceiraEmpresaDadosCadastrais, terceiraEmpresaHistoricoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        setDadosFinanceiros({
            labels: ["Receita Líquida", "Lucro Bruto", "Lucro Operacional", "Lucro Antes dos Tributos", "Lucro Líquido"],
            datasets: [{
                label: primeiraEmpresaDadosCadastrais.codigoBase,
                data: [
                    primeiraEmpresaHistoricoValores[primeiraEmpresaHistoricoValores.length - 1].receitaLiquida,
                    primeiraEmpresaHistoricoValores[primeiraEmpresaHistoricoValores.length - 1].lucroBruto,
                    primeiraEmpresaHistoricoValores[primeiraEmpresaHistoricoValores.length - 1].lucroOperacional,
                    primeiraEmpresaHistoricoValores[primeiraEmpresaHistoricoValores.length - 1].lucroAntesTributos,
                    primeiraEmpresaHistoricoValores[primeiraEmpresaHistoricoValores.length - 1].lucroLiquido
                ],
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: segundaEmpresaDadosCadastrais.codigoBase,
                data: [
                    segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].receitaLiquida,
                    segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].lucroBruto,
                    segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].lucroOperacional,
                    segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].lucroAntesTributos,
                    segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].lucroLiquido
                ],
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false,
                pointStyle: "rectRounded"
            },
            {
                label: terceiraEmpresaDadosCadastrais.codigoBase,
                data: [
                    terceiraEmpresaHistoricoValores[terceiraEmpresaHistoricoValores.length - 1].receitaLiquida,
                    terceiraEmpresaHistoricoValores[terceiraEmpresaHistoricoValores.length - 1].lucroBruto,
                    terceiraEmpresaHistoricoValores[terceiraEmpresaHistoricoValores.length - 1].lucroOperacional,
                    terceiraEmpresaHistoricoValores[terceiraEmpresaHistoricoValores.length - 1].lucroAntesTributos,
                    terceiraEmpresaHistoricoValores[terceiraEmpresaHistoricoValores.length - 1].lucroLiquido
                ],
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false,
                pointStyle: "rectRounded"
            }]
        })
    }, [primeiraEmpresaDadosCadastrais, segundaEmpresaDadosCadastrais, terceiraEmpresaDadosCadastrais])


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
                                position: 'left',
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
                                text: `${primeiraEmpresaDadosCadastrais.codigoBase}   X   ${segundaEmpresaDadosCadastrais.codigoBase}   X   ${terceiraEmpresaDadosCadastrais.codigoBase}   -   DRE  ${segundaEmpresaHistoricoValores[segundaEmpresaHistoricoValores.length - 1].ano.getFullYear()}`,
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