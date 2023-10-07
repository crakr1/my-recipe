import {IonLoading} from "@ionic/react"
import { Preferences } from '@capacitor/preferences';
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()


const AuthContextProvider = (props) =>{

    const [loggedIn, setLoggedIn] = useState(true)
    const [showLoading, setShowLoading] = useState(true) 
    const [jwt,  setJwt] = useState()

    useEffect(() =>{
        getAuthenticated()
    }, [])

    const getAuthenticated = async () => {
        const accessToken = await Preferences.get({key: 'accessToken'})
        if(accessToken.value) {
            setLoggedIn(true)
            setJwt(accessToken.value)
            setShowLoading(false)
        }else {
            setLoggedIn(false)
            setShowLoading(false)
        }
    }
    return (
        <>
        {showLoading 
        ?
        <IonLoading isOpen={showLoading}/> 
        :
        <AuthContext.Provider value={{loggedIn, setLoggedIn, jwt, setJwt}}>
            {props.children}
        </AuthContext.Provider>
        }
        </>
    )
}

export default AuthContextProvider