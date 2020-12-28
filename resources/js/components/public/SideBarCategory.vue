<template>
    <div class="sidebar-widget outer-bottom-xs wow fadeInUp">
        <h3 class="section-title">Category</h3>
        <div class="sidebar-widget-body m-t-10">

            <div class="row mt-10" v-for="category in categories">
                <div class="col-md-10">
                    <router-link :to="`/s/category/${category.slug}`">{{ category.name}}</router-link>
                </div>
                <div class="col-md-2">({{ postCount(category.posts) }})</div>
            </div>

        </div><!-- /.sidebar-widget-body -->
    </div>
</template>

<script>
    export default {
        name: "SideBarCategory",
        computed: {
            categories(){
                return this.$store.getters.categories
            }
        },
        mounted() {
            this.$store.dispatch('categories')
        }
        , methods: {
            postCount(category){
                return category.length;
            }
        }
    }
</script>

<style scoped>

</style>
