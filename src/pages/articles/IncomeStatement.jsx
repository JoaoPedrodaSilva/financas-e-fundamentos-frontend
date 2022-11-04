import { Link } from "react-router-dom"

export const IncomeStatement = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">

        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Demonstração de Resultado do Exercício</h1>


        {/* Recomendations */}
        <p className="indent-10 text-justify pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que você leia também os seguintes artigos.
        </p>
         <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            BP - Balanço Patrimonial.
        </Link>
        {/*
        <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            DFC - Demonstração de Fluxo de Caixa.
        </Link> */}


        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            As empresas listadas na bolsa são obrigadas a divulgar, trimestralmente, alguns relatórios financeiros padronizados. Estes relatórios contêm informações importantíssimas, que são necessárias para podermos elaborar nossa própria análise e decidirmos se devemos, ou não, investir naquela empresa. Por isso, é essencial saber onde encontrar estes relatórios financeiros e como extrair deles os dados relevantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Pois bem, toda empresa possui um site de relacionamento com o investidor, e é nesse site que podemos encontrar todos os relatórios dos quais necessitamos. Neste artigo, estudaremos um pouco mais sobre a DRE (Demonstração de Resultado do Exercício).
        </p>
        <p className="indent-10 text-justify pb-8">
            A DRE tem por finalidade apresentar as operações financeiras da empresa, em um determinado período, para deixar claro se ela obteve lucro ou prejuízo. O meio utilizado para alcançar esse objetivo é a comparação entre receitas e despesas. Este relatório financeiro é uma ótima ferramenta para se identificar gargalos de produção, é possível observar em que momento a empresa está deixando a desejar.
        </p>
        <p className="indent-10 text-justify pb-8">
            Quatro dados principais formam a DRE, são eles: receita líquida, lucro bruto, lucro operacional e lucro líquido.
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




        {/* Example */}
        <p className="indent-10 text-justify pb-2">
            Abaixo temos um exemplo de uma DRE - Demonstração de Resultados do Exercício, com a a receita líquida, o lucro bruto, o lucro operacional e o lucro líquido em destaque.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/balance-sheet.png"
            alt="imagem de um exemplo de balanço patrimonial"
            className="pb-8  lg:w-1/2 mx-auto"
        />


        {/* Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já conhece um dos relatórios financeiros mais importantes na hora de analisar uma companhia. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/* Related Articles */}
         <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            BP - Balanço Patrimonial.
        </Link>
        {/* <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            DFC - Demonstração de Fluxo de Caixa.
        </Link> */}

    </article>
)
