import { useAuth } from "../Login/AuthProvider";
import ServicioCesta from "../servicios/ServicioCesta";
import ServicioListas from "../servicios/ServicioListas";

export const eliminarLista = (user, setProductosPorSupermercado, setError, onClose, compra) => {
    if (cesta) {
        return eliminarListaDeLaCompra(user, setProductosPorSupermercado, setError, onClose)
    }
    return eliminarListaPredeterminada()
}

export const eliminarListaPredeterminada = () => {
    console.log("hola")
}

export const eliminarListaDeLaCompra = (setProductosPorSupermercado, setError, onClose) => {
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