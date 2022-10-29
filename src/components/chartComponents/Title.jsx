export const Title = ({ chartTitle, companyName, innerWidth }) => (
    <g>
        <text
            style={{ fill: "white", textAnchor: "middle" }}
            x={innerWidth / 2}
            y="-20"
        >
            {companyName.toUpperCase()} - {chartTitle}
        </text>
    </g>
)
