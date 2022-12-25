import { line } from "d3"

export const Marcadores = ({ dados, graficoSelecionado, escalaEixoX, escalaEixoY, acessorioX, acessoriosY, formatoAcessorioY }) => (
    <>
        {acessoriosY.map((acessorioY, indice) => (
            acessorioY.estaVisivel && (
                <g key={indice}>
                    <path
                        d={line()
                            .x(d => escalaEixoX(acessorioX(d)))
                            .y(d => escalaEixoY(acessorioY.acessorio(d)))
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
                                    {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: R$ ${formatoAcessorioY(acessorioY.acessorio(d)).replace(",", ".")}.000,00`}
                                </title>
                            ) : (
                                <title>
                                    {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.acessorio(d))}`}
                                </title>
                            )}
                        </circle>
                    ))}
                </g>
            )
        ))}
    </>
)


