const ModalEliminarLista = ({ onClose, lista }) => {

    const eliminarLista = (lista) => {
        //Llamada al servicio mandándole el id de la lista 
        onClose()
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                ¿Está seguro de que quiere eliminar la lista?</div>
            <img 
                src="/public/imagenes/papelera_icon.png" 
                alt="icono papelera" 
                className="w-50 m-2"
                />
            <div className="d-flex flex-wrap justify-content-around w-100 m-2">
                <button onClick={eliminarLista} className="btn btn-danger">Eliminar la lista</button>
                <button onClick={onClose} className="btn btn-success">Mantener la lista</button>
            </div>
        </div>
    )
}

export default ModalEliminarLista;