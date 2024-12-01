import { useState, useEffect } from 'react'
import { GraficoRankings } from './GraficoRankings'

export const PaginaRankings = () => {
    const [listaComTodosOsSetores, setListaComTodosOsSetores] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("receitaLiquida")
    const [anoSelecionado, setAnoSelecionado] = useState("MediaDosCincoUltimosAnos")
    const [setorSelecionado, setSetorSelecionado] = useState("Bancos")
    const [quantidadeDeResultados, setQuantidadeDeResultados] = useState(15)
    const [dadosCompletosDoSetorSelecionado, setDadosCompletosDoSetorSelecionado] = useState(null)
    const [dadosCompletosDoSetorSelecionadoSeparadosPorAno, setDadosCompletosDoSetorSelecionadoSeparadosPorAno] = useState(null)


    const ordenaPeloIndicadorSelecionado = (dadosQueSeraoOrdenados, indicadorQueSeraUsadoParaOrdenar) => {
        const emOrdemCrescente = dadosQueSeraoOrdenados.sort((primeiraEmpresa, segundaEmpresa) => {
            if (primeiraEmpresa[indicadorQueSeraUsadoParaOrdenar] < segundaEmpresa[indicadorQueSeraUsadoParaOrdenar]) {
                return -1;
            }
            if (primeiraEmpresa[indicadorQueSeraUsadoParaOrdenar] > segundaEmpresa[indicadorQueSeraUsadoParaOrdenar]) {
                return 1;
            }
            return 0;
        })
        return emOrdemCrescente.reverse()
    }

    const indicadorSelecionadoComDescricao = (indicadorSelecionado) => {
        switch (indicadorSelecionado) {
            case "receitaLiquida":
                return { propriedade: "receitaLiquida", descricao: "Receita Líquida", formato: "milhões" }

            case "lucroOperacional":
                return { propriedade: "lucroOperacional", descricao: "Lucro Operacional", formato: "milhões" }

            case "lucroLiquido":
                return { propriedade: "lucroLiquido", descricao: "Lucro Líquido", formato: "milhões" }

            case "patrimonioLiquido":
                return { propriedade: "patrimonioLiquido", descricao: "Patrimônio Líquido", formato: "milhões" }

            case "dividaLiquidaPeloEbitda":
                return { propriedade: "dividaLiquidaPeloEbitda", descricao: "Dívida Líquida / EBITDA", formato: "decimal" }

            case "dividaBrutaPeloPatrimonioLiquido":
                return { propriedade: "dividaBrutaPeloPatrimonioLiquido", descricao: "Dívida Bruta / Patrimônio Líquido", formato: "decimal" }

            case "margemOperacional":
                return { propriedade: "margemOperacional", descricao: "Margem Operacional", formato: "percentual" }

            case "margemLiquida":
                return { propriedade: "margemLiquida", descricao: "Margem Líquida", formato: "percentual" }

            case "retornoPeloPatrimonioLiquido":
                return { propriedade: "retornoPeloPatrimonioLiquido", descricao: "ROE", formato: "percentual" }

            case "capexPeloFCO":
                return { propriedade: "capexPeloFCO", descricao: "CAPEX / FCO", formato: "percentual" }

            case "payout":
                return { propriedade: "payout", descricao: "Payout", formato: "percentual" }

            default:
                return { propriedade: "receitaLiquida", descricao: "Receita Líquida", formato: "milhões" }
        }
    }

    const voltaParaReceitaLiquida = (dadosCompletosDoSetorSelecionado) => {
        if (dadosCompletosDoSetorSelecionado[0].classificacaoSetorial === "Bancos"
            && (indicadorSelecionado === "lucroOperacional"
                || indicadorSelecionado === "dividaLiquidaPeloEbitda"
                || indicadorSelecionado === "dividaBrutaPeloPatrimonioLiquido"
                || indicadorSelecionado === "margemOperacional")
        ) {
            setIndicadorSelecionado("receitaLiquida")
        }
    }


    //fetch and setState for all companies and its registration data - for purpose of finding all unique sectors registered at database and feed the select
    //busca e faz o setState de todas as empresas e seus dados cadastrais - para encontrar todos os setores únicos cadastrados no banco de dados e alimentar o select
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setListaComTodosOsSetores(['Todos', ...[...new Set(data.dadosCadastraisDeTodasEmpresas.map(cadaEmpresa => cadaEmpresa.classificacaoSetorial))].sort()]))
            .catch(error => console.error(error))
    }, [])


    //fetch and setState for financial data of all the companies from specified sector and year
    //busca e faz o setState dos dados financeiros de todas as empresas do setor e ano selecionados
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rankings/${anoSelecionado}/${setorSelecionado}/`)
            .then(response => response.json())
            .then(data => {
                setDadosCompletosDoSetorSelecionado(data.dadosCompletosDoSetorSelecionado)
                setDadosCompletosDoSetorSelecionadoSeparadosPorAno(data.dadosCompletosDoSetorSelecionadoSeparadosPorAno)
                voltaParaReceitaLiquida(data.dadosCompletosDoSetorSelecionado)
            })
            .catch(error => console.error(error))
    }, [anoSelecionado, setorSelecionado, indicadorSelecionado])


    //render while data are being fetched
    //renderiza enquanto os dados estão sendo buscados
    if (!dadosCompletosDoSetorSelecionado) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    //render when data arrives
    //renderiza quando os dados chegarem
    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <section className="w-full lg:max-w-xl flex flex-col gap-3">
                {/* metrics dropdown */}
                {/* dropdown dos indicadores */}
                <p className="text-white">Selecione o indicador que deseja analisar:</p>
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={indicadorSelecionado}
                    onChange={event => {
                        setIndicadorSelecionado(event.target.value)
                    }}
                >
                    <>
                        <option value="receitaLiquida">RECEITA LÍQUIDA</option>
                        {dadosCompletosDoSetorSelecionado[0].classificacaoSetorial !== "Bancos" && <option value="lucroOperacional">LUCRO OPERACIONAL</option>}
                        <option value="lucroLiquido">LUCRO LÍQUIDO</option>
                        <option value="patrimonioLiquido">PATRIMÔNIO LÍQUIDO</option>
                        {dadosCompletosDoSetorSelecionado[0].classificacaoSetorial !== "Bancos" && <option value="dividaLiquidaPeloEbitda">DÍVIDA LÍQUIDA / EBITDA</option>}
                        {dadosCompletosDoSetorSelecionado[0].classificacaoSetorial !== "Bancos" && <option value="dividaBrutaPeloPatrimonioLiquido">DÍVIDA BRUTA / PATRIMÔNIO LÍQUIDO</option>}
                        {dadosCompletosDoSetorSelecionado[0].classificacaoSetorial !== "Bancos" && <option value="margemOperacional">MARGEM OPERACIONAL</option>}
                        <option value="margemLiquida">MARGEM LÍQUIDA</option>
                        <option value="retornoPeloPatrimonioLiquido">ROE</option>
                        <option value="capexPeloFCO">CAPEX / FCO</option>
                        <option value="payout">PAYOUT</option>
                    </>
                </select>

                {/* year dropdown */}
                {/* dropdown dos anos */}
                <p className="text-white mt-6">Selecione o período que deseja analisar:</p>
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={anoSelecionado}
                    onChange={event => setAnoSelecionado(event.target.value)}
                >
                    <>
                        <option value="MediaDosCincoUltimosAnos">MÉDIA DOS ÚLTIMOS 5 ANOS</option>
                        <option value="MediaDosTresUltimosAnos">MÉDIA DOS ÚLTIMOS 3 ANOS</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                    </>
                </select>

                {/* setorial classification dropdown */}
                {/* dropdown da classificação setorial */}
                <p className="text-white mt-6">Selecione o setor que deseja analisar:</p>
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={setorSelecionado}
                    onChange={event => setSetorSelecionado(event.target.value)}
                >
                    <>
                        {listaComTodosOsSetores && listaComTodosOsSetores.map((cadaSetorUnico, index) => (
                            <option key={index} value={cadaSetorUnico}>{cadaSetorUnico.toUpperCase()}</option>
                        ))}
                    </>
                </select>

                {/* number of results dropdown */}
                {/* dropdown do numero de resultados */}
                <p className="text-white mt-6">Selecione quantos resultados você deseja ver:</p>
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={quantidadeDeResultados}
                    onChange={event => setQuantidadeDeResultados(event.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                </select>
            </section>


            {/* charts and complete registration data */}
            {/* gráficos e dados cadastrais completos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    <GraficoRankings
                        indicadorSelecionado={indicadorSelecionadoComDescricao(indicadorSelecionado)}
                        anoSelecionado={anoSelecionado}
                        setorSelecionado={setorSelecionado}
                        quantidadeDeResultados={quantidadeDeResultados}
                        dadosCompletosDoSetorSelecionado={ordenaPeloIndicadorSelecionado(dadosCompletosDoSetorSelecionado, indicadorSelecionado)}
                        dadosCompletosDoSetorSelecionadoSeparadosPorAno={dadosCompletosDoSetorSelecionadoSeparadosPorAno}
                    />
                </div>

                <div className='w-full text-white text-right text-xs'>
                    <a href="https://www.b3.com.br" target='_blank' rel='noreferrer'>
                        Fonte: B3 - Brasil, Bolsa, Balcão
                    </a>
                </div>
            </section>
        </section>
    )
}
