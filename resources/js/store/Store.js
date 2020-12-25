export default {
    state: {
        getPosts: [],
        getCategories: []
    },
    getters:{
        getCategories(state){
            return state.getCategories;
        },
        getPosts(state){
            return state.getPosts;
        }
    },
    actions:{
        getCategories(data){
            axios.get("/api/category ")
                .then((response)=>{
                    data.commit('getCategories' , response.data.categories)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        getPosts(data){
            axios.get("/api/post")
                .then((response)=>{
                    data.commit('getPosts' , response.data.posts)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    },
    mutations:{
        getCategories(state , data){
            return state.getCategories = data;
        },
        getPosts(state , data){
            return state.getPosts = data;
        }
    }
}
