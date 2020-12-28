<template>

    <div>

        <div class="blog-post  wow fadeInUp" v-for="post in posts.data">
            <router-link :to="`s/post/${post.slug}`"><img class="img-responsive"
                                                          :src="`/uploads/post/${post.thumbnail}`"
                                                          alt=""></router-link>
            <h1>
                <router-link :to="`s/post/${post.slug}`">{{ post.title }}</router-link>
            </h1>
            <span class="author">{{post.user.name}}</span>
            <span class="date-time">{{post.created_at | time}}</span>
            <p v-html="subStrWithHtml(post.content , 200 , '...')"></p>
            <router-link :to="`s/post/${post.slug}`" class="btn btn-upper btn-primary read-more">read more</router-link>
            <br>
        </div>


        <pagination :data="posts" @pagination-change-page="getPosts" :show-disabled="true" :align="center" :limit="10"/>


    </div>

</template>

<script>
    export default {
        name: "Home",
        data: () => {
            return {
                posts: {},
                center: 'center'
            }
        },
        mounted() {
            this.getPosts();
            this.pageTitle();
        },

        methods: {
            // Our method to GET results from a Laravel endpoint
            getPosts(page = 1) {
                let this_ = this
                axios.get('/api/public/posts?page=' + page)
                    .then(response => {
                        this_.posts = response.data.posts;
                    });
            },
            pageTitle (){
                document.title = 'Home'
            }
        }
    }
</script>

<style scoped>

</style>
