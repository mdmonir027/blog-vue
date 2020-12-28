<template>

    <div>
        <div class="blog-post wow fadeInUp ">
            <img class="img-responsive" :src="`/uploads/post/${post.thumbnail}`" alt="">
            <h1>{{ post.title}}</h1>

            <span class="author" v-if="post.user">{{ post.user.name }}</span>
            <span class="date-time">{{ post.created_at | time}}</span>
            <div v-html="post.content"></div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "Post",
        data: () => {
            return {
                post: {}
            }
        },
        methods: {
            getPost() {
                let this_ = this
                axios.get('/api/public/post/' + this.$route.params.slug)
                    .then((response) => {
                        this_.post = response.data.post
                    })
                    .catch((error) => {

                    })
            },
            title() {

                axios.get('/api/public/post/' + this.$route.params.slug)
                    .then((response) => {
                        document.title = response.data.post.title
                    })
                    .catch((error) => {

                    })


            }
        },
        mounted() {
            this.getPost();
            this.title();
        },
        watch: {
            $route() {
                this.title();
            }
        }

    }
</script>

<style scoped>

</style>
