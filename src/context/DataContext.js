import React from 'react'
import { createContext, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../constants/Urls'

export const DataContext = createContext()

export default function DataProvider({children}) {

    // Variable global para ver si el usuario está auttenticado
    const [user, setUser] = useState("")

    // Para navegar entre páginas
    const navigate = useNavigate()

    // Headers para axios
    const axiosHeaders = {
        'Access-Control-Allow-Origin':'*'
    }

    const signup = async(data) => {
        const response = await axios.post(`${apiUrl}/crear_usuario`, data, axiosHeaders)
        console.log("Respuesta: ",response.data)
        if(response.data.status === 1){
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon:'success',
                title:'Exitoso!',
                text:"Usuario creado correctamente!"
            })
            navigate('/main')
        // El usuario existe pero puso la contraseña incorrectamente
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error al crear usuario!',
            })
        }
    }

    // Función para hacer login
    const login = async(data) => {

        // Aquí se pone el login
        const usuarioExiste = await axios.post(`${apiUrl}/autenticar_usuario`, data, axiosHeaders)

        // El usuario no existe
        if(usuarioExiste.data === -1){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Usuario inexistente!',
            })
            navigate('/main')
        // El usuario existe pero puso la contraseña incorrectamente
        }else if(usuarioExiste.data === -2){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Contraseña incorrecta!',
            })
        }else{
            console.log("Usuario autenticado!")
            setUser(usuarioExiste.data)
            navigate('/main')
        }
    }

    // Función para cerrar sesión
    const logout = () => {
        setUser("")
        navigate('/')
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon:'success',
            title:'Exitoso!',
            text:"Sesión cerrada correctamente!"
        })
    }


  return (
    <DataContext.Provider value={{
        user,
        setUser, 
        login, 
        logout, 
        signup
    }}>
        {children}
    </DataContext.Provider>
  )
}