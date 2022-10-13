import React, {useState, useContext} from 'react'
import md5 from 'md5'
import Swal from 'sweetalert2'
import { DataContext } from '../context/DataContext'
import img1 from '../assets/IOT.png'
import img2 from '../assets/iot1.png'
import img3 from '../assets/iot2.png'
import {AiOutlineMenu} from 'react-icons/ai'

export default function Login() {
    // Context
    const {login, signup} = useContext(DataContext)

    // Estado para poder mostrar el modal de creación de cuenta o inicio de sesión
    const [modal, setModal] = useState(false)
    // State para mostrar crear cuenta o simplemente hacer login
    const [crear, setCrear] = useState(false)
    // States para hacer login
    const [usuario, setUsuario] = useState()
    const [clave, setClave] = useState()
    // States para hacer la creación de la cuenta en orden
    const [nombre, setNombre] = useState()
    const [celular, setCelular] = useState()
    const [ci, setCi] = useState()
    const [mail, setMail] = useState()
    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    // States para la version móvil
    const [toggleMenu, setToggleMenu] = useState(false)

    // Función para crear al usuario
    const handleSignup = (e) => {
        e.preventDefault()
        if(nombre && celular && ci && mail && user && password && confirmPassword){
            if(password === confirmPassword){
                // Se hace la creación de la cuenta
                const data = {
                    nombre:nombre,
                    usuario:user,
                    clave:md5(password),
                    telefono:celular,
                    carnet:ci,
                    email:mail,
                    fecha_creacion: new Date()
                }
                signup(data)
                console.log("Se paso")
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Las contraseñas no coinciden!',
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Se deben llenar correctamente los campos!',
            })
        }
    }

    // Función para hacer el login del Usuario
    const handleLogin = (e) => {
        e.preventDefault()
        if(usuario){
            const data = {
                usuario:usuario,
                clave: md5(clave)
            }
            login(data)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Se deben llenar correctamente los campos!',
            })
        }
    }

  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-cyan-500 to-lime-200'>
        {/* Versión WEB */}    
        <div className='hidden sm:flex flex-col'>
            {/* Header */}
            <div className='fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-white'>
                <div className='flex flex-row items-center ml-[15%]'>
                    <img src={img1} alt="imagenHeader" width={70}/>
                    <p className='font-bold text-sky-500 text-[25px]'>CONTROL IOT</p>
                </div>
                <div className='flex flex-row mr-[15%]'>
                    <button 
                        className='bg-sky-400 font-mono font-bold text-white py-1 px-2 rounded-xl hover:bg-sky-300 mr-[15px]'
                        onClick={()=>{
                            setModal(true)
                            setCrear(false)
                        }}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        className='bg-slate-400 font-mono font-bold text-white py-1 px-2 rounded-xl hover:bg-slate-300 mr-[15px]'
                        onClick={()=>{
                            setModal(true) 
                            setCrear(true)
                        }}
                    >
                        Crear cuenta
                    </button>
                </div>
            </div>
            {/* Contenido */}
            <div className='mx-[15%] mt-[70px] bg-slate-100 min-h-screen'>
                <div className='flex flex-col justify-center items-center mx-[10%] text-center font-mono text-slate-600'>
                    <p className=' my-[30px] text-[45px] text-slate-500'>¿Qué es el IOT?</p>
                    <p>La definición de IoT podría ser la agrupación e interconexión de dispositivos y objetos a través de una red (bien sea privada o Internet, la red de redes), dónde todos ellos podrían ser visibles e interaccionar.</p>
                    <img src={img2} alt="img2" className='mt-8' width={400} />
                    <p className=' my-[30px] text-[45px] text-slate-500'>¿Por qué está de moda el IoT? ¿Qué aplicaciones tiene?</p>
                    <p>
                        Internet ha evolucionado rápidamente y esto ha permitido que IoT sea ya una realidad y no sólo una visión de futuro. La fama de esta tecnología radica principalmente en todas las aplicaciones y posibilidades que nos proporciona tanto para mejorar tanto la vida cotidiana de las personas como los entornos empresariales, dónde ya se está implantando desde hace algún tiempo.
                        Las aplicaciones son casi infinitas, pero se van a describir algunos ejemplos para dar visibilidad de alguna de ellas, tanto en la vida cotidiana como en el entorno empresarial.
                    </p>
                    <img src={img3} alt="img3" className='mt-8' width={400} />
                    <p className=' my-[30px] text-[45px] text-slate-500'>¿Qué tecnologías se utilizan?</p>
                    <p className='mb-8'>
                        Como se puede ver, IoT está ya aquí y es una realidad, su ámbito de aplicación es muy amplio y cada día surgen más y más dispositivos que hacen posible esta tecnología. Dicha tecnología asociada al IoT permite recoger datos y mandarlos a la red para su análisis o incluso realizar un análisis previo y después mandarlos a la red.

                        En este proceso de comunicación es dónde IoT está evolucionando ya que uno de los escollos a salvar es el tipo de protocolo con el que se comunican dichos dispositivos (es decir, "el idioma" que hablan entre ellos)
                    </p>
                </div>
            </div>
            {modal ?
                <div className='fixed top-0 left-0 bg-slate-600 w-full h-screen bg-opacity-80 flex justify-center items-center'>
                    {crear ?
                     <div className='flex flex-col items-center justify-center bg-sky-300 opacity-100 py-[30px] px-[60px] min-w-[450px] rounded-[40px] border-2 border-white'>
                        <form onSubmit={handleSignup} className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-4'>Crear Cuenta</p>
                            <label className='text-white font-mono font-semibold mb-1'>Nombre Completo:</label>
                            <input onChange={(e)=> setNombre(e.target.value)} className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Celular:</label>
                            <input onChange={(e)=> setCelular(e.target.value)} className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Teléfono celular' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>C.I:</label>
                            <input onChange={(e)=> setCi(e.target.value)} className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Ej: 6523458' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>E-mail:</label>
                            <input onChange={(e)=> setMail(e.target.value)} className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='ejemplo@gmail.com' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Usuario:</label>
                            <input onChange={(e)=> setUser(e.target.value)} className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='usuario123' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Contraseña:</label>
                            <input autoComplete='new-password' onChange={(e)=> setPassword(e.target.value)} type='password' className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Contraseña'/>
                            <label className='text-white font-mono font-semibold mb-1'>Repetir Contraseña:</label>
                            <input onChange={(e)=> setConfirmPassword(e.target.value)} type='password' className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Repetir contraseña'/>
                        </form>
                        <div className='flex flex-row items-center justify-between w-full mt-3'>
                            <button 
                                className='bg-red-500 py-1 px-5 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'
                                onClick={()=>{
                                    setModal(false)
                                    setCrear(false)
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className='bg-green-500 py-1 px-5 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'
                                type='submit'
                                onClick={handleSignup}
                            >
                                Siguiente
                            </button>
                        </div>        
                     </div>
                     :
                     <div className='flex flex-col items-center justify-center bg-sky-300 opacity-100 py-[30px] px-[60px] min-w-[450px] rounded-[40px] border-2 border-white'>
                        <form autoComplete='off' onSubmit={handleLogin} className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-4'>Inicio De Sesión</p>
                            <label className='text-white font-mono font-semibold mb-1'>Usuario:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" onChange={(e)=>setUsuario(e.target.value)}/>
                            <label className='text-white font-mono font-semibold mb-1'>Contraseña:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="password" onChange={(e)=>setClave(e.target.value)}/>
                        </form>
                        <div className='flex flex-row items-center justify-between w-full mt-3'>
                            <button 
                                className='bg-red-500 py-1 px-5 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'
                                onClick={()=>{
                                    setModal(false)
                                    setCrear(false)
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className='bg-green-500 py-1 px-5 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'
                                type='submit'
                                onClick={handleLogin}
                            >
                                Siguiente
                            </button>
                        </div>
                     </div>
                    }
                </div>
                :
                <></>
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
        
        {/* Versión MÓVIL */}
        <div className='flex flex-col mx-0 sm:hidden'>
            {/* Header */}
            <div className='fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-white'>
                <div className='flex flex-row items-center'>
                    <img src={img1} alt="imagenHeader" width={70}/>
                    <p className='font-bold text-sky-500 text-[25px]'>CONTROL IOT</p>
                </div>
                <div className='flex flex-row mr-[5%]' onClick={()=>setToggleMenu(!toggleMenu)}>
                    <AiOutlineMenu className='fill-sky-500' size={25}/>
                </div>
            </div>
            {/* Menú dinámico */}
            {toggleMenu && 
                <div className='fixed top-[70px] w-full left-0'>
                    <ul className='bg-slate-700 py-5 flex flex-col justify-center items-center'>
                        <li
                            className='bg-sky-500 py-1 px-3 text-white rounded-md border-2 border-white'
                            onClick={()=>{
                                setModal(true)
                                setCrear(false)
                            }}
                        >
                            Iniciar Sesión
                        </li>
                        <li
                            className='bg-sky-500 py-1 px-3 text-white mt-3 rounded-md border-2 border-white'
                            onClick={()=>{
                                setModal(true) 
                                setCrear(true)
                            }} 
                        >
                            Crear Cuenta
                        </li>
                    </ul>
                </div>
            }
            {/* Contenido */}
            <div className='mx-[4%] mt-[70px] bg-slate-100 min-h-screen'>
                <div className='flex flex-col justify-center items-center mx-[5%] text-center font-mono text-slate-600'>
                    <p className=' my-[30px] text-[25px] text-slate-500'>¿Qué es el IOT?</p>
                    <p>La definición de IoT podría ser la agrupación e interconexión de dispositivos y objetos a través de una red (bien sea privada o Internet, la red de redes), dónde todos ellos podrían ser visibles e interaccionar.</p>
                    <img src={img2} alt="img2" className='mt-8' width={250} />
                    <p className=' my-[30px] text-[25px] text-slate-500'>¿Por qué está de moda el IoT? ¿Qué aplicaciones tiene?</p>
                    <p>
                        Internet ha evolucionado rápidamente y esto ha permitido que IoT sea ya una realidad y no sólo una visión de futuro. La fama de esta tecnología radica principalmente en todas las aplicaciones y posibilidades que nos proporciona tanto para mejorar tanto la vida cotidiana de las personas como los entornos empresariales, dónde ya se está implantando desde hace algún tiempo.
                        Las aplicaciones son casi infinitas, pero se van a describir algunos ejemplos para dar visibilidad de alguna de ellas, tanto en la vida cotidiana como en el entorno empresarial.
                    </p>
                    <img src={img3} alt="img3" className='mt-8' width={250} />
                    <p className=' my-[30px] text-[25px] text-slate-500'>¿Qué tecnologías se utilizan?</p>
                    <p className='mb-8'>
                        Como se puede ver, IoT está ya aquí y es una realidad, su ámbito de aplicación es muy amplio y cada día surgen más y más dispositivos que hacen posible esta tecnología. Dicha tecnología asociada al IoT permite recoger datos y mandarlos a la red para su análisis o incluso realizar un análisis previo y después mandarlos a la red.

                        En este proceso de comunicación es dónde IoT está evolucionando ya que uno de los escollos a salvar es el tipo de protocolo con el que se comunican dichos dispositivos (es decir, "el idioma" que hablan entre ellos)
                    </p>
                </div>
            </div>
            
            {modal ?
                <div className='fixed top-0 left-0 bg-slate-600 w-full h-screen bg-opacity-80 flex justify-center items-center'>
                    {crear ?
                     <div className='flex flex-col items-center justify-center bg-sky-300 opacity-100 p-2 rounded-[40px] border-2 border-white'>
                        <form onSubmit={handleSignup} className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-2'>Crear Cuenta</p>
                            <label className='text-white font-mono font-semibold'>Nombre Completo:</label>
                            <input onChange={(e)=> setNombre(e.target.value)} className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <label className='text-white font-mono font-semibold'>Celular:</label>
                            <input onChange={(e)=> setCelular(e.target.value)} className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='Teléfono celular' type="text" />
                            <label className='text-white font-mono font-semibold'>C.I:</label>
                            <input onChange={(e)=> setCi(e.target.value)} className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='Ej: 6523458' type="text" />
                            <label className='text-white font-mono font-semibold'>E-mail:</label>
                            <input onChange={(e)=> setMail(e.target.value)} className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='ejemplo@gmail.com' type="text" />
                            <label className='text-white font-mono font-semibold'>Usuario:</label>
                            <input onChange={(e)=> setUser(e.target.value)} className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='usuario123' type="text" />
                            <label className='text-white font-mono font-semibold'>Contraseña:</label>
                            <input autoComplete='new-password' onChange={(e)=> setPassword(e.target.value)} type='password' className='rounded-md mb-2 py-1 px-3 text-blue-800 outline-none' placeholder='Contraseña'/>
                            <label className='text-white font-mono font-semibold'>Repetir Contraseña:</label>
                            <input onChange={(e)=> setConfirmPassword(e.target.value)} type='password' className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Repetir contraseña'/>
                        </form>
                        <div className='flex flex-row items-center justify-between w-full my-1'>
                            <button 
                                className='bg-red-500 py-1 px-5 mr-1 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'
                                onClick={()=>{
                                    setModal(false)
                                    setCrear(false)
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className='bg-green-500 py-1 px-5 ml-1 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'
                                type='submit'
                                onClick={handleSignup}
                            >
                                Siguiente
                            </button>
                        </div>        
                     </div>
                     :
                     <div className='flex flex-col items-center justify-center bg-sky-300 opacity-100 p-2 rounded-[40px] border-2 border-white'>
                        <form autoComplete='off' onSubmit={handleLogin} className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-1'>Inicio De Sesión</p>
                            <label className='text-white font-mono font-semibold'>Usuario:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" onChange={(e)=>setUsuario(e.target.value)}/>
                            <label className='text-white font-mono font-semibold'>Contraseña:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="password" onChange={(e)=>setClave(e.target.value)}/>
                        </form>
                        <div className='flex flex-row items-center justify-between w-full my-1'>
                            <button 
                                className='bg-red-500 py-1 px-5 mr-1 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'
                                onClick={()=>{
                                    setModal(false)
                                    setCrear(false)
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className='bg-green-500 py-1 px-5 ml-1 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'
                                type='submit'
                                onClick={handleLogin}
                            >
                                Siguiente
                            </button>
                        </div>
                     </div>
                    }
                </div>
                :
                <></>
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
