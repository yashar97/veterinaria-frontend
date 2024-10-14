import { useState } from "react"
import Alerta from './Alerta'
import axios from "axios";
import usePacientes from "../hooks/usePacientes";
import Swal from 'sweetalert2'
import uuid4 from "uuid4";



const FormularioPaciente = () => {

    const { setPacientes } = usePacientes();

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({});



    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), propietario.trim(), telefono.trim(), sintomas.trim()].includes('')) {
            setAlerta({ mensaje: 'Todos los campos son olbigatorios', error: true });
            setTimeout(() => {
                setAlerta({});
            }, 2000);
            return;
        }

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`;
            const token = localStorage.getItem('veterinaria-auth-token');

            const { data } = await axios.post(url, { nombre, propietario, telefono, sintomas }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPacientes(data);
            setNombre('');
            setPropietario('');
            setTelefono('');
            setSintomas('');

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Paciente agregado",
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mt-5 w-2/5'>
            <form onSubmit={handleSubmit} className='px-5 py-8 bg-white shadow-xl rounded-md'>
                {
                    alerta.mensaje && <Alerta alerta={alerta} />
                }
                <h2 className='text-3xl text-center font-bold'>Agregar Pacientes</h2>

                <div className='mt-5 mb-5'>
                    <label className="block uppercase mb-1" htmlFor="mascota">Nombre Mascota</label>
                    <input
                        id='mascota'
                        type="text"
                        placeholder='Nombre Mascota'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="propietario">Nombre Propietario</label>
                    <input
                        id='propietario'
                        type="text"
                        placeholder='Nombre Propietario'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="email">Telefono Propietario</label>
                    <input
                        id='telefono'
                        type="text"
                        placeholder='999-222-333'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="sintomas">Sintomas</label>
                    <textarea
                        id='sintomas'
                        placeholder='Síntomas...'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value='Agregar Paciente'
                    className='bg-indigo-600 text-white p-3 w-full rounded-md font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-colors'
                />

            </form>
        </div>
    )
}

export default FormularioPaciente