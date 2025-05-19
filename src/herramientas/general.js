import ServicioProductos from "../servicios/ServicioProductos";

export const filtrarPorSupermercado = (resultados, supermercadoSeleccionado) => {
    if (supermercadoSeleccionado !== "Todos los supermercados") {
        return resultados.filter(prod => prod.supermercado === supermercadoSeleccionado.toUpperCase());
    }
    return resultados;
}

export const comprobarSiEstanEnLaCesta = (productos, setResultados, setError) => {
    ServicioProductos.prodsCesta().then((respuesta) => {
        const productosEnCesta = respuesta.data;

        const productosActualizados = productos.map(prodResultado => {
            const enCesta = productosEnCesta.some(prodCesta =>
                prodCesta.nombre === prodResultado.nombre &&
                prodCesta.supermercado === prodResultado.supermercado
            );

            return {
                ...prodResultado,
                enLaCesta: enCesta
            };
        });

        setResultados(productosActualizados); // Actualizamos el estado

    }).catch(() => {
        setError('Ha ocurrido un error con la conexión');
    })
}

export const cambiarImgFavoritos = (imagen, setImagen) => {
    setImagen(imagen === "/imagenes/fav1.png" ? "/imagenes/fav2.png" : "/imagenes/fav1.png");
}