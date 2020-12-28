<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Manage Categories</h3>
                    <router-link to="/admin/category/manage" class="btn btn-primary float-right">Manage Category</router-link>
                </div>

                <div class="card-body">
                    <form role="form" @submit.prevent="categoryUpdate">
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="name" class="col-md-3">Category Name</label>
                                <div class="col-md-9">
                                    <input type="text" v-model="form.name" class="form-control col-md-9" id="name"
                                           placeholder="Enter Category Name"
                                           :class="{ 'is-invalid': form.errors.has('name') }">
                                    <has-error :form="form" field="name"></has-error>

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
                                    <span :class="{ 'is-invalid': form.errors.has('status') }"></span>
                                    <has-error :form="form" field="status"></has-error>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" :disabled="form.busy" class="btn btn-primary">Update</button>
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
        name: "EditCategory",
        data: function () {
            return {
                form: new Form({
                    name: null,
                    status: null
                })
            }
        },
        methods: {
            category() {
                let this_ = this;
                axios.get("/api/category/" + this.$route.params.slug)
                    .then((response) => {
                        this_.form.fill(response.data.category)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            categoryUpdate() {
                let this_ = this;
                const data = {
                    name: this.form.name,
                    status: this.form.status
                };
                let slug = this.$route.params.slug;
                axios.put("/api/category/" + slug , data)
                    .then((response) => {
                        Toast.fire({
                            icon: 'success',
                            title: response.data
                        })
                        this_.$router.push('/admin/category/manage');
                    })
            }
        },
        mounted() {
            this.category();
        }

    }
</script>

<style scoped>

</style>
