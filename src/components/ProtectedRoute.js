import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export default function ProtectedRoute({children}) {

    const {user} = useContext(DataContext)

    console.log(user)
    
  if(user){
    return children
  }else{
    return <Navigate to="/"/>
  }
}