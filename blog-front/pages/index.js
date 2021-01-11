import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticulosAction } from "../actions/articuloActions";
import Articulo from "../components/articulo";
import Layout from "../components/Layout";
export default function Home() {
  
  const state = useSelector((state) => state.articulos);
  const user = useSelector((state) => state.usuarios.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.articulos.length < 1) {
      if(user){
        dispatch(getArticulosAction());
      }
    }
  }, []);
  return (
    <Layout>
      {user?.user ?
        state.articulos.map((articulo) => (
          <Articulo articulo={articulo} key={articulo.id}></Articulo>
        ))  :
          <h1>Bienvenido</h1>
        }
      
    </Layout>
  );
}
