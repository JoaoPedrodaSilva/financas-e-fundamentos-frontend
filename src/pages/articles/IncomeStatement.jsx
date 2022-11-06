import { Link } from "react-router-dom"

export const IncomeStatement = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">

        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Demonstração de Resultado do Exercício</h1>


        {/* Recomendations */}
        <p className="text-center pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que leia também os seguintes artigos.
        </p>
        <Link to="/artigos/balanco-patrimonial" className="text-center pb-2 underline">
            BP - Balanço Patrimonial.
        </Link>
        <Link to="/artigos/demonstracao-de-fluxo-de-caixa" className="text-center pb-8 underline">
            DFC - Demonstração de Fluxo de Caixa.
        </Link>


        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            As empresas listadas na bolsa são obrigadas a divulgar, trimestralmente, alguns relatórios financeiros padronizados. Estes relatórios contêm informações importantíssimas, que são necessárias para podermos elaborar nossa própria análise e decidirmos se devemos, ou não, investir naquela empresa. Por isso, é essencial saber onde encontrar estes relatórios financeiros e como extrair deles os dados relevantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Pois bem, toda empresa possui um site de relacionamento com o investidor, e é nesse site que podemos encontrar todos os relatórios dos quais necessitamos, normalmente eles se encontram disponíveis em "Informações Financeiras - Central de Resultados - Release ou Divulgação de Resultados". Neste artigo, estudaremos um pouco mais sobre a DRE (Demonstração de Resultado do Exercício).
        </p>
        <p className="indent-10 text-justify pb-2">
            A DRE tem por finalidade apresentar as operações financeiras da empresa, em um determinado período, para deixar claro se ela obteve lucro ou prejuízo. O meio utilizado para alcançar esse objetivo é a comparação entre receitas e despesas. Este relatório financeiro é uma ótima ferramenta para se identificar gargalos de produção, é possível observar em que momento a empresa está deixando a desejar.
        </p>
        <p className="indent-10 text-justify pb-8">
            A DRE é composta por diversas linhas e deve ser analisada de cima para baixo. Detalharemos cada uma dessas linhas a seguir.
        </p>


        {/* Net Revenue */}
        <h2 className="text-center font-bold pb-2">
            Receita Líquida
        </h2>
        <p className="indent-10 text-justify pb-2">
            Na DRE, a receita líquida costuma ser o primeiro dado apresentado, portanto, fica na parte superior do documento.
        </p>
        <p className="indent-10 text-justify pb-2">
            A receita líquida é o dinheiro que a empresa conseguiu ganhar ao realizar suas operações de venda de produtos e/ou prestação de serviços. Basicamente, ela equivale a quase todo dinheiro que entra no caixa. Digo quase todo dinheiro, pois este indicador não inclui descontos, devoluções, abatimentos e alguns impostos, como IPI, ISS e ICMS, por exemplo.
        </p>
        <p className="indent-10 text-justify pb-8">
            Entender o conceito de receita líquida é o passo inicial para se analisar a DRE, isso porque é a partir dela que vamos avançando pelos demais dados.
        </p>


        {/* Cost of Sales */}
        <h2 className="text-center font-bold pb-2">
            Custo das Vendas
        </h2>
        <p className="indent-10 text-justify pb-8">
            Após a receita líquida, costuma-se apresentar o custo das vendas. Em outras palavras, o custo das vendas é tudo aquilo que foi gasto diretamente na produção do produto que foi vendido ou do serviço que foi prestado, por exemplo: papéis, tecidos, plásticos, metais e mão de obra.
        </p>


        {/* Gross Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro Bruto
        </h2>
        <p className="indent-10 text-justify pb-2">
            O lucro bruto costuma ser apresentado após o custo das vendas.
        </p>
        <p className="indent-10 text-justify pb-8">
            Partindo da receita líquida e deduzindo o custo das vendas, chegamos ao lucro bruto. Assim, ele representa o valor que sobrou para a empresa após deduzir tudo que foi gasto, desde a produção, até o momento da venda.
        </p>


        {/* General and Administrative Expenses */}
        <h2 className="text-center font-bold pb-2">
            Despesas Gerais e Administrativas
        </h2>
        <p className="indent-10 text-justify pb-8">
            Após o lucro bruto, costuma-se apresentar as despesas gerais e administrativas.Elas representam os gastos que não estão relacionados diretamente à produção, por exemplo: honorários jurídicos; aluguel, manutenção e seguro das instalações e equipamentos; serviços de recepção e limpeza.
        </p>


        {/* Operating Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro Operacional
        </h2>
        <p className="indent-10 text-justify pb-2">
            Após as despesas gerais e administrativas, costuma-se apresentar o lucro operacional. Ele também é conhecido por outros nomes, como EBIT (Earnings Before Interest and Taxes) ou LAJIR (Lucro antes dos Juros e Imposto de Renda).
        </p>
        <p className="indent-10 text-justify pb-2">
            Partindo do lucro bruto e deduzindo as despesas gerais e administrativas, chegamos ao lucro operacional. Assim, ele representa o valor que sobrou para a empresa após deduzir todos os custos e despesas, sejam eles diretos ou indiretos.
        </p>
        <p className="indent-10 text-justify pb-8">
            Podemos dizer que o lucro operacional é aquele gerado, exclusivamente, pela operação do negócio, portanto, permite avaliar a capacidade que a empresa tem de gerar lucro com suas atividades-fim, ou seja, suas operações.
        </p>
        


        {/* 24 - Financial Expenses or Incomes */}
        <h2 className="text-center font-bold pb-2">
            Resultado Financeiro
        </h2>
        <p className="indent-10 text-justify pb-2">
            Após o lucro operacional, costuma-se apresentar o resultado financeiro, que pode ser positivo ou negativo.
        </p>
        <p className="indent-10 text-justify pb-8">
            Trata-se do lucro (ou prejuízo) que a empresa obteve com sua gestão financeira, e não com suas operações. Por exemplo, se a empresa manteve algum dinheiro em aplicações financeiras, como títulos públicos ou créditos bancários, e recebeu juros por isso, o resultado financeiro dessa aplicação é positivo. Por outro lado, se a empresa pegou dinheiro emprestado e pagou juros por ele, então, o resultado financeiro dessa operação é negativo.
        </p>


        {/* Income Tax Expenses */}
        <h2 className="text-center font-bold pb-2">
            Tributos
        </h2>
        <p className="indent-10 text-justify pb-2">
            Após o resultado financeiro, costuma-se apresentar os tributos.
        </p>
        <p className="indent-10 text-justify pb-8">
            Aqui, estamos falando dos tributos que incidem diretamente sobre o lucro que a empresa obteve, mais especificamente, imposto de renda (IR) e contribuição social (CSLL).
        </p>


        {/* Net Income */}
        <h2 className="text-center font-bold pb-2">
            Lucro Líquido
        </h2>
        <p className="indent-10 text-justify pb-2">
            Costuma ser apresentado após os tributos e é um dos últimos dados a serem apresentados.
        </p>
        <p className="indent-10 text-justify pb-8">
            Partindo do lucro operacional, deduzindo ou acrescentando o resultado financeiro, e deduzindo os tributos, chegamos ao lucro líquido. Ele é, sem dúvida, um dos indicadores mais importantes na análise de uma empresa, pois pode ser considerado como o dinheiro que, de fato, a empresa ganhou (ou perdeu) durante o período analisado.
        </p>


        {/* Example */}
        <p className="indent-10 text-justify pb-2">
            Abaixo temos um exemplo de uma DRE - Demonstração de Resultados do Exercício, com a receita líquida, o lucro operacional e o lucro líquido em destaque.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/income-statement.png"
            alt="Exemplo de balanço patrimonial"
            className="pb-8 lg:w-1/4 mx-auto"
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
