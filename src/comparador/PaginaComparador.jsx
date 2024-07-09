import { useState, useEffect } from "react"
import { GraficoComparador } from "./GraficoComparador"

export const PaginaComparador = () => {
    const [dadosCadastraisDeTodasEmpresas, setDadosCadastraisDeTodasEmpresas] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("lucroLiquido")
    const [tresCodigosBaseSelecionados, setTresCodigosBaseSelecionados] = useState(["ARZZ", "LREN", "GUAR"])
    const [dadosCompletosDasTresEmpresasSelecionadas, setDadosCompletosDasTresEmpresasSelecionadas] = useState(null)


    //fetch all companies and its registration data - used to fill the companies dropdown
    //busca todas as empresas e seus dados cadastrais - usado para preencher o dropdown de seleção de empresas
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setDadosCadastraisDeTodasEmpresas(data.dadosCadastraisDeTodasEmpresas))
            .catch(error => console.error(error))
    }, [])


    //fetch the three selected company registration and financial data
    //busca os dados cadastrais e financeiros das três empresas selecionadas
    useEffect(() => {
        Promise.all(tresCodigosBaseSelecionados.map(cadaCodigoBaseSelecionado => (
            fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/${cadaCodigoBaseSelecionado}/`)
                .then(response => response.json())
                .then(data => data.dadosCompletosDaEmpresaSelecionada)
                .catch(error => console.error(error))
        ))).then(data => setDadosCompletosDasTresEmpresasSelecionadas({
            primeiraEmpresaSelecionada: data[0],
            segundaEmpresaSelecionada: data[1],
            terceiraEmpresaSelecionada: data[2]
        }))
    }, [tresCodigosBaseSelecionados])


    //create an array with all the years of the three selected companies - used as labels of the chart (x axis)
    //cria um array que inclui todos os anos das três empresas selecionadas - usado como labels do gráfico (eixo x)
    const todosAnosUnicos = () => {
        if (dadosCompletosDasTresEmpresasSelecionadas.primeiraEmpresaSelecionada && dadosCompletosDasTresEmpresasSelecionadas.segundaEmpresaSelecionada && dadosCompletosDasTresEmpresasSelecionadas.terceiraEmpresaSelecionada) {
            let todosAnosUnicosParaRetorno = []
            const anosUnicosTemp = [
                ...dadosCompletosDasTresEmpresasSelecionadas.primeiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano),
                ...dadosCompletosDasTresEmpresasSelecionadas.segundaEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano),
                ...dadosCompletosDasTresEmpresasSelecionadas.terceiraEmpresaSelecionada.dadosFinanceiros.map(cadaExercicioFinanceiro => cadaExercicioFinanceiro.ano)
            ]
            anosUnicosTemp.map(cadaAno => {
                if (!todosAnosUnicosParaRetorno.includes(cadaAno)) {
                    todosAnosUnicosParaRetorno.push(cadaAno)
                }
            })
            return todosAnosUnicosParaRetorno
        }
    }


    //render when data arrives
    //renderiza quando os dados chegarem
    if (!dadosCadastraisDeTodasEmpresas || !dadosCompletosDasTresEmpresasSelecionadas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //render when data arrives
    //renderiza quando os dados chegam
    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <div className="w-full lg:max-w-xl flex flex-col gap-3">


                <p className="text-white">Selecione o tipo de gráfico que deseja comparar:</p>
                {/* types of chart dropdown */}
                {/* dropdown dos tipos de gráficos */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={indicadorSelecionado}
                    onChange={event => setIndicadorSelecionado(event.target.value)}
                >
                    <>
                        <option value="receitaLiquida">RECEITA LÍQUIDA</option>
                        <option value="lucroOperacional">LUCRO OPERACIONAL</option>
                        <option value="lucroLiquido">LUCRO LÍQUIDO</option>
                        <option value="patrimonioLiquido">PATRIMÔNIO LÍQUIDO</option>
                        <option value="margemOperacional">MARGEM OPERACIONAL</option>
                        <option value="margemLiquida">MARGEM LÍQUIDA</option>
                        <option value="capexPeloFCO">CAPEX / FCO</option>
                        <option value="payout">PAYOUT</option>
                        <option value="dividaLiquidaPeloEbitda">DÍVIDA LÍQUIDA / EBITDA</option>
                        <option value="dividaBrutaPeloPatrimonioLiquido">DÍVIDA BRUTA / PATRIMÔNIO LÍQUIDO</option>
                        <option value="retornoPeloPatrimonioLiquido">ROE</option>
                    </>
                </select>


                <div className="flex flex-col gap-4 mt-10">
                    <p className="text-white">Selecione as empresas que deseja comparar:</p>
                    {/* companies dropdown */}
                    {/* dropdown das empresas */}
                    {tresCodigosBaseSelecionados.map((_, index) => {
                        return (
                            <select
                                key={index}
                                className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                                value={tresCodigosBaseSelecionados[index]}
                                onChange={event => setTresCodigosBaseSelecionados(tresCodigosBaseSelecionados.map((_, i, array) => (
                                    i === index ? array[i] = event.target.value : array[i]
                                )))}
                            >
                                {dadosCadastraisDeTodasEmpresas.map(cadaEmpresa => (
                                    <option key={cadaEmpresa.id} value={cadaEmpresa.codigoBase}>
                                        {`${cadaEmpresa.codigoBase} - ${cadaEmpresa.nomeEmpresarial}`}
                                    </option>
                                ))}
                            </select>
                        )
                    })}
                </div>
            </div>


            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    {
                        <GraficoComparador
                            indicadorSelecionado={indicadorSelecionado}
                            todosAnosUnicos={todosAnosUnicos()}
                            dadosCompletosDasTresEmpresasSelecionadas={dadosCompletosDasTresEmpresasSelecionadas}
                        />
                    }
                </div>
                <div className='w-full text-white text-right text-xs'>
                    <a href="https://www.b3.com.br" target='_blank' rel='noreferrer'>
                        Fonte: B3 - Brasil, Bolsa, Balcão
                    </a>
                </div>
            </div>
        </section>
    )
}

