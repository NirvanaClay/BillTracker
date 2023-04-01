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
use Illuminate\Support\Facades\Password;

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
        'email' => 'required|string|email|max:255|unique:'.User::class.'|regex:/^[\w.+-]+@[\w-]+\.[a-z]+$/i',
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
    return $expense;
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

Route::put('/expenses/{id}', function(Request $request) {
    $id = $request->id;
    $name = $request->editName;
    $amount = $request->editAmount;
    $expense = Expense::find($id);
    $expense->name = $name;
    $expense->amount = $amount;
    $expense->save();
    return $expense;
});

Route::post('/login', function(Request $request){
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $csrfToken = csrf_token();
        return $csrfToken;
    }
    return response('The provided credentials do not match our records.', 401);
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
});

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);
 
    $status = Password::sendResetLink(
        $request->only('email')
    );
 
    return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

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

require __DIR__.'/auth.php';
