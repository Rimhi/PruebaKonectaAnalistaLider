import {
    DELETE_CATEGORIA,
    OBTENER_CATEGORIAS, SAVE_CATEGORIA,
    
} from '../types';


const initialState = {
    categorias:[],
    loading:false,
}
export default function(state = initialState, action){
    switch(action.type){
        case OBTENER_CATEGORIAS:
            
            return{
                ...state,
                categorias:action.payload
            }
        case SAVE_CATEGORIA:
            
            return{
                ...state,
                categorias:[
                    ...state.categorias,
                    action.payload
                ]
     
            }
        case DELETE_CATEGORIA:
            console.log(action.payload)
            console.log(state.categorias.filter(categoria=>categoria.id!=action.payload))
            return{
                ...state,
                categorias:state.categorias.filter(categoria=>categoria.id!=action.payload)
            }
        default:
            return state
    }
}