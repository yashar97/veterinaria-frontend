import { createContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const autenticarUsuario = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil`;
            const token = localStorage.getItem('veterinaria-auth-token');

            if (!token) {
                setAuth({});
                setCargando(false);
                return;
            }

            try {

                const { data } = await axios(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAuth(data);
                setCargando(false);

            } catch (error) {
                console.log(error);
            }
        }

        autenticarUsuario();

    }, []);



    return (
        <AuthContext.Provider value={{ auth, setAuth, cargando }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;