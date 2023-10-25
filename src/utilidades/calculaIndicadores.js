const ativoTotal = (dadosFinanceiros, dadosCadastrais) => {
    let ativoTotal = Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_nao_circulante)

    if (dadosCadastrais && dadosCadastrais.instituicao_financeira) {
        ativoTotal = Number(dadosFinanceiros.ativo_total)
    }

    return Math.round(Number(ativoTotal / 1000))
}
const patrimonioLiquido = (dadosFinanceiros, dadosCadastrais) => {

    let patrimonioLiquido = Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_nao_circulante) - Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante)

    if (dadosCadastrais.instituicao_financeira) {
        patrimonioLiquido = Number(dadosFinanceiros.patrimonio_liquido)
    }

    return Math.round(Number(patrimonioLiquido / 1000))
}
const receitaLiquida = (dadosFinanceiros) => {
    let receitaLiquida = Number(dadosFinanceiros.receita_liquida)

    return Math.round(Number(receitaLiquida / 1000))
}
const lucroBruto = (dadosFinanceiros) => {
    let lucroBruto = Number(dadosFinanceiros.lucro_bruto)

    return Math.round(Number(lucroBruto / 1000))
}
const lucroOperacional = (dadosFinanceiros) => {
    let lucroOperacional = Number(dadosFinanceiros.lucro_operacional)

    return Math.round(Number(lucroOperacional / 1000))
}
const lucroAntesTributos = (dadosFinanceiros) => {
    let lucroAntesTributos = Number(dadosFinanceiros.lucro_antes_tributos)

    return Math.round(Number(lucroAntesTributos / 1000))
}
const lucroLiquido = (dadosFinanceiros) => {
    let lucroLiquido = Number(dadosFinanceiros.lucro_liquido)

    return Math.round(Number(lucroLiquido / 1000))
}
const dividaLiquidaPeloEbitda = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }

    const dividaLiquida = Number(dadosFinanceiros.emprestimos_curto_prazo) + Number(dadosFinanceiros.emprestimos_longo_prazo) - Number(dadosFinanceiros.caixa_e_equivalentes)
    const ebitda = Number(dadosFinanceiros.lucro_operacional) + Number(dadosFinanceiros.depreciacao_e_amortizacao)

    if (dividaLiquida <= 0 || ebitda <= 0) {
        return 0
    }

    return Number((dividaLiquida / ebitda).toFixed(2))
}
const dividaBrutaPeloPatrimonioLiquido = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }

    const dividaBruta = Number(dadosFinanceiros.emprestimos_curto_prazo) + Number(dadosFinanceiros.emprestimos_longo_prazo)
    const patrimonioLiquido = Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_nao_circulante) - Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante)

    if (patrimonioLiquido <= 0) {
        return 0
    }
    return Number((dividaBruta / patrimonioLiquido).toFixed(2))
}
const retornoPeloPatrimonioLiquido = (dadosFinanceiros, dadosCadastrais) => {

    let patrimonioLiquido = Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_nao_circulante) - Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante)

    if (dadosCadastrais.instituicao_financeira) {
        patrimonioLiquido = Number(dadosFinanceiros.patrimonio_liquido)
    }

    const retornoPeloPatrimonioLiquido = Number(dadosFinanceiros.lucro_liquido) / patrimonioLiquido

    if (retornoPeloPatrimonioLiquido <= 0) {
        return 0
    }

    return Number(retornoPeloPatrimonioLiquido.toFixed(4))
}
const retornoPelosAtivos = (dadosFinanceiros, dadosCadastrais) => {
    let ativos = Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_nao_circulante)

    if (dadosCadastrais && dadosCadastrais.instituicao_financeira) {
        ativos = Number(dadosFinanceiros.ativo_total)
    }

    const retornoPelosAtivos = Number(dadosFinanceiros.lucro_liquido) / ativos

    if (retornoPelosAtivos <= 0) {
        return 0
    }

    return Number(retornoPelosAtivos.toFixed(4))
}
const margemBruta = (dadosFinanceiros) => {
    const margemBruta = Number(dadosFinanceiros.lucro_bruto) / Number(dadosFinanceiros.receita_liquida)

    if (margemBruta <= 0) {
        return 0
    }
    return Number(margemBruta.toFixed(4))
}
const margemOperacional = (dadosFinanceiros) => {
    const margemOperacional = Number(dadosFinanceiros.lucro_operacional) / Number(dadosFinanceiros.receita_liquida)

    if (margemOperacional <= 0) {
        return 0
    }
    return Number(margemOperacional.toFixed(4))
}
const margemLiquida = (dadosFinanceiros) => {
    const margemLiquida = Number(dadosFinanceiros.lucro_liquido) / Number(dadosFinanceiros.receita_liquida)

    if (margemLiquida <= 0) {
        return 0
    }
    return Number(margemLiquida.toFixed(4))
}
const capexPeloFCO = (dadosFinanceiros) => {
    let capexPeloFCO = Number(dadosFinanceiros.despesas_capital) / Number(dadosFinanceiros.caixa_liquido_operacional)

    return Number(capexPeloFCO.toFixed(4))
}
const capexPelaDA = (dadosFinanceiros) => {
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
const liquidezImediata = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }

    const liquidezImediata = Number(dadosFinanceiros.caixa_e_equivalentes) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezImediata <= 0) {
        return 0
    }
    return Number(liquidezImediata.toFixed(2))
}
const liquidezSeca = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }

    const liquidezSeca = (Number(dadosFinanceiros.ativo_circulante) - Number(dadosFinanceiros.estoques)) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezSeca <= 0) {
        return 0
    }
    return Number(liquidezSeca.toFixed(2))
}
const liquidezCorrente = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }

    const liquidezCorrente = Number(dadosFinanceiros.ativo_circulante) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezCorrente <= 0) {
        return 0
    }
    return Number(liquidezCorrente.toFixed(2))
}
const liquidezGeral = (dadosFinanceiros, dadosCadastrais) => {
    if (dadosCadastrais.instituicao_financeira) {
        return 0
    }
    
    const liquidezGeral = (Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_realizavel_longo_prazo)) / (Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante))

    if (liquidezGeral <= 0) {
        return 0
    }
    return Number(liquidezGeral.toFixed(2))
}



