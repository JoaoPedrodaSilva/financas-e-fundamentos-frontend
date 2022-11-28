export const EixoX = ({ escalaEixoX, alturaInterna }) => (
    escalaEixoX.ticks(5).map((tick, index) => (
        <g key={index} transform={`translate(${escalaEixoX(tick)}, 0)`}>
            <line
                style={{ stroke: "#373737" }}
                y2={alturaInterna}
            />
            <text
                style={{ textAnchor: "middle", fill: "white" }}
                y={alturaInterna}
                dy="1.5rem"
            >
                {(tick)}
            </text>
        </g>
    ))
)
