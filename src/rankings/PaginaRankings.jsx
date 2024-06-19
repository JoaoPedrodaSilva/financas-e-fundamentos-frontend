import { calculaIndicadores } from "../utilidades/calculaIndicadores"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { GraficoRankings } from './GraficoRankings'

export const PaginaRankings = () => {
    const navigate = useNavigate()
    const { anoParametro } = useParams(null)
    const { setorParametro } = useParams(null)
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


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/rankings/${anoParametro}/${setorParametro}`)
            .then(response => response.json())
            .then(data => {
                const dadosDeTodasEmpresasTemp = data.dadosRanking.map(cadaEmpresa => {
                    const { patrimonioLiquido, receitaLiquida, lucroOperacional, lucroLiquido, retornoPeloPatrimonioLiquido, margemOperacional, margemLiquida, capexPeloFCO, payout } = calculaIndicadores(cadaEmpresa, null)                    

                    return ({
                        codigoBase: cadaEmpresa.codigo_base,
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
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
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
                        <option value="Agricultura (Açúcar, Álcool e Cana)">AGRICULTURA (AÇÚCAR, ÁLCOOL E CANA)</option>
                        <option value="Alimentos">ALIMENTOS</option>
                        <option value="Bancos">BANCOS</option>
                        <option value="Bebidas e Fumo">BEBIDAS E FUMO</option>
                        <option value="Bolsas de Valores Mercadorias e Futuros">BOLSAS DE VALORES/MERCADORIAS E FUTUROS</option>
                        <option value="Comércio (Atacado e Varejo)">COMÉRCIO (ATACADO E VAREJO)</option>
                        <option value="Construção Civil, Mat. Constr. e Decoração">CONSTRUÇÃO CIVIL, MATERIAIS DE CONSTRUÇÃO E DECORAÇÃO</option>
                        <option value="Educação">EDUCAÇÃO</option>
                        <option value="Energia Elétrica">ENERGIA ELÉTRICA</option>
                        <option value="Extração Mineral">EXTRAÇAO MINERAL</option>
                        <option value="Farmacêutico e Higiene">FARMACÊUTICO E HIGIENE</option>
                        <option value="Hospedagem e Turismo">HOSPEDAGEM E TURISMO</option>
                        <option value="Intermediação Financeira">INTERMEDIAÇÃO FINANCEIRA</option>
                        <option value="Máquinas, Equipamentos, Veículos e Peças">MÁQUINAS, EQUIPAMENTOS, VEÍCULOS E PEÇAS</option>
                        <option value="Papel e Celulose">PAPEL E CELULOSE</option>
                        <option value="Petróleo e Gás">PETRÓLEO E GÁS</option>
                        <option value="Petroquímicos e Borracha">PETROQUÍMICOS E BORRACHA</option>
                        <option value="Saneamento, Serv. Água e Gás">SANEAMENTO, SERVIÇOS DE ÁGUA E GÁS</option>
                        <option value="Seguradoras e Corretoras">SEGURADORAS E CORRETORAS</option>
                        <option value="Sem Setor Principal">SEM SETOR PRINCIPAL</option>
                        <option value="Serviços médicos">SERVIÇOS MÉDICOS</option>
                        <option value="Serviços Transporte e Logística">SERVIÇOS DE TRANSPORTE E LOGÍSTICA</option>
                        <option value="Telecomunicações">TELECOMUNICAÇÕES</option>
                        <option value="Têxtil e Vestuário">TÊXTIL E VESTUÁRIO</option>
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
