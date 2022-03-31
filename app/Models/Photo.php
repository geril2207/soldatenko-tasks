<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;
    protected $fillable = [
        'url',
        'img_name',
        'img_real_name',
        'owner_id',
    ];
    public $timestamps = false;
}
