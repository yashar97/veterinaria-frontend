import { Outlet, Navigate } from 'react-router-dom'
import Header from '../componentes/Header'
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {


    const { auth, cargando } = useAuth();

    if (cargando) {
        return <p className='text-center text-lg'>Cargando...</p>
    }

    return (
        <>
            {
                auth._id ? (
                    <>
                        < Header />
                        <Outlet />
                    </>
                ) : <Navigate to='/' />
            }
        </>
    )

}

export default RutaProtegida