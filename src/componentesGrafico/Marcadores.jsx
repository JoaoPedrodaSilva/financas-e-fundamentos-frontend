import { line } from "d3"

export const Marcadores = ({
    dados, configuracoesGrafico, indicadorSelecionado,
    escalaEixoX, acessorioX, larguraColuna,
    escalaEixoY, acessoriosY, formatoAcessorioY, alturaInterna }) => (
    <>
        {configuracoesGrafico.tipo === "linha" &&
            acessoriosY.map((acessorioY, indice) => (
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
                                {indicadorSelecionado === "dre" ? (
                                    <title>
                                        {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: R$ ${formatoAcessorioY(acessorioY.acessorio(d)).replace(",", ".")}.000,00`}
                                    </title>
                                ) : indicadorSelecionado === "IBOV" ? (
                                    <title>
                                        {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.acessorio(d)).replace(",", ".")}`}
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
            ))
        }


        {configuracoesGrafico.tipo === "coluna" &&
            acessoriosY.map((acessorioY, indice) => (
                acessorioY.estaVisivel && (
                    <g key={indice}>
                        {dados.map((d, i) => (
                            <rect
                                key={i}
                                fill={acessorioY.cor}                             
                                x={escalaEixoX(acessorioX(d)) - (larguraColuna / 2)}
                                y={escalaEixoY(acessorioY.acessorio(d))}
                                width={larguraColuna}
                                height={alturaInterna - escalaEixoY(acessorioY.acessorio(d))}
                            >
                                {console.log(indicadorSelecionado)}
                                {indicadorSelecionado === "EMBI+" ? (
                                    <title>
                                        {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.acessorio(d)).replace(",", ".")}`}
                                    </title>
                                ) : (
                                    <title>
                                        {`Ano: ${acessorioX(d).getFullYear()}  -  ${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.acessorio(d))}`}
                                    </title>
                                )}
                            </rect>
                        ))}
                    </g>
                )
            ))
        }
    </>
)


