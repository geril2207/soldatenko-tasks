<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentsModel extends Model
{
    use HasFactory;
    protected $table = "comments";
    public $timestamps = false;

    protected $fillable = [
        'author',
        'comments',
        'parent_id',
    ];

    function comments()
    {
        return $this->hasMany('App/comments');
    }
}
