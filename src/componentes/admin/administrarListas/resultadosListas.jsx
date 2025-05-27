import { useState } from "react";
import BotonesAdministrarListas from "./botonesAdministrarListas";

const ResultadosListas = ({ listas, setError, error }) => {
    console.log(listas)
    return (
        <div>
            {listas.map((lista, index) => (
                <div key={index} className='shadow-sm border rounded mb-4'>
                    <div className='d-flex shadow-sm border rounded p-4 justify-content-between'>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="fs-5 ">{lista.nombre}</div>
                        </div>
                        <BotonesAdministrarListas listaPredeterminada={lista} setError={setError} error={error}/>
                    </div>

                    {/* <ProductoLista productos={productos} eliminando={eliminando} abrirModalEliminarProducto={abrirModalEliminarProducto} /> */}
                </div>
            ))
            }

        </div >
    )
}

export default ResultadosListas;