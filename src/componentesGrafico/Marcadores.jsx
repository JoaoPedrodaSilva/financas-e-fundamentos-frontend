import { line } from "d3"


export const Marcadores = ({
    historicoValores, setConfiguracoesTooltip,
    escalaEixoX, acessorioX,
    escalaEixoY, acessoriosY }) => {


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
            {acessoriosY.map((acessorioY, indice) => (
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
            ))}
        </>
    )
}


