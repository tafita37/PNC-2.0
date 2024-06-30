<script setup>
import Header from './../reusable/Header.vue'
import DropDownMenuLeft from './../reusable/DropDownMenuLeft.vue'
import HeaderBegin from './../reusable/HeaderBegin.vue'
import { isTokenExpired } from '@/Constantes';
import { onMounted } from 'vue';

var ouvert = true;

// function collapse() {
//     if ($(".vertical").hasClass("narrow")) {
//         $(".vertical").toggleClass("open")
//         console.log("here");
//     }
//     else {
//         $(".vertical").toggleClass("collapsed"),
//         $(".vertical").hasClass("hover") && $(".vertical").removeClass("hover");
//         console.log($(".vertical"));
//     }
//     ouvert = !ouvert;
//     console.log(ouvert);
// }

function collapse() {
    var vertical = document.querySelector(".vertical");

    if (vertical.classList.contains("narrow")) {
        vertical.classList.toggle("open");
        console.log("here");
    } else {
        vertical.classList.toggle("collapsed");
        if (vertical.classList.contains("hover")) {
            vertical.classList.remove("hover");
        }
        console.log(vertical);
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

onMounted(() => {
    console.log(isTokenExpired());
})
</script>
<template>
    <HeaderBegin :collapse-function="collapse" v-if="isTokenExpired() == true" />
    <Header :collapse-function="collapse" v-else />
    <DropDownMenuLeft :collapse-over-function="collapseOver" v-if="isTokenExpired() == false" />
</template>
<style scoped></style>