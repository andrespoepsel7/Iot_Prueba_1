import React, {useContext, useState, useEffect} from 'react'
import img1 from '../assets/IOT.png'
import { DataContext } from '../context/DataContext'
import {BiUserCircle, BiLogOut} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../constants/Urls'
import axios from 'axios'
// Para los gráficos
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function Main() {

    // Información del usuario
    const{user, logout} = useContext(DataContext)

    // Para navegación entre páginas
    const navigate = useNavigate()

    // States para manejo de datos dentro de la página versión web
    const [modal, setModal] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [lecturas, setLecturas] = useState()
    const [lecturasAux, setLecturasAux] = useState()
    const [estadoLed, setEstadoLed] = useState()


    // Cambia el estado del Led
    const toggleLed = () => {
        if(estadoLed === "false"){
            setEstadoLed("true")
        }else{
            setEstadoLed("false")
        }
        console.log("Cambio de estado: ",estadoLed)
    }

    const postData = async()=> {
        await axios.post(`${apiUrl}/guardar_estados`, {estado_led:String(estadoLed)}).then(function(response){
            console.log("Respuesta post estado led:",response)
        })
    }

    // Función para obtener la información de la base de datos
    const getInfo = async() =>{
        await axios.get(`${apiUrl}/lecturas`).then(function(response){
            setLecturas(response.data.slice(-30))
            setLecturasAux(response.data.slice(-10))
            console.log(response.data.slice(-10))
        }) 
        setCargando(false)
    }

    // Se utiliza para refrescar la página cada 5 segundos
    useEffect(() => {

        const interval = setInterval(() => {
            getInfo()
          }, 5000);
      
          return () => clearInterval(interval);

    }, [])

    // Se utiliza para obtener los datos al cargar la página
    useEffect(()=> {
        getInfo()
    }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-cyan-500 to-lime-200'>
        {/* Versión WEB */}
        <div className='hidden sm:flex flex-col'>

            {/* Header */}
            <div className='fixed top-0 left-0 z-50 w-full flex flex-row justify-between items-center bg-white'>
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
                    { cargando ? 
                        <div>
                            <p>Cargando...</p>
                        </div>
                        :
                        <div className='mt-[25px]'>
                            <p className='text-2xl text-sky-500 font-bold'>MEDICIONES TEMPERATURA</p>
                            <div className='flex flex-col'>
                                <p>Fecha</p>
                                <p>{lecturasAux[9].fecha_lectura}</p>
                            </div>
                            <LineChart
                                width={600}
                                height={300}
                                data={lecturas}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="fecha_lectura" interval={15} dx={60} dy={10}/>
                                <YAxis domain={[-10,50]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperatura" stroke="#4ba3e3" activeDot={{ r: 5 }}/>
                            </LineChart>

                            <p className='text-2xl text-sky-500 font-bold'>MEDICIONES HUMEDAD</p>
                            <div className='flex flex-col'>
                                <p>Fecha</p>
                                <p>{lecturasAux[9].fecha_lectura}</p>
                            </div>
                            <LineChart
                                width={600}
                                height={300}
                                data={lecturas}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="fecha_lectura" interval={15} dx={60} dy={10}/>
                                <YAxis domain={[0,100]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="humedad" stroke="#4ba3e3" activeDot={{ r: 5 }}/>
                            </LineChart>
                            <div className='mb-[50px]'>
                                <button className='bg-orange-500 text-white hover:bg-orange-400 py-1 px-3 rounded-xl'
                                    onClick={()=>{
                                        toggleLed()
                                        postData()
                                    }}
                                >
                                    Cambiar estado de LED
                                </button>
                            </div>
                        </div>
                    }
                    
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
                                logout()
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

        {/* VERSIÓN MÓVIL */}
        <div className='flex flex-col mx-0 sm:hidden'>
            {/* HEADER */}
            <div className='fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center bg-white'>
                <div className='flex flex-row items-center'>
                    <img src={img1} alt="imagenHeader" width={70}/>
                    <p className='font-bold text-sky-500 text-[25px]'>DASHBOARD</p>
                </div>
                <div className='flex flex-row items-center justify-end mr-[5%] h-full'>
                    <button className='flex flex-row items-center'
                        onClick={()=> setModal(!modal)}
                    >
                        <BiUserCircle size={40} className='fill-sky-500'/>
                    </button>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className='mx-[4%] mt-[70px] bg-slate-100 min-h-screen'>
                <div className='flex flex-col justify-center items-center mx-[5%] text-center font-mono text-slate-600'>
                { cargando ? 
                        <div>
                            <p>Cargando...</p>
                        </div>
                        :
                        <div className='mt-[25px]'>
                            <p className='text-2xl text-sky-500 font-bold'>MEDICIONES TEMPERATURA</p>
                            <div className='flex flex-col'>
                                <p>Fecha</p>
                                <p>{lecturasAux[9].fecha_lectura}</p>
                            </div>
                            <LineChart
                                width={340}
                                height={200}
                                data={lecturasAux}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="fecha_lectura" interval={10} dx={60} dy={10}/>
                                <YAxis domain={[-10,50]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperatura" stroke="#4ba3e3" activeDot={{ r: 5 }}/>
                            </LineChart>

                            <p className='text-2xl text-sky-500 font-bold'>MEDICIONES HUMEDAD</p>
                            <div className='flex flex-col'>
                                <p>Fecha</p>
                                <p>{lecturasAux[9].fecha_lectura}</p>
                            </div>
                            <LineChart
                                width={340}
                                height={200}
                                data={lecturasAux}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="fecha_lectura" interval={10} dx={60} dy={10}/>
                                <YAxis domain={[0,100]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="humedad" stroke="#4ba3e3" activeDot={{ r: 5 }}/>
                            </LineChart>
                            <div className='mb-[50px]'>
                                <button className='bg-orange-500 text-white hover:bg-orange-400 py-1 px-3 rounded-xl'
                                    onClick={()=>{
                                        setEstadoLed(!estadoLed)
                                        postData()
                                    }}
                                >
                                    Cambiar estado de LED
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {modal &&
                <div className='fixed top-[70px] right-[0] bg-slate-600 rounded-bl-xl'>
                    <ul className='pb-5 px-8 flex flex-col justify-center items-center'>
                        <li>
                            <p className='my-3 text-white font-bold text-[20px]'>{user.usuario}</p>
                        </li>
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
                                logout()
                            }} 
                        >
                            <BiLogOut/>
                            <p className='ml-2'>Cerrar Sesión</p>
                        </li>
                    </ul>
                </div>
            }
            {/* FOOTER */}
            <div className='w-full bg-white flex flex-col py-3 px-5 items-center justify-between'>
                <p className='font-bold text-sky-400 text-center'>© 2022 TODOS LOS DERECHOS RESERVADOS</p>
                
                <p className='font-bold text-sky-200 text-[12px]'>Sitio desarrollado por:</p>
                <p className='font-bold text-sky-200 text-[12px]'> Andres Poepsel Vásquez</p>
                

            </div>
        </div>
    </div>
  )
}
