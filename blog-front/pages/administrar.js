import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAction } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  deleteCategoriaAction,
  getCategoriasAction,
  saveCategoriaAction,
} from "../actions/categoriaAction";
const Administrar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.usuarios.user);
  const categorias = useSelector((state) => state.categorias.categorias);
  useEffect(() => {
    if (state?.user?.role_id !== 1) {
      router.push("/");
    }
  }, [state]);
  useEffect(() => {
    if (categorias.length < 1) {
      if (state.user) {
        dispatch(getCategoriasAction());
      }
    }
  }, [categorias]);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("La descripcion es obligatorio"),
    }),
    onSubmit: (categoria) => {
      dispatch(saveCategoriaAction(categoria));
      formik.resetForm({
        description: "",
      });
    },
  });

  const formikDelete = useFormik({
    initialValues: {
      categoria_id: "",
    },
    validationSchema: Yup.object({
      categoria_id: Yup.string().required("Selecciona una"),
    }),
    onSubmit: (categoria) => {
      dispatch(deleteCategoriaAction(categoria.categoria_id))
    },
  });
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
        <h2 className="text-4xl font-sans font-bold text-gray-500 text-center my-4">
          Categorias
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg mr-10">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="email"
              >
                Descripcion
              </label>
              <input
                type="text"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="escribe tu description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
              value="Guardar"
            />
          </form>
        </div>
        <div>
        <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formikDelete.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="categoria_id"
              >
                Categoria
              </label>
              <select
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria_id"
                value={formikDelete.values.categoria_id}
                onChange={formikDelete.handleChange}
                onBlur={formikDelete.handleBlur}
              >
                <option value="">Selecciona una</option>
                {categorias.map((categoria) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.description}
                  </option>
                ))}
              </select>
            </div>
            {formikDelete.touched.categoria_id && formikDelete.errors.categoria_id ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formikDelete.errors.categoria_id}</p>
              </div>
            ) : null}
          <input
              type="submit"
              className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
              value="Eliminar Categoria"
            />
        </form>
        </div>
      </div>
      
    </Layout>
  );
};

export default Administrar;
