<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    



Route::post('/v1/auth/login', 'TokensController@login');
Route::post('/v1/auth/register', 'TokensController@register');
Route::get('/v1/articulo/get-imagen-articulo/{filename}','ArticuloController@getImage');
Route::group(['middleware'=>['jwt.auth'],'prefix'=>'v1'],function(){
    // autenticacion
    Route::post('/auth/refresh', 'TokensController@refreshToken');
    
    Route::get('/auth/verify', 'TokensController@getUser');
    Route::get('/auth/logout', 'TokensController@logout');
    // articulo
    Route::post('/articulo/save-articulo','ArticuloController@store');
    Route::get('/articulo/show-articulo/','ArticuloController@index');
    Route::get('/articulo/show-mis-articulo/','ArticuloController@misArticulos');
    Route::get('/articulo/show-articulo/{id}','ArticuloController@show');
    Route::post('/articulo/update-articulo/{id}','ArticuloController@update');
    Route::delete('/articulo/delete-articulo/{id}','ArticuloController@destroy'); 
     
    //like
    Route::post('/like/save-like','LikeController@store');
    Route::delete('/like/delete-like/{id}','LikeController@destroy');
    // comentario
    Route::post('/comentario/save-comentario','ComentarioController@store');
    Route::delete('/comentario/delete-comentario/{id}','ComentarioController@destroy');
    // categoria
    Route::get('/categoria/show-categoria','CategoriaController@index');
    Route::post('/categoria/save-categoria','CategoriaController@store')->middleware('role:admin');
    Route::delete('/categoria/delete-categoria/{id}','CategoriaController@destroy')->middleware('role:admin');

    //prueba de middleware
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('role:admin');
});
