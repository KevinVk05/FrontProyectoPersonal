import { useEffect, useState } from "react";
import ServicioProductos from "../../servicios/ServicioProductos";
import Encabezado from "../comunes/encabezados";
import AnadirListas from "./anadirListas";

const AdministrarListas = () => {

    const titulo = "Administra las listas predeterminadas"
    const textoEncabezado1 = "Selecciona las listas que los usuarios podrán visualizar, añade y elimina productos de las listas predeterminadas."
    const textoEncabezado2 = "Customiza las listas:"

    const [productosLista, setProductosLista] = useState([])

    useEffect(() => {
        ServicioProductos.prods().then((respuesta) => {
            setProductosLista(respuesta.data)
        }).catch(() => {

        })
    }, [])

    return (
        <div className="container py-4">
            <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />
            <AnadirListas />

        </div>
    )
}


export default AdministrarListas;