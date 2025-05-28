export const modificarVisibilidadListas = (listasPredeterminadas, listaACambiar) => {
    return listasPredeterminadas.map(lista => 
        lista.nombre === listaACambiar.nombre ? 
        {...lista, esVisible: !lista.esVisible}
        : lista
    )
}