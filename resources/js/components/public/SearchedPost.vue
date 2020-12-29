<template>
    <div>
        <div class="alert alert-danger" v-if="posts.data.length < 1">
            <h3>'{{ this.$route.params.keyword }}' no post found with this keyword!</h3>
        </div>

        <div class="alert alert-success" v-if="posts.data.length > 0">
            <h3>We have found this posts!</h3>
        </div>
        <div class="blog-post  wow fadeInUp" v-for="post in posts.data">
            <router-link :to="`s/post/${post.slug}`"><img class="img-responsive"
                                                          :src="`/uploads/post/${post.thumbnail}`"
                                                          alt=""></router-link>
            <h1>
                <router-link :to="`s/post/${post.slug}`">{{ post.title }}</router-link>
            </h1>
            <span v-if="post.user" class="author">{{post.user.name}}</span>
            <span class="date-time">{{post.created_at | time}}</span>
            <p v-html="subStrWithHtml(post.content , 200 , '...')"></p>
            <router-link :to="`s/post/${post.slug}`" class="btn btn-upper btn-primary read-more">read more</router-link>
            <br>
        </div>
        <div class="text-center">
            <pagination :data="posts" @pagination-change-page="getSearchedPost" :show-disabled="true" :limit="10"/>
        </div>


    </div>
</template>

<script>
    export default {
        name: "SearchedPost",
        data: () => {
            return {
                posts: {}
            }
        },
        watch: {
            $route() {
                this.getSearchedPost();
            }
        },
        methods: {
            getSearchedPost(page = 1) {
                let this_ = this;
                axios.get("/api/public/posts/search/" + this.$route.params.keyword + '?page=' + page)
                    .then((response) => {

                        this_.posts = response.data.posts
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getSearchedPost();
        }
    }
</script>

<style scoped>

</style>
