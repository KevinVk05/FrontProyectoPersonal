export const modificarResultadosCesta = (item, resultados, seEncuentra) => {
    return resultados.map(prod =>
        prod.nombre === item.nombre && prod.supermercado === item.supermercado && prod.precio === item.precio
            ? { ...prod, enLaCesta: seEncuentra }
            : prod
    );
}
