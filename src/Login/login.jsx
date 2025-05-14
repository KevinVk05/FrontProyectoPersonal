import "../estilos/loginPrueba.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import bcrypt from 'bcryptjs';

const Login = () => {

    const switchers = [...document.querySelectorAll('.switcher')]

    switchers.forEach(item => {
        item.addEventListener('click', function () {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'))
            this.parentElement.classList.add('is-active')
        })
    })

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('')

    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        ServicioUsuario.login(usuario)
            .then((response) => {
                const user = response.data[0];
                const passwdHash = user.pass;
                let ContraseñaCorrecta = bcrypt.compareSync(password, passwdHash)
                if (ContraseñaCorrecta) {
                    login(user.nombre);
                    navigate('/');
                } else {
                    setError("Usuario no es correcto")
                }


            })
            .catch((error) => {
                alert(error)
                navigate('/login');
            });
    };

    return (
        <div>
            <section class="d-flex flex-column justify-content-center align-items-center">
                <h1 class="p-5">Comparator</h1>
                <div class="d-flex mt-25">
                    <div class="form-wrapper is-active">
                        <button type="button" class="switcher switcher-login">
                            Login
                            <span class="underline"></span>
                        </button>
                        <form onSubmit={handleSubmit} class="form form-login">
                            <fieldset>
                                <legend>Please, enter your email and password for login.</legend>
                                <div class="input-block mb-3">
                                    <label for="login-email">E-mail</label>
                                    <input
                                        id="login-email"
                                        type="text"
                                        className="w-100 mt-3 px-2 "
                                        placeholder="ainhoa"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        required
                                    />
                                </div>
                                <div class="input-block mb-3">
                                    <label for="login-password">Password</label>
                                    <input
                                        type="password"
                                        className="w-100 mt-3 px-2"
                                        id="login-password"
                                        placeholder="*******"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </fieldset>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button type="submit" class="btn-login">Acceder</button>
                        </form>
                    </div>
                    <div class="form-wrapper">
                        <button type="button" class="switcher switcher-signup">
                            Sign Up
                            <span class="underline"></span>
                        </button>
                        <form class="form form-signup">
                            <fieldset>
                                <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                                <div class="input-block">
                                    <label for="signup-email">E-mail</label>
                                    <input
                                        id="signup-email"
                                        type="text"
                                        className="form-control"
                                        placeholder="ainhoa"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        required
                                    />
                                </div>
                                <div class="input-block">
                                    <label for="signup-password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control border-purple"
                                        id="signup-password"
                                        placeholder="*******"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div class="input-block">
                                    <label for="signup-password-confirm">Confirm password</label>
                                    <input
                                        type="password"
                                        className="form-control border-purple"
                                        id="signup-password-confirm"
                                        placeholder="*******"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </fieldset>
                            <button type="submit" class="btn-signup">Continue</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;