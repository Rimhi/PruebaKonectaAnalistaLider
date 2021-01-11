import clienteAxios from '../config/axios';
import tokenAuth from '../config/token';
import alert from '../components/Alert'
import {
    DELETE_CATEGORIA,
    OBTENER_CATEGORIAS,
    SAVE_CATEGORIA
} from '../types';

export function getCategoriasAction(){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.get('/categoria/show-categoria/');
            dispatch(getCategorias(data.categorias))
        } catch (error) {
            
        }
    }
}
export function saveCategoriaAction(categoria){
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.post('/categoria/save-categoria/',categoria);
            
            if(data.success){
                alert('success',data.message)
                dispatch(saveCategoria(data.categoria))
            }
        } catch (error) {
            
        }
    }
}

export const deleteCategoriaAction=(id)=>{
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
    return async (dispatch) => {
        try {
            const {data} = await clienteAxios.delete(`/categoria/delete-categoria/${id}`);
            
            if(data.success){
                alert('success',data.message)
                dispatch(deleteCategoria(id))
            }
        } catch (error) {
            
        }
    }
}
const deleteCategoria = (categorias)=>({
    type:DELETE_CATEGORIA,
    payload:categorias
})
const getCategorias = (categorias)=>({
    type:OBTENER_CATEGORIAS,
    payload:categorias
})
const saveCategoria = (categoria)=>({
    type:SAVE_CATEGORIA,
    payload:categoria
})