<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Manage Categories</h3>
                    <router-link to="/category/manage" class="btn btn-primary float-right">Manage Category</router-link>
                </div>

                <div class="card-body">
                    <form role="form" @submit.prevent="addCategory">
                        <div class="card-body">

                            <div class="form-group row">
                                <label for="name" class="col-md-3">Category</label>
                                <div class="col-md-9">
                                   <select name="category" class='form-control'>


                                        <option value="">Select A Category</option>
                                        <option :value="category.slug" v-for="category in getActiveCategories">{{ category.name }}</option>

                                   </select>
                                    <has-error :form="form" field="title"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-3">Tittle</label>
                                <div class="col-md-9">
                                    <input type="text" v-model="form.title" name="title" class="form-control" id="name"
                                           placeholder="Enter Category Name"
                                           :class="{ 'is-invalid': form.errors.has('title') }">
                                    <has-error :form="form" field="title"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-3">Thumbnail</label>
                                <div class="col-md-9 d-flex justify-content-between">
                                    <div>
                                        <input type="file" name="thumbnail" id="" @change="thumbnailLoad($event)">
                                        <has-error :form="form" field="title"></has-error>
                                    </div>
                                   
                                   <img :src="form.thumbnail" class='w-25' alt="">

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-3">Satus</label>
                                <div class="form-group col-md-9 clearfix">
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="active" name="status" v-model="form.status" value="1">
                                        <label for="active"> Active </label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="inactive" v-model="form.status" value="0" name="status">
                                        <label for="inactive"> Inactive </label>
                                    </div>
                                    <span :class="{ 'is-invalid': form.errors.has('status') }" ></span>
                                    <has-error :form="form" field="status"></has-error>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" :disabled="form.busy" class="btn btn-primary">Add</button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "AddCategory",
        data: function () {
            return {
                form: new Form({
                    title: null,
                    status: 1 ,
                    category: '',
                    thumbnail: '',
                })
            }
        },
        computed: {
            getActiveCategories() {
                return this.$store.getters.getActiveCategories
            }
        },
        mounted() {
            this.$store.dispatch('getActiveCategories')
        },        
        
        methods: {
            addCategory: function () {
                const ThisOrigin = this;
                this.form.post('/api/category')
                    .then(function (response) {

                        Toast.fire({
                            icon: 'success',
                            title: response.data
                        })

                        ThisOrigin.$router.push('/category/manage');
                    })
            },
            thumbnailLoad(event) {
                let file = event.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = e => {
                    this.form.thumbnail = e.target.result;
                }
                fileReader.readAsDataURL(file);
            }
        }
    }
</script>

<style scoped>

</style>
