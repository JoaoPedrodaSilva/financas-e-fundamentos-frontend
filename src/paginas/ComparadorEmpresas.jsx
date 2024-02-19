import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from "react"
import { GraficoComparadorEmpresas } from "../graficosComparadorEmpresas/GraficoComparadorEmpresas"

export const ComparadorEmpresas = () => {
    const [todasEmpresas, setTodasEmpresas] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("lucroLiquido")
    const [primeiroCodigoSelecionado, setPrimeiroCodigoSelecionado] = useState("ARZZ")
    const [segundoCodigoSelecionado, setSegundoCodigoSelecionado] = useState("LREN")
    const [terceiroCodigoSelecionado, setTerceiroCodigoSelecionado] = useState("GUAR")
    const [primeiraEmpresaSelecionada, setPrimeiraEmpresaSelecionada] = useState(null)
    const [segundaEmpresaSelecionada, setSegundaEmpresaSelecionada] = useState(null)
    const [terceiraEmpresaSelecionada, setTerceiraEmpresaSelecionada] = useState(null)


    //fetch all companies
    //busca todas as empresas
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}api/acoes/`)
            .then(response => response.json())
            .then(data => {
                const empresas = data.empresas.map(empresa => {
                    return ({
                        id: empresa.id,
                        cnpj: empresa.cnpj,
                        codigoBase: empresa.codigo_base,
                        codigosNegociacao: empresa.codigos_negociacao,
                        nomeEmpresarial: empresa.nome_empresarial,
                        segmentoListagem: empresa.segmento_listagem,
                        escriturador: empresa.escriturador,
                        classificacaoSetorial: empresa.classificacao_setorial,
                        atividadePrincipal: empresa.atividade_principal,
                        instituicaoFinanceira: empresa.instituicao_financeira,
                        holding: empresa.holding
                    })
                })
                setTodasEmpresas(empresas)
            })
            .catch(error => console.error(error))
    }, [])


    //fetch first selected company
    //busca primeira empresa selecionada
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}api/acoes/${primeiroCodigoSelecionado}`)
            .then(response => response.json())
            .then(data => {

                const dadosCadastrais = {
                    id: data.dadosEmpresaSelecionada[0].id,
                    cnpj: data.dadosEmpresaSelecionada[0].cnpj,
                    codigoBase: data.dadosEmpresaSelecionada[0].codigo_base,
                    codigosNegociacao: data.dadosEmpresaSelecionada[0].codigos_negociacao,
                    nomeEmpresarial: data.dadosEmpresaSelecionada[0].nome_empresarial,
                    segmentoListagem: data.dadosEmpresaSelecionada[0].segmento_listagem,
                    escriturador: data.dadosEmpresaSelecionada[0].escriturador,
                    classificacaoSetorial: data.dadosEmpresaSelecionada[0].classificacao_setorial,
                    atividadePrincipal: data.dadosEmpresaSelecionada[0].atividade_principal,
                    instituicaoFinanceira: data.dadosEmpresaSelecionada[0].instituicao_financeira,
                    holding: data.dadosEmpresaSelecionada[0].holding
                }

                const historicoValores = data.dadosEmpresaSelecionada.map(exercicioFinanceiro => {
                    const { ativoCirculante, ativoNaoCirculante, ativoTotal, passivoCirculante, passivoNaoCirculante, passivoTotal, patrimonioLiquido, receitaLiquida, lucroBruto, lucroOperacional, lucroAntesTributos, lucroLiquido, dividaLiquidaPeloEbitda, dividaBrutaPeloPatrimonioLiquido, retornoPeloPatrimonioLiquido, retornoPelosAtivos, margemBruta, margemOperacional, margemAntesTributos, margemLiquida, capexPeloFCO, capexPelaDA, payout, liquidezImediata, liquidezSeca, liquidezCorrente, liquidezGeral } = calculaIndicadores(exercicioFinanceiro, dadosCadastrais)
                    return ({
                        ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                        ativoCirculante,
                        ativoNaoCirculante,
                        ativoTotal,
                        passivoCirculante,
                        passivoNaoCirculante,
                        passivoTotal,
                        patrimonioLiquido,
                        receitaLiquida,
                        lucroBruto,
                        lucroOperacional,
                        lucroAntesTributos,
                        lucroLiquido,
                        dividaLiquidaPeloEbitda,
                        dividaBrutaPeloPatrimonioLiquido,
                        retornoPeloPatrimonioLiquido,
                        retornoPelosAtivos,
                        margemBruta,
                        margemOperacional,
                        margemAntesTributos,
                        margemLiquida,
                        capexPeloFCO,
                        capexPelaDA,
                        payout,
                        liquidezImediata,
                        liquidezSeca,
                        liquidezCorrente,
                        liquidezGeral
                    })
                })

                setPrimeiraEmpresaSelecionada({ dadosCadastrais, historicoValores })
            })
            .catch(error => console.error(error))
    }, [primeiroCodigoSelecionado])


    //fetch second selected company
    //busca segunda empresa selecionada
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}api/acoes/${segundoCodigoSelecionado}`)
            .then(response => response.json())
            .then(data => {

                const dadosCadastrais = {
                    id: data.dadosEmpresaSelecionada[0].id,
                    cnpj: data.dadosEmpresaSelecionada[0].cnpj,
                    codigoBase: data.dadosEmpresaSelecionada[0].codigo_base,
                    codigosNegociacao: data.dadosEmpresaSelecionada[0].codigos_negociacao,
                    nomeEmpresarial: data.dadosEmpresaSelecionada[0].nome_empresarial,
                    segmentoListagem: data.dadosEmpresaSelecionada[0].segmento_listagem,
                    escriturador: data.dadosEmpresaSelecionada[0].escriturador,
                    classificacaoSetorial: data.dadosEmpresaSelecionada[0].classificacao_setorial,
                    atividadePrincipal: data.dadosEmpresaSelecionada[0].atividade_principal,
                    instituicaoFinanceira: data.dadosEmpresaSelecionada[0].instituicao_financeira,
                    holding: data.dadosEmpresaSelecionada[0].holding
                }


                const historicoValores = data.dadosEmpresaSelecionada.map(exercicioFinanceiro => {
                    const { ativoCirculante, ativoNaoCirculante, ativoTotal, passivoCirculante, passivoNaoCirculante, passivoTotal, patrimonioLiquido, receitaLiquida, lucroBruto, lucroOperacional, lucroAntesTributos, lucroLiquido, dividaLiquidaPeloEbitda, dividaBrutaPeloPatrimonioLiquido, retornoPeloPatrimonioLiquido, retornoPelosAtivos, margemBruta, margemOperacional, margemAntesTributos, margemLiquida, capexPeloFCO, capexPelaDA, payout, liquidezImediata, liquidezSeca, liquidezCorrente, liquidezGeral } = calculaIndicadores(exercicioFinanceiro, dadosCadastrais)

                    return ({
                        ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                        ativoCirculante,
                        ativoNaoCirculante,
                        ativoTotal,
                        passivoCirculante,
                        passivoNaoCirculante,
                        passivoTotal,
                        patrimonioLiquido,
                        receitaLiquida,
                        lucroBruto,
                        lucroOperacional,
                        lucroAntesTributos,
                        lucroLiquido,
                        dividaLiquidaPeloEbitda,
                        dividaBrutaPeloPatrimonioLiquido,
                        retornoPeloPatrimonioLiquido,
                        retornoPelosAtivos,
                        margemBruta,
                        margemOperacional,
                        margemAntesTributos,
                        margemLiquida,
                        capexPeloFCO,
                        capexPelaDA,
                        payout,
                        liquidezImediata,
                        liquidezSeca,
                        liquidezCorrente,
                        liquidezGeral
                    })
                })

                setSegundaEmpresaSelecionada({ dadosCadastrais, historicoValores })
            })
            .catch(error => console.error(error))
    }, [segundoCodigoSelecionado])


    //fetch third selected company
    //busca terceira empresa selecionada
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}api/acoes/${terceiroCodigoSelecionado}`)
            .then(response => response.json())
            .then(data => {

                const dadosCadastrais = {
                    id: data.dadosEmpresaSelecionada[0].id,
                    cnpj: data.dadosEmpresaSelecionada[0].cnpj,
                    codigoBase: data.dadosEmpresaSelecionada[0].codigo_base,
                    codigosNegociacao: data.dadosEmpresaSelecionada[0].codigos_negociacao,
                    nomeEmpresarial: data.dadosEmpresaSelecionada[0].nome_empresarial,
                    segmentoListagem: data.dadosEmpresaSelecionada[0].segmento_listagem,
                    escriturador: data.dadosEmpresaSelecionada[0].escriturador,
                    classificacaoSetorial: data.dadosEmpresaSelecionada[0].classificacao_setorial,
                    atividadePrincipal: data.dadosEmpresaSelecionada[0].atividade_principal,
                    instituicaoFinanceira: data.dadosEmpresaSelecionada[0].instituicao_financeira,
                    holding: data.dadosEmpresaSelecionada[0].holding
                }


                const historicoValores = data.dadosEmpresaSelecionada.map(exercicioFinanceiro => {
                    const { ativoCirculante, ativoNaoCirculante, ativoTotal, passivoCirculante, passivoNaoCirculante, passivoTotal, patrimonioLiquido, receitaLiquida, lucroBruto, lucroOperacional, lucroAntesTributos, lucroLiquido, dividaLiquidaPeloEbitda, dividaBrutaPeloPatrimonioLiquido, retornoPeloPatrimonioLiquido, retornoPelosAtivos, margemBruta, margemOperacional, margemAntesTributos, margemLiquida, capexPeloFCO, capexPelaDA, payout, liquidezImediata, liquidezSeca, liquidezCorrente, liquidezGeral } = calculaIndicadores(exercicioFinanceiro, dadosCadastrais)

                    return ({
                        ano: new Date(`01-01-${exercicioFinanceiro.ano}`),
                        ativoCirculante,
                        ativoNaoCirculante,
                        ativoTotal,
                        passivoCirculante,
                        passivoNaoCirculante,
                        passivoTotal,
                        patrimonioLiquido,
                        receitaLiquida,
                        lucroBruto,
                        lucroOperacional,
                        lucroAntesTributos,
                        lucroLiquido,
                        dividaLiquidaPeloEbitda,
                        dividaBrutaPeloPatrimonioLiquido,
                        retornoPeloPatrimonioLiquido,
                        retornoPelosAtivos,
                        margemBruta,
                        margemOperacional,
                        margemAntesTributos,
                        margemLiquida,
                        capexPeloFCO,
                        capexPelaDA,
                        payout,
                        liquidezImediata,
                        liquidezSeca,
                        liquidezCorrente,
                        liquidezGeral
                    })
                })

                setTerceiraEmpresaSelecionada({ dadosCadastrais, historicoValores })
            })
            .catch(error => console.error(error))
    }, [terceiroCodigoSelecionado])


    //render in case of no data
    //renderiza caso não haja dados
    if (!todasEmpresas || !primeiraEmpresaSelecionada || !segundaEmpresaSelecionada || !terceiraEmpresaSelecionada) {
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
                        <option value="lucroBruto">LUCRO BRUTO</option>
                        <option value="lucroOperacional">LUCRO OPERACIONAL</option>
                        <option value="lucroAntesTributos">LUCRO ANTES DOS TRIBUTOS</option>
                        <option value="lucroLiquido">LUCRO LÍQUIDO</option>
                    </>
                </select>



                <div className="flex flex-col gap-4 mt-10">

                    <p className="text-white">Selecione as empresas que deseja comparar:</p>
                    {/* companies first dropdown */}
                    {/* primeiro dropdown das empresas */}
                    <select
                        className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                        value={primeiroCodigoSelecionado && primeiroCodigoSelecionado}
                        onChange={event => setPrimeiroCodigoSelecionado(event.target.value)}
                    >
                        {todasEmpresas.map(empresa => (
                            <option key={empresa.id} value={empresa.codigoBase}>
                                {`${empresa.codigoBase} - ${empresa.nomeEmpresarial}`}
                            </option>
                        ))}
                    </select>


                    {/* companies second dropdown */}
                    {/* segundo dropdown das empresas */}
                    <select
                        className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                        value={segundoCodigoSelecionado && segundoCodigoSelecionado}
                        onChange={event => setSegundoCodigoSelecionado(event.target.value)}
                    >
                        {todasEmpresas.map(empresa => (
                            <option key={empresa.id} value={empresa.codigoBase}>
                                {`${empresa.codigoBase} - ${empresa.nomeEmpresarial}`}
                            </option>
                        ))}
                    </select>


                    {/* companies third dropdown */}
                    {/* terceiro dropdown das empresas */}
                    <select
                        className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                        value={terceiroCodigoSelecionado && terceiroCodigoSelecionado}
                        onChange={event => setTerceiroCodigoSelecionado(event.target.value)}
                    >
                        {todasEmpresas.map(empresa => (
                            <option key={empresa.id} value={empresa.codigoBase}>
                                {`${empresa.codigoBase} - ${empresa.nomeEmpresarial}`}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    {
                        (() => {
                            switch (true) {
                                case indicadorSelecionado === "receitaLiquida"
                                    || indicadorSelecionado === "lucroBruto"
                                    || indicadorSelecionado === "lucroOperacional"
                                    || indicadorSelecionado === "lucroAntesTributos"
                                    || indicadorSelecionado === "lucroLiquido":
                                    return (
                                        <GraficoComparadorEmpresas
                                            indicadorSelecionado={indicadorSelecionado}
                                            primeiraEmpresaDadosCadastrais={primeiraEmpresaSelecionada.dadosCadastrais}
                                            primeiraEmpresaHistoricoValores={primeiraEmpresaSelecionada.historicoValores}
                                            segundaEmpresaDadosCadastrais={segundaEmpresaSelecionada.dadosCadastrais}
                                            segundaEmpresaHistoricoValores={segundaEmpresaSelecionada.historicoValores}
                                            terceiraEmpresaDadosCadastrais={terceiraEmpresaSelecionada.dadosCadastrais}
                                            terceiraEmpresaHistoricoValores={terceiraEmpresaSelecionada.historicoValores}
                                        />
                                    )
                                default:
                                    return (
                                        <GraficoComparadorEmpresas
                                            indicadorSelecionado={indicadorSelecionado}
                                            primeiraEmpresaDadosCadastrais={primeiraEmpresaSelecionada.dadosCadastrais}
                                            primeiraEmpresaHistoricoValores={primeiraEmpresaSelecionada.historicoValores}
                                            segundaEmpresaDadosCadastrais={segundaEmpresaSelecionada.dadosCadastrais}
                                            segundaEmpresaHistoricoValores={segundaEmpresaSelecionada.historicoValores}
                                            terceiraEmpresaDadosCadastrais={terceiraEmpresaSelecionada.dadosCadastrais}
                                            terceiraEmpresaHistoricoValores={terceiraEmpresaSelecionada.historicoValores}
                                        />
                                    )
                            }
                        })()
                    }
                </div>
            </div>

        </section>
    )
}

