import React from 'react'
import { createContext, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

    // Función para hacer login
    const login = async(data) => {

        // Aquí se pone el login
        const usuarioExiste = await axios.post('http://localhost:81/iot_api/autenticar_usuario', data, axiosHeaders)

        // El usuario no existe
        if(usuarioExiste.data === -1){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'El usuario no existe!',
            })
        // El usuario existe pero puso la contraseña incorrectamente
        }else if(usuarioExiste.data === -2){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Contraseña incorrecta!',
            })
        }else if(usuarioExiste.data === -3){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Usted no tiene permiso para acceder!',
            })
        }else{
            console.log("Usuario autenticado!")
            setUser(usuarioExiste.data)
            console.log("autenticado correctamente")
            //navigate('/ver_facturas')
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
        logout
    }}>
        {children}
    </DataContext.Provider>
  )
}