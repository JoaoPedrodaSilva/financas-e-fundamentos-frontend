export const YLabel = ({ yLabel, innerHeight }) => (
    // <g transform={`translate(-55, 250)`}>
        <g>
        <text
            x={-(innerHeight / 2)}
            y='-50'
            transform="rotate(-90)"
            style={{ fill: "white", letterSpacing: "0.1rem", textAnchor: "middle" }}
        >
            {yLabel}
        </text>
    </g>
)
