import { useState } from "react";
import { cambioVisibilidad, modificarVisibilidadListas } from "../../../herramientas/listasAdministrador"
import ServicioListas from "../../../servicios/ServicioListas"
import Modal from "../../modals/modal"
import ModalEliminarLista from "../../modals/modalEliminarLista";
import ModalAvisoListaVacia from "../../modals/modalAvisoListaVacia";

const BotonesAdministrarListas = ({ listasPredeterminadas, setListasPredeterminadas, lista, setError }) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const cambiarVisibilidadLista = () => {
        if (lista.listaProductos.length > 0) {
            cambioVisibilidad(lista, setListasPredeterminadas, setError)
        }else{
            abrirModalAvisoListaVacia()
        }
    }

    const abrirModalEliminarLista = () => {
        setChildrenModal(<ModalEliminarLista onClose={closeModal} setError={setError} setListas={setListasPredeterminadas} listas={listasPredeterminadas} listaEliminar={lista} cesta={false} />)
        openModal()
    }

    const abrirModalAvisoListaVacia = () => {
        setChildrenModal(<ModalAvisoListaVacia onClose={closeModal} listaACambiar={lista} setListasPredeterminadas={setListasPredeterminadas} listasPredeterminadas={listasPredeterminadas} setError={setError}/>)
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