export const calculaIndicadores = (dadosFinanceiros, dadosCadastrais) => ({
    ativoTotal: ativoTotal(dadosFinanceiros, dadosCadastrais),
    patrimonioLiquido: patrimonioLiquido(dadosFinanceiros, dadosCadastrais),
    receitaLiquida: receitaLiquida(dadosFinanceiros),
    lucroBruto: lucroBruto(dadosFinanceiros),
    lucroOperacional: lucroOperacional(dadosFinanceiros),
    lucroAntesTributos: lucroAntesTributos(dadosFinanceiros),
    lucroLiquido: lucroLiquido(dadosFinanceiros),
    dividaLiquidaPeloEbitda: dividaLiquidaPeloEbitda(dadosFinanceiros, dadosCadastrais),
    dividaBrutaPeloPatrimonioLiquido: dividaBrutaPeloPatrimonioLiquido(dadosFinanceiros, dadosCadastrais),
    retornoPeloPatrimonioLiquido: retornoPeloPatrimonioLiquido(dadosFinanceiros, dadosCadastrais),
    retornoPelosAtivos: retornoPelosAtivos(dadosFinanceiros, dadosCadastrais),
    margemBruta: margemBruta(dadosFinanceiros),
    margemOperacional: margemOperacional(dadosFinanceiros),
    margemLiquida: margemLiquida(dadosFinanceiros),
    capexPeloFCO: capexPeloFCO(dadosFinanceiros),
    capexPelaDA: capexPelaDA(dadosFinanceiros),
    payout: payout(dadosFinanceiros),
    liquidezImediata: liquidezImediata(dadosFinanceiros, dadosCadastrais),
    liquidezSeca: liquidezSeca(dadosFinanceiros, dadosCadastrais),
    liquidezCorrente: liquidezCorrente(dadosFinanceiros, dadosCadastrais),
    liquidezGeral: liquidezGeral(dadosFinanceiros, dadosCadastrais)
})