import { useState } from "react";

const ResultadosListas = ({ listas }) => {
    const [error, setError] = useState(null);
    console.log(listas)
    return (

        <div>
            {listas.map((lista, index) => (
                <div key={index}>
                    <div className='shadow-sm border rounded mb-4'>
                        <span>{lista.nombre}</span>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ResultadosListas;