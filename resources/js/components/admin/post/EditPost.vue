<template>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <h3 class="float-left">Edit Posts</h3>
                    <router-link to="/admin/post/manage" class="btn btn-primary float-right">Manage Posts</router-link>
                </div>

                <div class="card-body">
                    <form role="form" @submit.prevent="updatePost">
                        <div class="card-body">

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Category</label>
                                <div class="col-md-10">
                                    <select name="category" class='form-control' v-model="form.category"
                                            :class="{ 'is-invalid': form.errors.has('category') }">


                                        <option value="">Select A Category</option>
                                        <option :value="category.slug" v-for="category in getCategories">{{
                                            category.name }}
                                        </option>

                                    </select>
                                    <has-error :form="form" field="category"></has-error>

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
                                    <ckeditor :editor="editor" v-model="form.contentText" :config="editorConfig"
                                              :class="{ 'is-invalid': form.errors.has('contentText') }"></ckeditor>
                                    <has-error :form="form" field="contentText"></has-error>

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Thumbnail</label>
                                <div class="col-md-10 d-flex justify-content-between">
                                    <div>
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" name="thumbnail"
                                                       id="thumbnailImage" @change="thumbnailLoad($event)"
                                                       :class="{ 'is-invalid': form.errors.has('thumbnail') }">
                                                <label class="custom-file-label" v-html="thumbnailName"
                                                       for="thumbnailImage"
                                                       :class="{ 'is-invalid': form.errors.has('thumbnail') }"></label>
                                                <has-error :form="form" field="thumbnail"></has-error>
                                            </div>
                                        </div>

                                    </div>

                                    <img :src="form.thumbnail" class='w-25' alt="">

                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-md-2">Satus</label>
                                <div class="form-group col-md-10 clearfix">
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="active" name="status" v-model="form.status" value="1">
                                        <label for="active"> Published </label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="inactive" v-model="form.status" value="0" name="status">
                                        <label for="inactive"> Draft </label>
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

    import ClassEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        name: "EditPost",
        data: function () {
            return {
                form: new Form({
                    title: null,
                    status: 1,
                    category: '',
                    contentText: null,
                    thumbnail: '',
                }),
                thumbnailName: 'Choose File',
                editor: ClassEditor,
                editorConfig: {}
            }
        },
        computed: {
            getCategories() {
                return this.$store.getters.getCategories
            }
        },
        mounted() {
            this.$store.dispatch('getCategories');
            this.post()

        },
        methods: {
            updatePost: function () {
                const this_ = this;
                axios.put('/api/post/' + this_.$route.params.slug, this_.form)
                    .then(function (response) {

                        Toast.fire({
                            icon: 'success',
                            title: response.data
                        })
                        this_.$router.push('/admin/post/manage');
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            post() {
                let this_ = this;
                axios.get("/api/post/" + this.$route.params.slug)
                    .then((response) => {
                        let post = response.data.post;
                        let status = post.status === 'published' ? 1 : 0;
                        const data = {
                            title: post.title,
                            status: status,
                            category: post.category.slug,
                            contentText: post.content,
                            thumbnail: this_.postImageUrl(post.thumbnail)
                        }
                        // this_.form.fill(post);
                        this_.form.fill(data);
                    })
                    .catch((error) => {

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
            },
            postImageUrl(name) {
                return '/uploads/post/' + name;
            }
        }
    }
</script>

<style scoped>

</style>
