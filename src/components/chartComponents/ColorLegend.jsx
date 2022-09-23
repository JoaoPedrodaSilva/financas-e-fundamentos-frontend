export const ColorLegend = () => (
    <g transform={`translate(20, 380)`} >
        {/* <text transform={`translate(-6, -25)`} fill="#635f5d">Dummy Text</text> */}
        <g
        // transform={`translate(0, 0)`}
        // fill="white"
        >
            <rect
                width={25}
                height={3}
                x={-25}
                fill="skyblue"
            />
            <circle
                cx={-12.5}
                cy={1.5}
                r={4}
                fill="skyblue"
            />
            <text dy=".32em" dx=".4em" fill="white">
                Lucro Operacional
            </text>
        </g>
        <g
            transform={`translate(210, 0)`}
        // fill="white"
        >
            <rect
                width={25}
                height={3}
                x={-25}
                fill="white"
            />
            <circle
                cx={-12.5}
                cy={1.5}
                r={4}
                fill="white"
            />
            <text dy=".32em" dx=".4em" fill="white">
                Lucro Líquido
            </text>
        </g>
    </g>
)

