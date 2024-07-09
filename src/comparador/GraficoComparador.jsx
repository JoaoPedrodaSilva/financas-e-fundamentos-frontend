import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoComparador = ({ indicadorSelecionado, dadosCompletosDaPrimeiraEmpresaSelecionada, dadosCompletosDaSegundaEmpresaSelecionada, dadosCompletosDaTerceiraEmpresaSelecionada }) => {

    //states
    const cores = ["#ccccff", "#6666ff", "#0000ff"]
    const [datasets, setDatasets] = useState(null)
    const [todosAnosUnicos, setTodosAnosUnicos] = useState([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023])
    const [configuraGrafico, setConfiguraGrafico] = useState(null)

    const atualizaLabelsComTodosAnosUnicos = (dadosCompletosDaPrimeiraEmpresaSelecionada, dadosCompletosDaSegundaEmpresaSelecionada, dadosCompletosDaTerceiraEmpresaSelecionada) => {
        let anosUnicosTemp1 = []
        const anosUnicosTemp2 = [
            ...dadosCompletosDaPrimeiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano),
            ...dadosCompletosDaSegundaEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano),
            ...dadosCompletosDaTerceiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano)
        ]
        anosUnicosTemp2.map(cadaAno => {
            if (!anosUnicosTemp1.includes(cadaAno)) {
                anosUnicosTemp1.push(cadaAno)
            }
        })
        setTodosAnosUnicos(anosUnicosTemp1.sort())

        console.log(...dadosCompletosDaPrimeiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano))
        console.log(...dadosCompletosDaSegundaEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano))
        console.log(...dadosCompletosDaTerceiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano))
        console.log(todosAnosUnicos)
    }


    //configura datasets
    //datasets config
    useEffect(() => {
        setDatasets({
            labels: todosAnosUnicos,
            datasets: [{
                label: dadosCompletosDaPrimeiraEmpresaSelecionada.dadosCadastrais.codigoBase,
                data: dadosCompletosDaPrimeiraEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro[indicadorSelecionado]),
                backgroundColor: cores[0],
                borderColor: cores[0],
                pointStyle: "rectRounded"
            },
            {
                label: dadosCompletosDaSegundaEmpresaSelecionada.dadosCadastrais.codigoBase,
                data: dadosCompletosDaSegundaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro[indicadorSelecionado]),
                backgroundColor: cores[1],
                borderColor: cores[1],
                pointStyle: "rectRounded"
            },
            {
                label: dadosCompletosDaTerceiraEmpresaSelecionada.dadosCadastrais.codigoBase,
                data: dadosCompletosDaTerceiraEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro[indicadorSelecionado]),
                backgroundColor: cores[2],
                borderColor: cores[2],
                pointStyle: "rectRounded"
            }]
        })
    }, [dadosCompletosDaPrimeiraEmpresaSelecionada, dadosCompletosDaSegundaEmpresaSelecionada, dadosCompletosDaTerceiraEmpresaSelecionada, indicadorSelecionado])


    //configura gráfico
    //chart config
    useEffect(() => {
        {
            (() => {
                switch (indicadorSelecionado) {
                    case "receitaLiquida":
                        setConfiguraGrafico({
                            tituloGrafico: "Receita Líquida",
                            tituloEixoY: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "lucroOperacional":
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Operacional",
                            tituloEixoY: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "lucroLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Líquido",
                            tituloEixoY: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "patrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "Patrimônio Líquido",
                            tituloEixoY: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break

                    case "margemOperacional":
                        setConfiguraGrafico({
                            tituloGrafico: "Margem Operacional",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "margemLiquida":
                        setConfiguraGrafico({
                            tituloGrafico: "Margem Líquida",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "capexPeloFCO":
                        setConfiguraGrafico({
                            tituloGrafico: "CAPEX / FCO",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "payout":
                        setConfiguraGrafico({
                            tituloGrafico: "Payout",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    case "dividaLiquidaPeloEbitda":
                        setConfiguraGrafico({
                            tituloGrafico: "Dívida Líquida / EBITDA",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: ${context.raw.toLocaleString("pt-BR")}`
                        })
                        break

                    case "dividaBrutaPeloPatrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "Dívida Bruta / Patrimônio Líquido",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: ${context.raw.toLocaleString("pt-BR")}`
                        })
                        break

                    case "retornoPeloPatrimonioLiquido":
                        setConfiguraGrafico({
                            tituloGrafico: "ROE",
                            tituloEixoY: {
                                display: false
                            },
                            labelEixoY: value => `${(value * 100).toFixed(0)}%`,
                            labelTooltip: context => `${context.dataset.label}: ${Math.round(context.raw * 100)}%`
                        })
                        break

                    default:
                        setConfiguraGrafico({
                            tituloGrafico: "Lucro Líquido",
                            tituloEixoY: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            labelEixoY: value => value.toLocaleString("pt-BR"),
                            labelTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                        })
                        break
                }
            })()
        }
    }, [indicadorSelecionado])


    return (
        <div className='w-full'>
            {datasets &&
                <Line
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={datasets}
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
                                position: "bottom",
                                title: {
                                    display: false,
                                },
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    display: false,
                                }
                            },
                            y: {
                                position: 'right',
                                title: configuraGrafico.tituloEixoY,
                                ticks: {
                                    color: "white",
                                    callback: value => configuraGrafico.labelEixoY(value)
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
                                text: `${configuraGrafico.tituloGrafico}`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                //se todos os dados forem nulos, a tooltip nem aparecem. O ideal era que a tooltip aparecesse com a mensagem abaixo.
                                callbacks: {
                                    label: context => context.raw === null ?
                                        `${context.dataset.label}: Dados não disponibilizados pela empresa` :
                                        configuraGrafico.labelTooltip(context),
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