import { line, curveNatural } from "d3"

export const Marks = ({ data, xScale, yScale, xAccessor, yAccessors, yAccessorTickFormat }) => {

    return (
        <>
            {yAccessors.map((yAccessor, index) => (
                yAccessor.isVisible && (
                    <g key={index}>
                        <path
                            d={line()
                                .x(d => xScale(xAccessor(d)))
                                .y(d => yScale(yAccessor.accessor(d)))
                                .curve(curveNatural)
                                (data)
                            }
                            fill="none"
                            stroke={yAccessor.color}
                            strokeWidth={3}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />

                        {data.map((d, i) => (
                            <circle
                                key={i}
                                fill={yAccessor.color}
                                cx={xScale(xAccessor(d))}
                                cy={yScale(yAccessor.accessor(d))}
                                r={4}
                            >
                                {/* <title>
                                    {`Ano: ${xAccessor(d)}  -  ${yAccessor.legend}: ${yAccessorTickFormat(yAccessor.accessor(d))}`}
                                </title> */}
                            </circle>
                        ))}
                    </g>
                )
            ))}
        </>
    )

}

