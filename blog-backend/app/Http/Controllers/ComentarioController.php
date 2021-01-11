<?php

namespace App\Http\Controllers;

use App\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'texto'=>'string|required',
            'articulo_id'=>'required|integer|exists:articulos,id'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Faltan datos',
                'erros' => $validator->messages()
            ],200);
        }
        $comentario = new Comentario();
        $comentario->texto = $request->texto;
        $comentario->articulo_id = $request->articulo_id;
        $comentario->user_id = auth()->user()->id;
        if($comentario->save()){
            $comentario =  Comentario::where('id',$comentario->id)->with(['user'])->get()->first();
            return response()->json([
                'success' => true,
                'message' => 'Guardado correctamente',
                'comentario' => $comentario
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
     * @param  \App\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comentario  $comentario
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
        $comentario = Comentario::findOrFail($id);
        if($comentario){
            $comentario->delete();
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
