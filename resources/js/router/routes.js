import Home from "../components/admin/Home";
import ManageCategories from "../components/admin/category/ManageCategories";
import AddCategory from "../components/admin/category/AddCategory";
import EditCategory from "../components/admin/category/EditCategory";
import ManagePosts from "../components/admin/post/ManagePosts";
import AddPost from "../components/admin/post/AddPost";
import EditPost from "../components/admin/post/EditPost";


export const routes = [
    { path: '/home', component: Home },
    { path: '/category/manage', component: ManageCategories },
    { path: '/category/add', component: AddCategory },
    { path: '/category/edit/:slug', component: EditCategory },

    { path: '/post/manage', component: ManagePosts },
    { path: '/post/add', component: AddPost },
    { path: '/post/edit/:slug', component: EditPost },
]