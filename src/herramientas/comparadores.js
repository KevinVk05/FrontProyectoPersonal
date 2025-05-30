import ServicioCesta from "../servicios/ServicioCesta"

export const anadirProdCesta = (item, setResultados, resultados, setError, user) => {
    const prodAnadido = {
        usuario: user,
        prod: item
    }

    ServicioCesta.anadirProdCesta(prodAnadido).then(() => {
        setResultados(() => {
            return modificarResultadosCesta(item, resultados, true)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al añadir el producto a la cesta")
    })
}

export const eliminarProdCesta = (item, setResultados, resultados, setError, user) => {
    const prodEliminado = {
        usuario: user,
        prod: item
    }
    ServicioCesta.eliminarProdCesta(prodEliminado).then(() => {
        setResultados(() => {
            return modificarResultadosCesta(item, resultados, false)
        })
    }).catch(() => {
        setError("Ha ocurrido un error al añadir el producto a la cesta")
    })
}

export const modificarResultadosCesta = (item, resultados, seEncuentra) => {
    return resultados.map(prod =>
        prod.nombre === item.nombre && prod.supermercado === item.supermercado && prod.precio === item.precio
            ? { ...prod, enLaCesta: seEncuentra }
            : prod
    );
}