<template>

    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Manage Categories</h3>
                    <router-link to="/category/add" class="btn btn-primary float-right">Add New</router-link>
                </div>

                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" @click="selectAll" v-model="selectAllData" :disabled="emptyData()" id="selectAll">
                            </th>
                            <th style="width: 10px">#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Created AT</th>
                            <th>Status</th>
                            <th style="width: 150px">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(category , index ) in categories">
                            <td>
                                <input type="checkbox" :value="category.slug" v-model="selected">
                            </td>
                            <td>{{ ++index }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.slug }}</td>
                            <td>{{ category.created_at | time }}</td>
                            <td><span class="badge"
                                      :class="statusColor(category.status)"> {{ statusName(category.status) }}</span>
                            </td>
                            <td>
                                <router-link :to="`/category/edit/${category.slug}`" type="button"
                                             class="btn btn-warning btn-sm">Edit
                                </router-link>
                                <button type="button" class="btn btn-danger btn-sm" @click="remove(category.slug)">
                                    Delete
                                </button>
                            </td>

                        </tr>
                        <tr colspan="7" v-if="!emptyData()">
                            <div class="nav-item dropdown">
                                <button type="button" class="nav-link dropdown-toggle btn btn-primary btn-sm" :disabled="!isSelected" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                                </button>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button @click="removeSelectedCategory"  class="dropdown-item">Remove</button>
                                    <button @click="activeSelectedCategory"  class="dropdown-item">Active</button>
                                    <button @click="inactiveSelectedCategory"  class="dropdown-item">Inactive</button>
                            
                                </div>
                            </div>
                        </tr>
                        <tr v-if="emptyData()">
                            <td colspan="7" class="text-center text-danger">
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
        name: "ManageCategories",
        data:()=> {
            return {
                selected: [],
                isSelected:false,
                selectAllData: false
            }
        },
        computed: {
            categories() {
                return this.$store.getters.getCategories
            }
        },
        mounted() {
            this.$store.dispatch('getCategories');
           
        },
        watch: {
            selected(selected){
                this.isSelected = selected.length > 0;
                this.selectAllData = (selected.length === this.categories.length);
            }
        },        
        methods: {
            statusName: (status) => {
                const data = {0: 'Inactive', 1: 'Active'}
                return data[status];
            },
            statusColor: (status) => {
                const data = {0: 'bg-danger', 1: 'bg-success'}
                return data[status];
            },
            remove(slug) {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "All related post with this categories will also delete!. You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.delete("/api/category/" + slug)
                            .then((response) => {
                                this.$store.dispatch('getCategories');

                                Swal.fire(
                                    'Deleted!',
                                    response.data,
                                    'success'
                                )
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                })

            },
            emptyData() {
                return this.categories.length < 1;
            } ,

            selectAll(){
                
                if(event.target.checked === false ) {
                    this.selected = [];
                }else{
                    this.categories.forEach(category => {
                        this.selected.push(category.slug)
                    });
                }
            },

            removeSelectedCategory(){
                let slugs = this.selected;
                let this_ = this;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "All related post with this categories will also delete!. You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post("/api/remove-selected-category" , {'slugs': slugs})
                            .then((response) => {
                                this.$store.dispatch('getCategories');
                                
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
                    }
                })


               
            } ,
            activeSelectedCategory(){
                let slugs = this.selected;
                let this_ = this;
                axios.post("/api/active-selected-category" , {'slugs': slugs})
                    .then((response) => {
                        this.$store.dispatch('getCategories');
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
            },
            inactiveSelectedCategory(){
                let slugs = this.selected;
                 let this_ = this;
                axios.post("/api/inactive-selected-category" , {'slugs': slugs})
                    .then((response) => {
                        this.$store.dispatch('getCategories');
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
            }

        }
    }
</script>

<style scoped>

</style>
