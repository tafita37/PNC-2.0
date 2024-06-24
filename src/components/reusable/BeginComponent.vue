<script setup>
    import Header from './../reusable/Header.vue'
    import DropDownMenuLeft from './../reusable/DropDownMenuLeft.vue'
    import HeaderBegin from './../reusable/HeaderBegin.vue'
    import { reactive } from 'vue';

    var visiblePage = reactive([]);

    var ouvert=true;


    function collapse() {
        if ($(".vertical").hasClass("narrow")) {
            $(".vertical").toggleClass("open")
            console.log("here");
        }
        else {
            $(".vertical").toggleClass("collapsed"),
            $(".vertical").hasClass("hover") && $(".vertical").removeClass("hover");
            console.log($(".vertical"));
        }
        ouvert = !ouvert;
        console.log(ouvert);
    }

    function collapseOver() {
        console.log(ouvert);
        if (ouvert == false) {
            collapse();
        }
    }
</script>
<template>
    <HeaderBegin :collapse-function="collapse" v-if="visiblePage.length == 0" />
    <Header :collapse-function="collapse" v-else />
    <DropDownMenuLeft :collapse-over-function="collapseOver" v-if="visiblePage.length != 0" />
</template>
<style scoped>
    
</style>