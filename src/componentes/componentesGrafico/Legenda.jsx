import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export const Legenda = ({ acessoriosY, setAcessoriosY }) => {


    const toggleAccessorVisibility = (acessorioY) => {
        const tempAcessorsY = []

        acessoriosY.map(acessorioYAtual => {
            if (acessorioYAtual.legenda === acessorioY.legenda) {
                if (acessorioYAtual.estaVisivel) {
                    tempAcessorsY.push({ ...acessorioY, estaVisivel: false })
                } else {
                    tempAcessorsY.push({ ...acessorioY, estaVisivel: true })
                }
            } else {
                tempAcessorsY.push({ ...acessorioYAtual })
            }
        })

        setAcessoriosY([...tempAcessorsY])
    }

    return (
        <>
            {acessoriosY.map((acessorioY, indice) => (
                <g
                    key={indice}
                    transform={`translate(${105 * indice}, ${365})`}
                    style={acessorioY.estaVisivel ? { cursor: "pointer", opacity: "1" } : { cursor: "pointer", opacity: "0.3" }}
                    onClick={() => toggleAccessorVisibility(acessorioY)}
                >
                    <rect
                        width={190}
                        height={25}
                        x={(indice * 120) - 15}
                        rx={5}
                        fill={acessorioY.cor}
                    />

                    <text
                        dx="1em"
                        x={indice * 120}
                        y={17}
                        style={indice === 0 ? { fill: "black", fontSize: "0.8rem" } : { fill: "white", fontSize: "0.8rem" }}
                    >
                        {acessorioY.legenda}
                    </text>

                    {acessorioY.estaVisivel ? (
                        <AiFillEye
                            x={(indice * 120) - 10}
                            y={3.2}
                            style={indice === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    ) : (
                        <AiFillEyeInvisible
                            x={(indice * 120) - 10}
                            y={3.2}
                            style={indice === 0 ? { fill: "black", fontSize: "1.2rem" } : { fill: "white", fontSize: "1.2rem" }}
                        />
                    )}
                </g>
            ))}
        </>
    )
}

