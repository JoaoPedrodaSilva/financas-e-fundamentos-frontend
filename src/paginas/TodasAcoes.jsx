import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const TodasAcoes = () => {
    const [todasEmpresas, setTodasEmpresas] = useState(null)


    //fetch all companies and its registration data
    //busca todas as empresas e seus dados cadastrais
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


    //render in case of no data
    //renderiza em caso de não haver dados
    if (!todasEmpresas) {
        return (
            <div className="flex flex-col justify-center items-center gap-3 mt-48">
                <p className="text-white text-center">Carregando as informações...</p>
                <img className="w-1/12 rounded-lg" src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/loading.gif" alt="Carregando as informações..." />
            </div>
        )
    }


    return (
        <section className='w-full grid grid-cols-4 justify-center items-center flex-wrap gap-4 my-4 mx-2'>
            {todasEmpresas.map(empresa => {
                return (
                    <Link to={`/acoes/${empresa.codigoBase}`} key={empresa.id}>
                        < article className='w-full flex-1 flex-col justify-center items-center bg-white rounded-lg'>
                            <p className='text-center text-xl font-bold '>{empresa.codigoBase}</p>
                            <hr />
                            <p className='text-center p-2 text-sm'>{empresa.codigosNegociacao}</p>
                            <hr />
                            <p className='text-center p-2'>{empresa.nomeEmpresarial}</p>
                        </article>
                    </Link>
                )
            })}
        </section >
    )
}
