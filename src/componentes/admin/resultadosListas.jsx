import ProductoLista from "../comunes/productoLista";

const ResultadosListas = ({ listas }) => {
    return (
        <div>
            {listas && (
                listas.map((lista) => {
                    <div key={indexSuper}>
                        <div className='shadow-sm border rounded mb-4'>
                            <span>{listas.nombre}</span>
                            <ProductoLista productos={lista.listaProductos} eliminando={eliminando} abrirModalEliminarProducto={abrirModalEliminarProducto} />
                        </div>
                    </div>
                })
            )}

        </div>
    )
}

export default ResultadosListas;