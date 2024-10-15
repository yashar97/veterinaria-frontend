import axios from "axios";
import usePacientes from "../hooks/usePacientes"
import Swal from 'sweetalert2'

const Paciente = ({ paciente }) => {

    const { setPacientes } = usePacientes();

    const eliminarPaciente = async id => {

        Swal.fire({
            title: "Estás seguro?",
            text: "Se eliminará el registro de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4F46E5",
            cancelButtonColor: "#C91C22",
            confirmButtonText: "Sí, borrar!",
            cancelButtonText: "Cancelar"
        }).then(async result => {
            if (result.isConfirmed) {

                let pa = JSON.parse(localStorage.getItem('pacientes'));

                pa = pa.filter(paciente => paciente.id !== id);

                localStorage.setItem('pacientes', JSON.stringify(pa));

                setPacientes(pa);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Paciente eliminado",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        });




    }


    return (
        <>
            <div className='mb-4 bg-white px-8 py-5 rounded-md shadow-lg'>
                <p className='mb-3 font-bold text-lg uppercase text-gray-700'>
                    Nombre: <span className='font-normal normal-case'> {paciente.nombre}</span>
                </p>
                <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Propietario:
                    <span className='font-normal normal-case'> {paciente.propietario}</span>
                </p>
                <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Teléfono:
                    <span className='font-normal normal-case'> {paciente.telefono}</span>
                </p>
                <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Sintomas:
                    <span className='font-normal normal-case'> {paciente.sintomas}</span>
                </p>

                <div className='flex justify-between mt-5'>
                    <button className='bg-indigo-600 text-white py-2 px-10 font-bold rounded-md'>Editar</button>
                    <button onClick={() => eliminarPaciente(paciente.id)} className='bg-red-700 text-white py-2 px-10 font-bold rounded-md'>Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default Paciente