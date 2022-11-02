import { Link } from "react-router-dom"

export const EficiencyMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20 overflow-scroll">


        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Indicadores de Eficiência</h1>


        {/* Recomendations */}
        <p className="indent-10 text-justify pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que você leia também o seguinte artigo.
        </p>
        <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            BP - Balanço Patrimonial.
        </Link>
        {/* <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            DRE - Demonstração de Resultado do Exercício.
        </Link> */}

        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            Os indicadores de eficiência são importantes para avaliar como a empresa tem aproveitado os recursos disponíveis, esses recursos devem ser enxergados de uma maneira ampla, representando não apenas o dinheiro, mas também o tempo, mão de obra, máquinas e equipamentos, marcas e patentes, enfim, tudo que produz valor para a empresa.
        </p>
        <p className="indent-10 text-justify pb-2">
            Uma organização que consegue gerar um grande resultado, mesmo tendo poucos recursos à disposição, pode ser considerada como eficiente, pois ela desperdiça pouco e aproveita bastante tudo que pode lhe produzir valor. Por outro lado, uma empresa que tem muitos recursos à disposição, mas não consegue gerar grandes resultados, é ineficiente, já que desperdiça muito e aproveita pouco aquilo que poderia lhe produzir valor.
        </p>
        <p className="indent-10 text-justify pb-2">
            Neste artigo, analisaremos dois dos principais indicadores de eficiência: o Retorno sobre o Patrimônio Líquido, também conhecido como ROE, do inglês Return on Equity, e o Retorno sobre os Ativos, também conhecido como ROA, do inglês Return on Assets.
        </p>
        <p className="indent-10 text-justify pb-8">
            Mas antes de começarmos a falar sobre eles, precisaremos compreender três dados isolados, que serão usados para compor o cálculo dos indicadores em si: lucro líquido, patrimônio líquido e, por fim, ativos. Todos estes dados podem ser colhidos em algum relatório financeiro divulgado pela empresa, seja ele o balanço patrimonial ou a demontração de resultado do exercício. Detalharemos a seguir.
        </p>


        {/* Net Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro líquido
        </h2>
        <p className="indent-10 text-justify pb-2">
            O lucro líquido pode ser considerado como o dinheiro que, de fato, a empresa ganhou (ou perdeu) durante o período analisado. É assim pois o lucro líquido representa a diferença entre o dinheiro que entrou e o dinheiro que saiu da empresa, entrou por meio de receita de vendas de produtos ou prestação de serviços, e saiu por meio de custos de produção, despesas gerais administrativas ou tributos, por exemplo.
        </p>
        <p className="indent-10 text-justify pb-2">
            Este dado pode ser encontrado na DRE - Demonstração de Resultados do Exercício, e costuma se apresentar bem próximo do final do documento.
        </p>
        <p className="indent-10 text-justify pb-2">
            Abaixo temos um exemplo de uma DRE, com o lucro líquido em destaque.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/net-income.png"
            alt="um exemplo de DRE com o lucro líquido destacado"
            className="pb-8"
        />


        {/* Equity */}
        <h2 className="text-center font-bold pb-2">
            Patrimônio Líquido
        </h2>
        <p className="indent-10 text-justify pb-2">
            O patrimônio líquido pode ser considerado como o valor contábil da empresa, incluindo o dinheiro investido pelos próprios sócios (capital social), as reservas de lucro e as ações em tesouraria, por exemplo. Para encontrá-lo basta olharmos o balanço patrimonial, não é preciso nenhum cálculo a mais. Veja o exemplo de balanço patrimonial abaixo, é possível notar que o patrimônio líquido equivale a 1.431.252.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/equity.png"
            alt="um exemplo de balanço patrimonial que demonstra a dívida líquida"
            className="pb-8"
        />


        {/* Assets */}
        <h2 className="text-center font-bold pb-2">
            Ativos
        </h2>
        <p className="indent-10 text-justify pb-2">
            São considerados como ativos, todos os bens e direitos que uma empresa possui. Eles são divididos em duas categorias: os ativos circulantes e os ativos não circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os ativos circulantes são os bens e direitos com maior liquidez, ou seja, que a empresa consegue transformar em dinheiro de maneira mais rápida (em até 12 meses), por exemplo: dinheiro em caixa, contas a receber, tributos a recuperar, estoque e aplicações financeiras de maior liquidez.
        </p>
        <p className="indent-10 text-justify pb-8">
            Já os ativos não circulantes são os bens e direitos com menor liquidez, ou seja, que a empresa demoraria mais de 12 meses para transformar em dinheiro, por exemplo: imóveis, terrenos, veículos, maquinário, além de alguns ativos intangíveis, como direitos autorais e patentes.
        </p>
        <p className="indent-10 text-justify pb-8">
            Para encontrá-los basta olharmos o balanço patrimonial, também não é preciso nenhum cálculo a mais. Veja um exemplo abaixo, é possível notar que o total de ativos equivale a 21.411.985.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/assets.png"
            alt="um exemplo de balanço patrimonial que demonstra o total de ativos"
            className="pb-8"
        />       


        {/* Gross Debt / Equity */}
        <h2 className="text-center font-bold pb-2">
            Dívida Bruta / Patrimônio Líquido
        </h2>
        <p className="indent-10 text-justify pb-2">
            Agora já conhecemos todos os dados que serão usados como base para calcularmos nossos indicadores de endividamento. Começaremos pelo indicador chamado Dívida Bruta / Patrimônio Líquido.
        </p>
        <p className="indent-10 text-justify pb-2">
            Este indicador representa o quanto a empresa se financia com capital de terceiros (empréstimos e financiamentos), em relação ao valor da própria empresa (patrimônio líquido). Em outras palavras, ele pretende demonstrar se a empresa vem mantendo suas operações e investimentos com recursos próprios, ou se vem pegando recursos emprestados com terceiros.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos o resultado deste indicador, devemos dividir a dívida bruta pelo patrimônio líquido. Em termos gerais, quanto menor for o resultado, melhor, e o desejado é que ele esteja abaixo de 1, pois isso significa que a empresa vem se utilizando mais dos recursos próprios do que adquirindo dívidas com terceiros. Quando o resultado estiver acima de 1, é necessário atenção, pois o endividamento pode estar saindo do controle.
        </p>
        <p className="indent-10 text-justify pb-2">
            No exemplo abaixo, temos o balanço patrimonial de uma empresa. Podemos somar todos os empréstimos e financiamentos para chegarmos a uma dívida bruta de 3.467.102. Ao dividir esse valor pelo patrimônio líquido, chegamos ao resultado de 0,35 (3.467.102 / 9.806.621). É um resultado desejável.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/gross-debt-equity.png"
            alt="um exemplo de balanço patrimonial que mostra a dívida bruta / patrimônio líquido"
            className="pb-8"
        />


        {/* Net Debt / EBITDA */}
        <h2 className="text-center font-bold pb-2">
            Dívida Líquida / EBITDA
        </h2>
        <p className="indent-10 text-justify pb-2">
            O segundo indicador analisado é chamado Dívida Líquida / EBITDA. EBITDA representa o lucro operacional (EBIT), acrescido da depreciação e amortização (DA)
        </p>
        <p className="indent-10 text-justify pb-2">
            Este indicador compara a dívida líquida com o lucro gerado exclusivamente pelas operações, considerando-se ainda a depreciação e amortização de seus ativos. Em outras palavras, ele pretende demonstrar a quantidade de anos que uma empresa precisaria se manter operando de maneira constante, caso desejasse quitar todas as suas dívidas.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos o resultado deste indicador, devemos dividir a dívida líquida pelo EBITDA. Em termos gerais, quanto menor for o resultado, melhor, e o desejado é que ele esteja abaixo de 2, pois isso significa que a dívida líquida da empresa não representa mais que 2 anos de operações. Quando o resultado estiver acima de 2, é necessário atenção, pois o endividamento pode estar saindo do controle.
        </p>
        <p className="indent-10 text-justify pb-2">
            No exemplo abaixo, temos pequenos recortes do balanço patrimonial, da demonstração de resultado do exercício e da demonstração de fluxo de caixa de uma empresa.Podemos somar todos os empréstimos e financiamentos para chegarmos a uma dívida bruta de 509.496.Agora, subtraímos o caixa e equivalentes de caixa, com isso, chegamos a uma dívida líquida de 439.871. Em seguida precisaremos encontrar o ebitda, para isso, somamos o lucro operacional e as depreciações e amortizações, chegando a um valor de 697.604. Finalmente, dividimos a dívida líquida pelo ebitda, chegando ao resultado de 0,63. É um resultado desejável.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/net-debt-ebitda.png"
            alt="um exemplo de BP, DRE e DFC que demonstra a dívida líquida / ebitda"
            className="pb-8"
        />

        {/* Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já é capaz de colher os dados necessários e efetuar os cálculos dos indicadores de endividamento. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/* Related Articles */}
        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/indicadores-de-lucratividade" className="indent-10 text-justify pb-8 underline">
            Indicadores de Lucratividade.
        </Link>
        {/* <Link to="/artigos/indicadores-de-eficiencia" className="indent-10 text-justify pb-8 underline">
            Indicadores de Eficiência.
        </Link> */}

    </article>
)
