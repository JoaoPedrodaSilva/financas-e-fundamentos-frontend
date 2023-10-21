import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const BarChart = ({ indicadorSelecionado, dadosCadastrais, historicoValores }) => {
    const corAcessoriosY = ["#eff6ff", "#93c5fd", "#2563eb", "#1e3a8a"]

    const [dadosFinanceiros, setDadosFinanceiros] = useState({
        labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
        datasets: [{
            label: "Receita Líquida",
            data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
            backgroundColor: corAcessoriosY[0],
            borderColor: "white",
            borderWidth: 1
        }]
    })

    useEffect(() => {
        setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: corAcessoriosY[0],
                borderColor: corAcessoriosY[0],
                borderWidth: 0,
                order: 2,
                yAxisID: 'y',
                categoryPercentage: .7,
                barPercentage: 1,
                // datalabels: {
                //     display: false
                // }
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: corAcessoriosY[1],
                borderColor: corAcessoriosY[1],
                borderWidth: 0,
                order: 2,
                yAxisID: 'y',
                categoryPercentage: .7,
                barPercentage: 1
            },
            {
                label: "Lucro Operacional (EBIT)",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: corAcessoriosY[2],
                borderColor: corAcessoriosY[2],
                borderWidth: 0,
                order: 2,
                yAxisID: 'y',
                categoryPercentage: .7,
                barPercentage: 1
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: corAcessoriosY[3],
                borderColor: corAcessoriosY[3],
                borderWidth: 0,
                order: 2,
                yAxisID: 'y',
                categoryPercentage: .7,
                barPercentage: 1
            },
            {
                type: "line",
                label: "Margem Bruta",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemBruta),
                backgroundColor: corAcessoriosY[1],
                borderColor: corAcessoriosY[1],
                borderWidth: 3,
                tension: 0.4,
                order: 1,
                yAxisID: 'y1'
            },
            {
                type: "line",
                label: "Margem Operacional (EBIT)",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemOperacional),
                backgroundColor: corAcessoriosY[2],
                borderColor: corAcessoriosY[2],
                borderWidth: 3,
                tension: 0.4,
                order: 1,
                yAxisID: 'y1',
            },
            {
                type: "line",
                label: "Margem Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.margemLiquida),
                backgroundColor: corAcessoriosY[3],
                borderColor: corAcessoriosY[3],
                borderWidth: 3,
                tension: 0.4,
                order: 1,
                yAxisID: 'y1',
            }]
        })
    }, [dadosCadastrais, indicadorSelecionado])



    return (
        <div className='w-full'>
            <Bar
                data={dadosFinanceiros}
                options={{
                    responsive: true,
                    borderRadius: 10,
                    scales: {
                        x: {
                            beginAtZero: false,
                            title: {
                                display: false,
                                text: "Anos",
                                font: {
                                    size: 11
                                },
                            },
                            stacked: false
                        },
                        y: {
                            beginAtZero: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: "Milhões de R$",
                                font: {
                                    size: 11
                                },
                            },
                            stacked: false
                        },
                        y1: {
                            beginAtZero: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: "Percentual",
                                font: {
                                    size: 11
                                },
                            },
                            stacked: false
                        }
                    },
                    // plugins: {
                    //     datalabels: {
                    //         display: false
                    //     }
                    // }
                }}
            />
        </div>
    )
} 