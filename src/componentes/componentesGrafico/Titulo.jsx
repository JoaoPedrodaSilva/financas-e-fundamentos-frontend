export const Titulo = ({ tituloGrafico, nomeEmpresarial, larguraInterna }) => (
    <g>
        <text
            style={{ fill: "white", textAnchor: "middle" }}
            x={larguraInterna / 2}
            y="-20"
        >
            {nomeEmpresarial} - {tituloGrafico}
        </text>
    </g>
)
