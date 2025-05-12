<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'currentRoute' => 'dashboard',
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('students', StudentController::class);



    Route::get('/subjects', function () {
        return Inertia::render('Subjects', [

            'currentRoute' => 'subjects',
        ]);
    })->name('subjects');

    Route::get('/teachers', function () {
        return Inertia::render('Teachers', [

            'currentRoute' => 'teachers',
        ]);
    })->name('teachers');

    Route::get('/enrollments', function () {
        return Inertia::render('Enrollments', [
            'currentRoute' => 'enrollments',
        ]);
    })->name('enrollments');

    Route::get('/attendance', function () {
        return Inertia::render('Attendance', [
            'currentRoute' => 'attendance',
        ]);
    })->name('attendance');
});

require __DIR__ . '/auth.php';
