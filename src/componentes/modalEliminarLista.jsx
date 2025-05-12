const ModalEliminarLista = ({ onClose, lista }) => {

    const eliminarLista = (lista) => {
        //Llamada al servicio mandándole el id de la lista 
        onClose()
    }

    return (
        <div className="">
            <div className="p-3">¿Está seguro de que quiere eliminar la lista?</div>
            <div className="d-flex flex-wrap justify-content-around">
                <button onClick={eliminarLista} className="btn btn-danger">Eliminar la lista</button>
                <button onClick={onClose} className="btn btn-success">Mantener la lista</button>
            </div>
        </div>
    )
}

export default ModalEliminarLista;