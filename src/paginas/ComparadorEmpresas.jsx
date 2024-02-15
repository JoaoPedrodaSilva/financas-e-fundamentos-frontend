import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from "react"
import { GraficoComparadorEmpresa } from "../graficoComparadorEmpresas/GraficoComparadorEmpresa"

export const ComparadorEmpresas = () => {
    const [todasEmpresas, setTodasEmpresas] = useState(null)
    const [primeiroCodigoSelecionado, setPrimeiroCodigoSelecionado] = useState("LREN")
    const [segundoCodigoSelecionado, setSegundoCodigoSelecionado] = useState("GUAR")
    const [primeiraEmpresaSelecionada, setPrimeiraEmpresaSelecionada] = useState(null)
    const [segundaEmpresaSelecionada, setSegundaEmpresaSelecionada] = useState(null)


    //fetch all companies
    //busca todas as empresas
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_PROD}/api/acoes/`)
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
        fetch(`${import.meta.env.VITE_API_URL_PROD}/api/acoes/${primeiroCodigoSelecionado}`)
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
        fetch(`${import.meta.env.VITE_API_URL_PROD}/api/acoes/${segundoCodigoSelecionado}`)
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


    //render in case of no data
    //renderiza caso não haja dados
    if (!todasEmpresas || !primeiraEmpresaSelecionada || !segundaEmpresaSelecionada) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //render when data arrive
    //renderiza quando os dados chegam
    return (
        <section className="flex flex-col gap-4">

            <div className="flex justify-around items-center text-white my-4">
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
            </div>


            <GraficoComparadorEmpresa
                primeiraEmpresaDadosCadastrais={primeiraEmpresaSelecionada.dadosCadastrais}
                primeiraEmpresaHistoricoValores={primeiraEmpresaSelecionada.historicoValores}
                segundaEmpresaDadosCadastrais={segundaEmpresaSelecionada.dadosCadastrais}
                segundaEmpresaHistoricoValores={segundaEmpresaSelecionada.historicoValores}
            />


        </section>
    )
}
