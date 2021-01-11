import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAction } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.usuarios);
  useEffect(() => {
    if (state?.user?.user?.email) {
      router.push("/");
    }
  }, [state]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatorio"),
    }),
    onSubmit: (user) => {
      dispatch(loginAction(user));
    },
  });
  return (
    <Layout>
      {state.loading ? "Cargando..." : null}

      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
        <h2 className="text-4xl font-sans font-bold text-gray-500 text-center my-4">
          login
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="escribe tu email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bol mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="escribe tu Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
              value="Login"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
