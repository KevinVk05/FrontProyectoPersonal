import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicioUsuario from '../servicios/ServicioUsuario';
import { Link } from 'react-router-dom';

const Registro = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        try {
            const response = await ServicioUsuario.registrar({
                nombre: usuario,
                contrasena: password
            });

            if (response.status === 201) {
                setMensaje("Registro exitoso. Redirigiendo al login...");
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setError("El usuario ya existe");
            } else {
                setError("Error al registrar usuario");
            }
        }
    };

    return (
        <section className="min-vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5 text-center justify-content-center">
                        <img
                            src="/imagenes/logoapp.png"
                            alt="logo"
                            className="w-100 h-100 overflow-hidden"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-5">
                        <form onSubmit={handleSubmit} className="p-4 rounded bg-gold shadow-sm">
                            <h1 className="mb-4 text-center text-gold">Comparator</h1>
                            <h2 className="text-center text-purple mb-4">Registrarse</h2>
                            <div className="card bg-cream border-0">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="usuario" className="form-label text-purple">Usuario:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="usuario"
                                            placeholder="ainhoa"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-purple">Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control border-purple"
                                            id="password"
                                            placeholder="*******"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-purple btn-lg rounded-pill">Acceder</button>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Link to="/login" className="text-decoration-none text-gold fw-bold">
                                            Iniciar Sesión
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registro;
