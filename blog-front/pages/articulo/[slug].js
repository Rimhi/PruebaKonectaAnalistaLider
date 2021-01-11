import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticuloAction,
  deleteComentarioAction,
  deleteLikeAction,
  getArticuloAction,
  saveComentarioAction,
  saveLikeAction,
} from "../../actions/articuloActions";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import { useFormik } from "formik";
import Link from "next/link";
import Swal from "sweetalert2";
import { route } from "next/dist/next-server/server/router";
const Slug = () => {
  const dispatch = useDispatch();
  const articulo = useSelector((state) => state.articulos.articulo);
  const articulos = useSelector((state) =>
    state.articulos.articulos.slice(0, 8)
  );
  const user = useSelector((state) => state.usuarios.user);
  const likes = useSelector((state) => state.articulos.articulo.like);
  const [like, setlike] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (router.query.slug) {
      dispatch(getArticuloAction(router.query.slug));
    }
  }, [router.query.slug]);
  useEffect(() => {
    if (likes) {
      setlike(likes.filter((like) => like.user_id === user.user.id));
      console.log(like);
    }
  }, [likes]);
  useEffect(() => {
    if (!user.user) {
      router.push("/login");
    }
  }, [user.user]);
  const formik = useFormik({
    initialValues: {
      texto: "",
    },
    validationSchema: Yup.object({
      texto: Yup.string().required("El email es obligatorio"),
    }),
    onSubmit: (comentario) => {
      comentario.articulo_id = articulo.id;
      dispatch(saveComentarioAction(comentario));
      formik.resetForm({
        texto: "",
      });
    },
  });

  return (
    <Layout>
      {articulo.titulo && likes ? (
        <>
          <div className="flex flex-col md:flex-row  justify-between">
            <div className="w-3/4">
              {user.user.role_id === 1 || user.user.id === articulo.user.id ? (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Seguro quieres eliminar este articulo?",
                      text: "no lo podras recuperar",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si, Borrar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteArticuloAction(articulo.id));
                        router.push("/");
                      }
                    });
                  }}
                >
                  Eliminar
                </button>
              ) : null}

              <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">
                  {articulo.titulo}
                </h4>
                <div>
                  {like.length > 0 ? (
                    <div className="w-10 flex flex-col flex-row items-center justify-between mt-3">
                      <button
                        className="w-10 flex flex-col flex-row items-center justify-between mr-20 "
                        onClick={() => {
                          dispatch(deleteLikeAction(like[0].id, articulo.id));
                        }}
                      >
                        <p className="mr-4">{articulo.like.length}</p>
                        <img
                          className="w-10 mb-8 md:mb-0"
                          src="/like_color.svg"
                        />
                      </button>
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
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <div>
                    <div>
                      <span>{`Creado: ${articulo.created_at} - Por: ${articulo.user.name} `}</span>
                    </div>
                    <img src={articulo.imagen}></img>
                  </div>
                  <p>{articulo.texto_corto}</p>
                </div>
                <p>{articulo.texto_largo}</p>
              </div>
              <h1>Comentarios</h1>
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <textarea
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="texto"
                    value={formik.values.texto}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>
                {formik.touched.texto && formik.errors.texto ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.texto}</p>
                  </div>
                ) : null}
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
                  value="Enviar Comentario"
                />
              </form>
              <div>
                {articulo.comentario.map((comentario) => (
                  <div
                    className="card border-success mb-3"
                    key={`comentario${comentario.id}`}
                  >
                    <div className="card-body">
                      {user.user.role_id === 1 ||
                      user.user.id === comentario.user.id ? (
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Seguro quieres eliminar este comentario?",
                              text: "no lo podras recuperar",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Si, Borrar!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteComentarioAction(comentario.id));
                              }
                            });
                          }}
                        >
                          Eliminar
                        </button>
                      ) : null}
                      <h5 className="card-title">{comentario.user.name}</h5>
                      <p className="card-text">{comentario.texto}</p>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                      {comentario.created_at}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/5">
              <h1>Mas recientes</h1>
              {articulos.map((article) => {
                if (article.id != articulo.id) {
                  return (
                    <div
                      className="card border-success mb-3"
                      key={`article${article.id}`}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{article.titulo}</h5>
                        <p className="card-text">{article.texto_corto}</p>
                      </div>
                      <div className="card-footer bg-transparent border-success">
                        <Link
                          href="/articulo/[slug]"
                          as={`/articulo/${article.slug}`}
                        >
                          <a className="bg-red-500 px-1 py-1 rounded-lg text-white font-bold uppercase ">
                            Ver Completo
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </>
      ) : (
        "...cargando"
      )}
    </Layout>
  );
};

export default Slug;
