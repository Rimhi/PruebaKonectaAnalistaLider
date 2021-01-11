<?php

namespace App\Http\Controllers;

use App\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
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
        $data = $request->all();
        $data['user_id']=auth()->user()->id;
        $validator = Validator::make($request->all(),[
            'user_id'=>'exists:users,id',
            'articulo_id'=>'exists:articulos,id'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Eror al dar Like',
                'erros' => $validator->messages()
            ],200);
        }
        $like = Like::where('user_id','=',$data['user_id'])->where('articulo_id','=',$data['articulo_id'])->get();
        if(count($like)>0){
            return response()->json([
                'success' => false,
                'message' => 'Ya Diste Like',
                'like' => $like
            ],200);
        }
        
        $like = new Like();
        $like->articulo_id = $data['articulo_id'];
        $like->user_id = $data['user_id'];
        if($like->save()){
            return response()->json([
                'success' => true,
                'message' => 'Guardado correctamente',
                'like' => $like
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
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $data = ["id"=>$id];
        // $data = Validator::make($data,[
        //     'id'=>'integer|required'
        // ]);
        // if($data->fails()){
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'El id no es correcto',
        //         'erros' => $data->messages()
        //     ],200);
        // }
        $like = Like::findOrFail($id);
        if($like){
            $like->delete();
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
