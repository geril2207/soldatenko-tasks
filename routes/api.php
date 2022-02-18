<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/articles/tag/', 'ArticlesController@getArticlesByTag');
Route::post('/articles/{id}/comments', 'CommentsController@store');
Route::delete('/articles/{id}/comments/{comment_id}', 'CommentsController@destroy');
Route::apiResource('articles', 'ArticlesController');
