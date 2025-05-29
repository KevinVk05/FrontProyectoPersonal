import ServicioListas from "../servicios/ServicioListas";

export const modificarVisibilidadListas = (listasPredeterminadas, listaACambiar) => {
  return listasPredeterminadas.map(lista =>
    lista.nombre === listaACambiar.nombre ?
      { ...lista, esVisible: !lista.esVisible }
      : lista
  )
}

export const cambioVisibilidad = (listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError, onClose) => {
  ServicioListas.alternarVisibilidadLista(listaACambiar.nombre)
    .then(() => {
      setListasPredeterminadas(() => { return modificarVisibilidadListas(listasPredeterminadas, listaACambiar) })
      if (onClose) {
        onClose()
      }
    }).catch(() => {
      setError("Ha ocurrido un error cambiando la visibilidad de la lista")
    })
}

export const modificarLista = (setListas, listas, listaEliminar) => {
  setListas(() =>
    listas.filter(lista => lista.nombre !== listaEliminar.nombre)
  );
}

//Refact
export const comprobarSiEstanEnLaLista = (
  productosTotal,
  setResultados,
  setError,
  nombreLista
) => {
  ServicioListas.getListaPorNombre(nombreLista)
    .then((respuesta) => {
      const productosEnCesta = respuesta.data?.productos || [];

      const productosActualizados = productosTotal.map((prodResultado) => {
        const enLaLista = productosEnCesta.some(
          (prodCesta) =>
            prodCesta.nombre === prodResultado.nombre &&
            prodCesta.supermercado === prodResultado.supermercado
        );

        return {
          ...prodResultado,
          enLaLista: enLaLista,
        };
      });

      setResultados(productosActualizados);
    })
    .catch(() => {
      setError("Ha ocurrido un error con la conexión");
    });
};
