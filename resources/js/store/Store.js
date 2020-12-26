export default {
    state: {
        getPosts: [],
        getCategories: [],
        getActiveCategories: []
    },
    getters: {
        getCategories(state) {
            return state.getCategories;
        },
        getActiveCategories(state) {
            return state.getActiveCategories;
        },
        getPosts(state) {
            return state.getPosts;
        }
    },
    actions: {
        getCategories(data) {
            axios.get("/api/category ")
                .then((response) => {
                    data.commit('getCategories', response.data.categories)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getActiveCategories(data) {
            axios.get("/api/active/category ")
                .then((response) => {
                    data.commit('getActiveCategories', response.data.categories)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getPosts(data) {
            axios.get("/api/post")
                .then((response) => {
                    data.commit('getPosts', response.data.posts)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    mutations: {
        getCategories(state, data) {
            return state.getCategories = data;
        },
        getActiveCategories(state, data) {
            return state.getActiveCategories = data;
        },
        getPosts(state, data) {
            return state.getPosts = data;
        }
    }
}