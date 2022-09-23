import { line, curveNatural } from "d3"

export const Marks = ({ data, xScale, yScale, xAccessor, firstYAccessor, secondYAccessor, yAccessorTickFormat }) => {

    return (
        <g>
            {/* first y accessor line */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(firstYAccessor(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* first y accessor circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    fill="white"
                    cx={xScale(xAccessor(d))}
                    cy={yScale(firstYAccessor(d))}
                    r={4}
                >
                    {/* <title>
                        {`Ano: ${xAccessor(d)}  -  Lucro Líquido: R$ ${yAccessorTickFormat(yAccessor(d)).replace(",", ".")}.000,00`}
                    </title> */}
                </circle>
            ))}

            {/* second y accessor line */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(secondYAccessor(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="skyblue"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* second y accessor circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    fill="skyblue"
                    cx={xScale(xAccessor(d))}
                    cy={yScale(secondYAccessor(d))}
                    r={4}
                >
                    {/* <title>
                        {`Ano: ${xAccessor(d)}  -  Lucro Líquido: R$ ${yAccessorTickFormat(yAccessor(d)).replace(",", ".")}.000,00`}
                    </title> */}
                </circle>
            ))}
        </g>
    )
}
