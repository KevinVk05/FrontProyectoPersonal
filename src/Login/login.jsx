import "../estilos/login.css"
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

    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupUsuario, setSignupUsuario] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');


    const [errorLogin, setErrorLogin] = useState('');
    const [errorSignup, setErrorSignup] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {

        e.preventDefault();

        ServicioUsuario.login(loginUsuario)
            .then((response) => {
                const user = response.data[0];
                const passwdHash = user.pass;
                let contraseñaCorrecta = bcrypt.compareSync(loginPassword, passwdHash)
                if (contraseñaCorrecta) {
                    login(user.nombre);
                    navigate('/');
                } else {
                    setErrorLogin("Usuario no es correcto")
                }


            })
            .catch((error) => {
                alert(error)
                navigate('/login');
            });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupPassword !== signupPasswordConfirm) {
            setErrorSignup('Las contraseñas no coinciden');
            return;
        }

        // try {
        //     // Aquí harías la llamada para registrar el usuario
        //     const hash = bcrypt.hashSync(signupPassword, 10);
        //     await ServicioUsuario.registrar({ usuario: signupUsuario, pass: hash });
        //     alert("Usuario registrado con éxito");
        // } catch (err) {
        //     setError("Error al registrar usuario");
        // }
    }


    return (
        <div className="p-4 m-5">
            <div className="d-flex flex-column flex-md-row align-items-center">
                <div className="header-box col-12 col-md-6 rounded p-5 h-100" >
                    <h1 class="p-4 text-center">Comparator</h1>
                    <h3>Descubre la forma más inteligente de hacer la compra</h3>
                    <p>En Comparator podrás comparar precios de productos en diferentes supermercados para ahorrar tiempo y dinero.
                    Crea tu cuenta para guardar tus cestas, realizar búsquedas personalizadas y encontrar siempre la mejor oferta.</p>
                </div>
                <section className="col-12 col-md-6 py-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex">
                        <div class="form-wrapper is-active w-50">
                            <button type="button" className="switcher switcher-login">
                                Login
                                <span className="underline"></span>
                            </button>
                            <form onSubmit={handleSubmitLogin} className="form form-login rounded overflow-hidden">
                                <fieldset>
                                    <div className="input-block">
                                        <label for="login-email">E-mail:</label>
                                        <input
                                            id="login-email"
                                            type="text"
                                            className="form-control w-100 my-3 px-2"
                                            placeholder="ainhoa"
                                            value={loginUsuario}
                                            onChange={(e) => setLoginUsuario(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-block">
                                        <label for="login-password">Contraseña: </label>
                                        <input
                                            type="password"
                                            className="form-control w-100 my-3 px-2"
                                            id="login-password"
                                            placeholder="*******"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}

                                    <button type="submit" class="btn-login btn btn-success">Acceder</button>
                                </fieldset>
                            </form>
                        </div>
                        <div class="form-wrapper w-50">
                            <button type="button" class="switcher switcher-signup">
                                Sign Up
                                <span class="underline"></span>
                            </button>
                            <form className="form form-signup rounded overflow-hidden" onSubmit={handleSignupSubmit}>
                                <fieldset>
                                    <div class="input-block">
                                        <label for="signup-email">E-mail:</label>
                                        <input
                                            id="signup-email"
                                            type="text"
                                            className="form-control w-100 my-3 px-2"
                                            placeholder="ainhoa"
                                            value={signupUsuario}
                                            onChange={(e) => setSignupUsuario(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-block ">
                                        <label for="signup-password">Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control w-100 my-3 px-2"
                                            id="signup-password"
                                            placeholder="*******"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div class="input-block">
                                        <label for="signup-password-confirm">Confirme la contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control w-100 my-3 px-2"
                                            id="signup-password-confirm"
                                            placeholder="*******"
                                            value={signupPasswordConfirm}
                                            onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errorSignup && <div className="alert alert-danger">{errorSignup}</div>}

                                    <button type="submit" class="btn-signup btn btn-success">Continue</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login;