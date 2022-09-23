export const Title = ({ title, companyName, innerWidth }) => (
    <g>
        <text
            style={{ fill: "white", textAnchor: "middle" }}
            x={innerWidth / 2}
            y="-30"
        >
            {companyName} - {title}
        </text>
    </g>
)
