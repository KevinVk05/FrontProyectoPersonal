export const modificarVisibilidadListas = (listasPredeterminadas, listaACambiar) => {
    return listasPredeterminadas.map(lista => 
        lista.nombre === listaACambiar.nombre ? 
        {...lista, esVisible: !lista.esVisible}
        : lista
    )
}

export const modificarLista = (setListas, listas, listaEliminar) => {
    setListas(() => 
        listas.filter(lista => lista.nombre !== listaEliminar.nombre)
    );
}