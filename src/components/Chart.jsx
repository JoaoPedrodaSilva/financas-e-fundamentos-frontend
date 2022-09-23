import { useState, useEffect } from "react"
import { scaleLinear, extent, max, format } from "d3"
import axios from "../axios"


//import chart components to build the chart
import { Title } from "./chartComponents/Title"
import { XAxis } from "./chartComponents/XAxis"
import { YAxis } from "./chartComponents/YAxis"
import { YLabel } from "./chartComponents/YLabel"
import { Marks } from "./chartComponents/Marks"
import { Source } from "./chartComponents/Source"


export const Chart = ({ selectedCompanyId, selectedChart }) => {

    //create states and variables
    const [companyData, setCompanyData] = useState(null)
    const [financialData, setFinancialData] = useState(null)
    const [xAccessor, setXAccessor] = useState(null)
    const [yAccessor, setYAccessor] = useState(null)
    const [yAccessorTickFormat, setYAccessorTickFormat] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 50, right: 20, bottom: 50, left: 70 }
    const innerWidth = svgWidth - margin.right - margin.left
    const innerHeight = svgHeight - margin.top - margin.bottom   
    

    // change xAccessor and yAccessor everytime the selected chart changes
    useEffect(() => {
        if (selectedChart === 'profit') {
            setXAccessor(() => d => d.year)
            setYAccessor(() => d => d.netProfit)
            setYAccessorTickFormat(() => format(","))
        } else if (selectedChart === 'debt') {
            setXAccessor(() => d => d.year)
            setYAccessor(() => d => d.netDebtByEbitda)
            setYAccessorTickFormat(() => format(".1f"))
        }
    }, [selectedChart])


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
        .domain([0, max(financialData, yAccessor)])
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
                    companyName={companyData.company}
                    companyCode={companyData.code}
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
                <YLabel />

                <Marks
                    data={financialData}
                    xScale={xScale}
                    yScale={yScale}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    yAccessorTickFormat={yAccessorTickFormat}
                />

                <Source />
            </g>
        </svg>
    )
}

