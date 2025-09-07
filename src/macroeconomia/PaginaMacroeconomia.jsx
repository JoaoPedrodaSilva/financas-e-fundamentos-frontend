import { useState, useEffect } from "react"
import { GraficoMacroeconomia } from "./GraficoMacroeconomia"

export const PaginaMacroeconomia = () => {    
    const [quantidadeMeses, setQuantidadeMeses] = useState(36) //fazer um select para usuário escolher
    const [todosIndicadores, setTodosIndicadores] = useState(null)

    const [leiaMaisIpcaDozeMeses, setLeiaMaisIpcaDozeMeses] = useState(false)
    const [ipcaDozeMeses, setIpcaDozeMeses] = useState(null)

    const [leiaMaisSelicMeta, setLeiaMaisSelicMeta] = useState(false)
    const [selicMeta, setSelicMeta] = useState(null)

    const [leiaMaisDolarEua, setLeiaMaisDolarEua] = useState(false)
    const [dolarEua, setDolarEua] = useState(null)


    const nomeMeses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/macroeconomia/`)
            .then(response => response.json())
            .then(data => {
                const todosIndicadores = data.todosIndicadores

                const dadosCadastraisIpcaDozeMeses = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "1")[0]
                const historicoValoresIpcaDozeMeses = data.historicoValoresIpcaDozeMeses.slice(-quantidadeMeses).map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))


                const dadosCadastraisSelicMeta = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "2")[0]
                const historicoValoresSelicMeta = data.historicoValoresSelicMeta.slice(-quantidadeMeses).map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))


                const dadosCadastraisDolarEua = todosIndicadores.filter(cadaIndicador => cadaIndicador.id === "5")[0]
                const historicoValoresDolarEua = data.historicoValoresDolarEua.slice(-quantidadeMeses).map(cadaCompetencia => (
                    {
                        competencia: `${nomeMeses[new Date(cadaCompetencia.competencia).getUTCMonth()]} / ${new Date(cadaCompetencia.competencia).getUTCFullYear()}`,
                        valor: cadaCompetencia.valor === null ? null : Number(cadaCompetencia.valor).toFixed(2)
                    }
                ))

                //colocar quantidade de meses aqui

                setTodosIndicadores(todosIndicadores)
                setIpcaDozeMeses({ dadosCadastraisIpcaDozeMeses, historicoValoresIpcaDozeMeses })
                setSelicMeta({ dadosCadastraisSelicMeta, historicoValoresSelicMeta })
                setDolarEua({ dadosCadastraisDolarEua, historicoValoresDolarEua })

            })
            .catch(error => console.error(error))
    }, [])


    //render when data arrives
    //renderiza quando os dados chegarem
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

                {/* selected metric long description */}
                {/* descrição longa do indicador selecionado */}
                <div className="w-full flex flex-col text-white px-1 text-xs lg:text-lg">
                    <article className="my-3 text-justify">
                        <div className="flex gap-2">
                            <h1>{dolarEua.dadosCadastraisDolarEua.indicador}:</h1>
                            <p
                                className="text-gray-400 cursor-pointer"
                                onClick={() => setLeiaMaisDolarEua(leiaMaisDolarEua => !leiaMaisDolarEua)}>
                                {leiaMaisDolarEua ? "(Entendi)" : "(Clique aqui para ver a descrição completa)"}
                            </p>
                        </div>
                        <p>
                            {leiaMaisDolarEua && dolarEua.dadosCadastraisDolarEua.descricao_longa}
                        </p>
                    </article>

                    <article className="my-3 text-justify">
                        <div className="flex gap-2">
                            <h1>{ipcaDozeMeses.dadosCadastraisIpcaDozeMeses.indicador}:</h1>
                            <p
                                className="text-gray-400 cursor-pointer"
                                onClick={() => setLeiaMaisIpcaDozeMeses(leiaMaisIpcaDozeMeses => !leiaMaisIpcaDozeMeses)}>
                                {leiaMaisIpcaDozeMeses ? "(Entendi)" : "(Clique aqui para ver a descrição completa)"}
                            </p>
                        </div>
                        <p>
                            {leiaMaisIpcaDozeMeses && ipcaDozeMeses.dadosCadastraisIpcaDozeMeses.descricao_longa}
                        </p>
                    </article>


                    <article className="my-3 text-justify">
                        <div className="flex gap-2">
                            <h1>{selicMeta.dadosCadastraisSelicMeta.indicador}:</h1>
                            <p
                                className="text-gray-400 cursor-pointer"
                                onClick={() => setLeiaMaisSelicMeta(leiaMaisSelicMeta => !leiaMaisSelicMeta)}>
                                {leiaMaisSelicMeta ? "(Entendi)" : "(Clique aqui para ver a descrição completa)"}
                            </p>
                        </div>
                        <p>
                            {leiaMaisSelicMeta && selicMeta.dadosCadastraisSelicMeta.descricao_longa}
                        </p>
                    </article>
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
