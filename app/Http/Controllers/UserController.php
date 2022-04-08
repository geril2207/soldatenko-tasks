<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return response()->json(["message" => "Json"]);
    }


    public function info(Request $request)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', $token)->select('firstname', 'surname')->first();
        return response()->json(["success" => true, "data" => $user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegisterRequest $request)
    {
        $user = User::where('phone', $request["phone"])->first();
        if (isset($user->phone)) {
            return response()->json(["success" => false, "message" => "Пользователь с таким телефоном уже существует"], 402);
        }
        $folder_name = md5($request["phone"] . "photo_api");
        $newUser = User::create(["phone" => $request["phone"], "firstname" => $request["firstname"], "surname" => $request["surname"], "password" => Hash::make($request["password"]), "folder_name" => $folder_name]);
        Storage::disk('private')->makeDirectory($newUser->folder_name);
        return response()->json(["success" => true, "message" => "Пользователь успешно создан", "data" => ["id" => $newUser->id]], 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('phone', $request["phone"])->first();
        if (!isset($user)) {
            return response()->json(["success" => false, "message" => "Пользователя с таким телефоном не существует"], 404);
        }
        if (isset($user["remember_token"]) && Hash::check($request["password"], $user["password"])) {
            return response()->json(["success" => true, "message" => "Авторизация прошла успешно", "data" => ["token" => $user["remember_token"]]]);
        }
        if (Hash::check($request["password"], $user["password"])) {
            $token = md5(rand(0, PHP_INT_MAX));
            $user->remember_token = $token;
            $user->save();
            return response()->json(["success" => true, "message" => "Авторизация прошла успешно", "data" => ["token" => $user["remember_token"]]]);
        } else {
            return response()->json(["success" => false, "message" => "Пароль неверный"], 404);
        }
    }

    public function logout(Request $request)
    {
        return response()->json(["success" => true], 200);
    }

    public function search(Request $request)
    {
        $searchStr = $request["search"];
        $token = $request->bearerToken();
        $user = User::where('remember_token', '=', $token)->first();
        if (isset($searchStr)) {
            $users = User::select('id', 'firstname', 'surname', 'phone')->where('id', '!=', $user->id)->where(function ($query) use ($searchStr) {
                $query->where('firstname', 'LIKE', "%{$searchStr}%")->orWhere('surname', 'LIKE', "%{$searchStr}%")->orWhere('phone', 'LIKE', "%{$searchStr}%");
            })->get();
            return response()->json(["success" => true, "data" => $users], 200);
        }
        return response()->json(["success" => true, "data" => []], 200);
    }
}
