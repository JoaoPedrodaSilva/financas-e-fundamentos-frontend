import { useState, useEffect } from "react"
import { GraficoMacroeconomia } from "../graficosMacroeconomia/GraficoMacroeconomia"

export const MacroEconomia = () => {
    const [todosIndicadores, setTodosIndicadores] = useState(null)
    const [ipcaDozeMeses, setIpcaDozeMeses] = useState(null)
    const [selicMeta, setSelicMeta] = useState(null)
    const [dolarEua, setDolarEua] = useState(null)
    
    const nomeMeses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_DEV}api/macroeconomia/`)
            .then(response => response.json())
            .then(data => {
                const todosIndicadores = data.todosIndicadores

                const dadosCadastraisIpcaDozeMeses = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "1")[0]
                const historicoValoresIpcaDozeMeses = data.historicoValoresIpcaDozeMeses.map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))


                const dadosCadastraisSelicMeta = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "2")[0]
                const historicoValoresSelicMeta = data.historicoValoresSelicMeta.map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))


                const dadosCadastraisDolarEua = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "5")[0]
                const historicoValoresDolarEua = data.historicoValoresDolarEua.map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))



                setTodosIndicadores(todosIndicadores)
                setIpcaDozeMeses({ dadosCadastraisIpcaDozeMeses, historicoValoresIpcaDozeMeses })
                setSelicMeta({ dadosCadastraisSelicMeta, historicoValoresSelicMeta })
                setDolarEua({ dadosCadastraisDolarEua, historicoValoresDolarEua })
                
            })
            .catch(error => console.error(error))
    }, [])


    //render in case of no data
    // renderiza em caso de não haver dados
    if (!todosIndicadores || !dolarEua) {
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
                {/* <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    //value={indicadorParametro}
                    onChange={event => event.target.value}
                >
                    {todosIndicadores.map(indicador => (
                        <option key={indicador.id} value={indicador.indicador}>
                            {`${indicador.indicador} (${indicador.descricao_curta})`}
                        </option>
                    ))}
                </select> */}

                {/* selected metric long description */}
                {/* descrição longa do indicador selecionado */}
                <div className="w-full flex flex-col text-white px-1 text-xs lg:text-lg">
                    <p className="my-3 text-justify">
                        <span className="text-gray-400">{dolarEua.dadosCadastraisDolarEua.indicador}: </span><br />{dolarEua.dadosCadastraisDolarEua.descricao_longa}
                    </p>
                    <p className="my-3 text-justify">
                        <span className="text-gray-400">{ipcaDozeMeses.dadosCadastraisIpcaDozeMeses.indicador}: </span><br />{ipcaDozeMeses.dadosCadastraisIpcaDozeMeses.descricao_longa}
                    </p>
                    <p className="my-3 text-justify">
                        <span className="text-gray-400">{selicMeta.dadosCadastraisSelicMeta.indicador}: </span><br />{selicMeta.dadosCadastraisSelicMeta.descricao_longa}
                    </p>
                </div>


            </section>

            {/* charts */}
            {/* gráficos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='w-full p-1'>
                    <GraficoMacroeconomia
                        //indicadorSelecionado={indicadorSelecionado.dadosCadastrais.indicador}                        
                        dadosCadastraisIpcaDozeMeses={ipcaDozeMeses.dadosCadastraisIpcaDozeMeses}
                        historicoValoresIpcaDozeMeses={ipcaDozeMeses.historicoValoresIpcaDozeMeses}
                        dadosCadastraisSelicMeta={selicMeta.dadosCadastraisSelicMeta}
                        historicoValoresSelicMeta={selicMeta.historicoValoresSelicMeta}
                        dadosCadastraisDolarEua={dolarEua.dadosCadastraisDolarEua}
                        historicoValoresDolarEua={dolarEua.historicoValoresDolarEua}
                    />
                </div>
            </section>
        </section>
    )
}
