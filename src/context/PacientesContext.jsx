import { createContext, useEffect, useState } from "react";
import useAuth from '../hooks/useAuth'
import axios from "axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {

    const { auth } = useAuth();

    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const obtenerPacientes = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`;
            const token = localStorage.getItem('veterinaria-auth-token');

            if (!token) {
                setPacientes([]);
                return;
            }

            try {

                const { data } = await axios(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPacientes(data);
                setCargando(false);

            } catch (error) {
                setPacientes([]);
                console.log(error);
            }

        }

        obtenerPacientes();

    }, [auth]);

    return (
        <PacientesContext.Provider value={{ pacientes, setPacientes, cargando }}>
            {children}
        </PacientesContext.Provider>
    );
}

export default PacientesContext;