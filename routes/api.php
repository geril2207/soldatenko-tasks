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

Route::middleware(['admin'])->group(function () {
    Route::delete('/articles/{id}/comments/{comment_id}', 'CommentsController@destroy');
    Route::delete('/articles/{id}', 'ArticlesController@destroy');
    Route::post('/articles/user/', 'ArticlesController@addUser');
}); 

Route::apiResource('articles', 'ArticlesController');
Route::get('/articles/tag/', 'ArticlesController@getArticlesByTag');
Route::post('/articles/{id}/comments', 'CommentsController@store');
