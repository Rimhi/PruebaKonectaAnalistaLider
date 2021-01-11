import clienteAxios from '../config/axios';
import tokenAuth from '../config/token';
import {
    AGREGAR_ARTICULO,
    AGREGAR_ARTICULO_EXITO,
    AGREGAR_ARTICULO_ERROR,
    OBTENER_ARTICULOS,
    OBTENER_ARTICULO,
    OBTENER_ARTICULOS_FINALIZAR,
    SAVE_LIKE,
    DELETE_LIKE,
    SAVE_COMENTARIO,
    DELETE_ARTICULO,
    DELETE_COMENTARIO,
    UPDATE_ARTICULO,
    OBTENER_MIS_ARTICULOS
} from '../types';
import alert from '../components/Alert'

export function getArticulosAction(){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.get('/articulo/show-articulo/');
            dispatch(getArticulos(data.articulos))
        } catch (error) {
            
        }
    }
}
export function getMisArticulosAction(){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.get('/articulo/show-mis-articulo/');
            
            dispatch(getMisArticulos(data.articulos))
        } catch (error) {
            
        }
    }
}
export function getArticuloAction(slug){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            console.log(slug)
            const {data} = await clienteAxios.get(`/articulo/show-articulo/${slug}`);
            
            dispatch(getArticulo(data.articulo))
        } catch (error) {
            
        }
    }
}
export function saveArticuloAction(articulo){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.post(`/articulo/save-articulo`,articulo);
            
            if(data.success){
                alert('success',data.message)
                dispatch(saveActiculoExito(data.articulo))
            }else{              
                alert('error',data.erros.slug[0])
                dispatch(saveActiculoError())
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export function updateArticuloAction(id,articulo){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            console.log(articulo.get('titulo'))
            const {data} = await clienteAxios.post(`/articulo/update-articulo/${id}`,articulo);
           console.log(data) 
            if(data.success){
                alert('success',data.message)
                dispatch(updateArticulo(data.articulo))
            }else{              
                alert('error',data.erros.slug[0])
                // dispatch(saveActiculoError())
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export function saveLikeAction(articulo_id){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.post(`/like/save-like`,{articulo_id});
            if(data.success){
                alert('success',data.message)
                dispatch(saveLike(data.like))
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export function deleteLikeAction(like_id,articulo_id){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.delete(`/like/delete-like/${like_id}`);
            if(data.success){
                alert('success',data.message)
                dispatch(deleteLike(like_id,articulo_id))
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export function saveComentarioAction(comentario){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.post(`/comentario/save-comentario`,comentario);
            console.log(data);
            if(data.success){
                alert('success',data.message)
                dispatch(saveComentario(data.comentario))
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export function deleteComentarioAction(id){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.delete(`/comentario/delete-comentario/${id}`,);
            console.log(data);
            if(data.success){
                alert('success',data.message)
                dispatch(deleteComentario(id))
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}


export function deleteArticuloAction(id){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.delete(`/articulo/delete-articulo/${id}`);
            console.log(data);
            if(data.success){
                alert('success',data.message)
                dispatch(deleteArticulo(id))
            }
            
        } catch (error) {
            console.log(error)
        }
    } 
}
export const getImageAction = (filename) =>{
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.get(`/articulo/get-imagen-articulo/${filename}`);
            dispatch(getImage(data))
        } catch (error) {
            console.log(error)
        }
    }
}


const updateArticulo = (articulo)=>({
    type:UPDATE_ARTICULO,
    payload:articulo
})
const getImage=(imagen)=>({
    type:DELETE_COMENTARIO,
    payload:imagen
})
const deleteComentario=(id)=>({
    type:DELETE_COMENTARIO,
    payload:id
})
const deleteArticulo=(id)=>({
    type:DELETE_ARTICULO,
    payload:id
})
const getArticulo = (articulo)=>({
    type:OBTENER_ARTICULO,
    payload:articulo
})
const getArticulos = (articulos)=>({
    type:OBTENER_ARTICULOS,
    payload:articulos
})
const getMisArticulos = (articulos)=>({
    type:OBTENER_MIS_ARTICULOS,
    payload:articulos
})
const saveActiculoExito = (articulo)=>({
    type:AGREGAR_ARTICULO_EXITO,
    payload:articulo
    
})
const saveLike = (like)=>({
    type:SAVE_LIKE,
    payload:like
    
})
const saveComentario = (comentario)=>({
    type:SAVE_COMENTARIO,
    payload:comentario
    
})
const deleteLike = (like_id,articulo_id)=>({
    type:DELETE_LIKE,
    payload:{like_id,articulo_id}
    
})
const saveActiculoError = ()=>({
    type:AGREGAR_ARTICULO_ERROR,
    
})