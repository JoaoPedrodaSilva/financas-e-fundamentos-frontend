import { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoAcaoIndividual = ({ indicadorSelecionado, dadosCompletosDaEmpresaSelecionada }) => {    

    //states
    const coresPadrao = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const coresBalancoPatrimonial = ["#ccccff", "#9999ff", "#ff7f7f", "#ff3232", "#ffb2b2"]
    const [datasets, setDatasets] = useState(null)
    const [configuracaoDoGrafico, setConfiguracaoDoGrafico] = useState(null)


    useEffect(() => {
        {
            switch (indicadorSelecionado) {
                case "dre":
                    //dre chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - DRE`,
                        labelDaTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR")
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //dre datasets
                    if (!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        // if not financial institution nor holding
                        //se não for instituição financeira nem holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Receita Líquida",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Bruto",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Operacional (EBIT)",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[4],
                                    borderColor: coresPadrao[4],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else if (dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        //if financial institution but not holding
                        //se for instituição financeira mas não holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Receita Líquida",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Bruto",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else {
                        //if holding, no matter if financial intitution or not
                        //se for holding, não importando se é instituição financeira ou não
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Lucro Operacional",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    }

                case "bp":
                    //bp chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - BALANÇO PATRIMONIAL`,
                        labelDaTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
                        escalaY: {
                            position: 'right',
                            stacked: true,
                            title: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR")
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //bp datasets
                    if (!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira || dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        //if not financial institution or if is holding
                        //se não for instituição financeira ou se for holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Ativo Circulante",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ativoCirculante),
                                    backgroundColor: coresBalancoPatrimonial[0],
                                    borderColor: coresBalancoPatrimonial[0],
                                    hidden: true,
                                    borderRadius: 0,
                                    stack: "stack 0",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Ativo Não Circulante",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ativoNaoCirculante),
                                    backgroundColor: coresBalancoPatrimonial[1],
                                    borderColor: coresBalancoPatrimonial[1],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 0",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Passivo Circulante",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.passivoCirculante),
                                    backgroundColor: coresBalancoPatrimonial[2],
                                    borderColor: coresBalancoPatrimonial[2],
                                    hidden: true,
                                    borderRadius: 0,
                                    stack: "stack 1",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Passivo Não Circulante",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.passivoNaoCirculante),
                                    backgroundColor: coresBalancoPatrimonial[3],
                                    borderColor: coresBalancoPatrimonial[3],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 1",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Patrimonio Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                                    backgroundColor: coresBalancoPatrimonial[4],
                                    borderColor: coresBalancoPatrimonial[4],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 2",
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else if (dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        //if financial institution but not holding
                        //se for instituição financeira mas não holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Ativo Total",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ativoTotal),
                                    backgroundColor: coresBalancoPatrimonial[1],
                                    borderColor: coresBalancoPatrimonial[1],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 0",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Passivo Total",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.passivoTotal),
                                    backgroundColor: coresBalancoPatrimonial[3],
                                    borderColor: coresBalancoPatrimonial[3],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 1",
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Patrimonio Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                                    backgroundColor: coresBalancoPatrimonial[4],
                                    borderColor: coresBalancoPatrimonial[4],
                                    hidden: false,
                                    borderRadius: 10,
                                    stack: "stack 2",
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    }

                case "endividamento":
                    //endividamento chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - ENDIVIDAMENTO`,
                        labelDaTooltip: context => `${context.dataset.label}: ${context.raw.toLocaleString("pt-BR")}`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR")
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //endividamento datasets
                    return (
                        setDatasets({
                            labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                            datasets: [{
                                label: "Dívida Líquida / Ebitda",
                                type: "bar",
                                yAxisID: 'y',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.dividaLiquidaPeloEbitda),
                                backgroundColor: coresPadrao[0],
                                borderColor: coresPadrao[0],
                                hidden: false,
                                pointStyle: "rectRounded"
                            },
                            {
                                label: "Dívida Bruta / Patrimônio Líquido",
                                type: "bar",
                                yAxisID: 'y',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.dividaBrutaPeloPatrimonioLiquido),
                                backgroundColor: coresPadrao[1],
                                borderColor: coresPadrao[1],
                                hidden: false,
                                pointStyle: "rectRounded"
                            }]
                        })
                    )

                case "rentabilidade":
                    //rentabilidade chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - RENTABILIDADE`,
                        labelDaTooltip: context => {
                            if (context.dataset.type === "bar") {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`
                            } else {
                                return `${context.dataset.label}: ${(Math.round(context.raw * 100)).toFixed(0)}%`
                            }
                        },
                        escalaY: {
                            position: 'right',
                            title: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => `${(value * 100).toFixed(0)}%`
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            position: 'left',
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR")
                            },
                            grid: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                        }
                    })

                    //rentabilidade datasets
                    return (
                        setDatasets({
                            labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                            datasets: [{
                                label: "ROE",
                                type: "line",
                                yAxisID: 'y',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.retornoPeloPatrimonioLiquido),
                                backgroundColor: coresPadrao[0],
                                borderColor: coresPadrao[0],
                                borderWidth: 3,
                                hidden: false,
                                pointStyle: "line"
                            },
                            {
                                label: "ROA",
                                type: "line",
                                yAxisID: 'y',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.retornoPelosAtivos),
                                backgroundColor: coresPadrao[1],
                                borderColor: coresPadrao[1],
                                borderWidth: 3,
                                hidden: true,
                                pointStyle: "line"
                            },
                            {
                                label: "Lucro Líquido",
                                type: "bar",
                                yAxisID: 'y1',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                backgroundColor: coresPadrao[2],
                                borderColor: coresPadrao[2],
                                borderWidth: 0,
                                hidden: false,
                                pointStyle: "rectRounded"
                            },
                            {
                                label: "Patrimônio Líquido",
                                type: "bar",
                                yAxisID: 'y1',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.patrimonioLiquido),
                                backgroundColor: coresPadrao[3],
                                borderColor: coresPadrao[3],
                                borderWidth: 0,
                                hidden: false,
                                pointStyle: "rectRounded"
                            },
                            {
                                label: "Ativos",
                                type: "bar",
                                yAxisID: 'y1',
                                data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ativoTotal),
                                backgroundColor: coresPadrao[4],
                                borderColor: coresPadrao[4],
                                borderWidth: 0,
                                hidden: true,
                                pointStyle: "rectRounded"
                            }]
                        })
                    )


                case "eficiencia":
                    //eficiencia chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - EFICIÊNCIA`,
                        labelDaTooltip: context => `${context.dataset.label}: ${(Math.round(context.raw * 100)).toFixed(0)}%`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => `${(value * 100).toFixed(0)}%`
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //eficiencia datasets
                    if (dadosCompletosDaEmpresaSelecionada.dadosFinanceiros[dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.length - 1].margemOperacional !== null) {
                        //if margemOperacional of most recent year not null
                        //se a margemOperacional do ano mais recente não for nula
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Margem Bruta",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "line"
                                },
                                {
                                    label: "Margem Operacional",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemOperacional),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "line"
                                },
                                {
                                    label: "Margem Antes dos Tributos",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemAntesTributos),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: true,
                                    pointStyle: "line"
                                },
                                {
                                    label: "Margem Líquida",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "line"
                                }]
                            })
                        )
                    } else {
                        //if margemOperacional of most recent year is null
                        //se a margemOperacional do ano mais recente for nula
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Margem Bruta",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "line"
                                },
                                {
                                    label: "Margem Antes dos Tributos",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemAntesTributos),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "line"
                                },
                                {
                                    label: "Margem Líquida",
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "line"
                                }]
                            })
                        )
                    }

                case "momento":
                    //momento chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - MOMENTO`,
                        labelDaTooltip: context => `${context.dataset.label}: ${(Math.round(context.raw * 100)).toFixed(0)}%`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => `${(value * 100).toFixed(0)}%`
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //momento datasets
                    if (dadosCompletosDaEmpresaSelecionada.dadosFinanceiros[dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.length - 1].capexPelaDA !== null) {
                        //if capexPelaDa of most recent year is not null
                        //se o capexPelaDa do ano mais recent não for nulo
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [
                                    {
                                        label: "Payout",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                                        backgroundColor: coresPadrao[0],
                                        borderColor: coresPadrao[0],
                                        borderWidth: 3,
                                        hidden: false,
                                        pointStyle: "line"
                                    }, {
                                        label: "CAPEX/FCO",
                                        type: "bar",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                                        backgroundColor: coresPadrao[1],
                                        borderColor: coresPadrao[1],
                                        borderWidth: 0,
                                        hidden: false,
                                        pointStyle: "rectRounded"
                                    },
                                    {
                                        label: "CAPEX/D&A",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.capexPelaDA),
                                        type: "bar",
                                        backgroundColor: coresPadrao[2],
                                        borderColor: coresPadrao[2],
                                        borderWidth: 0,
                                        hidden: false,
                                        pointStyle: "rectRounded"
                                    }]
                            })
                        )
                    } else if (dadosCompletosDaEmpresaSelecionada.dadosFinanceiros[dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.length - 1].capexPelaDA === null) {
                        //if capexPelaDa of most recent year is null
                        //se o capexPelaDa do ano mais recent for nulo
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [
                                    {
                                        label: "Payout",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                                        backgroundColor: coresPadrao[0],
                                        borderColor: coresPadrao[0],
                                        borderWidth: 3,
                                        hidden: false,
                                        pointStyle: "line"
                                    }, {
                                        label: "CAPEX/FCO",
                                        type: "bar",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.capexPeloFCO),
                                        backgroundColor: coresPadrao[1],
                                        borderColor: coresPadrao[1],
                                        borderWidth: 0,
                                        hidden: false,
                                        pointStyle: "rectRounded"
                                    }]
                            })
                        )
                    } else if (dadosCompletosDaEmpresaSelecionada.dadosFinanceiros[dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.length - 1].capexPeloFCO === null) {
                        //if capexPelaFCO of most recent year is null
                        //se o capexPelaFCO do ano mais recent for nulo
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [
                                    {
                                        label: "Payout",
                                        data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.payout),
                                        backgroundColor: coresPadrao[0],
                                        borderColor: coresPadrao[0],
                                        borderWidth: 3,
                                        hidden: false,
                                        pointStyle: "line"
                                    }]
                            })
                        )
                    }

                case "liquidez":
                    //liquidez chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - LIQUIDEZ`,
                        labelDaTooltip: context => `${context.dataset.label}: ${context.raw.toLocaleString("pt-BR")}`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR"),
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //liquidez datasets
                    if (dadosCompletosDaEmpresaSelecionada.dadosFinanceiros[dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.length - 1].liquidezSeca !== null) {
                        //if liquidezSeca of most recent year not null
                        //se a liquidezSeca do ano mais recente não for nula
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Liquidez Imediata",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezImediata),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Liquidez Seca",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezSeca),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Liquidez Corrente",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezCorrente),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Liquidez Geral",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezGeral),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else {
                        //if liquidezSeca of most recent year is null
                        //se a liquidezSeca do ano mais recente for nula
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Liquidez Imediata",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezImediata),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Liquidez Corrente",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezCorrente),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Liquidez Geral",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.liquidezGeral),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    }

                default:
                    //dre chart settings
                    setConfiguracaoDoGrafico({
                        tituloDoGrafico: `${dadosCompletosDaEmpresaSelecionada.dadosCadastrais.nomeEmpresarial} - DRE`,
                        labelDaTooltip: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
                        escalaY: {
                            position: 'right',
                            title: {
                                display: true,
                                text: "Milhões de R$",
                                color: "white"
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                color: "white",
                                callback: value => value.toLocaleString("pt-BR")
                            },
                            grid: {
                                display: true,
                                color: "rgba(255,255,255,0.05)"
                            }
                        },
                        escalaY1: {
                            display: false
                        }
                    })

                    //dre datasets
                    if (!dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        // if not financial institution nor holding
                        //se não for instituição financeira nem holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Receita Líquida",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Bruto",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Operacional (EBIT)",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[4],
                                    borderColor: coresPadrao[4],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else if (dadosCompletosDaEmpresaSelecionada.dadosCadastrais.instituicaoFinanceira && !dadosCompletosDaEmpresaSelecionada.dadosCadastrais.holding) {
                        //if financial institution but not holding
                        //se for instituição financeira mas não holding
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Receita Líquida",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: true,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Bruto",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[3],
                                    borderColor: coresPadrao[3],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    } else {
                        //if holding, no matter if financial intitution or not
                        //se for holding, não importando se é instituição financeira ou não
                        return (
                            setDatasets({
                                labels: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.ano),
                                datasets: [{
                                    label: "Lucro Operacional",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                                    backgroundColor: coresPadrao[0],
                                    borderColor: coresPadrao[0],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Antes dos Tributos",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                                    backgroundColor: coresPadrao[1],
                                    borderColor: coresPadrao[1],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                },
                                {
                                    label: "Lucro Líquido",
                                    type: "bar",
                                    yAxisID: 'y',
                                    data: dadosCompletosDaEmpresaSelecionada.dadosFinanceiros.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                                    backgroundColor: coresPadrao[2],
                                    borderColor: coresPadrao[2],
                                    hidden: false,
                                    pointStyle: "rectRounded"
                                }]
                            })
                        )
                    }
            }
        }
    }, [indicadorSelecionado, dadosCompletosDaEmpresaSelecionada])


    return (
        <div className='w-full'>
            {datasets &&
                <Line
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={datasets}
                    options={{
                        responsive: true,
                        tension: 0.4,
                        radius: 0,
                        hoverRadius: 0,
                        borderRadius: 10,
                        categoryPercentage: .7,
                        barPercentage: 1,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            x: {
                                position: "bottom",
                                title: {
                                    display: false
                                },
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    display: false,
                                }
                            },
                            y: configuracaoDoGrafico.escalaY,
                            y1: configuracaoDoGrafico.escalaY1
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `${configuracaoDoGrafico.tituloDoGrafico}`,
                                color: "white",
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => context.raw === null ?
                                        `${context.dataset.label}: Dados não disponibilizados pela empresa` :
                                        configuracaoDoGrafico.labelDaTooltip(context),
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