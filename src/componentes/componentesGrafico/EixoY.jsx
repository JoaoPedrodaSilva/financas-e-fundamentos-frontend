export const EixoY = ({ escalaEixoY, larguraInterna, formatoAcessorioY, corGrade }) => (

    escalaEixoY.ticks().map((tick, index) => (
        <g key={index} transform={`translate(${larguraInterna}, ${escalaEixoY(tick)})`}>
            <line
                className={corGrade}
                x2={-larguraInterna}
            />
            <text
                className="fill-white"
                style={{ textAnchor: "start" }} // tailwind property for this??
                dx="0.5rem"
                dy="0.3rem"
            > 
                {formatoAcessorioY(tick).replace(",", ".")}
            </text>
        </g>
    ))
)
