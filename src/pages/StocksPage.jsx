import { useState, useEffect } from "react"
import { Chart } from "../components/Chart"
import axios from "../axios"

export const StocksPage = () => {
    const [allCompanies, setAllCompanies] = useState(null)
    const [selectedCompanyData, setSelectedCompanyData] = useState(null)
    const [selectedCompanyId, setSelectedCompanyId] = useState(3) // 3 is the id of ABEV, the first company by alphabetical order
    const [selectedChart, setSelectedChart] = useState('profit') // want to show the profit chart at first load

    //get all companies from database
    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const data = await axios.get(`/api/acoes/${selectedCompanyId}`) //need to change that to /api/acoes
                setAllCompanies(data.data.allCompanies)
                setSelectedCompanyData(data.data.companyData)
            } catch (error) {
                console.log(error)
            }
        }
        getAllCompanies()
    }, [selectedCompanyId])

    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-2 lg:gap-10 px-5 lg:px-20'>
            <div className="w-full sm:w-1/2 lg:w-3/4 lg:max-w-xl flex flex-col gap-3">

                {/* selected company general data (tablet and desktop only) */}
                {selectedCompanyData && (
                    <div className="hidden w-full sm:flex flex-col text-white px-1 lg:text-lg">
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Nome empresarial: </span><br />{selectedCompanyData.company}
                        </p>
                        <p className="my-3 text-justify">
                            <span className="text-gray-400">Código de negociação: </span><br />{selectedCompanyData.code}3
                        </p>
                        <p className="my-1 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span><br />{selectedCompanyData.listing_segment}
                        </p>
                    </div>
                )}


                {/* companies dropdown */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={event => setSelectedCompanyId(event.target.value)}
                >
                    {/* create an option for each company registered at the database */}
                    {allCompanies && allCompanies.map(company => (
                        <option key={company.id} value={company.id}>
                            {`${company.code} - ${company.company}`}
                        </option>
                    ))}
                </select>


                {/* types of chart dropdown */}
                <select
                    className="shadow w-full lg:max-w-md rounded px-1 py-1 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={event => setSelectedChart(event.target.value)}
                >
                    <option value="profit">LUCRO</option>
                    <option value="debt">ENDIVIDAMENTO</option>
                    {/* <option value="eficiency">EFICIÊNCIA</option> */}
                    <option value="general-data">DADOS GERAIS</option>
                </select>

            </div>

            
            <div className='w-full border border-white rounded p-1'>

                {/* general data */}
                {selectedChart === 'general-data' ? (
                    <div className="w-full h-full flex flex-col text-white p-2 sm:p-4 text-sm sm:text-base lg:text-lg">
                        <p className="text-justify">
                            <span className="text-gray-400">Nome empresarial: </span>{selectedCompanyData.company}
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">CNPJ: </span>{selectedCompanyData.cnpj}
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">Código de negociação: </span>{selectedCompanyData.code}3
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">Segmento de listagem: </span>{selectedCompanyData.listing_segment}
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">Escriturador: </span>{selectedCompanyData.bookkeeper}
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">Classificação setorial: </span>{selectedCompanyData.sectoral_classification}
                        </p>
                        <p className="my-2 text-justify">
                            <span className="text-gray-400">Atividade principal: </span>{selectedCompanyData.main_activity}
                        </p>
                    </div>

                // charts
                ) : (
                    <Chart selectedCompanyId={selectedCompanyId} selectedChart={selectedChart} />
                )}
            </div>

        </section>
    )
}