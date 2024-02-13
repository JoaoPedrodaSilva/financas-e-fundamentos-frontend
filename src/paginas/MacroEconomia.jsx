import { useState, useEffect } from "react"
import { GraficoMacroeconomia } from "../graficosMacroeconomia/GraficoMacroeconomia"
import { useNavigate, useParams, Link } from "react-router-dom"

export const MacroEconomia = () => {
    const navigate = useNavigate()
    const { indicadorParametro } = useParams()
    const [indicadores, setIndicadores] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}/api/macroeconomia/${indicadorParametro}`)
        .then(response => response.json())
        .then(data => {
            const indicadores = data.indicadores
            const dadosCadastrais = indicadores.filter(indicador => indicador.indicador === indicadorParametro)[0]
            const historicoValores = data.historicoValoresIndicadorMacroeconomico.map(exercicioFinanceiro => (
                {
                    ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                    valor: Number(exercicioFinanceiro.valor)
                }
            ))
            setIndicadores(indicadores)
            setIndicadorSelecionado({ dadosCadastrais, historicoValores })
        })
        .catch(error => console.error(error))
    }, [indicadorParametro])


    //render in case of no data
    // renderiza em caso de não haver dados
    if (!indicadorSelecionado) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <section className="w-1/2 lg:max-w-xl flex flex-col gap-3">

                {/* metrics dropdown */}
                {/* dropdown de indicadores */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={indicadorParametro}
                    onChange={event => navigate(`/macroeconomia/${event.target.value}`)}
                >
                    {indicadores && indicadores.map(indicador => (
                        <option key={indicador.id} value={indicador.indicador}>
                            {`${indicador.indicador} (${indicador.descricao_curta})`}
                        </option>
                    ))}
                </select>

                {/* selected metric long description */}
                {/* descrição longa do indicador selecionado */}
                {indicadorSelecionado && (
                    <div className="w-full flex flex-col text-white px-1 text-xs lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Descrição: </span><br />{indicadorSelecionado.dadosCadastrais.descricao_longa}
                        </p>
                    </div>
                )}

                
            </section>

            {/* charts */}
            {/* gráficos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='w-full p-1'>
                    <GraficoMacroeconomia
                        indicadorSelecionado={indicadorSelecionado.dadosCadastrais.indicador}
                        dadosCadastrais={indicadorSelecionado.dadosCadastrais}
                        historicoValores={indicadorSelecionado.historicoValores}
                    />
                </div>
            </section>
        </section>
    )
}
