import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../componentes/Alerta";
import axios from "axios";
import Spinner from "../componentes/Spinner";

const Registro = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setAepllido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [spinner, setSpinner] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), apellido.trim(), correo.trim(), password.trim(), confirmarPassword.trim()].includes('')) {
            setAlerta({ mensaje: 'Todos los campos son obligatorios', error: true });
            setTimeout(() => {
                setAlerta({});
            }, 1500);
            return;
        }

        if (password.trim() !== confirmarPassword.trim()) {
            setAlerta({ mensaje: 'Las contraseñas no son iguales', error: true });
            setTimeout(() => {
                setAlerta({});
            }, 1500);
            return;
        }

        setSpinner(true);

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/registrar`;

            const { data } = await axios.post(url, { nombre, correo, password, apellido });

            setAlerta({ mensaje: data.mensaje, error: false });
            setTimeout(() => {
                setAlerta({});
                navigate('/');
            }, 2000);

            setNombre('');
            setAepllido('');
            setCorreo('');
            setPassword('');
            setConfirmarPassword('');
            setSpinner(false);

        } catch (error) {
            setSpinner(false);
            setAlerta({ mensaje: error.response.data.mensaje, error: true });
            setTimeout(() => {
                setAlerta({});
            }, 1500);
        }
    }

    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Crea una Cuenta y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className="w-2/4">
                <form onSubmit={handleSubmit} className="w-4/5 bg-white py-5 px-10 rounded-md shadow-2xl">
                    {
                        alerta.mensaje && <Alerta alerta={alerta} />
                    }
                    <div className="mb-5">
                        <label htmlFor="nombre" className="block text-xl">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="apellido" className="block text-xl">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Tu apellido"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={apellido}
                            onChange={e => setAepllido(e.target.value)}
                        />
                    </div>

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

                    <div className="mb-5">
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

                    <div>
                        <label htmlFor="confirmar" className="block text-xl">Confirmar contraseña</label>
                        <input
                            id="confirmar"
                            type="password"
                            placeholder="**************"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="new-password"
                            value={confirmarPassword}
                            onChange={e => setConfirmarPassword(e.target.value)}
                        />
                    </div>

                    {
                        spinner && <Spinner />
                    }

                    <input
                        type="submit"
                        value='Registrarme'
                        className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                    />

                    <div className="mt-5 flex justify-center gap-10">
                        <Link className="text-gray-700 hover:text-indigo-400" to='/'>Ya tengo una cuenta</Link>
                        <Link className="text-gray-700 hover:text-indigo-400" to='/olvide-contrasena'>Olvidé mi contraseña</Link>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Registro