import Home from "../components/public/Home";
import Post from "../components/public/Post";
import CategoryPost from "../components/public/CategoryPost";

export const routes = [

    {path: '/' , component: Home , meta:{ title: 'Home' }},
    {path: '/s/post/:slug' , component: Post },
    {path: '/s/category/:slug' , component: CategoryPost},

];
