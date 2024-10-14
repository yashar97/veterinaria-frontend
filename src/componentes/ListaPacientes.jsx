import Paciente from './Paciente'

const ListaPacientes = ({ pacientes }) => {

    return (
        <>
            {
                pacientes.map(paciente => <Paciente key={paciente._id} paciente={paciente} />)
            }
        </>
    )
}

export default ListaPacientes