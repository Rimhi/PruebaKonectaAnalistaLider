<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Articulo extends Model
{
    public static function validatorArticle($data){
        return  Validator::make($data,[
            'titulo'=>'string|required',
            'categoria_id'=>'required|integer',
            'slug'=>'required|unique:articulos',
            'texto_corto'=>'required|string',
            'texto_largo'=>'required|string',
        ]);
    }
    public static function validatorId($id){
        $data = ["id"=>$id];
        return Validator::make($data,[
            'id'=>'integer|required'
        ]);
    }
    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function like(){
        return $this->hasMany(Like::class);
    }
    public function comentario(){
        return $this->hasMany(Comentario::class);
    }
}
