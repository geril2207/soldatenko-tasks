<?php

use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UserController;
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


Route::post('/user/signup', [UserController::class, 'store']);
Route::post('/user/login', [UserController::class, 'login']);

Route::group(['middleware' => 'tokenAuth'], function () {
    Route::get('/user', [UserController::class, 'search']);
    Route::post('/photo', [PhotoController::class, 'upload']);
    Route::get('/photo', [PhotoController::class, 'getAllPhotosByUser']);
    Route::post('/photo/{id}', [PhotoController::class, 'update']);
    Route::get('/photo/{id}', [PhotoController::class, 'getPhotoById']);
    Route::delete('/photo/{id}', [PhotoController::class, 'deletePhoto']);
});
