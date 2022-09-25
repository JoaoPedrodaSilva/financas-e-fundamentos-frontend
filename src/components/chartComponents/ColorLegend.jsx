export const ColorLegend = ({ yAccessor }) => (
    <g>
        {/* first yAccessor legend */}
        {yAccessor.firstYAccessor && (
            <g transform={`translate(10, 350)`}>
                <rect
                    width={25}
                    height={2}
                    x={-25}
                    fill={yAccessor.firstYAccessorColor}
                />
                <circle
                    cx={-12.5}
                    cy={1.25}
                    r={4}
                    fill={yAccessor.firstYAccessorColor}
                />
                <text
                    dx=".4em"
                    dy=".32em"
                    style={{ fill: "white", fontSize: "0.8rem" }}
                >
                    {yAccessor.firstYAccessorLegend}
                </text>
            </g>
        )}

        {/* second yAccessor legend */}
        {yAccessor.secondYAccessor && (
            <g transform={`translate(10, 370)`}>
                <rect
                    width={25}
                    height={2}
                    x={-25}
                    fill={yAccessor.secondYAccessorColor}
                />
                <circle
                    cx={-12.5}
                    cy={1.25}
                    r={4}
                    fill={yAccessor.secondYAccessorColor}
                />
                <text dx=".4em"
                    dy=".32em"
                    style={{ fill: "white", fontSize: "0.8rem" }}
                >
                    {yAccessor.secondYAccessorLegend}
                </text>
            </g>
        )}

        {/* third yAccessor legend */}
        {yAccessor.thirdYAccessor && (
            <g transform={`translate(10, 390)`}>
                <rect
                    width={25}
                    height={2}
                    x={-25}
                    fill={yAccessor.thirdYAccessorColor}
                />
                <circle
                    cx={-12.5}
                    cy={1.25}
                    r={4}
                    fill={yAccessor.thirdYAccessorColor}
                />
                <text dx=".4em"
                    dy=".32em"
                    style={{ fill: "white", fontSize: "0.8rem" }}
                >
                    {yAccessor.thirdYAccessorLegend}
                </text>
            </g>
        )}
    </g>
)

