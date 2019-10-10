<?php

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


/*
*   FRONTEND AUTHENTICATION ROUTES
*/
Route::get("/login", "\App\Http\Controllers\Auth\Frontend\FrontendLoginController@showLoginForm")->name("frontend.login.showLoginForm");
Route::post("/login", "\App\Http\Controllers\Auth\Frontend\FrontendLoginController@login")->name("frontend.login");
Route::post("/logout", "\App\Http\Controllers\Auth\Frontend\FrontendLoginController@logout")->name("frontend.logout");
Route::post("/password/email", "\App\Http\Controllers\Auth\Frontend\FrontendForgotPasswordController@sendResetLinkEmail")->name("frontend.password.email");
Route::get("/password/reset", "\App\Http\Controllers\Auth\Frontend\FrontendForgotPasswordController@showLinkRequestForm")->name("frontend.password.request");
Route::post("/password/reset", "\App\Http\Controllers\Auth\Frontend\FrontendResetPasswordController@reset")->name("frontend.password.update");
Route::get("/password/reset/{token}", "\App\Http\Controllers\Auth\Frontend\FrontendResetPasswordController@showResetForm")->name("frontend.password.reset");
Route::get("/register", "\App\Http\Controllers\Auth\Frontend\FrontendRegisterController@showRegistrationForm")->name("frontend.register.showRegistrationForm");
Route::post("/register", "\App\Http\Controllers\Auth\Frontend\FrontendRegisterController@register")->name("frontend.register");

/*
*   FRONTEND ROUTES
*/
Route::get('/', "FrontendPagesController@index")->name('index');





/*
*   BACKEND AUTHENTICATION ROUTES
*/
Route::get("/admin/login", "\App\Http\Controllers\Auth\Backend\BackendLoginController@showLoginForm")->name("admin.login.showLoginForm");
Route::post("/admin/login", "\App\Http\Controllers\Auth\Backend\BackendLoginController@login")->name("admin.login");
Route::post("/admin/logout", "\App\Http\Controllers\Auth\Backend\BackendLoginController@logout")->name("admin.logout");
Route::post("/admin/password/email", "\App\Http\Controllers\Auth\Backend\BackendForgotPasswordController@sendResetLinkEmail")->name("admin.password.email");
Route::get("/admin/password/reset", "\App\Http\Controllers\Auth\Backend\BackendForgotPasswordController@showLinkRequestForm")->name("admin.password.request");
Route::post("/admin/password/reset", "\App\Http\Controllers\Auth\Backend\BackendResetPasswordController@reset")->name("admin.password.update");
Route::get("/admin/password/reset/{token}", "\App\Http\Controllers\Auth\Backend\BackendResetPasswordController@showResetForm")->name("admin.password.reset");
Route::get("/admin/register", "\App\Http\Controllers\Auth\Backend\BackendRegisterController@showRegistrationForm")->name("admin.register.showRegistrationForm");
Route::post("/admin/register", "\App\Http\Controllers\Auth\Backend\BackendRegisterController@register")->name("admin.register");


/*
*   BACKEND ROUTES
*/
Route::get('/admin', "AdminPagesController@index")->name('admin.index');
