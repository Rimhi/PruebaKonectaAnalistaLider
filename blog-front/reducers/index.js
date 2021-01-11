import { combineReducers } from 'redux'
import  articuloReducer  from './articuloReducer'
import categoriaReducer from './categoriaReducer'
import  usuarioReducer  from './usuarioReducer'

export default combineReducers({
    articulos:articuloReducer,
    usuarios:usuarioReducer,
    categorias:categoriaReducer
})