import React, { useContext } from 'react'
import PacientesContext from '../context/PacientesContext'

const usePacientes = () => {
    return useContext(PacientesContext);
}

export default usePacientes