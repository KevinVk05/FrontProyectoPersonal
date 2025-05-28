import { useState } from "react";
import BotonesAdministrarListas from "./botonesAdministrarListas";
import Modal from "../../modals/modal";

const ResultadosListas = ({ listas, setListas, setError }) => {

    const [childrenModal, setChildrenModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }



    console.log(listas)
    return (
        <div>
            {listas.map((lista, index) => (
                <div key={index} className='shadow-sm border rounded mb-4'>
                    <div className='d-flex shadow-sm border rounded p-4 justify-content-between'>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="fs-5 ">{lista.nombre}</div>
                        </div>
                        <BotonesAdministrarListas listasPredeterminadas={listas} setListasPredeterminadas={setListas} lista={lista} setError={setError} />
                    </div>

                    {/* <ProductoLista productos={productos} eliminando={eliminando} abrirModalEliminarProducto={abrirModalEliminarProducto} /> */}
                </div>
            ))
            }
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div >
    )
}

export default ResultadosListas;