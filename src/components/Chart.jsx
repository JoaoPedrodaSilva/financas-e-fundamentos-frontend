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


export const Chart = ({ selectedCompanyId }) => {
    //create states and variables
    const [companyData, setCompanyData] = useState(null)
    const [profitHistory, setProfitHistory] = useState(null)

    const svgWidth = 700
    const svgHeight = 450
    const margin = { top: 50, right: 20, bottom: 50, left: 70 }
    const innerWidth = svgWidth - margin.right - margin.left
    const innerHeight = svgHeight - margin.top - margin.bottom

    const xAccessor = d => Number(d.year)
    const yAccessor = d => Number(d.net_profit)
    const yAccessorTickFormat = format(",")


    //get the selected company data and its profit from the database everytime the selected company changes
    useEffect(() => {
        const getCompanyDataAndProfit = async () => {
            try {
                const companyDataAndProfitHistory = await axios.get(`/api/acoes/${selectedCompanyId}`)
                setCompanyData(companyDataAndProfitHistory.data.companyData)
                setProfitHistory(companyDataAndProfitHistory.data.profitHistory)

            } catch (error) {
                console.log(error)
            }
        }
        getCompanyDataAndProfit()
    }, [selectedCompanyId])


    //render in case of no data
    if (!companyData || !profitHistory) {
        return <pre>Loading...</pre>
    }


    //create scales
    const xScale = scaleLinear()
        .domain(extent(profitHistory, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain([0, max(profitHistory, yAccessor)])
        .range([innerHeight, 0])
        .nice()


    //render bar chart
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
                    data={profitHistory}
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

