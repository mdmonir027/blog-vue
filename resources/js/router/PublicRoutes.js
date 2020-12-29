import Home from "../components/public/Home";
import Post from "../components/public/Post";
import CategoryPost from "../components/public/CategoryPost";
import SearchedPost from "../components/public/SearchedPost";

export const routes = [

    {path: '/' , component: Home , meta:{ title: 'Home' }},
    {path: '/s/post/:slug' , component: Post },
    {path: '/s/category/:slug' , component: CategoryPost},
    {path: '/s/search/:keyword' , component: SearchedPost},

];
