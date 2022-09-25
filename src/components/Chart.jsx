import { useState, useEffect } from "react"
import { scaleLinear, extent, format } from "d3"
import axios from "../axios"


//import chart components to build the chart
import { Title } from "./chartComponents/Title"
import { XAxis } from "./chartComponents/XAxis"
import { YAxis } from "./chartComponents/YAxis"
import { YLabel } from "./chartComponents/YLabel"
import { Marks } from "./chartComponents/Marks"
import { ColorLegend } from "./chartComponents/ColorLegend"
import { Source } from "./chartComponents/Source"


export const Chart = ({ selectedCompanyId, selectedChart }) => {

    //create states and variables
    const [companyData, setCompanyData] = useState(null)
    const [financialData, setFinancialData] = useState(null)
    const [chartTitle, setChartTitle] = useState(null)
    const [xAccessor] = useState(() => d => d.year)
    const [yAccessor, setYAccessor] = useState(null)
    const [yAccessorTickFormat, setYAccessorTickFormat] = useState(null)
    const [yAxisLabel, setYAxisLabel] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 50, right: 80, bottom: 90, left: 30 }
    const innerWidth = svgWidth - margin.right - margin.left
    const innerHeight = svgHeight - margin.top - margin.bottom


    //create functions
    const getNetDebtByEbitda = (financialData) => {
        const netDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings) - Number(financialData.cash_and_cash_equivalents)

        if (netDebt <= 0) {
            return 0
        }

        const ebitda = Number(financialData.operating_profit) + Number(financialData.depreciation_and_amortization)
        return netDebt / ebitda
    }
    const getGrossDebtByNetWorth = (financialData) => {
        const grossDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings)
        const netWorth = Number(financialData.net_worth)
        return grossDebt / netWorth
    }
    const getYDomainMaxValue = (financialData, firstYAccessor, secondYAccessor, thirdYAccessor) => {
        const tempAllAccessorValues = []
        financialData.map(data => {
            if (firstYAccessor) {
                tempAllAccessorValues.push(firstYAccessor(data))
            }
            if (secondYAccessor) {
                tempAllAccessorValues.push(secondYAccessor(data))
            }
            if (thirdYAccessor) {
                tempAllAccessorValues.push(thirdYAccessor(data))
            }
        })
        return Math.max(...tempAllAccessorValues)
    }


    //get the selected company general and financial data from the database everytime the selected company changes
    useEffect(() => {
        const getGeneralAndFinancialData = async () => {
            try {
                const results = await axios.get(`/api/acoes/${selectedCompanyId}`)

                const tempFinancialData = []
                results.data.financialData.map(data => {
                    tempFinancialData.push({
                        year: Number(data.year),
                        netIncome: Number(data.net_income),
                        operatingProfit: Number(data.operating_profit),
                        netProfit: Number(data.net_profit),                        
                        netDebtByEbitda: getNetDebtByEbitda(data),
                        grossDebtByNetWorth: getGrossDebtByNetWorth(data)
                    })
                })

                setCompanyData(results.data.companyData)
                setFinancialData(tempFinancialData)
            } catch (error) {
                console.log(error)
            }
        }
        getGeneralAndFinancialData()
    }, [selectedCompanyId])

    // change chartTitle, yAxisLabel, YAccessor, yAccessorLegend and yAccessorTickFormat everytime the selected chart changes
    useEffect(() => {

        if (selectedChart === 'profit') {
            setChartTitle('LUCRO')
            setYAxisLabel('Milhões de Reais')
            setYAccessor({
                firstYAccessor: d => d.netIncome,
                firstYAccessorColor: "#d6d6ff",
                firstYAccessorLegend: "Receita líquida",
                secondYAccessor: d => d.operatingProfit,
                secondYAccessorColor: "#4747ff",
                secondYAccessorLegend: "Lucro operacional",
                thirdYAccessor: d => d.netProfit,
                thirdYAccessorColor: "#000066",
                thirdYAccessorLegend: "Lucro líquido",
                // tickFormat: () => format(",") don't know why it does not work
            })
            setYAccessorTickFormat(() => format(","))
            

        } else if (selectedChart === 'debt') {
            setChartTitle('ENDIVIDAMENTO')
            setYAxisLabel('Resultado dos Indicadores')
            setYAccessor({
                firstYAccessor: d => d.netDebtByEbitda,
                firstYAccessorColor: "#d6d6ff",
                firstYAccessorLegend: "Dívida líquida / Ebitda",
                secondYAccessor: d => d.grossDebtByNetWorth,
                secondYAccessorColor: "#4747ff",
                secondYAccessorLegend: "Dívida bruta / Patrimônio líquido",
                // tickFormat: () => format(".1f") don't know why it does not work
            })
            setYAccessorTickFormat(() => format(".1f"))
            
        }
    }, [selectedChart])


    //render in case of no data
    if (!companyData || !financialData) {
        return <pre className="text-white text-center">Loading...</pre>
    }


    //create scales
    const xScale = scaleLinear()
        .domain(extent(financialData, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain([0, getYDomainMaxValue(financialData, yAccessor.firstYAccessor, yAccessor.secondYAccessor, yAccessor.thirdYAccessor)])
        .range([innerHeight, 0])
        .nice()


    //render chart
    return (
        <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <Title
                    chartTitle={chartTitle}
                    companyName={companyData.company}
                    innerWidth={innerWidth}
                />

                <XAxis
                    xScale={xScale}
                    innerHeight={innerHeight}
                />

                <YAxis
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickFormat={yAccessorTickFormat}
                />
                <YLabel
                    yAxisLabel={yAxisLabel}
                    innerHeight={innerHeight}
                />

                <Marks
                    data={financialData}

                    xScale={xScale}
                    xAccessor={xAccessor}

                    yScale={yScale}
                    yAccessor={yAccessor}
                    yAccessorTickFormat={yAccessorTickFormat}
                />

                <ColorLegend
                    yAccessor={yAccessor}
                />

                <Source />
            </g>
        </svg>
    )
}

