import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { GraficoRankings } from './GraficoRankings'

export const PaginaRankings = () => {
    const navigate = useNavigate()
    const { anoParametro } = useParams(null)
    const { setorParametro } = useParams(null)
    const [setoresUnicos, setSetoresUnicos] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("receitaLiquida")
    const [anoSelecionado, setAnoSelecionado] = useState("2023")
    const [setorSelecionado, setSetorSelecionado] = useState("Bancos")
    const [dadosDeTodasEmpresas, setDadosDeTodasEmpresas] = useState(null)


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


    //fetch all companies and its registration data - for purpose of finding all unique sectors registered at database
    //busca todas as empresas e seus dados cadastrais - para encontrar todos os setores únicos cadastrados no banco de dados
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
            .then(response => response.json())
            .then(data => setSetoresUnicos(['Todos', ...new Set(data.empresas.map(cadaEmpresa => cadaEmpresa.classificacao_setorial))]))
            .catch(error => console.error(error))
    }, [])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rankings/${anoParametro}/${setorParametro}`)
            .then(response => response.json())
            .then(data => {
                const dadosDeTodasEmpresasTemp = data.dadosRanking.map(cadaEmpresa => {
                    const { patrimonioLiquido, receitaLiquida, lucroOperacional, lucroLiquido, retornoPeloPatrimonioLiquido, margemOperacional, margemLiquida, capexPeloFCO, payout } = calculaIndicadores(cadaEmpresa, null)

                    return ({
                        codigoBase: cadaEmpresa.codigo_base,
                        nomeEmpresarial: cadaEmpresa.nome_empresarial,
                        ano: cadaEmpresa.ano,
                        setor: cadaEmpresa.classificacao_setorial,
                        patrimonioLiquido,
                        receitaLiquida,
                        lucroOperacional,
                        lucroLiquido,
                        retornoPeloPatrimonioLiquido,
                        margemOperacional,
                        margemLiquida,
                        capexPeloFCO,
                        payout
                    })
                })
                setDadosDeTodasEmpresas(dadosDeTodasEmpresasTemp)
            })
            .catch(error => console.error(error))
    }, [anoSelecionado, setorSelecionado])


    //render in case of no data
    //renderiza caso não haja dados
    if (!dadosDeTodasEmpresas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section className='h-full flex flex-row justify-center items-center gap-2 px-5 lg:px-20'>
            <section className="w-full lg:max-w-xl flex flex-col gap-3">
                {/* metrics dropdown */}
                {/* dropdown dos indicadores */}
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
                        <option value="retornoPeloPatrimonioLiquido">ROE</option>
                        <option value="capexPeloFCO">CAPEX / FCO</option>
                        <option value="payout">PAYOUT</option>
                    </>
                </select>

                {/* year dropdown */}
                {/* dropdown dos anos */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={anoSelecionado}
                    onChange={event => {
                        setAnoSelecionado(event.target.value)
                        navigate(`/rankings/${event.target.value}/${setorSelecionado}`)
                    }}
                >
                    <>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        {/* <option value="MediaTresAnos">Média dos últimos 3 anos</option> */}
                    </>
                </select>

                {/* setorial classification dropdown */}
                {/* dropdown da classificação setorial */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={setorSelecionado}
                    onChange={event => {
                        setSetorSelecionado(event.target.value)
                        navigate(`/rankings/${anoSelecionado}/${event.target.value}`)
                    }}
                >
                    <>
                        {setoresUnicos && setoresUnicos.map((cadaSetorUnico, index) => (
                            <option key={index} value={cadaSetorUnico}>{cadaSetorUnico.toUpperCase()}</option>
                        ))}
                    </>
                </select>
            </section>


            {/* charts and complete registration data */}
            {/* gráficos e dados cadastrais completos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    <GraficoRankings
                        indicadorSelecionado={indicadorSelecionado}
                        anoSelecionado={anoSelecionado}
                        setorSelecionado={setorSelecionado}
                        dadosDeTodasEmpresas={ordenaPeloIndicadorSelecionado(dadosDeTodasEmpresas, indicadorSelecionado)}
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
