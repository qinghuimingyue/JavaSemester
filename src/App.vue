<template>
    <div id="app">
        <Navbar />
        <Header />
        <router-view />
    </div>
</template>

<script>
    import Navbar from './components/NavBar.vue';
    import Header from './components/AppHeader.vue';

    export default {
    name: 'App',
    components: {
    Navbar,
    Header
}
};
</script>

<style>
    /* App-wide styles can go here, if needed */
    #app {
    font-family: 'Arial', sans-serif;
}
</style>
