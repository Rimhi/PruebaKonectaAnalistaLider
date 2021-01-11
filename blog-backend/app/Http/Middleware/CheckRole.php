<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     * @return mixed
     */
    public function handle($request, Closure $next,$role)
    {
        if(!$request->user()->hasRole($role)){
            return response()->json(['success'=>false,'message'=>'No tienes Permiso para acceder aqui'],403);
        }
        return $next($request);
    }
}
