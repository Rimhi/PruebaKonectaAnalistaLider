import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUserAuthenticated, logoutAction } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const user = useSelector((state) => state.usuarios.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    if(localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null){
      dispatch(getUserAuthenticated())
    }
    }, []);



  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="/logo.png" />
      </Link>
      {user?.user ? (
        
        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="mr-4">{`Bienvenido @${user.user.name}`}</p>
          <Link href="/articulo/crear-articulo">
            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase">
              Crear Articulo
            </a>
          </Link>
          <Link href="/articulo/">
            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase">
              Mis Articulos
            </a>
          </Link>
          {user.user.role_id===1?
          
            <Link href="/administrar">
              
            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase">
              Administar
            </a>
          </Link>
          :null}
          
          <button className="bg-gray-500 px-5 py-3 rounded-lg text-white font-bold uppercase" onClick={()=>{
            dispatch(logoutAction())
              router.push('/login')
            }}>
            Cerrar Sesion
          </button>
        </div>
      ) : (
        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
          <Link href="/login">
            <a className="bg-gray-500 px-5 py-3 rounded-lg text-white font-bold uppercase">
              Inicia Sesion
            </a>
          </Link>
          <Link href="/crear-cuenta">
            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase">
              Registrate
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
