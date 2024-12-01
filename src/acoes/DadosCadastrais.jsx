import { Link } from 'react-router-dom'

export const DadosCadastrais = ({ dadosCadastraisDaEmpresaSelecionada }) => {
    return (
        <section className="w-full h-full flex flex-col text-white px-4 pt-4 text-sm lg:text-lg bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat">
            <p className="text-justify">
                <span className="text-gray-400">Nome empresarial: </span>
                {dadosCadastraisDaEmpresaSelecionada.nomeEmpresarial}
            </p>
            <p className="my-2 text-justify">
                <span className="text-gray-400">CNPJ: </span>
                {dadosCadastraisDaEmpresaSelecionada.cnpj}
            </p>
            <p className="my-2 text-justify">
                <span className="text-gray-400">Códigos de negociação: </span>
                {dadosCadastraisDaEmpresaSelecionada.codigosNegociacao}
            </p>
            <p className="my-2 text-justify">
                <span className="text-gray-400">Segmento de listagem: </span>
                {dadosCadastraisDaEmpresaSelecionada.segmentoListagem}
            </p>
            <p className="my-2 text-justify">
                <span className="text-gray-400">Escriturador: </span>
                {dadosCadastraisDaEmpresaSelecionada.escriturador}
            </p>

            <p className="my-2 text-justify">
                <span className="text-gray-400">Classificação setorial: </span>
                <Link to={`/rankings/`}>
                {/* gotta change state "setorSelecionado", so the rankings page enters with this sector */}
                {/* tem que mudar o state "setorSelecionado", para que a página de rankings já entre nesse setor */}

                {/* maybe put the state at the App.jsx and pass it as props to the children pages (acoes and rankings), can i make it through a Route?? */}
                    {dadosCadastraisDaEmpresaSelecionada.classificacaoSetorial}
                </ Link>
            </p>

            <p className="mt-2 mb-7 text-justify">
                <span className="text-gray-400">Atividade principal: </span>
                {dadosCadastraisDaEmpresaSelecionada.atividadePrincipal}
            </p>
        </section>
    )
} 