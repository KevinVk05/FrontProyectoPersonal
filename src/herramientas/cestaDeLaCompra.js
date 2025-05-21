export const modificarResultadosCesta = (item, resultados, seEncuentra) => {
    return resultados.map(prod =>
        prod.nombre === item.nombre && prod.supermercado === item.supermercado && prod.precioGranel === item.precioGranel
            ? { ...prod, enLaCesta: seEncuentra }
            : prod
    );
}
