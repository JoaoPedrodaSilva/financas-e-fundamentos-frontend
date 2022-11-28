export const DadosCadastrais = ({ empresaSelecionada }) => (
    <section className="w-full h-full flex flex-col text-white px-2 sm:px-4 pt-2 sm:pt-4 text-sm sm:text-base lg:text-lg">
        <p className="text-justify">
            <span className="text-gray-400">Nome empresarial: </span>
            {empresaSelecionada.nome_empresarial}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">CNPJ: </span>
            {empresaSelecionada.cnpj}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Códigos de negociação: </span>
            {empresaSelecionada.codigos_negociacao}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Segmento de listagem: </span>
            {empresaSelecionada.segmento_listagem}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Escriturador: </span>
            {empresaSelecionada.escriturador}
        </p>
        <p className="my-2 text-justify">
            <span className="text-gray-400">Classificação setorial: </span>
            {empresaSelecionada.classificacao_setorial}
        </p>
        <p className="mt-2 mb-7 text-justify">
            <span className="text-gray-400">Atividade principal: </span>
            {empresaSelecionada.atividade_principal}
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
    </section>
)
