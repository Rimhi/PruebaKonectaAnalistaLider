import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriasAction } from "../../actions/categoriaAction";
import { saveArticuloAction } from "../../actions/articuloActions";
import { useRouter } from "next/router";
import Dropzone from "../../components/articulo/Dropzone";
import Articulo from "../../components/articulo";
const CrearArticulo = () => {
  const categorias = useSelector((state) => state.categorias.categorias);
  const success = useSelector((state) => state.articulos.success);
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.usuarios);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (!state?.user?.user?.email) {
      router.push("/login");
    }
  }, [state]);
  useEffect(() => {
    if (categorias.length < 1) {
      dispatch(getCategoriasAction());
    }
  }, [categorias]);
  useEffect(() => {
    console.log(files);
  }, [files]);
  const formik = useFormik({
    initialValues: {
      titulo: "",
      slug: "",
      texto_corto: "",
      categoria_id: "",
      texto_largo: "",
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required("El titulo es obligatorio"),
      slug: Yup.string().required("El slug es obligatorio"),
      texto_corto: Yup.string().required("El slug es obligatorio"),
      texto_largo: Yup.string().required("El slug es obligatorio"),
      categoria_id: Yup.number().required("El slug es obligatorio"),
    }),
    onSubmit: (articulo) => {
      const formData = new FormData();
      formData.append("titulo", articulo.titulo);
      formData.append("slug", articulo.slug);
      formData.append("texto_corto", articulo.texto_corto);
      formData.append("texto_largo", articulo.texto_largo);
      formData.append("categoria_id", articulo.categoria_id);
      formData.append("imagen", files[0]);

      dispatch(saveArticuloAction(formData));
      router.push("/");
    },
  });
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
        <h2 className="text-4xl font-sans font-bold text-gray-500 text-center my-4">
          Crear Articulo
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="titulo"
              >
                Titulo
              </label>
              <input
                type="text"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="titulo"
                placeholder="escribe tu titulo"
                value={formik.values.titulo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.titulo && formik.errors.titulo ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.titulo}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="slug"
              >
                Slug
              </label>
              <input
                type="text"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="slug"
                placeholder="escribe tu slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.slug && formik.errors.slug ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.slug}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="texto_corto"
              >
                Texto Corto
              </label>
              <input
                type="text"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="texto_corto"
                placeholder="escribe tu texto corto"
                value={formik.values.texto_corto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.texto_corto && formik.errors.texto_corto ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.texto_corto}</p>
              </div>
            ) : null}
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
                value={formik.values.categoria_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Selecciona una</option>
                {categorias.map((categoria) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.description}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.categoria_id && formik.errors.categoria_id ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.categoria_id}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="texto_largo"
              >
                Texto Largo
              </label>
              <textarea
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="texto_largo"
                value={formik.values.texto_largo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.texto_largo && formik.errors.texto_largo ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.texto_largo}</p>
              </div>
            ) : null}
            <Dropzone files={setFiles} />
            <input
              type="submit"
              className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
              value="Crear Articulo"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearArticulo;
