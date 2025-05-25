import { useAuth } from "../../Login/AuthProvider"
import ServicioCesta from "../../servicios/ServicioCesta"

const ModalEliminarLista = ({ onClose, setError, setProductosPorSupermercado}) => {

    const { user } = useAuth()

    const eliminarLista = () => {
        ServicioCesta.eliminarCesta(user).then(() => {
                setProductosPorSupermercado({
                    Mercadona: [],
                    Carrefour: [],
                    Dia: [],
                    Ahorramas: []
                });
        }).catch((err) => {
            setError("Ha ocurrido un error al eliminar su cesta")
        })
        onClose()
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                ¿Está seguro de que quiere eliminar la lista?</div>
            <img
                src="/imagenes/papelera_icon.png"
                alt="icono papelera"
                className="w-50 m-2"
            />
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2">
                <button onClick={eliminarLista} className="btn btn-danger">Eliminar lista</button>
                <button onClick={onClose} className="btn btn-success">Mantener lista</button>
            </div>
        </div>
    )
}

export default ModalEliminarLista;