import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import  *  as Yup from 'yup';
import { registerAction } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
const CrearCuenta = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const state = useSelector((state) => state.usuarios);
    useEffect(() => {
      if (state?.user?.user?.email) {
        router.push("/");
      }
    }, [state]);

    const formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            number:'',
            password:''
        },
        validationSchema:Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            number: Yup.number().required('El numero es obligatorio'),
            password: Yup.string().required('La contraseña es obligatorio').min(6,"la contraseña debe contener al menos 6 cartacteres"),
        }),
        onSubmit:user=>{
          dispatch(registerAction(user))
          router.push('/')
        }
    })
    return ( 
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
                <h2 className="text-4xl font-sans font-bold text-gray-500 text-center my-4">Crear Cuenta</h2>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bol mb-2" htmlFor="name">Nombre</label>
                            <input type="text" className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" placeholder="escribe tu nombre" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                          <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.name}</p>
                          </div>  
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bol mb-2" htmlFor="email">Email</label>
                            <input type="email" className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" placeholder="escribe tu email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                          </div>  
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bol mb-2" htmlFor="number">Numero</label>
                            <input type="number" className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="number" placeholder="escribe tu Numero" value={formik.values.number} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </div>
                        {formik.touched.number && formik.errors.number ? (
                          <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.number}</p>
                          </div>  
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bol mb-2" htmlFor="password">Contraseña</label>
                            <input type="password" className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" placeholder="escribe tu Contraseña" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                          </div>  
                        ) : null }
                        <input
                        type="submit"
                        className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold" value="crear Cuenta"/>

                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default CrearCuenta;