const ModalEliminarProducto = ({producto, onClose}) => {

    const eliminarProducto = (producto, onClose) => {
        //Llamada al servicio mandándole el id del producto junto al de la lista
        onClose()
    }

    return (
        <div className="">
            <div className="p-3">
                Está apunto de eliminar {producto.nombre} de la lista
                ¿Está seguro de que quiere hacerlo?</div>
            <div className="d-flex flex-wrap justify-content-around">
                <button onClick={eliminarProducto} className="btn btn-danger">Eliminar el producto</button>
                <button onClick={onClose} className="btn btn-success">Mantener el producto</button>
            </div>
        </div>
    )
}

export default ModalEliminarProducto