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
        <div>
            <section className="search-section shadow-sm rounded p-3 my-4">
                <p className="mb-0 fs-5 fw-bold text-center">Haz tu compra más sencilla y barata con nuestras listas predeterminadas, pensadas para cubrir todas tus necesidades.</p>
            </section>
            <section className='p-3 shadow-sm border rounded'>
                <EstadoBusqueda error={error} loading={loading} resultados={listas} />
                <div className="p-3 mb-3 fs-3">Listas predeterminadas</div>
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
            </section>
        </div>
    )
}

export default ListasPredeterminadas;