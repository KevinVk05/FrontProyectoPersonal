import { useEffect, useState } from "react";
import ResultadosCesta from "./resultadosCesta";
import ServicioCesta from "../../servicios/ServicioCesta";
import { dividirResultadosPorSupermercados, listaConResultados } from "../../herramientas/general";
import EstadoBusqueda from "../comunes/estadoBusqueda";
import { useAuth } from "../../Login/AuthProvider";

const Cesta = () => {

    const { user } = useAuth()

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productosPorSupermercado, setProductosPorSupermercado] = useState({
        mercadona: [],
        carrefour: [],
        dia: [],
        ahorramas: []
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
                    mercadona: [],
                    carrefour: [],
                    dia: [],
                    ahorramas: []
                });
                setLoading(false);
            }
            console.log(productosPorSupermercado.length > 0)
        })
            .catch(() => {
                setError('Ha ocurrido un error con la conexión');
                setProductosPorSupermercado({
                    mercadona: [],
                    carrefour: [],
                    dia: [],
                    ahorramas: []
                });
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listaConResultados(productosPorSupermercado)} />
            <ResultadosCesta productosPorSupermercado={productosPorSupermercado} setProductosPorSupermercado={setProductosPorSupermercado}/>
        </div>
    )
}

export default Cesta;
