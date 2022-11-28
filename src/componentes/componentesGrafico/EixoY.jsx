export const EixoY = ({ escalaEixoY, larguraInterna, formatoAcessorioY }) => (

    escalaEixoY.ticks(8).map((tick, index) => (
        <g key={index} transform={`translate(${larguraInterna}, ${escalaEixoY(tick)})`}>
            <line
                style={{ stroke: "#373737"}}
                x2={-larguraInterna}
            />
            <text
                style={{ textAnchor: "start", fill: "white" }}
                dx="0.5rem"
                dy="0.3rem"
            > 
                {formatoAcessorioY(tick).replace(",", ".")}
            </text>
        </g>
    ))
)
