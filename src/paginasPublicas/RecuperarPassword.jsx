

const RecuperarPassword = () => {
    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Recupera tu Contraseña y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className='w-2/4'>
                <form className='w-4/6 bg-white shadow-md py-14 px-10 rounded-md'>
                    <h3 className='font-semibold text-center mb-4 text-3xl'>Ingresa tu email</h3>
                    <input type="email"
                        placeholder='ejemplo@hotmail.com'
                        className='border-2 rounded-lg w-full p-3'
                    />
                    <input value='Enviar instrucciones' type="submit" className='bg-indigo-600 text-white font-bold uppercase p-4 mt-5 w-full rounded-md hover:bg-indigo-500 cursor-pointer transition-colors' />
                </form>
            </div>
        </>
    )
}

export default RecuperarPassword