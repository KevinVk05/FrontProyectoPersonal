import { useEffect, useState } from "react";
import EstadoBusqueda from "../comunes/estadoBusqueda";
import ServicioListas from "../../servicios/ServicioListas";
import CardProducto from "./cardProducto";
import { useAuth } from "../../Login/AuthProvider";
import { comprobarSiProdListaEstanEnLaCesta } from "../../herramientas/general";

const ListasPredeterminadas = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [listas, setListas] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        const cargarListas = async () => {
            try {
                setLoading(true);
                const respuesta = await ServicioListas.getListasVisibles();
                const listasActualizadas = await Promise.all(
                    respuesta.data.map(async (lista) => ({
                        ...lista,
                        listaProductos: await comprobarSiProdListaEstanEnLaCesta(lista.listaProductos, user)
                    }))
                );

                console.log(listasActualizadas)
                setListas(listasActualizadas);
                setError(listasActualizadas.length === 0 ?
                    "No se han encontrado ninguna lista." : null);
            } catch (error) {
                setError("Ha ocurrido un error recuperando las listas predeterminadas");
            } finally {
                setLoading(false);
            }
        };

        cargarListas();
    }, [])

    return (
        <section className='p-3 shadow-sm border rounded'>
            <EstadoBusqueda error={error} loading={loading} resultados={listas} />

            {listas.map((lista, index) => (
                <div key={index} className='p-3 shadow-sm border rounded mb-4'>
                    <div className='d-flex flex-column flex-sm-row p-4 justify-content-between align-items-start align-items-sm-center'>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="fs-5 text-center">{lista.nombre}</div>
                        </div>
                    </div>
                    {lista.listaProductos.length > 0 && (
                        //Envio los productos de esta manera para convertirlo en un array de productos
                        <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
                            {
                                lista.listaProductos.map((producto, index) => (
                                    <div key={index} className="product-card mb-3 shadow-sm">

                                        <CardProducto item={producto.producto} setError={setError} setResultados={setListas} resultados={listas} />
                                    </div>

                                ))
                            }
                        </div>
                    )}
                </div>
            ))
            }
            {/* {productosLista.length > 0 && (
                <div className='shadow-sm border rounded p-4'>
                    <div className="m-4">Lista predeterminada</div>
                    <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
                        {productosLista.map((item, indexProd) => (
                            <div key={indexProd} className="product-card mb-3 shadow-sm m-2">
                                <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between"
                                    style={{
                                        width: 250,
                                    }}>
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
                                        <button type="button" className={`btn btn-danger delete-btn-${item.index}-${item.supermercado}`} >Eliminar de la cesta</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
            {/* </section> */}
        </section>
    )
}

export default ListasPredeterminadas;