const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// // mixin for admin panel
// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');
//
//
// // mixin for frontend
// mix.scripts([
//     'resources/sass/public/js/jquery-1.11.1.min.js',
//     'resources/sass/public/js/bootstrap.min.js',
//     'resources/sass/public/js/echo.min.js',
//     'resources/sass/public/js/bootstrap-hover-dropdown.min.js',
//     'resources/sass/public/js/scripts.js',
// ],  'public/js/public.js')
//     .styles([
//         "resources/sass/public/css/bootstrap.min.css",
//         "resources/sass/public/css/main.css",
//         "resources/sass/public/css/blue.css",
//         "resources/sass/public/css/font-awesome.css",
//     ], "public/css/public.css")

mix.js('resources/js/public.js', 'public/js/fronted.js')
