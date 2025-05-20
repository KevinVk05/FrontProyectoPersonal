import { useState } from 'react';
import ServicioBusquedas from '../servicios/ServicioBusquedas';
import { cambiarImgFavoritos } from '../herramientas/general';

export const useFavoritos = (setCambioBusquedasFavoritas) => {
  const [imagen, setImagen] = useState("/imagenes/fav1.png");
  const [favoritoGuardado, setFavoritoGuardado] = useState(false);

  const eliminarBusquedaFav = async (busquedaFavEliminar) => {
    try {
      await ServicioBusquedas.eliminarBusquedaFav(busquedaFavEliminar);
      cambiarImgFavoritos(imagen, setImagen);
      setFavoritoGuardado(false);
    } catch (err) {
      throw new Error('Error al eliminar búsqueda favorita');
    }
  };

  const anadirBusquedaFav = async (busquedaFavAnadir) => {
    try {
      await ServicioBusquedas.anadirBusquedaFav(busquedaFavAnadir);
      cambiarImgFavoritos(imagen, setImagen);
      setFavoritoGuardado(true);
    } catch (err) {
      throw err;
    }
  };

  return {
    imagen,
    setImagen,
    favoritoGuardado,
    eliminarBusquedaFav,
    anadirBusquedaFav,
    setFavoritoGuardado
  };
};
