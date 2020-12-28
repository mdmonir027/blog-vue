export default {
    state: {
        posts: [],
        categories: [],
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        posts(state) {
            return state.posts;
        },
    },
    actions: {
        categories(data) {
            axios.get("/api/public/categories ")
                .then((response) => {
                    data.commit('categories', response.data.categories)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        posts(data) {
            axios.get("/api/public/posts")
                .then((response) => {
                    data.commit('posts', response.data.posts)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    mutations: {
        categories(state, data) {
            return state.categories = data;
        },
        posts(state, data) {
            return state.posts = data;
        }
    }
}
