import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveLikeAction,deleteLikeAction } from "../../actions/articuloActions";
const Articulo = ({ articulo }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usuarios.user);
  // console.log(articulo)
  let like = null;
  let like_id = null
  const yausemilike = () => {
    like = articulo.like.filter((like) => like.user_id === user.user.id); 
    like_id = like[0]?.id
    if (like.length > 0) {
      like = true
    } else {
      like = false
    }
  };
  yausemilike();
  return (
    <div className="card mb-4">
      <div className="row g-0">
        <div className="col-md-4 flex flex-col flex-row items-center ">
          <img src={articulo.imagen} alt="" className='border rounded'/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className='flex flex-col flex-row items-center justify-between'>
             <h5 className="card-title ">{articulo.titulo}</h5>
               {articulo.user_id === user.user.id ? <Link href="/articulo/editar/[editar]" as={`/articulo/editar/${articulo.slug}`} ><img src="/editar.svg" className="w-10"/></Link>:null}
            </div>
            <p className="card-text">{articulo.texto_corto}</p>
            <p className="card-text">
              <small className="text-muted">{`categoria: ${articulo.categoria.description}`}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">{articulo.created_at}</small>
            </p>
            <Link href="/articulo/[slug]" as={`/articulo/${articulo.slug}`}>
              <a className="bg-red-500 px-1 py-1 rounded-lg text-white font-bold uppercase ">
                Ver Completo
              </a>
            </Link>
            
            {like === true ? (
              <div className="w-10 flex flex-col flex-row items-center justify-between mt-3">
                <button
                  className="w-10 flex flex-col flex-row items-center justify-between mr-20 "
                  onClick={() => {
                    dispatch(deleteLikeAction(like_id,articulo.id));
                  }}
                >
                  <p className="mr-4">{articulo.like.length}</p>
                  <img className="w-10 mb-8 md:mb-0" src="/like_color.svg" />
                </button>
                <div className="w-10 flex flex-col flex-row items-center justify-between">
                  <p className="mr-4">{articulo.comentario.length}</p>
                  <img className="w-10 mb-8 md:mb-0" src="/comment.svg" />
                </div>
              </div>
            ) : (
              <div className="w-10 flex flex-col flex-row items-center justify-between mt-3">
                <button
                  className="w-10 flex flex-col flex-row items-center justify-between mr-20 "
                  onClick={() => {
                    dispatch(saveLikeAction(articulo.id));
                  }}
                >
                  <p className="mr-4">{articulo.like.length}</p>
                  <img className="w-10 mb-8 md:mb-0" src="/like.svg" />
                </button>
                <div className="w-10 flex flex-col flex-row items-center justify-between">
                  <p className="mr-4">{articulo.comentario.length}</p>
                  <img className="w-10 mb-8 md:mb-0" src="/comment.svg" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articulo;
