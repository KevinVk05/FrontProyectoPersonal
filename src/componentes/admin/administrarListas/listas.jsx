import { useEffect, useState } from "react";
import ServicioListas from "../../../servicios/ServicioListas";
import EstadoBusqueda from "../../comunes/estadoBusqueda";
import ResultadosListas from "./resultadosListas";

const Listas = () => {

    const [listas, setListas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        ServicioListas.getListas().then((respuesta) => {
            setListas(respuesta.data)
            setLoading(false)
            if (!respuesta.data > 0) {
                setError("No se han encontrado ninguna lista.")
            }
        }).catch(() => {
            setLoading(false)
            setError("Ha ocurrido un error al recuperar las listas.")
        })
    }, [])

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={listas}/>
            <ResultadosListas listas={listas} setListas={setListas} setError={setError}/>
        </div>
    )
}

export default Listas;