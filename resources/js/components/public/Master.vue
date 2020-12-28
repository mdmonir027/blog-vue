<template>
    <div>

        <public-header></public-header>
        <!--  content Layouts With footer      -->
        <ContentLayouts></ContentLayouts>

    </div>
</template>

<script>
    import PublicHeader from "./PublicHeader";
    import ContentLayouts from "./ContentLayouts";

    export default {
        name: "Master",
        components: {
            PublicHeader,
            ContentLayouts
        }
    }
</script>

<style scoped>

</style>
