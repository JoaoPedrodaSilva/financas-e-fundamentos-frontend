import { Link } from "react-router-dom"

export const EficiencyMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">


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
            className="pb-8 lg:w-1/4 mx-auto"
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
            alt="um exemplo de balanço patrimonial que demonstra o patrimônio líquido"
            className="pb-8 lg:w-1/2 mx-auto"
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
            className="pb-8 lg:w-1/4 mx-auto"
        />       


        {/* Return on Equity - ROE */}
        <h2 className="text-center font-bold pb-2">
            Retorno sobre o patrimônio líquido - ROE
        </h2>
        <p className="indent-10 text-justify pb-2">
            Agora já conhecemos todos os dados que serão usados como base para calcularmos nossos indicadores de eficiência. Começaremos pelo indicador chamado retorno sobre o patrimônio líquido ou ROE.
        </p>
        <p className="indent-10 text-justify pb-2">
            Este indicador representa a capacidade que a empresa tem de gerar lucro considerando apenas os próprios recursos.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos o resultado deste indicador, devemos dividir o lucro líquido pelo patrimônio líquido. Em termos gerais, quanto maior for o resultado, melhor, e o ideal é que haja uma tendência de crescimento ao longo dos anos.
        </p>
        <p className="indent-10 text-justify pb-2">
            No exemplo abaixo, temos pequenos recortes de uma DRE e de um balanço patrimonial, com o lucro líquido e o patrimônio líquido em destaque, respectivamente. Ao dividirmos o primeiro pelo segundo, chegamos ao resultado de 0,25 ou 25% (360.389 / 1.431.252).
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/roe.png"
            alt="um exemplo de DRE e BP que demonstra o ROE"
            className="pb-8 lg:w-1/2 mx-auto"
        />


        {/* Return on Assets - ROA */}
        <h2 className="text-center font-bold pb-2">
            Retorno sobre os ativos - ROA
        </h2>
        <p className="indent-10 text-justify pb-2">
            O segundo indicador analisado é chamado Retorno sobre os ativos, ou ROA.
        </p>
        <p className="indent-10 text-justify pb-2">
            Este indicador representa a capacidade que a empresa tem de gerar lucro considerando todos os ativos disponíveis, incluindo dinheiro em caixa, contas a receber, tributos a recuperar, estoque, aplicações financeiras, imóveis, terrenos, veículos, maquinário, direitos autorais, patentes e muitos outros.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos o resultado deste indicador, devemos dividir o lucro líquido pelo total de ativos. Em termos gerais, quanto maior for o resultado, melhor, e o ideal é que haja uma tendência de crescimento ao longo dos anos.
        </p>
        <p className="indent-10 text-justify pb-2">
            No exemplo abaixo, temos pequenos recortes de uma DRE e de um balanço patrimonial, com o lucro líquido e o total de ativos em destaque, respectivamente. Ao dividirmos o primeiro pelo segundo, chegamos ao resultado de 0,01 ou 1% (360.389 / 21.411.985).
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/roa.png"
            alt="um exemplo de DRE e BP que demonstra o ROA"
            className="pb-8 lg:w-1/2 mx-auto"
        />

        {/* Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já é capaz de colher os dados necessários e efetuar os cálculos dos indicadores de eficiência. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/* Related Articles */}
        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/indicadores-de-lucratividade" className="indent-10 text-justify pb-2 underline">
            Indicadores de Lucratividade.
        </Link>
        <Link to="/artigos/indicadores-de-endividamento" className="indent-10 text-justify pb-8 underline">
            Indicadores de Endividamento.
        </Link>

    </article>
)
