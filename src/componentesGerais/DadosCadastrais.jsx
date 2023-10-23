export const DadosCadastrais = ({ dadosCadastrais }) => (
    <section className="w-full h-full flex flex-col text-white px-2 sm:px-4 pt-2 sm:pt-4 text-sm sm:text-base lg:text-lg">
        <p className="text-justify">
            <span className="text-gray-400">Nome empresarial: </span>
            {dadosCadastrais.nome_empresarial}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">CNPJ: </span>
            {dadosCadastrais.cnpj}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Códigos de negociação: </span>
            {dadosCadastrais.codigos_negociacao}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Segmento de listagem: </span>
            {dadosCadastrais.segmento_listagem}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Escriturador: </span>
            {dadosCadastrais.escriturador}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Classificação setorial: </span>
            {dadosCadastrais.classificacao_setorial}
        </p>
        <p className="mt-2 mb-7 text-justify">
            <span className="text-gray-400">Atividade principal: </span>
            {dadosCadastrais.atividade_principal}
        </p>
    </section>
)
