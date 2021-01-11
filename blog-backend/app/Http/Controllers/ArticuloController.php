<?php

namespace App\Http\Controllers;

use App\Articulo;
use App\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $articulos = Articulo::orderBy('created_at','DESC')->with(['user','categoria','like','comentario'])->get();
        foreach($articulos as $articulo){
            // $articulo->imagen = asset(Storage::url($articulo->imagen));
            // $articulo->imagen = public_path().'/images/'.$articulo->imagen;
            $articulo->imagen = "http://localhost:8000/storage/".$articulo->imagen;
        }
        return response()->json([
            'success' => true,
            'message' => 'Encontrado con exito',
            'articulos' => $articulos
        ],200);
    }
    public function misArticulos()
    {   
        $articulos = Articulo::where('user_id',auth()->user()->id)->orderBy('created_at','DESC')->with(['user','categoria','like','comentario'])->get();
        foreach($articulos as $articulo){
            $articulo->imagen = "http://localhost:8000/storage/".$articulo->imagen;
        }
        return response()->json([
            'success' => true,
            'message' => 'Encontrado con exito',
            'articulos' => $articulos
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
        
        $validator = Articulo::validatorArticle($request->all());
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Faltan datos',
                'erros' => $validator->messages()
            ],200);
        }

        $articulo = new Articulo();
        $articulo->titulo = $request->titulo;
        $articulo->categoria_id = $request->categoria_id;
        $articulo->slug = $request->slug;
        $articulo->texto_corto = $request->texto_corto;
        $articulo->texto_largo = $request->texto_largo;
        // $articulo->imagen = $request->imagen;
        if($request->imagen !==null){
            // $image_path = time().$request->imagen->getClientOriginalName();
            // Storage::disk('images')->put($image_path,File::get($request->imagen)); 
            // $articulo->imagen=$image_path;
            $image = $request->file('imagen');     
            $image_uploaded_path = $image->store('images', 'public');
            $articulo->imagen=$image_uploaded_path;
        }
       
        $articulo->user_id = auth()->user()->id;
        if($articulo->save()){
            $articulo = Articulo::where('id',$articulo->id)->with(['user','categoria','like','comentario'])->get()->first();
            $articulo->imagen = "http://localhost:8000/storage/".$articulo->imagen;
            return response()->json([
                'success' => true,
                'message' => 'Guardado correctamente',
                'articulo' => $articulo
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
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $articulo = Articulo::where('slug',$id)->with(['user','categoria','like'])->get()->first();
        $comentarios= Comentario::where('articulo_id',$articulo->id)->with(['user'])->get();
        $articulo['comentario']= $comentarios;
        $articulo->imagen = "http://localhost:8000/storage/".$articulo->imagen;
        if($articulo){
            return response()->json([
                'success' => true,
                'message' => 'Encontrado con exito',
                'articulo' => $articulo
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No se pudo encontrar'
            ],404);
        }
    }
    public function getImage($file_name){
        $file = Storage::disk('images')->get($file_name);
        
        return response()->json([
            'success' => true,
            'message' => 'Encontrado con exito',
            'file' => $file
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function edit($articulo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        $data = ["id"=>$id];
        $validator_id = Articulo::validatorId($id);
        if($validator_id->fails()){
            return response()->json([
                'success' => false,
                'message' => 'El id no es correcto',
                'erros' => $validator_id->messages()
            ],200);
        }
        $validator = Articulo::validatorArticle($request->all());
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Faltan datos',
                'erros' => $validator->messages()
            ],200);
        }
        $articulo = Articulo::findOrFail($id);
        $articulo->titulo = $request->titulo;
        $articulo->categoria_id = $request->categoria_id;
        $articulo->slug = $request->slug;
        $articulo->texto_corto = $request->texto_corto;
        $articulo->texto_largo = $request->texto_largo;
        // $articulo->imagen = $request->imagen;
        if($request->imagen !==null){
            // $image_path = time().$request->imagen->getClientOriginalName();
            // Storage::disk('images')->put($image_path,File::get($request->imagen)); 
            // $articulo->imagen=$image_path;
            //unlink( Storage::url('public/'.$articulo->imagen));
            $image = $request->file('imagen');     
            $image_uploaded_path = $image->store('images', 'public');
            $articulo->imagen=$image_uploaded_path;
        }
        if($articulo->update()){
            $articulo = Articulo::where('id',$articulo->id)->with(['user','categoria','like'])->get()->first();
            $articulo->imagen = "http://localhost:8000/storage/".$articulo->imagen;
            $comentarios= Comentario::where('articulo_id',$articulo->id)->with(['user'])->get();
            $articulo['comentario']= $comentarios;
            return response()->json([
                'success' => true,
                'message' => 'Actualizado correctamente',
                'articulo' => $articulo
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar',
            ],500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $validator_id = Articulo::validatorId($id);
        if($validator_id->fails()){
            return response()->json([
                'success' => false,
                'message' => 'El id no es correcto',
                'erros' => $validator_id->messages()
            ],200);
        }
        $articulo = Articulo::findOrFail($id);
        if($articulo){
            $articulo->delete();
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
