<?php

namespace App\Services;

use Intervention\Image\Facades\Image;

class ImageService {

    public static function uploadImage($imageFile, string $type)
    {
        $image = Image::make($imageFile)->resize(400, 400);
        $path = $type. '/'. uniqid(). '_'. $imageFile->getClientOriginalName();
        $image->save(public_path($path));

        return '/'.$path;
    }
}