import { useEffect, useState } from "react";
import ServicioBusquedas from "../servicios/ServicioBusquedas";
import { useAuth } from "../Login/AuthProvider";

const BusquedasFavoritas = () => {

    const { user } = useAuth();
    const [busquedasFavs, setBusquedasFavs] = useState();

    useEffect(() => {
        ServicioBusquedas.getBusquedasFavs(user).then((response) => {
            busquedasFavs(response.data)
        }).catch(() => {
            setError('Ha ocurrido un error con la conexión');
        })
    }, [])

    return (
        <div>
            <ul>
                {busquedasFavs.map((busqueda, index) => (
                    <li key={index}>{busqueda}</li>
                ))}
            </ul>
        </div>
    )
}

export default BusquedasFavoritas;