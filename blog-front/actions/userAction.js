import {
    LOGIN,
    RELOGIN,
    LOGIN_ERROR,
    LOGIN_EXITO,
    AGREGAR_USUARIO,
    AGREGAR_USUARIO_EXITO,
    AGREGAR_USUARIO_ERROR,
    LOGOUT
} from '../types'

import clienteAxios from '../config/axios'
import alert from '../components/Alert'
import tokenAuth from '../config/token'

export  function loginAction (user){
    return async (dispatch) => {
        dispatch(login())
        try {
            const {data} = await clienteAxios.post('/auth/login',user);
            if(data.success){
                alert('success',data.message)
                delete data.success
                delete data.message
                dispatch(loginExito(data))
            }else{
                dispatch(loginError())
                alert('error',data.message)
            }
            
        } catch (error) {
            console.log(error)
            dispatch(loginError())
        }  
    }
}
export  function registerAction (user){
    return async (dispatch) => {
        
        try {
            const {data} = await clienteAxios.post('/auth/register',user);
            if(data.success){
                alert('success',data.message)
                delete data.success
                delete data.message
                dispatch(loginExito(data))
            }else{
                alert('error',data.message)
            }
            
        } catch (error) {
            console.log(error)
        }  
    }
}

export function registrarUsuarioAction(user){
    return (dispatch)=>{
        dispatch(register())
    }
}
export const getUserAuthenticated = ()=>{
    return async (dispatch)=>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const {data} =  await clienteAxios.get('/auth/verify');
            if(data.success){
                
                delete data.success
                delete data.message
                dispatch(relogin(data.user))
            }else{
                dispatch(loginError())
            }
        } catch (error) {
            alert('error',"Sesion finalizada")
        }
    }
}
export const logoutAction = () =>{
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const {data} = await clienteAxios.get('/auth/logout');
            if(data.success){
                alert('success',data.message)
                delete data.success
                delete data.message
                dispatch(logout(data))
            }else{
                dispatch(loginError())
                alert('error',data.message)
            }
            
        } catch (error) {
            console.log(error)
            dispatch(loginError())
        }  
    }
}
const logout = ()=>({
    type:LOGOUT
})
const relogin = (user) =>({
    type:RELOGIN,
    payload:user
})

const login = () =>({
    type:LOGIN
})

const loginError = () =>({
    type:LOGIN_ERROR
})

const loginExito = (user) =>({
    type:LOGIN_EXITO,
    payload:user
})

const register = () =>({
    type:AGREGAR_USUARIO
})