import { useState } from "react";
import { modificarVisibilidadListas } from "../../../herramientas/listasAdministrador"
import ServicioListas from "../../../servicios/ServicioListas"
import Modal from "../../modals/modal"
import ModalEliminarLista from "../../modals/modalEliminarLista";

const BotonesAdministrarListas = ({ listasPredeterminadas, setListasPredeterminadas, lista, setError }) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const cambiarVisibilidadLista = () => {
        ServicioListas.alternarVisibilidadLista(lista.nombre)
            .then(() => {
                setListasPredeterminadas(() => { return modificarVisibilidadListas(listasPredeterminadas, lista) })
            }).catch(() => {
                setError("Ha ocurrido un error cambiando la visibilidad de la lista")
            })
    }

    const abrirModalEliminarLista = () => {
        setChildrenModal(<ModalEliminarLista onClose={closeModal} setError={setError} setListas={setListasPredeterminadas} listas={listasPredeterminadas} listaEliminar={lista} cesta={false} />)
        openModal()
    }


    return (
        <div className="d-flex gap-3">
            <button className="btn btn-danger" onClick={abrirModalEliminarLista}>Eliminar lista</button>
            {lista.esVisible ? (
                <button type="button" onClick={cambiarVisibilidadLista} className='btn btn-success'>Hacer visible</button>
            ) : (
                <button type="button" onClick={cambiarVisibilidadLista} className='btn btn-secondary'>Ocultar lista</button>
            )
            }
            <button className="btn btn-success">Añadir producto</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default BotonesAdministrarListas;