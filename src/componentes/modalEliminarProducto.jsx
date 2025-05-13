
const ModalEliminarProducto = ({producto, onClose, eliminarProd}) => {

    const eliminarProducto = () => {
        //Llamada al servicio mandándole el id del producto junto al de la lista
        eliminarProd(producto);
        onClose()
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                Está apunto de eliminar <strong>{producto.nombre}</strong> de la lista
                ¿Está seguro de que quiere hacerlo?</div>
            <img 
                src="/public/imagenes/papelera_icon.png" 
                alt="icono papelera" 
                className="w-50 m-2"
                />
            <div className="d-flex flex-wrap justify-content-between w-100 m-2">
                <button onClick={eliminarProducto} className="btn btn-danger">Eliminar el producto</button>
                <button onClick={onClose} className="btn btn-success">Mantener el producto</button>
            </div>
        </div>
    )
}

export default ModalEliminarProducto