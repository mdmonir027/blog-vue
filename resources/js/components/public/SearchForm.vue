<template>
    <div class="search-area">
        <form @submit.prevent="submit">
            <div class="control-group">

                <input class="search-field is-invalid" v-model="searchData" placeholder="Search here..."/>

                <button type="submit" class="search-button"></button>

            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SearchForm",
        data: () => {
            return {
                searchData: ''
            }
        },
        methods: {
            submit() {
                if (this.searchData === '') {
                    this.$router.push('/');
                }else {
                    this.$router.push('/s/search/' + this.searchData);
                }
            }
        }
    }
</script>

<style scoped>

    .search-area {
        width: 100% !important;
    }

    .search-field {
        width: 90% !important;
        outline: none;
    }
</style>
