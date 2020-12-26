<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Add Category </h3>
                    <router-link to="/category/manage" class="btn btn-primary float-right">Manage Categories</router-link>
                </div>

                <div class="card-body">
                    <form role="form" @submit.prevent="addPost">
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
                    name: null,
                    status: 1
                })
            }
        },
        methods: {
            addPost: function () {
                const ThisOrigin = this;
                this.form.post('/api/category')
                    .then(function (response) {

                        Toast.fire({
                            icon: 'success',
                            title: response.data
                        })

                        ThisOrigin.$router.push('/category/manage');
                    })
            }
        }
    }
</script>

<style scoped>

</style>
