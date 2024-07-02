<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route=useRoute();

    var nbPages = ref(1);
</script>
<template>
    <nav aria-label="Table Paging" class="mb-0 text-muted">
        <ul class="pagination justify-content-center mb-0">
            <li class="page-item" v-if="route.params.numPage != 1">
                <a class="page-link" @click.prevent="() => changePage(route.params.numPage - 1)">
                    Previous
                </a>
            </li>
            <span v-for="i in nbPages">
                <li class="page-item active" v-if="i == route.params.numPage">
                    <a class="page-link" @click.prevent="() => changePage(i)">
                        {{ i }}
                    </a>
                </li>
                <li class="page-item" v-else>
                    <a class="page-link" @click.prevent="() => changePage(i)">
                        {{ i }}
                    </a>
                </li>
            </span>
            <li class="page-item" v-if="nbPages != route.params.numPage">
                <a class="page-link" @click.prevent="() => changePage(route.params.numPage + 1)">
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>
<style>
    
</style>