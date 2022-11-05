import {Link} from "react-router-dom"

export const CashFlowStatement = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">

        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Demonstração de Fluxo de Caixa</h1>


        {/* Recomendations */}
        <p className="text-center pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que leia também os seguintes artigos.
        </p>
        <Link to="/artigos/demonstracao-de-resultados-do-exercicio" className="text-center pb-2 underline">
            DRE - Demonstração de Resultados do Exercício.
        </Link>

        <Link to="/artigos/balanco-patrimonial" className="text-center pb-8 underline">
            BP - Balanço Patrimonial.
        </Link>


        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            As empresas listadas na bolsa são obrigadas a divulgar, trimestralmente, alguns relatórios financeiros padronizados. Estes relatórios contêm informações importantíssimas, que são necessárias para podermos elaborar nossa própria análise e decidirmos se devemos, ou não, investir naquela empresa. Por isso, é essencial saber onde encontrar estes relatórios financeiros e como extrair deles os dados relevantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Pois bem, toda empresa possui um site de relacionamento com o investidor, e é nesse site que podemos encontrar todos os relatórios dos quais necessitamos, normalmente eles se encontram disponíveis em "Informações Financeiras - Central de Resultados - Release ou Divulgação de Resultados". Neste artigo, estudaremos um pouco mais sobre a DFC (Demonstração de Fluxo de Caixa).
        </p>
        <p className="indent-10 text-justify pb-2">
            A DFC traz os movimentos de entrada e saída de dinheiro que aconteceram no caixa da empresa. Ela é um bom instrumento de detecção de eventuais fraudes contábeis ou erros orçamentários.
        </p>
        <p className="indent-10 text-justify pb-8">
            É dividida em três partes: as atividades operacionais, as atividades de investimento e, por fim, as atividades de financiamento.
        </p>


        {/* Operating activities */}
        <h2 className="text-center font-bold pb-2">
            Atividades Operacionais
        </h2>
        <p className="indent-10 text-justify pb-8">
            Aqui, demonstra-se o fluxo de caixa relativo à produção de bens ou prestação de serviços, por exemplo: receita das vendas, custo das vendas, despesas gerais e administrativas, aumento ou diminuição de estoque, depreciações e amortizações.
        </p>


        {/* Investing activities */}
        <h2 className="text-center font-bold pb-2">
            Atividades de Investimento
        </h2>
        <p className="indent-10 text-justify pb-8">
            Nessas atividades são incluídas as aquisições e vendas de ativos que visam ao crescimento produtivo da empresa; tais como os ativos imobilizados, por exemplo: imóveis, terrenos, máquinas e equipamentos; e também os ativos intangíveis, por exemplo: direitos autorais, marcas e patentes.
        </p>


        {/* Financing activities */}
        <h2 className="text-center font-bold pb-2">
            Atividades de Financiamento
        </h2>
        <p className="indent-10 text-justify pb-8">
            São consideradas as entradas e saídas que estão relacionadas à captação de recursos, sejam eles próprios, e aí está inserido o pagamento de dividendos, as ações em tesouraria ou a emissão de novas ações; ou de terceiros, que são os empréstimos e financiamentos, incluindo o pagamento de juros.
        </p>


        {/* Example */}
        <p className="indent-10 text-justify pb-2">
            Abaixo temos um exemplo de uma DFC - Demonstração de Fluxo de Caixa, com as atividades operacionais, de investimento e de financiamento em destaque.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/cash-flow-statement.png"
            alt="imagem de um exemplo de dfc - demonstração de fluxo de caixa"
            className="pb-8 lg:w-1/2 mx-auto"
        />


        {/* Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já conhece um dos relatórios financeiros mais importantes na hora de analisar uma companhia. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/* Related Articles */}
        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/balanco-patrimonial" className="text-center pb-2 underline">
            BP - Balanço Patrimonial.
        </Link>
        <Link to="/artigos/demonstracao-de-fluxo-de-caixa" className="text-center pb-8 underline">
            DFC - Demonstração de Fluxo de Caixa.
        </Link>

    </article>
)
