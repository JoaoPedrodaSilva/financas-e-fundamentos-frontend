import { line, curveNatural } from "d3"

export const Marks = ({ data, xScale, yScale, xAccessor, yAccessor, yAccessorTickFormat }) => {

    return (
        <g>
            {/* line */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessor(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    fill="white"
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessor(d))}
                    r={4}
                >
                    <title>
                        {`Ano: ${xAccessor(d)}  -  Lucro Líquido: R$ ${yAccessorTickFormat(yAccessor(d)).replace(",", ".")}.000,00`}
                    </title>
                </circle>
            ))}
        </g>
    )
}
