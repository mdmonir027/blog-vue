<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required | unique:categories',
            'status' => 'required'
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'status' => $request->status
        ]);

        return response('Category Added Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->first();

        return response()->json(['category' => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {

        $category = Category::where('slug', $slug)->firstOrFail();

        $request->validate([
            'name' => 'required | unique:categories,name,' . $category->id,
            'status' => 'required'
        ]);

        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->status = $request->status;
        $category->save();

        return response()->json('Category Updated Successfully!', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        $category = Category::where('slug', $slug)->first();
        $category->delete();

        return response()->json("Category Deleted Successfully!", 200);
    }

    public function remove_selected_category(Request $request)
    {

        $slugs = $request->slugs;

        foreach ($slugs as $slug) {
            $category = Category::where('slug', $slug)->firstOrFail();
            $delete = $category->delete();
            if (!$delete) {
                return response()->json('Error', 204);
            }
        }
        return response()->json("Data Deleted Successfully!", 200);
    }

    public function active_selected_category(Request $request)
    {

        $slugs = $request->slugs;

        foreach ($slugs as $slug) {
            $category = Category::where('slug', $slug)->firstOrFail();
            $category->status = 1;
            $active = $category->save();
            if (!$active) {
                return response()->json('Error', 204);
            }
        }
        return response()->json("All Data Activeted!", 200);
    }
    public function inactive_selected_category(Request $request)
    {

        $slugs = $request->slugs;

        foreach ($slugs as $slug) {
            $category = Category::where('slug', $slug)->firstOrFail();
            $category->status = 0;
            $inactive = $category->save();
            if (!$inactive) {
                return response()->json('Error', 204);
            }
        }
        return response()->json("All Data Deactiveted!", 200);
    }
}
