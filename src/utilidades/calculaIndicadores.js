const dividaLiquidaPeloEbitda = (dadosFinanceiros) => {
    const dividaLiquida = Number(dadosFinanceiros.emprestimos_curto_prazo) + Number(dadosFinanceiros.emprestimos_longo_prazo) - Number(dadosFinanceiros.caixa_e_equivalentes)
    const ebitda = Number(dadosFinanceiros.lucro_operacional) + Number(dadosFinanceiros.depreciacao_e_amortizacao)

    if (dividaLiquida <= 0 || ebitda <= 0) {
        return 0
    }

    return Number((dividaLiquida / ebitda).toFixed(2))
}
const dividaBrutaPeloPatrimonioLiquido = (dadosFinanceiros) => {
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

    return Number(retornoPeloPatrimonioLiquido.toFixed(2))
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

    return Number(retornoPelosAtivos.toFixed(2))
}
const margemBruta = (dadosFinanceiros) => {
    const margemBruta = Number(dadosFinanceiros.lucro_bruto) / Number(dadosFinanceiros.receita_liquida)

    if (margemBruta <= 0) {
        return 0
    }
    return Number(margemBruta.toFixed(2))
}
const margemOperacional = (dadosFinanceiros) => {
    const margemOperacional = Number(dadosFinanceiros.lucro_operacional) / Number(dadosFinanceiros.receita_liquida)

    if (margemOperacional <= 0) {
        return 0
    }
    return Number(margemOperacional.toFixed(2))
}
const margemLiquida = (dadosFinanceiros) => {
    const margemLiquida = Number(dadosFinanceiros.lucro_liquido) / Number(dadosFinanceiros.receita_liquida)

    if (margemLiquida <= 0) {
        return 0
    }
    return Number(margemLiquida.toFixed(2))
}
const payout = (dadosFinanceiros) => {
    const payout = Number(dadosFinanceiros.provento_distribuido) / Number(dadosFinanceiros.lucro_liquido)

    if (payout <= 0) {
        return 0
    }
    return Number(payout.toFixed(2))
}
const liquidezImediata = (dadosFinanceiros) => {
    const liquidezImediata = Number(dadosFinanceiros.caixa_e_equivalentes) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezImediata <= 0) {
        return 0
    }
    return Number(liquidezImediata.toFixed(2))
}
const liquidezCorrente = (dadosFinanceiros) => {
    const liquidezCorrente = Number(dadosFinanceiros.ativo_circulante) / Number(dadosFinanceiros.passivo_circulante)

    if (liquidezCorrente <= 0) {
        return 0
    }
    return Number(liquidezCorrente.toFixed(2))
}
const liquidezGeral = (dadosFinanceiros) => {
    const liquidezGeral = (Number(dadosFinanceiros.ativo_circulante) + Number(dadosFinanceiros.ativo_realizavel_longo_prazo)) / (Number(dadosFinanceiros.passivo_circulante) + Number(dadosFinanceiros.passivo_nao_circulante))

    if (liquidezGeral <= 0) {
        return 0
    }
    return Number(liquidezGeral.toFixed(2))
}


export const calculaIndicadores = (dadosFinanceiros, dadosCadastrais) => ({
    dividaLiquidaPeloEbitda: dividaLiquidaPeloEbitda(dadosFinanceiros),
    dividaBrutaPeloPatrimonioLiquido: dividaBrutaPeloPatrimonioLiquido(dadosFinanceiros),
    retornoPeloPatrimonioLiquido: retornoPeloPatrimonioLiquido(dadosFinanceiros, dadosCadastrais),
    retornoPelosAtivos: retornoPelosAtivos(dadosFinanceiros, dadosCadastrais),
    margemBruta: margemBruta(dadosFinanceiros),
    margemOperacional: margemOperacional(dadosFinanceiros),
    margemLiquida: margemLiquida(dadosFinanceiros),
    payout: payout(dadosFinanceiros),
    liquidezImediata: liquidezImediata(dadosFinanceiros),
    liquidezCorrente: liquidezCorrente(dadosFinanceiros),
    liquidezGeral: liquidezGeral(dadosFinanceiros)
})