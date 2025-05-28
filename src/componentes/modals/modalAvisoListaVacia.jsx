import { cambioVisibilidad } from "../../herramientas/listasAdministrador";

const ModalAvisoListaVacia = ({onClose, listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3">
                ¿Está seguro de que quiere hacer visible una lista vacía?</div>
            <img
                src="/imagenes/papelera_icon.png"
                alt="icono papelera"
                className="w-50 m-2"
            />
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2">
                <button onClick={() => cambioVisibilidad(listaACambiar, setListasPredeterminadas, listasPredeterminadas, setError)} className="btn btn-danger">Eliminar lista</button>
                <button onClick={onClose} className="btn btn-success">Mantener lista</button>
            </div>
        </div>
    )
}

export default ModalAvisoListaVacia;