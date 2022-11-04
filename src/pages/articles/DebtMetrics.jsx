import { Link } from "react-router-dom"

export const DebtMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20">


        {/* Title */}
        <h1 className="text-center text-xl font-bold py-8">Indicadores de Endividamento</h1>


        {/* Recomendations */}
        <p className="indent-10 text-justify pb-2">
            Para aproveitar melhor este conteúdo, recomendamos que você leia também o seguinte artigo.
        </p>
        <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            BP - Balanço Patrimonial.
        </Link>
        {/* <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            DRE - Demonstração de Resultado do Exercício.
        </Link>
        <Link to="/artigos/balanco-patrimonial" className="indent-10 text-justify pb-8 underline">
            DFC - Demonstração de Fluxo de Caixa.
        </Link> */}

        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            Os indicadores de endividamento são importantes para sabermos como anda a saúde financeira da empresa e, principalmente, se ela possui condições de honrar com os empréstimos e financiamentos assumidos junto a terceiros. Empresas muito endividadas costumam ter menos fôlego para manter ou aumentar sua produtividade, além disso, podem sofrer mais em períodos de crise.
        </p>
        <p className="indent-10 text-justify pb-2">
            Neste artigo, analisaremos dois dos principais indicadores de endividamento: "Dívida Bruta / Patrimônio Líquido" e "Dívida Líquida / EBITDA". Entenderemos como podemos calculá-los e interpretar seus resultados.
        </p>
        <p className="indent-10 text-justify pb-8">
            Mas antes de começarmos a falar sobre eles, precisaremos compreender cinco dados isolados, que serão usados para compor o cálculo dos indicadores em si: dívida bruta, dívida líquida, patrimônio líquido, lucro operacional e, por fim, depreciação e amortização. Todos estes dados podem ser colhidos em algum relatório financeiro divulgado pela empresa, seja ele o balanço patrimonial, a demontração de resultado do exercício ou a demonstração de fluxo de caixa. Detalharemos a seguir.
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
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/gross-debt.png"
            alt="um exemplo da parte de passivos do balanço patrimonial"
            className="pb-8 lg:w-1/2 mx-auto"
        />


        {/* Net Debt */}
        <h2 className="text-center font-bold pb-2">
            Dívida Líquida
        </h2>
        <p className="indent-10 text-justify pb-2">
            Agora que já aprendemos a encontrar a dívida bruta fica fácil calcularmos a dívida líquida. Para isso, basta subtrairmos o caixa e os equivalentes de caixa da dívida bruta. O caixa e os equivalentes de caixa é um dado que também está disponível no balanço patrimonial, só que desta vez, na parte dos ativos, mais especificamente, nos ativos circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Agora que já aprendemos a encontrar a dívida bruta fica fácil calcularmos a dívida líquida. Para isso, basta subtrairmos o caixa e os equivalentes de caixa da dívida bruta. O caixa e os equivalentes de caixa é um dado que também está disponível no balanço patrimonial, só que desta vez, na parte dos ativos, mais especificamente, nos ativos circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            No exemplo abaixo, somamos os empréstimos e financiamentos de curto e de longo prazo para chegarmos a uma dívida bruta de 509.496. Em seguida, subtraimos o caixa e equivalentes de caixa para chegarmos a uma dívida líquida de 439.871. Bastante simples, certo?
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/net-debt.png"
            alt="um exemplo de balanço patrimonial que demonstra a dívida líquida"
            className="pb-8 lg:w-1/2 mx-auto"
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
            className="pb-8 lg:w-1/2 mx-auto"
        />

        {/* Ebit */}
        <h2 className="text-center font-bold pb-2">
            Lucro operacional
        </h2>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos o lucro operacional (também chamado de EBIT), precisamos olhar a DRE - Demonstração de Resultado do Exercício, divulgada trimestralmente no site de relacionamento com o investidor das empresas. No exemplo abaixo, é possível observar que o lucro operacional apresentado neste exemplo de DRE é de 434.640.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ebit.png"
            alt="um exemplo de DRE que mostra o lucro operacional"
            className="pb-8 lg:w-1/4 mx-auto"
        />

        {/* Depreciation and amortization */}
        <h2 className="text-center font-bold pb-2">
            Depreciação e Amortização
        </h2>
        <p className="indent-10 text-justify pb-2">
            Para encontrarmos a depreciação e amortização, precisamos olhar a parte operacional da DFC - Demonstração de Fluxo de Caixa, divulgada trimestralmente no site de relacionamento com o investidor das empresas. No exemplo abaixo, é possível observar que a depreciação e amortização apresentada neste exemplo de DFC é de 262.964.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/depreciation-and-amortization.png"
            alt="um exemplo de DFC que mostra a depreciação e amortização"
            className="pb-8 lg:w-1/2 mx-auto"
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
            className="pb-8 lg:w-1/4 mx-auto"
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
            No exemplo abaixo, temos pequenos recortes do balanço patrimonial, da demonstração de resultado do exercício e da demonstração de fluxo de caixa de uma empresa. Podemos somar todos os empréstimos e financiamentos para chegarmos a uma dívida bruta de 509.496. Agora, subtraímos o caixa e equivalentes de caixa, com isso, chegamos a uma dívida líquida de 439.871. Em seguida precisaremos encontrar o ebitda, para isso, somamos o lucro operacional e as depreciações e amortizações, chegando a um valor de 697.604. Finalmente, dividimos a dívida líquida pelo ebitda, chegando ao resultado de 0,63. É um resultado desejável.
        </p>
        <img
            src="https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/net-debt-ebitda.png"
            alt="um exemplo de BP, DRE e DFC que demonstra a dívida líquida / ebitda"
            className="pb-8 lg:w-1/2 mx-auto"
        />

        {/* Ending */}
        <p className="indent-10 text-justify pb-8">
            Agora você já é capaz de colher os dados necessários e efetuar os cálculos dos indicadores de endividamento. Esse é um grande passo para poder fazer sua própria análise e decidir se vai investir, ou não, em determinada empresa.
        </p>


        {/* Related Articles */}
        <h2 className="text-center font-bold pb-2">
            Artigos relacionados
        </h2>
        <Link to="/artigos/indicadores-de-lucratividade" className="indent-10 text-justify pb-2 underline">
            Indicadores de Lucratividade.
        </Link>
        <Link to="/artigos/indicadores-de-eficiencia" className="indent-10 text-justify pb-8 underline">
            Indicadores de Eficiência.
        </Link>

    </article>
)
