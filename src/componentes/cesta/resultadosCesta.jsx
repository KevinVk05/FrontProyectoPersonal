import { useEffect, useState } from "react";
import EstadoBusqueda from "../comunes/estadoBusqueda";
import ModalEliminarProducto from "../modals/modalEliminarProducto";
import ModalEliminarLista from "../modals/modalEliminarLista";
import Modal from "../modals/modal";
import "../../estilos/transicion.css"
import { dividirResultadosPorSupermercados, listaConResultados, obtenerIdProducto } from "../../herramientas/general";
import { useAuth } from "../../Login/AuthProvider";
import ServicioCesta from "../../servicios/ServicioCesta";
import ProductoLista from "../comunes/productoLista";

const ResultadosCesta = () => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const { user } = useAuth()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eliminando, setEliminando] = useState(null);

    const [productosPorSupermercado, setProductosPorSupermercado] = useState({
        Mercadona: [],
        Carrefour: [],
        Dia: [],
        Ahorramas: []
    });

    useEffect(() => {
        setLoading(true)
        ServicioCesta.getProdsCesta(user).then(respuesta => {
            let prods = respuesta.data.productos
            setLoading(false);
            if (prods && prods.length > 0) {
                console.log(prods)
                dividirResultadosPorSupermercados(prods, setProductosPorSupermercado)
                setError(null);
                console.log(loading)
            } else {
                setProductosPorSupermercado({
                    Mercadona: [],
                    Carrefour: [],
                    Dia: [],
                    Ahorramas: []
                });
                setLoading(false);
            }
            console.log(productosPorSupermercado.length > 0)
        })
            .catch(() => {
                setError('Ha ocurrido un error con la conexión');
                setProductosPorSupermercado({
                    Mercadona: [],
                    Carrefour: [],
                    Dia: [],
                    Ahorramas: []
                });
                setLoading(false);
            })
    }, [])

    const eliminarProdCesta = (item) => {
        const prodEliminado = {
            usuario: user,
            prod: item
        }

        ServicioCesta.eliminarProdCesta(prodEliminado).then(() => {
            setEliminando(obtenerIdProducto(item));
            closeModal();
            setTimeout(() => {
                setProductosPorSupermercado(prev => {
                    const nuevos = { ...prev };
                    const idSuper = item.supermercado.toLowerCase();
                    nuevos[idSuper] = nuevos[idSuper].filter(p => p.index !== item.index);
                    return nuevos;
                });
                setEliminando(null);
            }, 500);
        }).catch(() => {
            setError("Ha ocurrido un error al añadir el producto a la cesta")
        })
    }

    const abrirModalEliminarLista = () => {
        setChildrenModal(<ModalEliminarLista onClose={closeModal} setError={setError} setProductosPorSupermercado={setProductosPorSupermercado} />)
        openModal()
    }


    const abrirModalEliminarProducto = (producto) => {
        setChildrenModal(<ModalEliminarProducto producto={producto} onClose={closeModal} eliminarProd={eliminarProdCesta} />)
        openModal()
    }


    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listaConResultados(productosPorSupermercado)} />

            {Object.values(productosPorSupermercado).some(arr => arr.length > 0) > 0 && !loading && (
                <section className='p-3 shadow-sm border rounded'>
                    <div className='d-flex gap-3 justify-content-center py-4'>
                        <div className='d-flex align-items-center'><span>Si ya has realizado la compra...</span></div>
                        <button className='btn btn-danger' onClick={() => abrirModalEliminarLista()}>Descartar lista</button>
                    </div>
                    {Object.entries(productosPorSupermercado).map(([nombreSupermercado, productos], indexSuper) => (
                        <div key={indexSuper}>
                            {productos.length > 0 && (
                                <div className='shadow-sm border rounded mb-4'>
                                    <img
                                        src={`imagenes/${nombreSupermercado.toUpperCase()}_NOMBRE.svg`}
                                        alt={nombreSupermercado}
                                        className='mt-5 ms-5'
                                        style={{ height: 30 }} />
                                    <ProductoLista productos={productos} eliminando={eliminando} abrirModalEliminarProducto={abrirModalEliminarProducto} />
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default ResultadosCesta;