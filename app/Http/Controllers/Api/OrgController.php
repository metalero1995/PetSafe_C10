<?php

namespace App\Http\Controllers\Api;

use App\Models\Organizacion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrgController extends Controller
{
    public function index()
    {
        $organizaciones = Organizacion::all();
        return [
            'orgs' => $organizaciones,
        ];
    }

    public function show($id)
    {
        $organizacion = Organizacion::findOrFail($id);
        return [
            'org' => $organizacion,
        ];
    }
}
