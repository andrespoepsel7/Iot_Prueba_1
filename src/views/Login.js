import React, {useState} from 'react'
import img1 from '../assets/IOT.png'
import {BiShow, BiHide} from 'react-icons/bi'

export default function Login() {

    // Estado para mostrar y ocultar contraseña
    const [showPassword, setShowPassword] = useState("password")

    // FUncion para cambiar el estado de muestra de la constraseña
    const togglePassword = () => {
        if(showPassword === "password"){
            setShowPassword('text')
        }else{
            setShowPassword('password')
        }
    }
  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-cyan-500 to-lime-200'>
        {/* Versión WEB */}    
        <div className='flex flex-col'>
            {/* Header */}
            <div className='fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-white'>
                <div className='flex flex-row items-center ml-[15%]'>
                    <img src={img1} alt="imagenHeader" width={70}/>
                    <p>CONTROL IOT</p>
                </div>
                <div className='mr-[15%]'>
                    Header
                </div>
            </div>
            {/* Contenido */}
            <div className='mx-[15%] mt-[70px] bg-slate-100 min-h-screen'>
                Hola
            </div>
        </div>
        
        {/* Versión MÓVIL */}
        <div className='flex flex-col mx-0 sm:hidden'>
            Hola
        </div>
    </div>
  )
}
