import { useEffect, useState } from "react";
import FormularioPaciente from "../componentes/FormularioPaciente"
import ListaPacientes from "../componentes/ListaPacientes"
import usePacientes from "../hooks/usePacientes"

const Administrador = () => {

    const { pacientes, cargando } = usePacientes();

    return (
        <div className='container mx-auto px-14 flex justify-between gap-5'>

            <FormularioPaciente />

            <div className='mt-5 w-3/5 h-screen overflow-scroll'>

                {
                    !cargando && (
                        <>
                            {
                                pacientes.length > 0 ? <h2 className='text-center text-3xl mb-5'>Pacientes</h2> :
                                    <h2 className='text-center text-3xl mb-5'>Aún no hay Pacientes</h2>
                            }
                        </>
                    )
                }

                {/* <ListaPacientes pacientes={pacientes} /> */}
                <ListaPacientes pacientes={pacientes} />
            </div>


        </div>
    )
}

export default Administrador