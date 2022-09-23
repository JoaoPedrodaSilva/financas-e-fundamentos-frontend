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
    const [xAccessor, setXAccessor] = useState(null)
    const [firstYAccessor, setFirstYAccessor] = useState(null)
    const [secondYAccessor, setSecondYAccessor] = useState(null)
    const [yAccessorTickFormat, setYAccessorTickFormat] = useState(null)
    const [yLabel, setYLabel] = useState(null)
    const [title, setTitle] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 50, right: 20, bottom: 80, left: 70 }
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
    const getYDomainMaxValue = (financialData, firstYAccessor, secondYAccessor) => {
        const tempAllAccessorValues = []
        financialData.map(data => {
            tempAllAccessorValues.push(firstYAccessor(data))
            tempAllAccessorValues.push(secondYAccessor(data))
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
                        netProfit: Number(data.net_profit),
                        operatingProfit: Number(data.operating_profit),
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

    // change title, xAccessor, YAccessors and yLabels everytime the selected chart changes
    useEffect(() => {
        if (selectedChart === 'profit') {
            setTitle('LUCRO')
            setXAccessor(() => d => d.year)
            setFirstYAccessor(() => d => d.netProfit)
            setSecondYAccessor(() => d => d.operatingProfit)
            setYAccessorTickFormat(() => format(","))
            setYLabel('Milhões de Reais')
        } else if (selectedChart === 'debt') {
            setTitle('ENDIVIDAMENTO')
            setXAccessor(() => d => d.year)
            setFirstYAccessor(() => d => d.netDebtByEbitda)
            setSecondYAccessor(() => d => d.grossDebtByNetWorth)
            setYAccessorTickFormat(() => format(".1f"))
            setYLabel('Resultado dos Indicadores')
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
        .domain([0, getYDomainMaxValue(financialData, firstYAccessor, secondYAccessor)])
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
                    title={title}
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
                    yLabel={yLabel}
                    innerHeight={innerHeight}
                />

                <Marks
                    data={financialData}

                    xScale={xScale}
                    xAccessor={xAccessor}

                    yScale={yScale}                    
                    firstYAccessor={firstYAccessor}
                    secondYAccessor={secondYAccessor}
                    yAccessorTickFormat={yAccessorTickFormat}
                />

                <ColorLegend />

                <Source />
            </g>
        </svg>
    )
}

