<template>
    <div>{{userObject}}</div>
</template>

<script>
import router from '@/router';


export default {
    name: 'Favorites',
    props: {},
    data: () => ({}),
    methods: {},
    computed: {
        userObject(){
            const value = this.$store.state.userData.user
        ? this.$store.state.userData.user.name
        : "";

      return value;
        }
    }
}
</script>
