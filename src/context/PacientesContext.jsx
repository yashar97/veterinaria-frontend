import { createContext, useEffect, useState } from "react";
import useAuth from '../hooks/useAuth'
import axios from "axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {

    const { auth } = useAuth();

    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    // useEffect(() => {

    //     if (!JSON.parse(localStorage.getItem('pacientes'))) {
    //         localStorage.setItem('pacientes', JSON.stringify(pacientes));
    //     } else {
    //         setPacientes(JSON.parse(localStorage.getItem('pacientes')));
    //     }



    // }, [auth]);

    return (
        <PacientesContext.Provider value={{ pacientes, setPacientes, cargando }}>
            {children}
        </PacientesContext.Provider>
    );
}

export default PacientesContext;