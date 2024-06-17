import { useState, useEffect } from 'react'
import { GraficoRankings } from '../graficoRankings/GraficoRankings'

export const Rankings = () => {
    const [todasEmpresas, setTodasEmpresas] = useState(null)
    const [indicadorSelecionado, setIndicadorSelecionado] = useState("lucroLiquido")
    const [dadosFinanceirosDeTodasEmpresas, setDadosFinanceirosDeTodasEmpresas] = useState(null)


    const ordenaPeloIndicadorSelecionado = (dadosFinanceiros, indicador) => {
        const emOrdemCrescente = dadosFinanceiros.sort((primeiraEmpresa, segundaEmpresa) => {
            if (primeiraEmpresa[indicador] < segundaEmpresa[indicador]) {
                return -1;
            }
            if (primeiraEmpresa[indicador] > segundaEmpresa[indicador]) {
                return 1;
            }
            return 0;
        })

        return emOrdemCrescente.reverse()
    }


    //fetch all companies and its registration data
    //busca todas as empresas e seus dados cadastrais
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/`)
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


    //fetch financial data of all companies
    //busca os dados financeiros de todas as empresas
    useEffect(() => {
        let dadosFinanceirosTemp = []

        todasEmpresas && todasEmpresas.map((cadaEmpresa, index) => {

            fetch(`${import.meta.env.VITE_API_BACKEND_URL}api/acoes/${cadaEmpresa.codigoBase}/`)
                .then(response => response.json())
                .then(data => {

                    dadosFinanceirosTemp = [
                        ...dadosFinanceirosTemp,
                        {
                            codigoBase: data.empresas[index].codigo_base,
                            ultimoAno: data.dadosEmpresaSelecionada[data.dadosEmpresaSelecionada.length - 1].ano,
                            lucroLiquido: Math.round(Number(data.dadosEmpresaSelecionada[data.dadosEmpresaSelecionada.length - 1].lucro_liquido / 1000))                            
                        }
                    ]

                    if (index === todasEmpresas.length - 1) {
                        setDadosFinanceirosDeTodasEmpresas(dadosFinanceirosTemp)
                    }
                })
                .catch(error => console.error(error))
        })
    }, [todasEmpresas])



    //render in case of no data
    //renderiza caso não haja dados
    if (!todasEmpresas || !dadosFinanceirosDeTodasEmpresas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section>

            {/* charts and complete registration data */}
            {/* gráficos e dados cadastrais completos */}
            <section className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='relative w-full p-1 border border-white rounded'>
                    <GraficoRankings
                        indicadorSelecionado={indicadorSelecionado}
                        dadosFinanceirosDeTodasEmpresas={ordenaPeloIndicadorSelecionado(dadosFinanceirosDeTodasEmpresas, "lucroLiquido")}
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
