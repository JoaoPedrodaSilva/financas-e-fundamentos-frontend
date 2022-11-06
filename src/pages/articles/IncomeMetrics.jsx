import { Link } from "react-router-dom"

export const IncomeMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">

        {/*1 Title */}
        <h1 className="text-center text-xl font-bold py-8">Indicadores de Lucratividade</h1>


        {/*2 Recomendations */}
        <p className="text-center pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que leia também o seguinte artigo.
        </p>
        <Link to="/artigos/demonstracao-de-resultados-do-exercicio" className="text-center pb-8 underline">
            DRE - Demonstração de Resultado do Exercício.
        </Link>


        {/*4 Intro */}
        <p className="indent-10 text-justify pb-2">
            Os indicadores de lucratividade são um dos mais importantes a serem observados, afinal, o objetivo econômico de toda empresa é a geração de lucro. Teoricamente, quanto maiores forem os números apresentados por estes indicadores, melhor, e o ideal é que haja uma tendência de crescimento ao longo dos anos.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os indicadores apresentados neste artigo são encontrados em um relatório financeiro chamado DRE - Demonstração de Resultado do Exercício. Este documento é publicado pelas empresas trimestralmente, e é uma espécie de resumo das operações financeiras em determinado período.
        </p>
        <p className="indent-10 text-justify pb-8">
            Alguns dos principais indicadores de lucratividade são:
        </p>


        {/*7 Net Revenue */}
        <h2 className="text-center font-bold pb-2">
            Receita Líquida
        </h2>
        <p className="indent-10 text-justify pb-2">
            Na DRE, a receita líquida costuma ser o primeiro dado apresentado, portanto, fica na parte superior do documento. A nomenclatura mais comum que as empresas utilizam para designar este indicador é "Receita de Venda de Bens e/ou Serviços".
        </p>
        <p className="indent-10 text-justify pb-2">
            A receita líquida é o dinheiro que a empresa conseguiu ganhar ao realizar suas operações de venda de produtos e/ou prestação de serviços. Basicamente, ela equivale a quase todo dinheiro que entra no caixa. Digo quase todo dinheiro, pois este indicador não inclui descontos, devoluções, abatimentos e alguns impostos, como IPI, ISS e ICMS, por exemplo.
        </p>
        <p className="indent-10 text-justify pb-8">
            Entender o conceito de receita líquida é o passo inicial para se analisar a demonstração dos resultados publicada pela empresa, isso porque é a partir dela que vamos avançando pelos demais indicadores de lucratividade, e entendendo melhor o cenário em que a empresa se encontra em termos de vendas de produtos, prestações de serviços e pagamento de custos e despesas para continuar operando.
        </p>


        {/*11 Operating Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro Operacional
        </h2>
        <p className="indent-10 text-justify pb-2">
            Na DRE, o lucro operacional costuma ser apresentado em uma posição intermediária, não muito perto do início, nem muito perto do fim do documento. A nomenclatura mais comum que as empresas utilizam para designar este indicador é "Resultado Antes do Resultado Financeiro e dos Tributos", mas ele também é conhecido por outros nomes, como EBIT (Earnings Before Interest and Taxes) ou LAJIR (Lucro antes dos Juros e Imposto de Renda).
        </p>
        <p className="indent-10 text-justify pb-2">
            O lucro operacional é aquele gerado, exclusivamente, pela operação do negócio. Este indicador permite avaliar a capacidade que a empresa tem de gerar lucro com suas atividades-fim, ou seja, suas operações.
        </p>
        <p className="indent-10 text-justify pb-8">
            Para entendermos melhor como calculá-lo, devemos começar pela receita líquida, depois deduzimos o custo que a empresa teve para produzir os produtos vendidos ou para prestar os serviços, deduzimos também as despesas administrativas gerais, como folha de pagamento, aluguel ou manutenção das instalações e propagandas, por exemplo. Após todas essas deduções, finalmente, encontramos o lucro operacional da empresa.
        </p>


        {/*15 Net Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro Líquido
        </h2>
        <p className="indent-10 text-justify pb-2">
            Na DRE, o lucro líquido costuma ser um dos últimos dados a serem apresentados, portanto, fica mais próximo da parte inferior do documento. A nomenclatura mais comum que as empresas utilizam para designar este indicador é "Lucro/Prejuízo Consolidado do Período".
        </p>
        <p className="indent-10 text-justify pb-2">
            O lucro líquido é, sem dúvida, um dos indicadores mais importantes na análise de uma empresa, isso porque ele pode ser considerado como o dinheiro que, de fato, a empresa ganhou (ou perdeu) durante o período analisado.
        </p>
        <p className="indent-10 text-justify pb-2">
            Para entendermos melhor como calculá-lo, devemos começar pela lucro operacional, depois deduzimos os tributos devidos (imposto de renda e contribuição social), e aplicamos o resultado financeiro. Após tudo isso, finalmente, encontramos o lucro líquido da empresa.
        </p>
        <p className="indent-10 text-justify pb-8">
            O resultado financeiro é um dado que merece explicação à parte. Trata-se do lucro (ou prejuízo) que a empresa obteve com sua gestão financeira, e não com suas operações. Por exemplo, se a empresa manteve algum dinheiro em aplicações financeiras, como títulos públicos ou créditos bancários, e recebeu juros por isso, o resultado financeiro dessa aplicação é positivo. Por outro lado, se a empresa pegou dinheiro emprestado e pagou juros por ele, então o resultado financeiro dessa operação é negativo.
        </p>


        {/*20 Example */}
        <p className="indent-10 text-justify pb-2">
            Abaixo temos um exemplo de uma DRE - Demonstração de Resultado do Exercício, com a receita líquida, o lucro operacional e o lucro líquido em destaque.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/income-statement.png"
            alt="um exemplo de DRE - Demonstração de Resultado do Exercício"
            className="pb-8 lg:w-1/4 mx-auto"
        />


        {/*22 Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já é capaz de colher os dados necessários e analisar a lucratividade de uma companhia. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/*23 Related Articles */}
        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/indicadores-de-endividamento" className="text-center pb-2 underline">
            Indicadores de Endividamento.
        </Link>
        <Link to="/artigos/indicadores-de-eficiencia" className="text-center pb-8 underline">
            Indicadores de Eficiência.
        </Link>

    </article>
)
