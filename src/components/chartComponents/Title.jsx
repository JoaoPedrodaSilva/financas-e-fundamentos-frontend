export const Title = ({ companyName, companyCode, innerWidth }) => (
    <g>
        <text
            style={{ fill: "white", textAnchor: "middle" }}
            x={innerWidth / 2}
            y="-30"
        >
            {companyCode} - {companyName} - LUCRO LÍQUIDO
        </text>
    </g>
)
