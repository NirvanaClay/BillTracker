<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/csrf-token', function() {
//     return response()->json([
//         'csrf_token' => csrf_token()
//     ]);
// });

Route::get('/testing', function() {
    return "Testing";
});

Route::post('/login', function(Request $request){
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return "Auth successful";
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ])->onlyInput('email');
});

Route::middleware('auth:sanctum')->get('/info', function() {
    $users = User::all();
    return $users;
 });

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// require __DIR__.'/auth.php';
