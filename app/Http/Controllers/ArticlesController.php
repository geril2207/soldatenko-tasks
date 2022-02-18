<?php

namespace App\Http\Controllers;

use App\Models\ArticlesModel;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(["data" => ArticlesModel::get()], 200);
    }


    public function getArticlesByTag(Request $request)
    {
        return response()->json(["data" => ArticlesModel::where("tags", "LIKE", "%" . $request->tag . "%")->get(), "request" => $request->tag], 200);
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
        if ($request->hasFile("imgs")) {
            $data["imgs"] = $request->file("imgs")->getClientOriginalName();
            $request->file("imgs")->move(public_path("/imgs/"), $data["imgs"]);
        }
        ArticlesModel::create($data);
        return response()->json(["message" => 'Успешно добавлено'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $articles = ArticlesModel::find($id);
        if (is_null($articles)) {
            return response()->json(["message" => 'Пост не найден'], 404);
        }
        return response()->json(["data" => $articles], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $articles = ArticlesModel::find($id);
        if (is_null($articles)) {
            return response()->json(["message" => 'Не найдено'], 404);
        }
        $data = $request->all();
        if ($request->hasFile("imgs")) {
            $data["imgs"] = $request->file("imgs")->getClientOriginalName();
            $request->file("imgs")->move(public_path("/imgs/"), $data["imgs"]);
        }
        ArticlesModel::updated($data);
        return response()->json(["message" => "Успешно добавлено"], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $articles = ArticlesModel::find($id);
        if (is_null($articles)) {
            return response()->json(["message" => 'Не найдено'], 404);
        }
        $articles->delete();
        return response()->json(["message" => 'Успешно удалено']);
    }
}
