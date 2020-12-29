<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class SiteController extends Controller
{

    protected $postPerPage = 10;

    public function home()
    {
        return view('public');
    }

    public function active_categories()
    {

        $categories = Category::with('posts')->where('status', 1)->get();

        return response()->json(['categories' => $categories], 200);

    }

    public function all_post()
    {

        $post = Post::with(['category', 'user'])->where('status', '=', 'published')->paginate($this->postPerPage);

        return response()->json(['posts' => $post], 200);

    }

    public function post($slug)
    {

        $post = Post::with(['user', 'category'])->where('slug', $slug)->get()->first();

        return response()->json(['post' => $post], 200);

    }

    public function category_post($slug)
    {

        $category = Category::where('slug' , $slug)->get()->first();

        $categoryPost = Post::with(['user', 'category'])->where('status', '=', 'published')->where('category_id' ,  $category->id)->paginate($this->postPerPage);

        return response()->json(['categoryPost' => $categoryPost], 200);

    }

    public function category($slug){

        $category = Category::where('slug' , $slug)->get(['slug' , 'name'])->first();
        return response()->json(['category' => $category], 200);
    }

    public function search_post($keyword){

        $posts = Post::where('status' , 'published')->where('title' , 'like' , '%'.$keyword.'%')->paginate($this->postPerPage);
        return response()->json(['posts' => $posts], 200);
    }
}
