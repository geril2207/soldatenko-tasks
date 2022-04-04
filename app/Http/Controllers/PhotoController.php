<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Share;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function getAllPhotosByUser(Request $request)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', '=', $token)->first();
        // $imgsShared = DB::table('photos')->join('share', 'photos.id', '=', 'share.img_id')->select('photos.id', 'url', 'img_name', 'photos.owner_id')->get();
        $imgsShared = DB::table('share')->where('user_id', $user->id)->join('photos', 'share.img_id', '=', 'photos.id')->get();
        $imgs = Photo::where('owner_id', '=', $user->id)->select('id', 'url', 'img_name', 'owner_id')->get();
        // $result = collect([$imgs, $imgsShared])->collapse()->all();
        return response()->json(["self_photos" => $imgs, "shared_photos" => $imgsShared, "id" => $user->id]);
    }

    public function getPhotoById($id)
    {
        $imgs = Photo::where('id', '=', $id)->select('id', 'url', 'img_name', 'owner_id')->first();
        return response()->json(["data" => $imgs]);
    }

    public function deletePhoto(Request $request, $id)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', '=', $token)->first();
        $img = Photo::where('id', '=', $id)->first();
        if ($img->owner_id !== $user->id) {
            return response()->json(["success" => false, "message" => "Доступ запрещен"], 403);
        }
        $folder_name = $user->folder_name;
        $img_real_name = $img->img_real_name;
        Storage::disk('private')->delete("$folder_name/$img_real_name");
        $img->delete();
        return response()->json(["success" => true, "message" => "Успешно удалено"], 204);
    }

    public function upload(Request $request)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', $token)->first();
        $folder_name = $user->folder_name;
        if ($request->hasFile("photo")) {
            $img_name = $request->file("photo")->getClientOriginalName();
            $img_real_name = explode('.', $img_name);
            $img_real_name = time() . '.' . end($img_real_name);
            Storage::disk('private')->putFileAs("$folder_name/", $request->file('photo'),  $img_real_name);
            $newPhoto = Photo::create(["url" => "$folder_name/$img_real_name", "img_real_name" => $img_real_name, "img_name" => "Untitled", "owner_id" => $user->id]);
            return response()->json(["message" => 'Успешно добавлено', "data" => ["id" => $newPhoto->id, "img_name" => $newPhoto->img_name, "url" => $newPhoto->url]], 201);
        }
    }

    public function update(Request $request, $id)
    {
        $token = $request->bearerToken();
        $user = User::where('remember_token', $token)->first();
        $user_folder = $user->folder_name;
        $currentPhoto = Photo::where('id', $id)->first();
        if ($currentPhoto->owner_id !== $user->id) {
            return response()->json(["success" => false, "message" => "Ошибка доступа"], 403);
        }
        if ($request->hasFile("photo")) {
            Storage::disk('private')->putFileAs("$user_folder/", $request->file('photo'),  $currentPhoto->img_real_name);
            if (isset($request["name"])) {
                $currentPhoto->img_name = $request["name"];
                $currentPhoto->save();
            }
            return response()->json(["success" => true, "message" => "Успешно обновлено", "data" => ["id" => $currentPhoto->id, "img_name" => $currentPhoto->img_name, "url" => $currentPhoto->url]], 200);
        }
    }

    public function share(Request $request, $id)
    {
        $res = [];
        foreach ($request["photos"] as $key => $value) {
            $existing_img = DB::table('share')->where('img_id', $value)->first();
            if ($existing_img == null) {
                DB::table('share')->insert([
                    "img_id" => $value,
                    "user_id" => $id
                ]);
            }
        }
        return response()->json(["hello world" => "hello world", "id" => $id]);
    }
}
