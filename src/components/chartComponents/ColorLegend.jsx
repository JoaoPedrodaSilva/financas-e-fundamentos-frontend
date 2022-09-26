import { useEffect } from "react"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export const ColorLegend = ({ yAccessors, setYAccessors, getYDomainMaxValue, selectedChart }) => {
    const [clickedLegend, setClickedLegend] = useState()


    // const toggleAccessorVisibility = (yAccessor) => {
    //     const tempYAccessors = []

    //     if (yAccessor.legend === clickedLegend) {
    //         console.log(yAccessor)
    //     }



    //     if (yAccessor.legend !== clickedLegend) {
    //         tempYAccessors.push(yAccessor)
    //     } else {
    //         if (yAccessor.visible) {
    //             tempYAccessors.push({
    //                 accessor: yAccessor.accessor,
    //                 color: yAccessor.color,
    //                 legend: yAccessor.legend,
    //                 visible: false
    //             })
    //         } else {
    //             tempYAccessors.push({
    //                 accessor: yAccessor.accessor,
    //                 color: yAccessor.color,
    //                 legend: yAccessor.legend,
    //                 visible: true
    //             })
    //         }
    //     }
    //     console.log(tempYAccessors)
    //     setYAccessors(tempYAccessors)
    // }

    // useEffect(() => {
    //     console.log('re-rendered')
    //     console.log(clickedLegend)
    // }, [clickedLegend, yAccessors])

    return (
        <>
            {yAccessors.map((yAccessor, index) => (
                <g
                    key={index}
                    transform={`translate(${105 * index}, ${350})`}
                    style={yAccessor.visible ? { cursor: "pointer", opacity: "1" } : { cursor: "pointer", opacity: "0.3" }}
                    onClick={() => {
                        // setClickedLegend(yAccessor.legend)
                        // toggleAccessorVisibility(yAccessor)
                    }}
                >
                    <rect
                        width={220}
                        height={21}
                        x={(index * 120) - 15}
                        rx={5}
                        fill={yAccessor.color}
                    />

                    <text
                        dx="1.2em"
                        x={index * 120}
                        y={15}
                        style={index === 0 ? { fill: "black", fontSize: "0.8rem" } : { fill: "white", fontSize: "0.8rem" }}
                    >
                        {yAccessor.legend}
                    </text>

                    {yAccessor.visible ? (
                        <AiFillEye
                            x={(index * 120) - 8}
                            y={2}
                            style={index === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    ) : (
                        <AiFillEyeInvisible
                            x={(index * 120) - 8}
                            y={2}
                            style={index === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    )}
                </g>
            ))}
        </>
    )
}

