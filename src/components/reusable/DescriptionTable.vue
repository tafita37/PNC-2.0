<script setup>
    const props=defineProps({
        titleTable : {
            type : String
        },
        descriptionTable : {
            type : String
        },
        refreshFunction : {
            type : Function
        }
    });
</script>
<template>
    <div class="row">
        <div class="col-md-4">
            <h2 class="mb-2 page-title">
                {{props.titleTable}}
            </h2>
            <p class="card-text">
                {{ props.descriptionTable }}
            </p>
        </div>
        <div 
            class="col-md-8 d-flex justify-content-end align-items-center" 
            style="cursor: pointer;" 
            @click="() => props.refreshFunction()"
        >
            <i class="fe fe-refresh-ccw fe-16"></i>
        </div>
    </div>
</template>
<style scoped>
    
</style>