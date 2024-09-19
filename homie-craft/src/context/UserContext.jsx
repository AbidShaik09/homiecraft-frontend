import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [userType,setUserType]= useState("")
    return (<UserContext.Provider value={{userType,setUserType}}>
        {children}
    </UserContext.Provider>


    );
};