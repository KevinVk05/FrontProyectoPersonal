import ServicioListas from "../../../servicios/ServicioListas"

const BotonesAdministrarListas = ({listaPredeterminada, setError, error}) => {

    const ocultarLista = (lista) => {
        ServicioListas.alternarVisibilidadLista(lista.nombre)
            .then(() => {
                lista.esVisible = lista.esVisible ? false : true
            }).catch(() => {
                setError("Ha ocurrido un error cambiando la visibilidad de la lista")
            })
    }

    return (
        <div className="d-flex gap-3">
            <button className="btn btn-danger">Eliminar lista</button>
            {listaPredeterminada.esVisible ? (
                <button type="button" className='btn btn-success'>Hacer visible</button>
            ) : (
                <button type="button" onClick={() => {ocultarLista(listaPredeterminada)}} className='btn btn-secondary'>Ocultar lista</button>
            )
            }
            <button className="btn btn-success">Añadir producto</button>
        </div>
    )
}

export default BotonesAdministrarListas;