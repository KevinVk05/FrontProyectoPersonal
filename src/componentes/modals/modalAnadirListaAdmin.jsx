import { useState } from "react"
import ServicioListas from "../../servicios/ServicioListas"
import Swal from 'sweetalert2'

const ModalAnadirListaAdmin = ({ onClose }) => {

    const [error, setError] = useState("")
    const [nombreLista, setNombreLista] = useState("")

    const anadirLista = () => {
        if (nombreLista.length > 0) {
            ServicioListas.crearLista(nombreLista).then(() => {
                onClose()
                Swal.fire("Lista creada correctamente")
            }).catch(() => {
                setError("Ha ocurrido un error al crear la lista.")
            })
        } else {
            setError("Introduzca un nombre válido.")
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="m-1">
                Introduzca el nombre de la lista: </div>
            <input type="text"
                placeholder="Maquillaje"
                className="form-control m-2 w-50"
                value={nombreLista}
                onChange={(e) => setNombreLista(e.target.value)}
            />
            {error && (
                <div className='alert alert-danger m-2'>
                    {error}
                </div>)}
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-2 my-2">
                <button onClick={anadirLista} className="btn btn-success">Añadir lista</button>
                <button onClick={onClose} className="btn btn-danger">Cancelar</button>
            </div>
        </div>
    )
}

export default ModalAnadirListaAdmin;