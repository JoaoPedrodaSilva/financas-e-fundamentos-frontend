export const EficiencyMetrics = () => (
    <article className="text-white flex flex-col lg:text-lg px-5 lg:px-20 overflow-scroll">
        <h1 className="text-center text-xl font-bold py-8">Indicadores Fundamentalistas de Endividamento</h1>

        {/* Intro */}
        <p className="indent-10 text-justify pb-2">
            São importantes para sabermos como anda a saúde financeira da empresa, se ela possui condições de honrar com os compromissos assumidos em termos de empréstimos e financiamentos junto a terceiros.
        </p>
        <p className="indent-10 text-justify pb-8">
            Para iniciarmos os estudos, precisamos compreender melhor alguns relatórios financeiros divulgados, trimestralmente, pelas empresas.
        </p>

        {/* balance sheet */}
        <h2 className="indent-10 font-bold pb-2">
            Balanço Patrimonial
        </h2>
        <p className="indent-10 text-justify pb-4">
            O primeiro relatório financeiro que iremos analisar é chamado de balanço patrimonial, ele tem a finalidade de apresentar a posição financeira de uma empresa em determinada data. Esse documento é dividido em três partes: os ativos, os passivos e o patrimônio líquido. Detalharemos cada uma delas a seguir.
        </p>

        {/* balance sheet - assets */}
        <h3 className="indent-10 font-bold pb-2">
            Balanço Patrimonial - Ativos
        </h3>
        <p className="indent-10 text-justify pb-2">
            A primeira parte são os ativos. Aqui, encontramos todos os bens e direitos que uma empresa possui. Eles são divididos em duas categorias: os ativos circulantes e os ativos não circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os ativos circulantes são os bens e direitos com maior liquidez, ou seja, que a empresa consegue transformar em dinheiro de maneira mais rápida (em até 12 meses), por exemplo: dinheiro em caixa, contas a receber, tributos a recuperar, estoque e aplicações financeiras de maior liquidez.
        </p>
        <p className="indent-10 text-justify pb-4">
            Já os ativos não circulantes são os bens e direitos com menor liquidez, ou seja, que a empresa demoraria mais de 12 meses para transformar em dinheiro, por exemplo: imóveis, terrenos, veículos, maquinário, além de alguns ativos intangíveis, como direitos autorais e patentes.
        </p>

        {/* balance sheet - liabilities */}
        <h3 className="indent-10 font-bold pb-2">
            Balanço Patrimonial - Passivos
        </h3>
        <p className="indent-10 text-justify pb-2">
            A segunda parte são os passivos. Aqui, encontramos todas as dívidas e obrigações que uma empresa precisa honrar. Eles também são divididos em duas categorias: os passivos circulantes e os passivos não circulantes.
        </p>
        <p className="indent-10 text-justify pb-2">
            Os passivos circulantes são as dívidas e obrigações de curto prazo, ou seja, que a empresa precisa honrar em até 12 meses, por exemplo: salário de funcionários, pagamento de fornecedores, tributos e impostos, além de empréstimos e financiamentos.
        </p>
        <p className="indent-10 text-justify pb-2">
            Já os passivos não circulantes as dívidas e obrigações de mais longo prazo, ou seja, que a empresa pode demorar mais de 12 meses para honrar, por exemplo: empréstimos e financiamentos, debêntures e créditos provisionados.
        </p>

        {/* balance sheet - equity */}
        <h3 className="indent-10 font-bold pb-4">
            Balanço Patrimonial - Patrimônio Líquido
        </h3>
        <p className="indent-10 text-justify pb-2">
            A terceira e última parte é o patrimônio líquido. Ele corresponde à diferença entre os ativos e os passivos, além disso, é considerado como o valor contábil da empresa. Inclui o dinheiro investido pelos próprios sócios (capital social), as reservas de lucro e as ações em tesouraria, por exemplo.
        </p>


        <h2 className="indent-10 font-bold pb-2">
            Dívida Bruta
        </h2>
        <p className="indent-10 text-justify pb-2">
            A dívida bruta representa o total de empréstimos e financiamentos que uma empresa possui, tanto no curto, quanto no longo prazo. Para termos acesso a esses números, devemos nos basear em um documento chamado Balanço Patrimonial, ele é divulgado trimestralmente e
        </p>


        <h2 className="indent-10 font-bold pb-2">
            Dívida Líquida
        </h2>
        <p className="indent-10 text-justify pb-2">
            A dívida líquida representa o total de empréstimos e financiamentos que uma empresa possui, tanto no curto quanto no longo prazo, deduzidos o caixa e o equivalente de caixa. Para termos acesso a esses dados, devemos nos basear em um documento chamado Balanço Patrimonial, ele é divulgado trimestralmente pelas empresas e tem a finalidade de apresentar a posição financeira de uma empresa em determinada data, normalmente 31 de dezembro do ano em questão.
        </p>
        <p className="indent-10 text-justify pb-2">
            A dívida líquida representa o total de empréstimos e financiamentos que uma empresa possui, tanto no curto quanto no longo prazo, deduzidos o caixa e o equivalente de caixa. Para termos acesso a esses dados, devemos nos basear em um documento chamado Balanço Patrimonial, ele é divulgado trimestralmente pelas empresas e tem a finalidade de apresentar a posição financeira de uma empresa em determinada data, normalmente 31 de dezembro do ano em questão.
        </p>
        <p className="indent-10 text-justify pb-8">
            Entender o conceito de receita líquida é o passo inicial para se analisar a demonstração dos resultados publicada pela empresa, isso porque é a partir dela que vamos avançando pelos demais indicadores de lucratividade, e entendendo melhor o cenário em que a empresa se encontra em termos de vendas de produtos, prestações de serviços e pagamento de custos e despesas para continuar operando.
        </p>



        <h2 className="indent-10 font-bold pb-2">
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


        <h2 className="indent-10 font-bold pb-2">
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


        <h2 className="text-center text-sm sm:text-base lg:text-lg font-bold mb-3">
            Resumo Simplificado da Demonstração de Resultado do Exercício - DRE
        </h2>
        <div className="sm:w-3/4 text-[0.6rem] sm:text-sm lg:text-base grid grid-cols-12 items-center justify-center gap-y-2 mb-8 sm:mx-auto">
            <div className="col-span-1"></div>
            <div className="col-span-11 font-bold border-t-2">RECEITA LÍQUIDA</div>

            <div className="col-span-1 text-right mr-2">(-)</div>
            <div className="col-span-11">CUSTO PARA PRODUZIR O PRODUTO VENDIDO OU PARA PRESTAR O SERVIÇO</div>

            <div className="col-span-1 text-right mr-2">(-)</div>
            <div className="col-span-11 ">DESPESAS ADMINISTRATIVAS GERAIS, COMO FOLHA DE PAGAMENTO E PROPAGANDAS</div>

            <div className="col-span-1 text-right mr-2">(=)</div>
            <div className="col-span-11 font-bold border-t-2">LUCRO OPERACIONAL</div>

            <div className="col-span-1 text-right mr-2">(-)</div>
            <div className="col-span-11">IMPOSTO DE RENDA E CONTRIBUIÇÃO SOCIAL</div>

            <div className="col-span-1 text-right mr-2">(+/-)</div>
            <div className="col-span-11">RESULTADO FINANCEIRO</div>

            <div className="col-span-1 text-right mr-2">(=)</div>
            <div className="col-span-11 font-bold border-t-2">LUCRO LÍQUIDO</div>
        </div>
    </article>
)
