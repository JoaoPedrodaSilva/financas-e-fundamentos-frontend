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
    const [yAccessors, setYAccessors] = useState(null)
    const [yAccessorTickFormat, setYAccessorTickFormat] = useState(null)
    const [yAxisLabel, setYAxisLabel] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 50, right: 80, bottom: 90, left: 30 }
    const innerWidth = svgWidth - margin.right - margin.left
    const innerHeight = svgHeight - margin.top - margin.bottom


    //create functions
    const getYDomainMaxValue = (financialData, yAccessors) => {
        const tempVisibleAccessors = []
        financialData.map(yearOfData => {
            yAccessors.map(yAccessor => {
                if (yAccessor.isVisible) {
                    tempVisibleAccessors.push(yAccessor.accessor(yearOfData))
                }
            })
        })
        return Math.max(...tempVisibleAccessors)
    }

    const getNetDebtByEbitda = (financialData) => {
        const netDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings) - Number(financialData.cash_and_cash_equivalents)

        if (netDebt <= 0) {
            return 0
        }

        const ebitda = Number(financialData.operating_income) + Number(financialData.depreciation_and_amortization)
        return netDebt / ebitda
    }

    const getGrossDebtByNetWorth = (financialData) => {
        const grossDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings)
        const netWorth = Number(financialData.equity)
        return grossDebt / netWorth
    }

    const getReturnOnEquity = (financialData) => {
        const returnOnEquity = Number(financialData.net_income) / Number(financialData.equity)
        return returnOnEquity
    }

    const getReturnOnAssets = (financialData) => {
        const returnOnAssets = Number(financialData.net_income) / Number(financialData.assets)
        return returnOnAssets
    }


    // Everytime the selected company changes, this useEffect do the following:
    // 1 - get the selected company general and financial data from the database 
    // 2 - make all yAccessors visible
    useEffect(() => {
        const getGeneralAndFinancialData = async () => {
            try {
                const results = await axios.get(`/api/acoes/${selectedCompanyId}`)

                const tempFinancialData = []
                results.data.financialData.map(data => {
                    tempFinancialData.push({
                        year: Number(data.year),
                        netRevenue: Number(data.net_revenue),
                        operatingIncome: Number(data.operating_income),
                        netIncome: Number(data.net_income),
                        netDebtByEbitda: getNetDebtByEbitda(data),
                        grossDebtByNetWorth: getGrossDebtByNetWorth(data),
                        returnOnEquity: getReturnOnEquity(data),
                        returnOnAssets: getReturnOnAssets(data),
                    })
                })

                setCompanyData(results.data.companyData)
                setFinancialData(tempFinancialData)

                if (selectedChart === 'income') {
                    setYAccessors([
                        {
                            accessor: d => d.netRevenue,
                            color: "#d6d6ff",
                            legend: "Receita líquida",
                            isVisible: true
                        },
                        {
                            accessor: d => d.operatingIncome,
                            color: "#4747ff",
                            legend: "Lucro operacional (EBIT)",
                            isVisible: true
                        },
                        {
                            accessor: d => d.netIncome,
                            color: "#000066",
                            legend: "Lucro líquido",
                            isVisible: true
                        }
                    ])
                } else if (selectedChart === 'debt') {
                    setYAccessors([
                        {
                            accessor: d => d.netDebtByEbitda,
                            color: "#d6d6ff",
                            legend: "Dívida líquida / ebitda",
                            isVisible: true
                        },
                        {
                            accessor: d => d.grossDebtByNetWorth,
                            color: "#4747ff",
                            legend: "Dívida bruta / pat. líquido",
                            isVisible: true
                        }
                    ])
                } else if (selectedChart === 'eficiency') {
                    setYAccessors([
                        {
                            accessor: d => d.returnOnEquity,
                            color: "#d6d6ff",
                            legend: "Retorno / pat. líquido (ROE)",
                            isVisible: true
                        },
                        {
                            accessor: d => d.returnOnAssets,
                            color: "#4747ff",
                            legend: "Retorno / ativos (ROA)",
                            isVisible: true
                        }
                    ])
                }

            } catch (error) {
                console.log(error)
            }
        }
        getGeneralAndFinancialData()
    }, [selectedCompanyId])

    // change chartTitle, yAxisLabel, YAccessor, yAccessorLegend and yAccessorTickFormat everytime the selected chart changes
    useEffect(() => {
        if (selectedChart === 'income') {
            setChartTitle('LUCRO')
            setYAxisLabel('Milhões de Reais')
            setYAccessors([
                {
                    accessor: d => d.netRevenue,
                    color: "#d6d6ff",
                    legend: "Receita líquida",
                    isVisible: true
                },
                {
                    accessor: d => d.operatingIncome,
                    color: "#4747ff",
                    legend: "Lucro operacional (EBIT)",
                    isVisible: true
                },
                {
                    accessor: d => d.netIncome,
                    color: "#000066",
                    legend: "Lucro líquido",
                    isVisible: true
                }
            ])
            setYAccessorTickFormat(() => format(","))

        } else if (selectedChart === 'debt') {
            setChartTitle('ENDIVIDAMENTO')
            setYAxisLabel('Resultado dos Indicadores')
            setYAccessors([
                {
                    accessor: d => d.netDebtByEbitda,
                    color: "#d6d6ff",
                    legend: "Dívida líquida / ebitda",
                    isVisible: true
                },
                {
                    accessor: d => d.grossDebtByNetWorth,
                    color: "#4747ff",
                    legend: "Dívida bruta / pat. líquido",
                    isVisible: true
                }
            ])
            setYAccessorTickFormat(() => format(".1f"))
        } else if (selectedChart === 'eficiency') {
            setChartTitle('EFICIÊNCIA')
            setYAxisLabel('Resultado dos Indicadores')
            setYAccessors([
                {
                    accessor: d => d.returnOnEquity,
                    color: "#d6d6ff",
                    legend: "Retorno / pat. líquido (ROE)",
                    isVisible: true
                },
                {
                    accessor: d => d.returnOnAssets,
                    color: "#4747ff",
                    legend: "Retorno / ativos (ROA)",
                    isVisible: true
                }
            ])
            setYAccessorTickFormat(() => format(".1f"))
        }
    }, [selectedChart])


    //render in case of no data
    if (!companyData || !financialData) {
        return (
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-2/12 sm:w-1/12 rounded-lg" src={require('../../src/loading.gif')} alt="An animation, showing the chart is being loaded." />
            </div>
        )
        // return <pre className="text-white text-center">Loading...</pre>
    }


    //create scales
    const xScale = scaleLinear()
        .domain(extent(financialData, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain([0, getYDomainMaxValue(financialData, yAccessors)])
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
                    yAccessors={yAccessors}
                    yAccessorTickFormat={yAccessorTickFormat}
                />

                <ColorLegend
                    yAccessors={yAccessors}
                    setYAccessors={setYAccessors}
                    getYDomainMaxValue={getYDomainMaxValue}
                    selectedChart={selectedChart}
                />

                <Source />
            </g>
        </svg>
    )
}

