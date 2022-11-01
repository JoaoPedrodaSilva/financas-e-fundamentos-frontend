export const BalanceSheet = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20 overflow-scroll">

        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Balanço Patrimonial</h1>

        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            As empresas listadas na bolsa são obrigadas a divulgar, trimestralmente, alguns relatórios financeiros padronizados. Estes relatórios contêm informações importantíssimas, que são necessárias para podermos elaborar nossa própria análise e decidirmos se devemos, ou não, investir naquela empresa. Por isso, é essencial saber onde encontrar estes relatórios financeiros e como extrair deles os dados relevantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Pois bem, toda empresa possui um site de relacionamento com o investidor, e é nesse site que podemos encontrar todos os relatórios dos quais necessitamos. Neste artigo, estudaremos um pouco mais sobre o BP (Balanço Patrimonial).
        </p>
        <p className="indent-10 text-justify pb-8">
            O balanço patrimonial tem a finalidade de apresentar a posição financeira de uma empresa em determinada data, incluindo todos os bens, direitos, dívidas e obrigações que ela possui. Esse documento é dividido em três partes: os ativos, os passivos e o patrimônio líquido. Detalharemos cada uma delas a seguir.
        </p>


        {/* Assets */}
        <h2 className="text-center font-bold pb-2">
            Ativos
        </h2>
        <p className="indent-10 text-justify pb-2">
            A primeira parte do balanço patrimonial são os ativos. Aqui, encontramos todos os bens e direitos que uma empresa possui. Eles são divididos em duas categorias: os ativos circulantes e os ativos não circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os ativos circulantes são os bens e direitos com maior liquidez, ou seja, que a empresa consegue transformar em dinheiro de maneira mais rápida (em até 12 meses), por exemplo: dinheiro em caixa, contas a receber, tributos a recuperar, estoque e aplicações financeiras de maior liquidez.
        </p>
        <p className="indent-10 text-justify pb-8">
            Já os ativos não circulantes são os bens e direitos com menor liquidez, ou seja, que a empresa demoraria mais de 12 meses para transformar em dinheiro, por exemplo: imóveis, terrenos, veículos, maquinário, além de alguns ativos intangíveis, como direitos autorais e patentes.
        </p>

        {/* Liabilities */}
        <h2 className="text-center font-bold pb-2">
            Passivos
        </h2>
        <p className="indent-10 text-justify pb-2">
            A segunda parte do balanço patrimonial são os passivos. Aqui, encontramos todas as dívidas e obrigações que uma empresa precisa honrar. Eles também são divididos em duas categorias: os passivos circulantes e os passivos não circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os passivos circulantes são as dívidas e obrigações de curto prazo, ou seja, que a empresa precisa honrar em até 12 meses, por exemplo: salário de funcionários, pagamento de fornecedores, tributos e impostos, além de empréstimos e financiamentos.
        </p>
        <p className="indent-10 text-justify pb-8">
            Já os passivos não circulantes são as dívidas e obrigações de mais longo prazo, ou seja, que a empresa pode demorar mais de 12 meses para honrar, por exemplo: empréstimos e financiamentos, debêntures e créditos provisionados.
        </p>

        {/* Equity */}
        <h2 className="text-center font-bold pb-2">
            Patrimônio Líquido
        </h2>
        <p className="indent-10 text-justify pb-8">
            A terceira e última parte do balanço patrimonial é o patrimônio líquido. Ele corresponde à diferença entre os ativos e os passivos, além disso, é considerado como o valor contábil da empresa. Inclui o dinheiro investido pelos próprios sócios (capital social), as reservas de lucro e as ações em tesouraria, por exemplo.
        </p>


        <h2 className="text-center font-bold pb-2">
            Exemplo de balanço patrimonial
        </h2>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/balance-sheet.png"
            alt="imagem de um exemplo de balanço patrimonial"
            className="pb-8"
        />

        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <p className="text-sm text-justify pb-2">
            DRE (Demontração do Resultado do Exercício).
        </p>
        <p className="text-sm text-justify pb-2">
            DFC (Demonstração do Fluxo de Caixa).
        </p>

    </article>
)
