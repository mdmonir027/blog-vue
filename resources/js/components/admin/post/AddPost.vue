<template>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Add Posts</h3>
                    <router-link to="/post/manage" class="btn btn-primary float-right">Manage Posts</router-link>
                </div>

                <div class="card-body">
                    <form role="form" @submit.prevent="addPost">
                        <div class="card-body">

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Category</label>
                                <div class="col-md-10">
                                   <select name="category" class='form-control' v-model="form.category" >


                                        <option value="">Select A Category</option>
                                        <option :value="category.slug" v-for="category in getActiveCategories">{{ category.name }}</option>

                                   </select>
                                    <has-error :form="form" field="title"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Tittle</label>
                                <div class="col-md-10">
                                    <input type="text" v-model="form.title" name="title" class="form-control" id="name"
                                           placeholder="Enter Category Name"
                                           :class="{ 'is-invalid': form.errors.has('title') }">
                                    <has-error :form="form" field="title"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Content</label>
                                <div class="col-md-10">
                                    <ckeditor :editor="editor" v-model="form.contentText" :config="editorConfig"  :class="{ 'is-invalid': form.errors.has('contentText') }"></ckeditor>
                                    <has-error :form="form" field="contentText"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Thumbnail</label>
                                <div class="col-md-10 d-flex justify-content-between">
                                    <div>
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" name="thumbnail" id="thumbnailImage" @change="thumbnailLoad($event)">
                                                <label class="custom-file-label" v-html="thumbnailName" for="thumbnailImage"></label>
                                            </div>
                                        </div>
                                        <has-error :form="form" field="title"></has-error>
                                    </div>

                                   <img :src="form.thumbnail" class='w-25' alt="">

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Satus</label>
                                <div class="form-group col-md-10 clearfix">
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

    import ClassEditor from '@ckeditor/ckeditor5-build-classic'
    export default {
        name: "AddCategory",
        data: function () {
            return {
                form: new Form({
                    title: null,
                    status: 1 ,
                    category: '',
                    contentText: null,
                    thumbnail: '',
                }),
                thumbnailName: 'Choose File' ,
                editor: ClassEditor ,
                editorConfig: {}
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
            addPost: function () {
                const ThisOrigin = this;
                this.form.post('/api/post')
                    .then(function (response) {

                        console.log(response);
                        // Toast.fire({
                        //     icon: 'success',
                        //     title: response.data
                        // })

                        // ThisOrigin.$router.push('/post/manage');
                    })
            },
            thumbnailLoad(event) {
                let file = event.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = e => {
                    this.form.thumbnail = e.target.result;
                }
                fileReader.readAsDataURL(file);
                this.thumbnailName = file.name;
            }
        }
    }
</script>

<style scoped>

</style>
