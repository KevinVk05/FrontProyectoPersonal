import ServicioListas from "../servicios/ServicioListas";

export const modificarVisibilidadListas = (listasPredeterminadas, listaACambiar) => {
    return listasPredeterminadas.map(lista =>
        lista.nombre === listaACambiar.nombre ?
            { ...lista, esVisible: !lista.esVisible }
            : lista
    )
}

export const modificarLista = (setListas, listas, listaEliminar) => {
    setListas(() =>
        listas.filter(lista => lista.nombre !== listaEliminar.nombre)
    );
}

export const cambioVisibilidad = (listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError) => {
    ServicioListas.alternarVisibilidadLista(listaACambiar.nombre)
        .then(() => {
            setListasPredeterminadas(() => { return modificarVisibilidadListas(listasPredeterminadas, listaACambiar) })
        }).catch(() => {
            setError("Ha ocurrido un error cambiando la visibilidad de la lista")
        })
}
