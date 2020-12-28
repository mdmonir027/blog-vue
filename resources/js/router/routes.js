import Home from "../components/admin/Home";
import ManageCategories from "../components/admin/category/ManageCategories";
import AddCategory from "../components/admin/category/AddCategory";
import EditCategory from "../components/admin/category/EditCategory";
import ManagePosts from "../components/admin/post/ManagePosts";
import AddPost from "../components/admin/post/AddPost";
import EditPost from "../components/admin/post/EditPost";


export const routes = [
    { path: '/admin/home', component: Home , meta:  {title: 'Dashboard'} },
    { path: '/admin/category/manage', component: ManageCategories , meta: {title: 'Manage Categories' }},
    { path: '/admin/category/add', component: AddCategory , meta: {title: 'Add Category'} },
    { path: '/admin/category/edit/:slug', component: EditCategory , meta: {title: 'Update Category'} },
    { path: '/admin/post/manage', component: ManagePosts , meta: {title: 'Manage Posts'} },
    { path: '/admin/post/add', component: AddPost , meta: {title: 'Add Post'} },
    { path: '/admin/post/edit/:slug', component: EditPost , meta: {title: 'Update Post'} },
]
