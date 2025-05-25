import { useEffect, useState } from "react";
import ServicioListas from "../../servicios/ServicioListas";
import EstadoBusqueda from "../comunes/estadoBusqueda";
import { listaConResultados } from "../../herramientas/general";

const Listas = () => {

    const [listasProductos, setListasProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        ServicioListas.listas().then((respuesta) => {
            setListasProductos(respuesta.data)
            console.log(respuesta.data)
            setLoading(false)
            setError("No se han encontrado ninguna lista.")
        }).catch(() => {
            setLoading(false)
            setError("Ha ocurrido un error al recuperar las listas.")
        })
    }, [])

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listaConResultados(listasProductos)}/>
            
        </div>
    )
}

export default Listas;