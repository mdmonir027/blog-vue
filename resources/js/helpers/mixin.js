import vue from 'vue';

window.Vue = vue;

Vue.mixin({
    methods: {
        swalDelete: function(callback) {

            Swal.fire({
                title: 'Are you sure?',
                text: "All related post with this categories will also delete!. You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) callback();
            })

        },
        subStrWithHtml: function (text, length, s) {
            return text.substring(0, length) + s;
        }
    }
})
