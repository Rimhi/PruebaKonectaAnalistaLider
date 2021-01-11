import Articulo from "../components/articulo";
import {
  AGREGAR_ARTICULO,
  AGREGAR_ARTICULO_EXITO,
  AGREGAR_ARTICULO_ERROR,
  OBTENER_ARTICULOS,
  OBTENER_ARTICULO,
  SAVE_LIKE,
  DELETE_LIKE,
  SAVE_COMENTARIO,
  DELETE_ARTICULO,
  DELETE_LIKE_OBJECT,
  SAVE_LIKE_OBJECT,
  DELETE_COMENTARIO,
  OBTENER_IMAGEN,
  UPDATE_ARTICULO,
  OBTENER_MIS_ARTICULOS,
} from "../types";

const initialState = {
  articulos: [],
  success: null,
  loading: false,
  articulo: {},
  misarticulos:[]
};
export default function (state = initialState, action) {
  switch (action.type) {
    case OBTENER_ARTICULOS:
      return {
        ...state,
        articulos: action.payload,
      };
    case OBTENER_ARTICULO:
      return {
        ...state,
        articulo: action.payload,
      };
    case AGREGAR_ARTICULO:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_ARTICULO_EXITO:
      return {
        ...state,
        loading: false,
        articulos: [action.payload, ...state.articulos],
        misarticulos:[action.payload, ...state.misarticulos],
        success: true,
      };
    case AGREGAR_ARTICULO_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case SAVE_LIKE:
      let articulos = state.articulos.map((articulo) => {
        if (articulo.id === action.payload.articulo_id) {
          articulo.like.push(action.payload);
        }
        return articulo;
      });
      let misarticulos = state.misarticulos.map((articulo) => {
        if (articulo.id === action.payload.articulo_id) {
          articulo.like.push(action.payload);
        }
        return articulo;
      });
       articulo = state.articulo
       console.log(articulo);
       articulo.like.push(action.payload)
       console.log(articulo);
      return {
        ...state,
        articulos: articulos,
        misarticulos:misarticulos,
        articulo
      };
    case DELETE_LIKE:
      articulos = state.articulos.map((articulo) => {
        if (articulo.id === action.payload.articulo_id) {
          articulo.like = articulo.like.filter(
            (like) => like.id !== action.payload.like_id
          );
        }
        return articulo;
      });
      misarticulos = state.misarticulos.map((articulo) => {
        if (articulo.id === action.payload.articulo_id) {
          articulo.like = articulo.like.filter(
            (like) => like.id !== action.payload.like_id
          );
        }
        return articulo;
      });
      articulo = state.articulo;
      articulo.like = articulo.like.filter(
        (like) => like.id !== action.payload.like_id
      );
      return {
        ...state,
        articulos: articulos,
        misarticulos:misarticulos,
        articulo
      };
    case DELETE_ARTICULO:
      articulos = state.articulos.filter(
        (articulo) => articulo.id !== action.payload
      );
      return {
        ...state,
        articulos,
      };
    case SAVE_COMENTARIO:
       let articulo = {
        ...state.articulo,
        comentario: [...state.articulo.comentario, action.payload],
      };
      articulos = state.articulos.map(articulo=>{
        if(articulo.id===action.payload.articulo_id){
          articulo.comentario=[action.payload,...articulo.comentario]
        }
        return articulo;
      })
      return {
        ...state,
        articulo,
        articulos
      };
    case DELETE_COMENTARIO:
        articulo = {
            ...state.articulo,
            comentario:state.articulo.comentario.filter(comentario=> comentario.id !== action.payload)
        }
        articulos = state.articulos.map(article=>{
          if(articulo.id===article.id){
            article.comentario=article.comentario.filter(comentario=> comentario.id !== action.payload)
          }
          return article;
        })
        return{
            ...state,
            articulo,
            articulos
        }
    case OBTENER_IMAGEN:
        articulo = state.articulo;
        articulo.imagen= action.payload
        return{
            ...state,
            articulo
        }
    case UPDATE_ARTICULO:
      articulos = state.articulos.filter(articulo=>articulo.id !== action.payload.id)
      console.log(articulos)
      console.log(action.payload)
      return{
        ...state,
        articulos:[...articulos,action.payload]
      }
    case OBTENER_MIS_ARTICULOS:
      return {
        ...state,
        misarticulos: action.payload,
      };
    default:
      return state;
  }
}
