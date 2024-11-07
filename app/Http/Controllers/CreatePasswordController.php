<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CreatePasswordController extends Controller
{
    public function create(string $token) 
    {
        $tokenM = Token::where('token', $token)->first();
        $data = "";

        if(!$tokenM)
        {
            $data = null;
        } else {
            $data = $tokenM->token;
        }

        return Inertia::render('GetOrgPassword', [
            'token' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8',
            'confirmPassword' => 'required|string|same:password',
            'token' => 'required',
        ]);

        $token = Token::where('token', $request->token)->first();

        if(!$token) {
            return response()->json([
                "mensaje" => "Acción no válida",
            ], 403);
        };

        $user = User::find($token->user_id);
        $user->update([
            'password' => Hash::make($request->password),
        ]);
        $token->delete();

        Auth::login($user);

        return [
            "mensaje" => "Contraseña guardada",
        ];
    }
}
