export const YLabel = ({ yAxisLabel, innerHeight }) => (
    <g>
        <text
            x={(innerHeight / 2)}
            y="-652"
            transform="rotate(90)"
            style={{ fill: "white", letterSpacing: "0.1rem", textAnchor: "middle" }}
        >
            {yAxisLabel}
        </text>
    </g>
)
