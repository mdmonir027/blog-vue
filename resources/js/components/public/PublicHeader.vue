<template>


    <header class="header-style-1">

        <!-- ============================================== TOP MENU : END ============================================== -->
        <div class="main-header">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-3 logo-holder">
                        <!-- ============================================================= LOGO ============================================================= -->
                        <div class="logo">
                            <router-link to="/">

                                <img src="/assets/public/images/logo.png" alt="">

                            </router-link>
                        </div><!-- /.logo -->
                        <!-- ============================================================= LOGO : END ============================================================= -->
                    </div><!-- /.logo-holder -->

                    <div class="col-xs-12 col-sm-12 col-md-7 top-search-holder">
                        <!-- /.contact-row -->
                        <!-- ============================================================= SEARCH AREA ============================================================= -->
                        <SearchForm></SearchForm>
                        <!-- /.search-area -->
                        <!-- ============================================================= SEARCH AREA : END ============================================================= -->
                    </div><!-- /.top-search-holder -->

                </div><!-- /.row -->

            </div><!-- /.container -->

        </div><!-- /.main-header -->

        <!-- ============================================== NAVBAR ============================================== -->
        <div class="header-nav animate-dropdown">
            <div class="container">
                <div class="yamm navbar navbar-default" role="navigation">
                    <div class="navbar-header">
                        <button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse"
                                class="navbar-toggle collapsed" type="button">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="nav-bg-class">
                        <div class="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                            <div class="nav-outer">
                                <ul class="nav navbar-nav">
                                    <li class="dropdown yamm-fw active" >
                                        <router-link to="/"  data-hover="dropdown" class="dropdown-toggle"
                                           data-toggle="dropdown">Home</router-link>

                                    </li>
                                    <li class="dropdown yamm-fw" v-for="category in categories">
                                        <router-link :to="`/s/category/${category.slug}`" data-hover="dropdown" class="dropdown-toggle"
                                           data-toggle="dropdown">{{ category.name }}</router-link>

                                    </li>
                                </ul><!-- /.navbar-nav -->
                                <div class="clearfix"></div>
                            </div><!-- /.nav-outer -->
                        </div><!-- /.navbar-collapse -->


                    </div><!-- /.nav-bg-class -->
                </div><!-- /.navbar-default -->
            </div><!-- /.container-class -->

        </div><!-- /.header-nav -->
        <!-- ============================================== NAVBAR : END ============================================== -->

    </header>

</template>

<script>
    import SearchForm from "./SearchForm";

    export default {
        name: "PublicHeader",
        components: {SearchForm},
        computed: {
            categories(){
                return this.$store.getters.categories
            }
        },
        watch:{
            $route(){
                this.$store.dispatch('categories')
            }
        },
        mounted() {
            this.$store.dispatch('categories')
        }
    }
</script>

<style scoped>

</style>
