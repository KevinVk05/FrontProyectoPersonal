import AnadirListas from "./anadirListas";
import Encabezado from "../../comunes/encabezados";
import Listas from "./listas";

const AdministrarListas = () => {

    const titulo = "Administra las listas predeterminadas"
    const textoEncabezado1 = "Selecciona las listas que los usuarios podrán visualizar, añade y elimina productos de las listas predeterminadas."
    const textoEncabezado2 = "Customiza las listas:"

    return (
        <div className="container py-4">
            <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />
            <AnadirListas />
            <Listas />
        </div>
    )
}


export default AdministrarListas;