<template>
    <div>

        <div class="blog-post  wow fadeInUp" v-for="post in posts.data">
            <router-link :to="`/s/post/${post.slug}`"><img class="img-responsive"
                                                           :src="`/uploads/post/${post.thumbnail}`"
                                                           alt=""></router-link>
            <h1>
                <router-link :to="`/s/post/${post.slug}`">{{ post.title }}</router-link>
            </h1>
            <span class="author">{{post.user.name}}</span>
            <span class="date-time">{{post.created_at | time}}</span>
            <p v-html="subStrWithHtml(post.content , 200 , '...')"></p>
            <router-link :to="`/s/post/${post.slug}`" class="btn btn-upper btn-primary read-more">read more
            </router-link>
            <br>
        </div>
        <div class="text-center">
            <pagination :data="posts" @pagination-change-page="getPost" :show-disabled="true" :limit="10"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CategoryPost",
        data: () => {
            return {
                posts: {}
            }
        },
        mounted() {
            this.getPost();
            this.pageTitle();
        },
        watch: {
            $route(to , from , next) {
                this.getPost();
                this.pageTitle();
            }
        },
        methods: {
            getPost(page = 1) {
                let this_ = this;
                axios.get("/api/public/post/category/" + this.$route.params.slug + "?page=' + page")
                    .then((response) => {
                        this_.posts = response.data.categoryPost;
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            },
            pageTitle(){
                axios.get("/api/public/category/" + this.$route.params.slug)
                    .then((response) => {
                        document.title = response.data.category.name
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
