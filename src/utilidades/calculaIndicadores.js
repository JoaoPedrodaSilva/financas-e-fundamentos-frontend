// Balanço Patrimonial
const ativoCirculante = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.ativo_circulante / 1000))
}
const ativoNaoCirculante = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.ativo_nao_circulante / 1000))
}
const ativoTotal = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.ativo_total / 1000))
}
const passivoCirculante = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.passivo_circulante / 1000))
}
const passivoNaoCirculante = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.passivo_nao_circulante / 1000))
}
const passivoTotal = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.passivo_total / 1000))
}
const patrimonioLiquido = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.patrimonio_liquido / 1000))
}


// Demonstração de Resultado do Exercício
const receitaLiquida = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.receita_liquida / 1000))
}
const lucroBruto = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.lucro_bruto / 1000))
}
const lucroOperacional = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.lucro_operacional / 1000))
}
const lucroAntesTributos = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.lucro_antes_tributos / 1000))
}
const lucroLiquido = (dadosFinanceiros) => {
    return Math.round(Number(dadosFinanceiros.lucro_liquido / 1000))
}


// Endividamento
const dividaLiquidaPeloEbitda = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira || dadosCadastrais.holding) {
        return null
    }

    const dividaLiquida = Number(dadosFinanceiros.emprestimos_curto_prazo) + Number(dadosFinanceiros.emprestimos_longo_prazo) - Number(dadosFinanceiros.caixa_e_equivalentes)
    const ebitda = Number(dadosFinanceiros.lucro_operacional) + Number(dadosFinanceiros.depreciacao_e_amortizacao)

    if (dividaLiquida <= 0) {
        return 0
    }

    if (ebitda <= 0) {
        return 0
    }

    return Number((dividaLiquida / ebitda).toFixed(2))
}
const dividaBrutaPeloPatrimonioLiquido = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira || dadosCadastrais.holding) {
        return null
    }

    const dividaBruta = Number(dadosFinanceiros.emprestimos_curto_prazo) + Number(dadosFinanceiros.emprestimos_longo_prazo)
    const patrimonioLiquido = Number(dadosFinanceiros.patrimonio_liquido)

    if (patrimonioLiquido <= 0) {
        return 0
    }

    return Number((dividaBruta / patrimonioLiquido).toFixed(2))
}


// Rentabilidade
const retornoPeloPatrimonioLiquido = (dadosFinanceiros) => {
    const retornoPeloPatrimonioLiquido = Number(dadosFinanceiros.lucro_liquido) / Number(dadosFinanceiros.patrimonio_liquido)

    if (retornoPeloPatrimonioLiquido <= 0) {
        return 0
    }

    return Number(retornoPeloPatrimonioLiquido.toFixed(4))
}
const retornoPelosAtivos = (dadosFinanceiros) => {
    const retornoPelosAtivos = Number(dadosFinanceiros.lucro_liquido) / Number(dadosFinanceiros.ativo_total)

    if (retornoPelosAtivos <= 0) {
        return 0
    }

    return Number(retornoPelosAtivos.toFixed(4))
}


// Eficiência
const margemBruta = (dadosFinanceiros) => {
    const margemBruta = Number(dadosFinanceiros.lucro_bruto) / Number(dadosFinanceiros.receita_liquida)

    if (margemBruta <= 0) {
        return 0
    }

    return Number(margemBruta.toFixed(4))
}
const margemOperacional = (dadosFinanceiros) => {
    if (dadosFinanceiros.lucro_operacional === null) {
        return null
    }

    const margemOperacional = Number(dadosFinanceiros.lucro_operacional) / Number(dadosFinanceiros.receita_liquida)

    if (margemOperacional <= 0) {
        return 0
    }
    return Number(margemOperacional.toFixed(4))
}
const margemAntesTributos = (dadosFinanceiros) => {
    const margemAntesTributos = Number(dadosFinanceiros.lucro_antes_tributos) / Number(dadosFinanceiros.receita_liquida)

    if (margemAntesTributos <= 0) {
        return 0
    }
    return Number(margemAntesTributos.toFixed(4))
}
const margemLiquida = (dadosFinanceiros) => {
    const margemLiquida = Number(dadosFinanceiros.lucro_liquido) / Number(dadosFinanceiros.receita_liquida)

    if (margemLiquida <= 0) {
        return 0
    }
    return Number(margemLiquida.toFixed(4))
}


