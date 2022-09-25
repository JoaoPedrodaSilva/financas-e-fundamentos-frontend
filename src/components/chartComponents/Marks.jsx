import { line, curveNatural } from "d3"

export const Marks = ({ data, xScale, yScale, xAccessor, yAccessor, yAccessorTickFormat }) => {

    return (
        <g>
            {/* first y accessor line */}
            {yAccessor.firstYAccessor && (
                <>
                    <path
                        d={line()
                            .x(d => xScale(xAccessor(d)))
                            .y(d => yScale(yAccessor.firstYAccessor(d)))
                            .curve(curveNatural)
                            (data)
                        }
                        fill="none"
                        stroke={yAccessor.firstYAccessorColor}
                        strokeWidth={3}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* first y accessor circles */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            fill={yAccessor.firstYAccessorColor}
                            cx={xScale(xAccessor(d))}
                            cy={yScale(yAccessor.firstYAccessor(d))}
                            r={4}
                        >
                            {/* <title>
                                {`Ano: ${xAccessor(d)}  -  ${yAccessor.firstYAccessorLegend}: R$ ${yAccessorTickFormat(yAccessor.firstYAccessor(d)).replace(",", ".")}.000,00`}
                            </title> */}
                        </circle>
                    ))}
                </>
            )}

            {/* second y accessor line */}
            {yAccessor.secondYAccessor && (
                <>
                    <path
                        d={line()
                            .x(d => xScale(xAccessor(d)))
                            .y(d => yScale(yAccessor.secondYAccessor(d)))
                            .curve(curveNatural)
                            (data)
                        }
                        fill="none"
                        stroke={yAccessor.secondYAccessorColor}
                        strokeWidth={3}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* second y accessor circles */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            fill={yAccessor.secondYAccessorColor}
                            cx={xScale(xAccessor(d))}
                            cy={yScale(yAccessor.secondYAccessor(d))}
                            r={4}
                        >
                            {/* <title>
                                {`Ano: ${xAccessor(d)}  -  ${yAccessor.secondYAccessorLegend}: R$ ${yAccessorTickFormat(yAccessor.secondYAccessor(d)).replace(",", ".")}.000,00`}
                            </title> */}
                        </circle>
                    ))}
                </>
            )}

            {/* third y accessor line */}
            {yAccessor.thirdYAccessor && (
                <>
                    <path
                        d={line()
                            .x(d => xScale(xAccessor(d)))
                            .y(d => yScale(yAccessor.thirdYAccessor(d)))
                            .curve(curveNatural)
                            (data)
                        }
                        fill="none"
                        stroke={yAccessor.thirdYAccessorColor}
                        strokeWidth={3}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* third y accessor circles */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            fill={yAccessor.thirdYAccessorColor}
                            cx={xScale(xAccessor(d))}
                            cy={yScale(yAccessor.thirdYAccessor(d))}
                            r={4}
                        >
                            {/* <title>
                                {`Ano: ${xAccessor(d)}  -  ${yAccessor.thirdYAccessorLegend}: R$ ${yAccessorTickFormat(yAccessor.thirdYAccessor(d)).replace(",", ".")}.000,00`}
                            </title> */}
                        </circle>
                    ))}
                </>
            )}

        </g>
    )
}
