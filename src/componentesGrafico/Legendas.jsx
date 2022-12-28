import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export const Legendas = ({ acessoriosY, setAcessoriosY }) => {


    const alteraVisibilidade = (acessorioY) => {
        setAcessoriosY(antigosAcessoriosY => (
            antigosAcessoriosY.map(antigoAcessorioY => (
                antigoAcessorioY === acessorioY ? { ...antigoAcessorioY, estaVisivel: !antigoAcessorioY.estaVisivel } : antigoAcessorioY
            ))
        ))
    }

    return (
        <div className={`max-w-sm lg:max-w-none w-full flex flex-col items-center justify-around gap-2 lg:grid lg:grid-cols-2`}>
            {acessoriosY.map((acessorioY, indice) => (
                <div
                    key={indice}
                    className={`w-full flex items-center justify-center gap-2 cursor-pointer rounded-md p-1 text-xs sm:text-sm ${acessorioY.estaVisivel ? "opacity-100" : "opacity-30"} ${indice < 2 ? "text-black" : "text-white"}`}
                    onClick={() => alteraVisibilidade(acessorioY)}
                    style={{ backgroundColor: acessorioY.cor }}
                >
                    {acessorioY.estaVisivel ? (
                        <>
                            <AiFillEye className="text-xl" />
                            <p>{acessorioY.legenda}</p>
                        </>
                    ) : (
                        <>
                            <AiFillEyeInvisible className="text-xl" />
                            <p>{acessorioY.legenda}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

