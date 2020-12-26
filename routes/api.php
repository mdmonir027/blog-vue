<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('category' , \App\Http\Controllers\Admin\CategoryController::class);
Route::apiResource('post' , \App\Http\Controllers\Admin\PostController::class);
Route::post('/remove-selected-category' , [\App\Http\Controllers\Admin\CategoryController::class ,'remove_selected_category' ]);
Route::post('/active-selected-category' , [\App\Http\Controllers\Admin\CategoryController::class ,'active_selected_category' ]);
Route::post('/inactive-selected-category' , [\App\Http\Controllers\Admin\CategoryController::class ,'inactive_selected_category' ]);
Route::get('/active/category' , [\App\Http\Controllers\Admin\CategoryController::class ,'all_active_category' ]);


Route::post('/remove-selected-post' , [\App\Http\Controllers\Admin\PostController::class ,'remove_selected_posts' ]);
Route::post('/publish-selected-post' , [\App\Http\Controllers\Admin\PostController::class ,'published_selected_posts' ]);
Route::post('/draft-selected-post' , [\App\Http\Controllers\Admin\PostController::class ,'draft_selected_posts' ]);
