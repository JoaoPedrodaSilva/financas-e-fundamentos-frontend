import { line, curveNatural } from "d3"

export const Marcadores = ({ dados, graficoSelecionado, escalaEixoX, escalaEixoY, acessorioX, acessoriosY, formatoAcessorioY }) => {

    return (
        <>
            {acessoriosY.map((acessorioY, indice) => (
                acessorioY.estaVisivel && (
                    <g key={indice}>
                        <path
                            d={line()
                                .x(d => escalaEixoX(acessorioX(d)))
                                .y(d => escalaEixoY(acessorioY.acessorio(d)))
                                // .curve(curveNatural)
                                (dados)
                            }
                            fill="none"
                            stroke={acessorioY.cor}
                            strokeWidth={3}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />

                        {dados.map((d, i) => (
                            <circle
                                key={i}
                                fill={acessorioY.cor}
                                cx={escalaEixoX(acessorioX(d))}
                                cy={escalaEixoY(acessorioY.acessorio(d))}
                                r={4}
                            >
                                {graficoSelecionado === "dre" ? (
                                    <title>
                                        {`Ano: ${acessorioX(d)}  -  ${acessorioY.legend}: R$ ${formatoAcessorioY(acessorioY.acessorio(d)).replace(",", ".")}.000,00`}
                                    </title>
                                ) : (
                                    <title>
                                        {`Ano: ${acessorioX(d)}  -  ${acessorioY.legend}: ${formatoAcessorioY(acessorioY.acessorio(d))}`}
                                    </title>
                                )}
                            </circle>
                        ))}
                    </g>
                )
            ))}
        </>
    )
}

