import { json, Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import axios from "axios";

const Header = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        const pacientes = JSON.parse(localStorage.getItem('pacientes'));
        
        try {
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`;
            const token = localStorage.getItem('veterinaria-auth-token');
            const { data } = await axios.post(url, pacientes, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAuth({});
            navigate('/');
            localStorage.removeItem('veterinaria-auth-token');
            localStorage.removeItem('pacientes');

        } catch (error) {
            console.log(error.message);
        }


    }

    return (
        <header className='h-20 bg-indigo-600'>
            <div className='w-4/5 mx-auto text-white h-full flex items-center justify-between'>

                <h2 className="text-4xl font-black">APV</h2>


                <nav className="flex gap-10">
                    <Link className="text-xl" to='/admin'>Pacientes</Link>
                    <Link className="text-xl" to='/admin/perfil'>Perfil</Link>
                    <button onClick={cerrarSesion} className="text-xl">Salir</button>
                </nav>

            </div>
        </header>
    )
}

export default Header