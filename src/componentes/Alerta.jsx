import React from 'react'

const Alerta = ({ alerta }) => {
  return (
    <div className={`${alerta.error  ? 'bg-red-600' : 'bg-green-600'} text-center text-white p-3 font-semibold mb-2 rounded-lg`}>
      {alerta.mensaje}
    </div>
  )
}

export default Alerta