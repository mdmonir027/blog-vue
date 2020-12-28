<template>

    <div class="body-content ">

        <div class="container">
            <div class="row">
                <div class="blog-page">
                    <div class="col-md-9">

                        <router-view></router-view>
                    </div>
                    <div class="col-md-3 sidebar">


                        <div class="sidebar-module-container">


                            <!-- ==============================================CATEGORY============================================== -->
                            <SideBarCategory></SideBarCategory>
                            <!-- /.sidebar-widget -->
                            <!-- ============================================== CATEGORY : END ============================================== -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ============================================================= FOOTER ============================================================= -->
        <PublicFooter></PublicFooter>
        <!-- ============================================================= FOOTER : END============================================================= -->
    </div>
</template>

<script>

    import PublicFooter from "./PublicFooter";
    import SideBarCategory from "./SideBarCategory";

    export default {
        name: "Layouts",
        components: {
            SideBarCategory,
            PublicFooter,
            SideBarCategory
        }
    }
</script>

<style scoped>

</style>
