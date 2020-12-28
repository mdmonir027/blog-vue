<template>

    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Manage Posts</h3>
                    <router-link to="/admin/post/add" class="btn btn-primary float-right">Add New</router-link>
                </div>

                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" @click="selectAll" v-model="selectAllData" :disabled="emptyData()" id="selectAll">
                            </th>
                            <th style="width: 10px">#</th>
                            <th>Title</th>
                            <th>Category</th>
                             <th>Thumbnail</th>
                            <th>Created By</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th style="width: 150px">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(post , index ) in posts">
                            <td>
                                <input type="checkbox" :value="post.slug" v-model="selected">
                            </td>
                            <td>{{ ++index }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.category.name}}</td>
                             <td><img width="100px" :src="fileLink(post.thumbnail)" alt=""></td>
                            <td>{{ post.user.name }}</td>
                            <td>{{ post.created_at | time }}</td>

                            <td><span class="badge" :class="statusColor(post.status)"> {{ post.status | firstUpperCase }}</span>
                            </td>
                            <td>
                                <router-link :to="`/admin/post/edit/${post.slug}`" type="button" class="btn btn-warning btn-sm">Edit</router-link>
                                <button type="button" class="btn btn-danger btn-sm" @click="remove(post.slug)">
                                    Delete
                                </button>
                            </td>

                        </tr>
                        <tr colspan="8" v-if="!emptyData()">
                            <div class="nav-item dropdown">
                                <button type="button" class="nav-link dropdown-toggle btn btn-primary btn-sm" :disabled="!isSelected" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                                </button>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button @click="removeSelectedPosts"  class="dropdown-item">Remove</button>
                                    <button @click="publishSelectedPosts"  class="dropdown-item">Publish</button>
                                    <button @click="draftSelectedPosts"  class="dropdown-item">Draft</button>

                                </div>
                            </div>
                        </tr>
                        <tr v-if="emptyData()">
                            <td colspan="8" class="text-center text-danger">
                                <h3>No Data Available</h3>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ManagePosts",
        data:()=> {
            return {
                selected: [],
                isSelected:false,
                selectAllData: false
            }
        },
        computed: {
            posts() {
                return this.$store.getters.getPosts
            }
        },
        mounted() {
            this.$store.dispatch('getPosts')
        },
        watch: {
            selected(selected){
                this.isSelected = selected.length > 0;
                this.selectAllData = (selected.length === this.posts.length);
            }
        },
        methods: {
            statusName: (status) => {
                const data = {draft: 'Inactive', 1: 'Active'}
                return data[status];
            },
            statusColor: (status) => {
                const data = {draft: 'bg-danger', published: 'bg-success'}
                return data[status];
            },
            remove(slug) {
                 this.swalDelete(()=>{

                    axios.delete("/api/post/" + slug)
                        .then((response) => {
                            this.$store.dispatch('getPosts');

                            Swal.fire(
                                'Deleted!',
                                response.data,
                                'success'
                            )
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                });

            },
            emptyData() {
                return this.posts.length < 1;
            },
            selectAll(){

                if(event.target.checked === false ) {
                    this.selected = [];
                }else{
                    this.posts.forEach(post => {
                        this.selected.push(post.slug)
                    });
                }
            },
            removeSelectedPosts(){
                let slugs = this.selected;
                let this_ = this;
                 this.swalDelete(()=>{
                    axios.post("/api/remove-selected-post" , {'slugs': slugs})
                        .then((response) => {
                            this.$store.dispatch('getPosts');
                            this_.selectAllData = false;
                            this_.selected = [];
                            Swal.fire(
                                'Deleted!',
                                response.data,
                                'success'
                            )
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                });

            } ,
            publishSelectedPosts(){
                let slugs = this.selected;
                let this_ = this;
                axios.post("/api/publish-selected-post" , {'slugs': slugs})
                    .then((response) => {
                        this.$store.dispatch('getPosts');
                          this_.selected = [];
                        Swal.fire(
                            'Published!',
                            response.data,
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            draftSelectedPosts(){
                let slugs = this.selected;
                 let this_ = this;
                axios.post("/api/draft-selected-post" , {'slugs': slugs})
                    .then((response) => {
                        this.$store.dispatch('getPosts');
                        this_.selected = [];
                        Swal.fire(
                            'Drafted!',
                            response.data,
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            fileLink: (name)=>{
                return '/uploads/post/' + name;
            }
        }
    }
</script>

<style scoped>

</style>
