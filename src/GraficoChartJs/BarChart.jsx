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
                borderColor: "white",
                borderWidth: 1
            }]
        })
    }, [dadosCadastrais, indicadorSelecionado])



    return (
        <div className='w-full'>
            <Bar
                data={dadosFinanceiros}
                // options={{
                //     scales: {
                //         y: {
                //             beginAtZero: true
                //         }
                //     }}
                // }
            />
        </div>
    )
} 