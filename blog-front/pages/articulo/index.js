import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import Articulo from '../../components/articulo';
import { useRouter } from 'next/router';
import { getMisArticulosAction } from '../../actions/articuloActions';

const MisArticulos = () => {
    const state = useSelector((state) => state.articulos.misarticulos);
  const user = useSelector((state) => state.usuarios.user);
 
  const router = useRouter()
  const dispatch = useDispatch();
  useEffect(() => {
      
    if (state.length < 1) {
        console.log(state)
      if(user.user){
        dispatch(getMisArticulosAction());
      }else{
          router.push('/login')
      }
    }
  }, [state]);
    return ( 
        <Layout>
            {user?.user ?
        state.map((articulo) => (
            
          <Articulo articulo={articulo} key={articulo.id}></Articulo>
        ))  :
            null
        }
        </Layout>
     );
}
 
export default MisArticulos;