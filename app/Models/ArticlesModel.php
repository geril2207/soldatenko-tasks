<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticlesModel extends Model
{
    use HasFactory;
    protected $table = "articles";
    public $timestamps = false;

    protected $fillable = [
        'title',
        'anons',
        'text',
        'tags',
        'imgs',
    ];

    function comments()
    {
        return $this->hasMany('App/comments');
    }
}
