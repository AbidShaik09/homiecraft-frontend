import React, { createContext, useContext, useState } from 'react'

const HomieCraftContext = createContext({
  token:'',
  setToken:()=>{},
  userType:'',
  setUserType:'',
  id:'',
  setId:''
})

export const useHomieCraftContext = () =>{
  const context = useContext(HomieCraftContext)
  return context
}

export const HomieCraftContextProvider = ({children})=>{
  const [token,setToken] = useState("hello")
  const [userType,setUserType] =useState("")
  const [id,setId] = useState("")
  return (
    <HomieCraftContext.Provider
    value={{token,setToken,userType,setUserType,id,setId}}>{children}</HomieCraftContext.Provider>
  )
}