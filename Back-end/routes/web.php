<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Expense;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/register', function(Request $request)
{
    $request->validate([
        'email' => 'required|string|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));
    $request->session()->regenerate();
    Auth::login($user);
    $csrfToken = csrf_token();
    return $csrfToken;
    // return redirect(RouteServiceProvider::HOME);
});

Route::get('/getCsrf', function() {
    $csrfToken = csrf_token();
    return $csrfToken;
});

Route::get('/checkLogin', function() {
    return Auth::check();
});

Route::post('/addExpense', function(Request $request) {
    $expense = Expense::create([
        'name' => $request->name,
        'amount' => $request->amount,
        'user_id' => $request->user_id
    ]);
})->middleware('auth');

Route::get('/expenses', function() {
    $id = Auth::id();
    $expenses = User::find($id)->expenses;
    return $expenses;
});

Route::delete('/expenses/{id}', function(Request $request) {
    $id = $request->id;
    $expense = Expense::find($id);
    $expense->delete();
});

Route::post('/login', function(Request $request){
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect('/');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ])->onlyInput('email');
});

Route::get('/user', function (Request $request) {
    if(Auth::check()){
        $user = Auth::user();
        return $user;
    }
    else{
        return false;
    }
})->middleware('auth');

Route::post('/logout', function(Request $request) {
    Auth::logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('{any}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// require __DIR__.'/auth.php';
