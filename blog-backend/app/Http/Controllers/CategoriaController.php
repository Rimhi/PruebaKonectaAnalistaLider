<?php

namespace App\Http\Controllers;

use App\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Encontrado con exito',
            'categorias' => Categoria::all()
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'description'=>'string|required'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Faltan datos',
                'erros' => $validator->messages()
            ],200);
        }
        $categoria = new Categoria();
        $categoria->description = $request->description;
        if($categoria->save()){
            return response()->json([
                'success' => true,
                'message' => 'Guardado correctamente',
                'categoria' => $categoria
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar',
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categoria $categoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = ["id"=>$id];
        $data = Validator::make($data,[
            'id'=>'integer|required'
        ]);
        if($data->fails()){
            return response()->json([
                'success' => false,
                'message' => 'El id no es correcto',
                'erros' => $data->messages()
            ],200);
        }
        $categoria = Categoria::findOrFail($id);
        if($categoria){
            $categoria->delete();
            return response()->json([
                'success' => true,
                'message' => 'Eliminado con exito',
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No se pudo encontrar'
            ],404);
        }
    }
}
