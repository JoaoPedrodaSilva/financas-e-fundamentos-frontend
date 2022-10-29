import { useState, useEffect } from "react"
import { scaleLinear, extent, format } from "d3"
import axios from "../axios"


//importing chart components to build the chart
import { Title } from "./chartComponents/Title"
import { XAxis } from "./chartComponents/XAxis"
import { YAxis } from "./chartComponents/YAxis"
import { Marks } from "./chartComponents/Marks"
import { ColorLegend } from "./chartComponents/ColorLegend"
import { Source } from "./chartComponents/Source"
import { useParams } from "react-router-dom"


export const Chart = ({ selectedChart }) => {

    //declaring states and variables   
    const { code } = useParams()
    const [companyData, setCompanyData] = useState(null)
    const [financialData, setFinancialData] = useState(null)
    const [chartTitle, setChartTitle] = useState(null)
    const [xAccessor] = useState(() => d => d.year)
    const [yAccessors, setYAccessors] = useState(null)
    const [yAccessorTickFormat, setYAccessorTickFormat] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 40, right: 60, bottom: 80, left: 30 }
    const innerWidth = svgWidth - margin.right - margin.left
    const innerHeight = svgHeight - margin.top - margin.bottom


    //declaring functions
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
    const getYDomainMinValue = (financialData, yAccessors) => {
        const tempVisibleAccessors = []
        financialData.map(yearOfData => {
            yAccessors.map(yAccessor => {
                if (yAccessor.isVisible) {
                    tempVisibleAccessors.push(yAccessor.accessor(yearOfData))
                }
            })
        })
        return Math.min(...tempVisibleAccessors)
    }

    const refreshYAccessors = () => {
        if (selectedChart === 'income') {
            setYAccessors([
                {
                    accessor: d => d.netRevenue,
                    color: "#d6d6ff",
                    legend: "Receita líquida",
                    isVisible: false
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
    }

    const refreshChartType = () => {
        if (selectedChart === 'income') {
            setChartTitle('LUCRO (EM MILHÕES DE REAIS)')
            setYAccessorTickFormat(() => format(","))
        } else if (selectedChart === 'debt') {
            setChartTitle('ENDIVIDAMENTO')
            setYAccessorTickFormat(() => format(".1f"))
        } else if (selectedChart === 'eficiency') {
            setChartTitle('EFICIÊNCIA')
            setYAccessorTickFormat(() => format(",.0%"))
        }
    }

    const getNetDebtByEbitda = (financialData) => {
        const netDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings) - Number(financialData.cash_and_cash_equivalents)
        const ebitda = Number(financialData.operating_income) + Number(financialData.depreciation_and_amortization)

        if (netDebt <= 0 || ebitda <= 0) {
            return 0
        }
        
        return netDebt / ebitda
    }

    const getGrossDebtByEquity = (financialData) => {
        const grossDebt = Number(financialData.short_term_loans_and_financings) + Number(financialData.long_term_loans_and_financings)
        const equity = Number(financialData.equity)

        if (equity <= 0) {
            return 0
        }
        return grossDebt / equity
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
                const results = await axios.get(`/api/acoes/${code}`)

                const tempFinancialData = []
                results.data.financialData.map(data => {
                    tempFinancialData.push({
                        year: Number(data.year),
                        netRevenue: Number(data.net_revenue),
                        operatingIncome: Number(data.operating_income),
                        netIncome: Number(data.net_income),
                        netDebtByEbitda: getNetDebtByEbitda(data),
                        grossDebtByNetWorth: getGrossDebtByEquity(data),
                        returnOnEquity: getReturnOnEquity(data),
                        returnOnAssets: getReturnOnAssets(data),
                    })
                })

                setCompanyData(results.data.companyData)
                setFinancialData(tempFinancialData)
                refreshYAccessors()

            } catch (error) {
                console.log(error)
            }
        }
        getGeneralAndFinancialData()
    }, [code])

    // change chartTitle, yAxisLabel, YAccessors, yAccessorLegend and yAccessorTickFormat everytime the selected chart changes
    useEffect(() => {
        refreshYAccessors()
        refreshChartType()
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


    //declaring scales
    const xScale = scaleLinear()
        .domain(extent(financialData, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain([getYDomainMinValue(financialData, yAccessors), getYDomainMaxValue(financialData, yAccessors)])
        .range([innerHeight, 0])
        .nice()


    //rendering chart
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

                <Marks
                    data={financialData}
                    selectedChart={selectedChart}

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

