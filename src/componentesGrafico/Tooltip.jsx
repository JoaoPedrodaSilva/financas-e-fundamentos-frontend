export const Tooltip = ({ configuracoesTooltip, formatoAcessorioY, indicadorSelecionado }) => {
    return (
        <aside className="absolute top-10 flex flex-col gap-1 justify-center text-xs sm:text-base rounded-md p-2 text-white border border-white bg-slate-700">
            <p>{`Ano: ${configuracoesTooltip.ano}`}</p>
            {configuracoesTooltip && configuracoesTooltip.acessoriosY.map((acessorioY, indice) => {
                if (acessorioY.estaVisivel) {
                    return (
                        <div key={indice} className="flex gap-2 items-center">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: acessorioY.cor}}></div>
                            {
                                indicadorSelecionado === "dre"
                                ?
                                <p>{`${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.valor)} milhões de reais`}</p>
                                :
                                <p>{`${acessorioY.legenda}: ${formatoAcessorioY(acessorioY.valor)}`}</p>
                            }
                        </div>
                        
                    )
                }
            })}
        </aside>
    )
}
