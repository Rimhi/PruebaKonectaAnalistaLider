import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState } from 'react';
import clienteAxios from '../../config/axios';

const Dropzone = ({files}) => {
    const onDrop = useCallback((acceptedFiles)=>{
        files(acceptedFiles)
    },[])
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop})
    const archivos = acceptedFiles.map(archivo=>(
        <li className="bg-white flex-1 p-3 mb-4 shdow-lg rounded" key={archivo.lastModified}>
            <p className="font=bold text-xl">{archivo.path}</p>
            <p className="text-gray-500 text-sm">{(archivo.size/Math.pow(1024,2)).toFixed(2)} MB</p>
        </li>
    ))
    
    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
            <ul>{archivos}</ul>
            <div {...getRootProps({className:'dropzone w-full py-32'})}>
                <input className="h-100"  {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? <p className="text-2xl text-center text-gray-600">Sueltalo...</p>: <p className="text-2xl text-center text-gray-600">Selecciona un archivo o Arrastralo</p>}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Dropzone
