export const EixoX = ({ escalaEixoX, alturaInterna, corGrade }) => (
    escalaEixoX.ticks().map((tick, index) => (
        
        <g key={index} transform={`translate(${escalaEixoX(tick)}, 0)`}>
            <line
                className={corGrade}
                y2={alturaInterna}
            />
            <text
                className="fill-white"
                style={{ textAnchor: "middle" }} // tailwind property for this??
                y={alturaInterna}
                dy="1.5rem"
            >
                {tick.getFullYear()}
            </text>
        </g>
    ))
)
