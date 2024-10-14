import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import Alerta from "../componentes/Alerta"
import axios from "axios"
import Spinner from "../componentes/Spinner"

const Login = () => {

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [spinner, setSpinner] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([correo.trim(), password.trim()].includes('')) {
            setAlerta({ mensaje: 'Todos los campos son obligatorios', error: true });
            setTimeout(() => {
                setAlerta({});
            }, 1500);
            return;
        }

        setSpinner(true);

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/login`;

            const { data } = await axios.post(url, { correo, password });

            setAuth(data);
            localStorage.setItem('veterinaria-auth-token', data.token);
            navigate('/admin');
            setSpinner(false);

        } catch (error) {
            setSpinner(false);
            setAlerta({ mensaje: error.response.data.mensaje, error: true });
            setTimeout(() => {
                setAlerta({});
            }, 2000);
        }

    }

    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Ingresa y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className="w-2/4">
                <form onSubmit={handleSubmit} className="w-4/5 bg-white py-5 px-10 rounded-md shadow-2xl">
                    {
                        alerta.mensaje && <Alerta alerta={alerta} />
                    }
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-xl">Correo</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="correo@hotmail.com"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xl">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="**************"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="new-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {
                        spinner && <Spinner />
                    }

                    <input
                        type="submit"
                        value='Ingresar'
                        className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                    />

                    <div className="mt-5 flex justify-center gap-10">
                        <Link className="text-gray-700 hover:text-indigo-400" to='/registro'>No tengo cuenta</Link>
                        <Link className="text-gray-700 hover:text-indigo-400" to='/olvide-contrasena'>Olvidé mi contraseña</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login