import EstadoBusqueda from "./estadoBusqueda";

const ResultadoBusqueda = ({ producto, resultados, loading, error }) => {
    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={resultados} />
            {resultados.length > 0 && !loading && (
                <section className="p-3">
                    <p className="text-center p-4 fs-4">Producto comparado: {producto}</p>
                    <div className='d-flex flex-wrap justify-content-center align-items-stretch gap-3'>
                        {resultados.map((item, index) => (
                            <div key={index} className="product-card mb-3">
                                <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between" style={{ width: 250 }}>
                                    <img
                                        src={`imagenes/${item.supermercado}_NOMBRE.svg`}
                                        alt={item.supermercado}
                                        className='mt-2'
                                        style={{ height: 25 }}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src={item.urlImagen}
                                            className="p-3"
                                            alt={item.nombre}
                                            style={{ maxHeight: 200 }}
                                        />
                                    </div>
                                    <div className="text-center mt-auto">
                                        <p className="mb-2 fs-6 fw-bold">{item.nombre}</p>
                                        <p className="my-1 mx-1">
                                            Precio: <strong>{item.precio}€</strong>
                                        </p>
                                        <p>
                                            Precio a granel: <strong>{item.precioGranel} €/{item.unidadMedida}</strong>
                                        </p>
                                        <button type="button" className='mt-auto mx-auto p-2 btn btn-success'>Añadir a la cesta</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </div>
    )
}

export default ResultadoBusqueda;