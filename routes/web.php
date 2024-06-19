<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

require __DIR__.'/auth.php';

Route::get('/', function() {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

// Route::post('/forgot-password', function (Request $request) {
//     $request->validate(['email' => 'required|email']);
 
//     $status = Password::sendResetLink(
//         $request->only('email')
//     );
 
//     return $status === Password::RESET_LINK_SENT
//                 ? back()->with(['status' => __($status)])
//                 : back()->withErrors(['email' => __($status)]);
// })->middleware('guest')->name('password.email');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('{any}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
