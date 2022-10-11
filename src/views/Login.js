import React, {useState} from 'react'
import img1 from '../assets/IOT.png'
import img2 from '../assets/iot1.png'
import img3 from '../assets/iot2.png'

export default function Login() {

    // Estado para poder mostrar el modal de creación de cuenta o inicio de sesión
    const [modal, setModal] = useState(false)
    // State para mostrar crear cuenta o simplemente hacer login
    const [crear, setCrear] = useState(false)
    

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
                     <div className='flex items-center justify-center bg-sky-300 opacity-100 py-[30px] px-[60px] min-w-[450px] rounded-[40px] border-2 border-white'>
                        <form className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-4'>Crear Cuenta</p>
                            <label className='text-white font-mono font-semibold mb-1'>Nombre Completo:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Celular:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Teléfono celular' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>C.I:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Ej: 6523458' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>E-mail:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='ejemplo@gmail.com' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Usuario:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='usuario123' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Contraseña:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Repetir Contraseña:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <div className='flex flex-row items-center justify-between mt-3'>
                                <button className='bg-red-500 py-1 px-5 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'>
                                    Cancelar
                                </button>
                                <button className='bg-green-500 py-1 px-5 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'>
                                    Siguiente
                                </button>
                            </div>        
                        </form>
                     </div>
                     :
                     <div className='flex items-center justify-center bg-sky-300 opacity-100 py-[30px] px-[60px] min-w-[450px] rounded-[40px] border-2 border-white'>
                        <form className='flex flex-col w-full'>
                            <p className='text-center text-[25px] font-bold text-white mb-4'>Inicio De Sesión</p>
                            <label className='text-white font-mono font-semibold mb-1'>Usuario:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <label className='text-white font-mono font-semibold mb-1'>Contraseña:</label>
                            <input className='rounded-md mb-3 py-1 px-3 text-blue-800 outline-none' placeholder='Nombre' type="text" />
                            <div className='flex flex-row items-center justify-between mt-3'>
                                <button className='bg-red-500 py-1 px-5 text-white font-semibold font-mono rounded-md ml-5 hover:bg-red-400'>
                                    Cancelar
                                </button>
                                <button className='bg-green-500 py-1 px-5 text-white font-semibold font-mono rounded-md mr-5 hover:bg-green-400'>
                                    Siguiente
                                </button>
                            </div>
                        </form>
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
            Hola
        </div>
    </div>
  )
}
