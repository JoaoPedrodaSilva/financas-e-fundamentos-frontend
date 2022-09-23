import { useState, useEffect } from "react"
import { Chart } from "../components/Chart"
import axios from "../axios"

export const StocksPage = () => {
    const [allCompanies, setAllCompanies] = useState(null)
    const [selectedCompanyId, setSelectedCompanyId] = useState(3) // 3 is the id of ABEV, the first company by alphabetical order
    const [selectedChart, setSelectedChart] = useState('profit') // want to show the profit chart at first load

    //get all companies from database
    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const data = await axios.get(`/api/acoes/${selectedCompanyId}`) //need to change that to /api/acoes
                setAllCompanies(data.data.allCompanies)
            } catch (error) {
                console.log(error)
            }
        }
        getAllCompanies()
    }, [])

    return (
        <section className='h-full flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-2 lg:gap-10 px-5 sm:px-14 lg:px-40'>
            <div className="w-full sm:w-1/2 flex flex-col gap-5">

                {/* companies dropdown */}
                <select
                    className="shadow w-full rounded px-1 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={event => setSelectedCompanyId(event.target.value)}
                >
                    {/* create an option for each company at the database */}
                    {allCompanies && allCompanies.map(company => (
                        <option key={company.id} value={company.id}>
                            {`${company.code} - ${company.company}`}
                        </option>
                    ))}
                </select>

                {/* types of chart dropdown */}
                <select
                    className="shadow w-full rounded px-1 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={event => setSelectedChart(event.target.value)}
                >
                    <option value="profit">LUCRO</option>
                    <option value="debt">ENDIVIDAMENTO</option>
                    {/* <option value="eficiency">EFICIÊNCIA</option>
                    <option value="general-data">DADOS GERAIS</option> */}
                </select>

            </div>

            <div className='w-full border border-white rounded p-1'>
                <Chart selectedCompanyId={selectedCompanyId} selectedChart={selectedChart} />
            </div>

        </section>
    )
}