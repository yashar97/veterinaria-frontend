import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginasPublicas/Login'
import AuthLayout from './layouts/AuthLayout'
import Registro from './paginasPublicas/Registro'
import RecuperarPassword from './paginasPublicas/RecuperarPassword'
import RutaProtegida from './layouts/RutaProtegida'
import Administrador from './paginasPrivadas/Administrador'
import Perfil from './paginasPrivadas/Perfil'
import { AuthProvider } from './context/AuthContext'
import { PacientesProvider } from './context/PacientesContext'

const App = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>

                        <Route path='/' element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path='registro' element={<Registro />} />
                            <Route path='olvide-contrasena' element={<RecuperarPassword />} />
                        </Route>

                        <Route path='/admin' element={<RutaProtegida />}>
                            <Route index element={<Administrador />} />
                            <Route path='perfil' element={<Perfil />} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App