// Momento
const capexPeloFCO = (dadosFinanceiros) => {
    if (dadosFinanceiros.despesas_capital === null) {
        return null
    }

    let capexPeloFCO = Number(dadosFinanceiros.despesas_capital) / Number(dadosFinanceiros.caixa_liquido_operacional)

    return Number(capexPeloFCO.toFixed(4))
}
const capexPelaDA = (dadosFinanceiros) => {
    if (dadosFinanceiros.depreciacao_e_amortizacao === null) {
        return null
    }

    let capexPelaDA = Number(dadosFinanceiros.despesas_capital) / Number(dadosFinanceiros.depreciacao_e_amortizacao)

    return Number(capexPelaDA.toFixed(4))
}
const payout = (dadosFinanceiros) => {
    const payout = Number(dadosFinanceiros.proventos_distribuidos) / Number(dadosFinanceiros.lucro_liquido)

    if (payout <= 0) {
        return 0
    }
    return Number(payout.toFixed(4))
}


// Liquidez
const liquidezImediata = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return null
    }

    const liquidezImediata = Number(dadosFinanceiros.caixa_e_equivalentes) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezImediata <= 0) {
        return 0
    }
    
    return Number(liquidezImediata.toFixed(2))
}
const liquidezSeca = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira || dadosFinanceiros.estoques === null) {
        return null
    }

    const liquidezSeca = (Number(dadosFinanceiros.ativo_circulante) - Number(dadosFinanceiros.estoques)) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezSeca <= 0) {
        return 0
    }

    return Number(liquidezSeca.toFixed(2))
}
const liquidezCorrente = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return null
    }

    const liquidezCorrente = Number(dadosFinanceiros.ativo_circulante) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezCorrente <= 0) {
        return 0
    }

    return Number(liquidezCorrente.toFixed(2))
}
const liquidezGeral = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return null
    }

    const liquidezGeral = (Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_realizavel_longo_prazo)) / (Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante))

    if (liquidezGeral <= 0) {
        return 0
    }

    return Number(liquidezGeral.toFixed(2))
}


export const calculaIndicadores = (dadosFinanceiros, dadosCadastrais) => ({
    //Balanço Patrimonial
    ativoCirculante: ativoCirculante(dadosFinanceiros),
    ativoNaoCirculante: ativoNaoCirculante(dadosFinanceiros),
    ativoTotal: ativoTotal(dadosFinanceiros),
    passivoCirculante: passivoCirculante(dadosFinanceiros),
    passivoNaoCirculante: passivoNaoCirculante(dadosFinanceiros),
    passivoTotal: passivoTotal(dadosFinanceiros),
    patrimonioLiquido: patrimonioLiquido(dadosFinanceiros),

    // Demonstração de Resultado do Exercício
    receitaLiquida: receitaLiquida(dadosFinanceiros),
    lucroBruto: lucroBruto(dadosFinanceiros),
    lucroOperacional: lucroOperacional(dadosFinanceiros),
    lucroAntesTributos: lucroAntesTributos(dadosFinanceiros),
    lucroLiquido: lucroLiquido(dadosFinanceiros),

    // Endividamento
    dividaLiquidaPeloEbitda: dividaLiquidaPeloEbitda(dadosFinanceiros, dadosCadastrais),
    dividaBrutaPeloPatrimonioLiquido: dividaBrutaPeloPatrimonioLiquido(dadosFinanceiros, dadosCadastrais),

    // Rentabilidade
    retornoPeloPatrimonioLiquido: retornoPeloPatrimonioLiquido(dadosFinanceiros),
    retornoPelosAtivos: retornoPelosAtivos(dadosFinanceiros),

    // Eficiência
    margemBruta: margemBruta(dadosFinanceiros),
    margemOperacional: margemOperacional(dadosFinanceiros),
    margemAntesTributos: margemAntesTributos(dadosFinanceiros),
    margemLiquida: margemLiquida(dadosFinanceiros),

    // Momento
    capexPeloFCO: capexPeloFCO(dadosFinanceiros),
    capexPelaDA: capexPelaDA(dadosFinanceiros),
    payout: payout(dadosFinanceiros),

    // Liquidez
    liquidezImediata: liquidezImediata(dadosFinanceiros, dadosCadastrais),
    liquidezSeca: liquidezSeca(dadosFinanceiros, dadosCadastrais),
    liquidezCorrente: liquidezCorrente(dadosFinanceiros, dadosCadastrais),
    liquidezGeral: liquidezGeral(dadosFinanceiros, dadosCadastrais)
})