export const DebtMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20 overflow-scroll">
        <h1 className="text-center text-xl font-bold py-8">Indicadores de Endividamento</h1>

        <p className="indent-10 text-justify pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que você leia também os seguintes artigos.
        </p>
        <p className="indent-10 text-justify pb-8">
            Balanço Patrimonial.
        </p>

        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            Os indicadores de endividamento são importantes para sabermos como anda a saúde financeira da empresa, se ela possui condições de honrar com os compromissos assumidos em termos de empréstimos e financiamentos junto a terceiros.
        </p>
        <p className="indent-10 text-justify pb-8">
            Para podermos analisar o endividamento das empresas precisaremos entender alguns dados, são eles: dívida bruta, dívida líquida, patrimônio líquido e ebitda. Todos eles podem ser colhidos em algum relatório financeiro, seja ele o balanço patrimonial, a demontração de resultado do exercício ou a demonstração de fluxo de caixa. Detalharemos a seguir.
        </p>


        {/* Gross Debt */}
        <h2 className="text-center font-bold pb-2">
            Dívida Bruta
        </h2>
        <p className="indent-10 text-justify pb-2">
            A dívida bruta representa o total de empréstimos e financiamentos que uma empresa possui, tanto no curto, quanto no longo prazo. Esses dados estão disponíveis na parte dos passivos do balanço patrimonial, divulgado trimestralmente no site de relacionamento com o investidor das empresas.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para calcularmos a dívida bruta basta somar os empréstimos e financiamentos de curto prazo, disponíveis nos passivos circulantes, com os empréstimos e financiamento de longo prazo, disponíveis nos passivos não circulantes. Pronto, simples assim.
        </p>
        <p className="indent-10 text-justify pb-2">
            Abaixo, temos um exemplo de balanço patrimonial, mais especificamente, sua parte de passivos. A dívida bruta neste caso seria de 2.980,5.
        </p>

        <img src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/gross-debt.png" alt="" />


        {/* Net Debt */}
        <h2 className="indent-10 font-bold pb-2">
            Dívida Líquida
        </h2>
        <p className="indent-10 text-justify pb-2">
            A dívida líquida representa o total de empréstimos e financiamentos que uma empresa possui, tanto no curto quanto no longo prazo, deduzidos o caixa e o equivalente de caixa. Para termos acesso a esses dados, devemos nos basear em um documento chamado Balanço Patrimonial, ele é divulgado trimestralmente pelas empresas e tem a finalidade de apresentar a posição financeira de uma empresa em determinada data, normalmente 31 de dezembro do ano em questão.
        </p>
        
    </article>
)
