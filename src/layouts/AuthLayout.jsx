import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AuthLayout = () => {

    const { auth, cargando } = useAuth();

    if (cargando) {
        return <p className='text-center text-lg'>Cargando...</p>
    }

    return (
        <>
            {
                auth._id ? <Navigate to='/admin' /> : (
                    <div className='container mx-auto px-10 h-screen'>
                        <div className='h-full flex items-center'>
                            <Outlet />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AuthLayout