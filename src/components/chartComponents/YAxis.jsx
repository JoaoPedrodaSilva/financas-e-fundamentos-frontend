export const YAxis = ({ yScale, innerWidth, tickFormat }) => (

    yScale.ticks(8).map((tick, index) => (
        <g key={index} transform={`translate(0, ${yScale(tick)})`}>
            <line
                style={{ stroke: "#373737" }}
                x2={innerWidth}
            />
            <text
                style={{ textAnchor: "end", fill: "white" }}
                dx="-0.3rem"
                dy="0.3rem"
            > 
                {tickFormat(tick).replace(",", ".")}
            </text>
        </g>
    ))
)
