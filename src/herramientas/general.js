import { useAuth } from "../Login/AuthProvider";
import ServicioCesta from "../servicios/ServicioCesta";
import ServicioProductos from "../servicios/ServicioProductos";

export const filtrarPorSupermercado = (
  resultados,
  supermercadoSeleccionado
) => {
  if (supermercadoSeleccionado !== "Todos los supermercados") {
    return resultados.filter(
      (prod) => prod.supermercado === supermercadoSeleccionado.toUpperCase()
    );
  }
  return resultados;
};

export const comprobarSiEstanEnLaCesta = (
  productosTotal,
  setResultados,
  setError,
  user
) => {
  ServicioCesta.getProdsCesta(user)
    .then((respuesta) => {
      const productosEnCesta = respuesta.data?.productos || [];

      const productosActualizados = productosTotal.map((prodResultado) => {
        const enCesta = productosEnCesta.some(
          (prodCesta) =>
            prodCesta.nombre === prodResultado.nombre &&
            prodCesta.supermercado === prodResultado.supermercado
        );

        return {
          ...prodResultado,
          enLaCesta: enCesta,
        };
      });

      setResultados(productosActualizados);
    })
    .catch(() => {
      setError("Ha ocurrido un error con la conexión");
    });
};

export const cambiarImgFavoritos = (imagen, setImagen) => {
  setImagen(
    imagen === "/imagenes/fav1.png"
      ? "/imagenes/fav2.png"
      : "/imagenes/fav1.png"
  );
};

export const dividirResultadosPorSupermercados = (
  productos,
  setProductosPorSupermercado
) => {
  const clasificados = {
    mercadona: [],
    carrefour: [],
    dia: [],
    ahorramas: [],
  };

  productos.forEach((prod) => {
    const supermercado = prod.supermercado.toLowerCase();

    if (clasificados[supermercado]) {
      clasificados[supermercado].push(prod);
    }
  });
  console.log(clasificados);
  setProductosPorSupermercado(clasificados);
};

export const obtenerIdProducto = (producto) =>
  `producto-cesta-${producto.precio}-${producto.nombre}`;

// src/herramientas/handlersBusqueda.js

export const handleInputChange = (
  e,
  setProducto,
  setFavoritoGuardado,
  favoritoGuardado,
  cambiarImgFavoritos,
  imagen,
  setImagen
) => {
  setProducto(e.target.value);
  setFavoritoGuardado(false);
  if (favoritoGuardado) {
    cambiarImgFavoritos(imagen, setImagen);
  }
};

export const manejarFavoritos = (
  producto,
  setError,
  favoritoGuardado,
  user,
  eliminarBusquedaFav,
  anadirBusquedaFav,
  setCambioBusquedasFavoritas
) => {
  if (!producto.trim()) {
    setError("Introduzca el nombre de un producto.");
  } else {
    const busquedaFav = {
      usuario: user,
      nombreBusqueda: producto,
    };

    if (favoritoGuardado) {
      eliminarBusquedaFav(busquedaFav, setCambioBusquedasFavoritas);
    } else {
      anadirBusquedaFav(busquedaFav, setCambioBusquedasFavoritas);
    }
  }
};

//Solo queremos saber si hay alguna lista con mínimo un elemento
//Dependiendo de ellos el estado de búsqueda va a ser diferente
export const listaConResultados = (lista) => {
  return Object.values(lista).some((arr) => arr.length > 0) || [];
};
