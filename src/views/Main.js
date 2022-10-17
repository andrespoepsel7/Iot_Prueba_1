import React, {useContext, useState} from 'react'
import img1 from '../assets/IOT.png'
import { DataContext } from '../context/DataContext'
import {BiUserCircle, BiLogOut} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Main() {

    // Información del usuario
    const{user} = useContext(DataContext)

    // Para navegación entre páginas
    const navigate = useNavigate()

    // States para manejo de datos dentro de la página versión web
    const [modal, setModal] = useState(false)

  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-cyan-500 to-lime-200'>
        {/* Versión WEB */}
        <div className='hidden sm:flex flex-col'>

            {/* Header */}
            <div className='fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-white'>
                <div className='flex flex-row items-center ml-[15%]'>
                    <img src={img1} alt="imagenHeader" width={70}/>
                    <p className='font-bold text-sky-500 text-[25px]'>DASHBOARD</p>
                </div>
                <div className='flex flex-row items-center justify-end mr-[15%] h-full'>
                    <button className='flex flex-row items-center'
                        onClick={()=> setModal(!modal)}
                    >
                        <p className='font-bold text-sky-500 text-[20px] mr-2'>{user.usuario}</p>
                        <BiUserCircle size={40} className='fill-sky-500'/>
                    </button>
                </div>
            </div>

            {/* Contenido */}
            <div className='mx-[15%] mt-[70px] bg-slate-100 min-h-screen'>
                <div className='flex flex-col justify-center items-center mx-[10%] text-center font-mono text-slate-600'>
                    <p>Gráficos</p>
                </div>
            </div>
            {modal &&
                <div className='fixed top-[70px] right-[15%] bg-slate-600 rounded-bl-xl'>
                    <ul className='py-5 px-8 flex flex-col justify-center items-center'>
                        <li
                            className='bg-sky-500 py-1 px-3 text-white rounded-md border-2 border-white flex flex-row items-center'
                            onClick={()=>{
                                navigate('/configuracion')
                            }}
                        >   
                            <FiSettings/>
                            <p className='ml-2'>Configuración</p>
                        </li>
                        <li
                            className='bg-sky-500 py-1 px-3 text-white mt-3 rounded-md border-2 border-white flex flex-row items-center'
                            onClick={()=>{
                                navigate('/')
                            }} 
                        >
                            <BiLogOut/>
                            <p className='ml-2'>Cerrar Sesión</p>
                        </li>
                    </ul>
                </div>
            }

            {/* FOOTER */}
            <div className='w-full bg-white flex flex-row py-3 px-5 items-center justify-between'>
                <div className='flex flex-col ml-[5%]'>
                    <p className='font-bold text-sky-400'>© 2022</p>
                    <p className='font-bold text-sky-400'>TODOS LOS DERECHOS RESERVADOS</p>
                </div>
                <div className='flex flex-col mr-[5%]'>
                    <p className='font-bold text-sky-400'>Sitio desarrollado por:</p>
                    <p className='font-bold text-sky-400'>Andrés Poepsel Vásquez</p>
                </div>

            </div>
        </div>
    </div>
  )
}
