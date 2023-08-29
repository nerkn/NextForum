"use client"

import { useRef } from "react"
import { authStore } from "./auth";


export function AuthStoreInit(){
    const initialized = useRef(false);
    if(!initialized.current){
        console.log('AuthStoreInit',  initialized.current)
        authStore.setState({login:false, user:null})
        initialized.current = true
    }
    return null
}