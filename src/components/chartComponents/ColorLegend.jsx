import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export const ColorLegend = ({ yAccessors, setYAccessors }) => {


    const toggleAccessorVisibility = (yAccessor) => {
        const tempYAccessors = []

        yAccessors.map(currentYAccessor => {
            if (currentYAccessor.legend === yAccessor.legend) {
                if (currentYAccessor.isVisible) {
                    tempYAccessors.push({ ...yAccessor, isVisible: false })
                } else {
                    tempYAccessors.push({ ...yAccessor, isVisible: true })
                }
            } else {
                tempYAccessors.push({ ...currentYAccessor })
            }
        })

        setYAccessors([...tempYAccessors])
    }

    return (
        <>
            {yAccessors.map((yAccessor, index) => (
                <g
                    key={index}
                    transform={`translate(${105 * index}, ${365})`}
                    style={yAccessor.isVisible ? { cursor: "pointer", opacity: "1" } : { cursor: "pointer", opacity: "0.3" }}
                    onClick={() => toggleAccessorVisibility(yAccessor)}
                >
                    <rect
                        width={190}
                        height={25}
                        x={(index * 120) - 15}
                        rx={5}
                        fill={yAccessor.color}
                    />

                    <text
                        dx="1em"
                        x={index * 120}
                        y={17}
                        style={index === 0 ? { fill: "black", fontSize: "0.8rem" } : { fill: "white", fontSize: "0.8rem" }}
                    >
                        {yAccessor.legend}
                    </text>

                    {yAccessor.isVisible ? (
                        <AiFillEye
                            x={(index * 120) - 10}
                            y={3.2}
                            style={index === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    ) : (
                        <AiFillEyeInvisible
                            x={(index * 120) - 10}
                            y={3.2}
                            style={index === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    )}
                </g>
            ))}
        </>
    )
}

