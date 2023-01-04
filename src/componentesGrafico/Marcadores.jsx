import { line } from "d3"


export const Marcadores = ({
    historicoValores, configuracoesGrafico, setConfiguracoesTooltip,
    escalaEixoX, acessorioX, larguraColuna,
    escalaEixoY, acessoriosY, alturaInterna }) => {


    const configuraTooltip = (estaVisivel, ano, acessoriosY, historicoValores) => {
        if (!estaVisivel) {
            setConfiguracoesTooltip({
                estaVisivel: false,
                ano: null,
                acessoriosY: []
            })
        } else {
            setConfiguracoesTooltip({
                estaVisivel: estaVisivel,
                ano: ano,
                acessoriosY: acessoriosY && acessoriosY.map(acessorioY => {
                    return ({
                        ...acessorioY,
                        valor: acessorioY.acessorio(historicoValores.filter(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear() === ano)[0])
                    })
                })
            })
        }
    }

    return (
        <>
            {configuracoesGrafico.tipo === "linha" &&
                acessoriosY.map((acessorioY, indice) => (
                    acessorioY.estaVisivel && (
                        <g key={indice}>
                            <path
                                d={line()
                                    .x(d => escalaEixoX(acessorioX(d)))
                                    .y(d => escalaEixoY(acessorioY.acessorio(d)))
                                    (historicoValores)
                                }
                                fill="none"
                                stroke={acessorioY.cor}
                                strokeWidth={3}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            {historicoValores.map((d, i) => (
                                <circle
                                    key={i}
                                    className={`hover:fill-slate-500`}
                                    onMouseEnter={() => configuraTooltip(true, historicoValores[i].ano.getFullYear(), acessoriosY, historicoValores)}
                                    onMouseOut={() => configuraTooltip(false)}
                                    fill={acessorioY.cor}
                                    cx={escalaEixoX(acessorioX(d))}
                                    cy={escalaEixoY(acessorioY.acessorio(d))}
                                    r={4}
                                />
                            ))}
                        </g>
                    )
                ))
            }


            {configuracoesGrafico.tipo === "coluna" &&
                acessoriosY.map((acessorioY, indice) => (
                    acessorioY.estaVisivel && (
                        <g key={indice} transform={`translate(${indice * 17.5}, 0)`}>
                            {historicoValores.map((d, i) => (
                                <rect
                                    key={i}
                                    className={`hover:fill-slate-500`}
                                    onMouseEnter={() => configuraTooltip(true, historicoValores[i].ano.getFullYear(), acessoriosY, historicoValores)}
                                    onMouseOut={() => configuraTooltip(false)}
                                    fill={acessorioY.cor}
                                    x={escalaEixoX(acessorioX(d)) - (larguraColuna / 2)}
                                    y={escalaEixoY(acessorioY.acessorio(d))}
                                    width={larguraColuna / acessoriosY.length}
                                    height={alturaInterna - escalaEixoY(acessorioY.acessorio(d))}
                                />
                            ))}
                        </g>
                    )
                ))
            }

        </>
    )
}


