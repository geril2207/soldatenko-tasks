<?php

namespace App\Http\Controllers;

use App\Models\ArticlesModel;
use App\Models\CommentsModel;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request, $id)
    {
        $article = ArticlesModel::find($id);
        if (is_null($article)) {
            return response()->json(["message" => 'Пост не найден', "AricleId" => $id], 404);
        }

        $comment = new CommentsModel();
        $comment->parent_id = $id;
        $comment->comment = $request->comment;
        $comment->author = $request->author;
        $comment->save();
        return response()->json(["message" => 'Успешно добавлено', "data" => $comment], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $comment_id)
    {
        $article = ArticlesModel::find($id);
        if (is_null($article)) {
            return response()->json(["message" => 'Пост не найден'], 404);
        }
        $comment = CommentsModel::find($comment_id);
        if (is_null($comment)) {
            return response()->json(["message" => 'Комментарий не найдены'], 404);
        }
        $comment->delete();
        return response()->json(["message" => 'Комментарий успшено удален']);
    }
}
