import { useState, useEffect } from "react"
import { Chart } from "../components/Chart"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from "../axios"

export const StocksPage = () => {
    const navigate = useNavigate()
    const { code } = useParams()
    const [allCompanies, setAllCompanies] = useState(null)
    const [selectedCompanyData, setSelectedCompanyData] = useState(null)
    const [selectedChart, setSelectedChart] = useState('income') // want to show the income chart as default

    // get all companies from database
    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const data = await axios.get(`/api/acoes/${code}`)
                setAllCompanies(data.data.allCompanies)
                setSelectedCompanyData(data.data.companyData)
                setSelectedChart('income')
            } catch (error) {
                console.log(error)
            }
        }
        getAllCompanies()
    }, [code])


    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-2 px-5 lg:px-20'>

            <div className="w-full sm:w-1/2 lg:max-w-xl flex flex-col gap-3">

                {/* selected company general data (tablet and desktop only) */}
                {selectedCompanyData && (
                    <div className="w-full sm:flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{selectedCompanyData.company}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Códigos de negociação: </span><br />{selectedCompanyData.negotiation_codes}
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{selectedCompanyData.listing_segment}
                        </p>
                    </div>
                )}


                {/* companies dropdown */}
                <select
                    className="w-full lg:max-w-md shadow rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={code}
                    onChange={event => navigate(`/acoes/${event.target.value}`)}
                >
                    {/* create an option for each company registered at the database */}
                    {allCompanies && allCompanies.map(company => (
                        <option key={company.base_code} value={company.base_code}>
                            {`${company.base_code} - ${company.company}`}
                        </option>
                    ))}
                </select>

                {/* types of chart dropdown */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={selectedChart}
                    onChange={event => setSelectedChart(event.target.value)}
                >
                    {selectedCompanyData &&
                        <>
                            <option value="income">LUCRO</option>
                            {selectedCompanyData.has_debt_chart && <option value="debt">ENDIVIDAMENTO</option>}
                            <option value="rentability">RENTABILIDADE</option>
                            <option value="general-data">DADOS GERAIS</option>
                        </>
                    }
                </select>

                {/* learn-the-chart article link */}
                {
                    selectedChart !== "general-data" &&
                    <Link
                        to={selectedChart === "income" ? `/artigos/17`
                            : selectedChart === "debt" ? `/artigos/18`
                                : selectedChart === "rentability" ? `/artigos/19`
                                    : null}
                        className="text-xs sm:text-sm lg:text-lg text-center lg:text-left text-blue-500"
                    >
                        Clique aqui e aprenda a interpretar esse gráfico
                    </Link>
                }

            </div>


            <div className='w-full flex flex-col justify-center items-center gap-2'>
                {/* full general data */}
                <div className='w-full border border-white rounded p-1'>
                    {selectedChart === 'general-data' ? (
                        <div className="w-full h-full flex flex-col text-white px-2 sm:px-4 pt-2 sm:pt-4 text-sm sm:text-base lg:text-lg">
                            <p className="text-justify">
                                <span className="text-gray-400">Nome empresarial: </span>
                                {selectedCompanyData.company}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">CNPJ: </span>
                                {selectedCompanyData.cnpj}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Códigos de negociação: </span>
                                {selectedCompanyData.negotiation_codes}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Segmento de listagem: </span>
                                {selectedCompanyData.listing_segment}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Escriturador: </span>
                                {selectedCompanyData.bookkeeper}
                            </p>
                            <p className="my-2 text-justify">
                                <span className="text-gray-400">Classificação setorial: </span>
                                {selectedCompanyData.sectoral_classification}
                            </p>
                            <p className="mt-2 mb-7 text-justify">
                                <span className="text-gray-400">Atividade principal: </span>
                                {selectedCompanyData.main_activity}
                            </p>
                            <p className="text-right text-[0.6rem]">
                                <a
                                    style={{ fill: "white" }}
                                    href="https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/empresas-listadas.htm"
                                    target="blank"
                                    rel="noopener noreferrer"
                                >
                                    Fonte: B3 S.A. - Brasil, Bolsa, Balcão
                                </a>
                            </p>
                        </div>

                        // charts
                    ) : (
                        <Chart selectedChart={selectedChart} />
                    )}
                </div>
            </div>
        </section >
    )
}