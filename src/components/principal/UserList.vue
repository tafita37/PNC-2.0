<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import BeginComponent from '../reusable/BeginComponent.vue';
import { API_BACK_URL, NB_COLUMN_USERS_TABLE } from '@/Constantes';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import router from '@/router';

const { t, locale } = useI18n();

const route = useRoute();

var userList = reactive({});

var nbPages = ref(1);

async function getAllUserPaginateFromBdd() {
    try {
        const token = sessionStorage.getItem("pnc_tokens");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = API_BACK_URL + "/allUser/" + route.params.numPage;
        const response = await axios.get(url, { headers: headers });
        Object.assign(userList, response.data);
        sessionStorage.setItem("pnc_user_paginate", JSON.stringify(userList));
        sessionStorage.setItem("pnc_user_page_number", route.params.numPage);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

async function getAllUserPaginate() {
    if (!sessionStorage.getItem("pnc_user_paginate") || sessionStorage.getItem("pnc_user_page_number") != route.params.numPage) {
        getAllUserPaginateFromBdd();
    } else {
        Object.assign(userList, JSON.parse(sessionStorage.getItem("pnc_user_paginate")));
    }
}

async function getNbPageUserFromBdd() {
    try {
        const token = sessionStorage.getItem("pnc_tokens");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = API_BACK_URL + "/nbPageUser";
        const response = await axios.get(url, { headers: headers });
        nbPages.value = response.data.datas.nbPages;
        sessionStorage.setItem("pnc_nb_pages_user", nbPages.value);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

async function getNbPageUser() {
    if (!sessionStorage.getItem("pnc_nb_pages_user")) {
        getNbPageUserFromBdd();
    } else {
        nbPages.value = Number(sessionStorage.getItem("pnc_nb_pages_user"));
    }
}

function changePage(pageNum) {
    console.log(pageNum);
    router.push({ name: 'users', params: { numPage: pageNum } })
}

function refreshData() {
    getAllUserPaginateFromBdd();
    getNbPageUserFromBdd();
}

onMounted(() => {
    getAllUserPaginate();
    getNbPageUser();
    console.log(userList);
});

watch(() => route.params.numPage, () => {
    getAllUserPaginate();
});
</script>

<template>
    <div class="wrapper">
        <BeginComponent />
        <main role="main" class="main-content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-4">
                                <h2 class="mb-2 page-title">
                                    {{ t('userList.titre') }}
                                </h2>
                                <p class="card-text">
                                    {{ t('userList.description') }}
                                </p>
                            </div>
                            <div class="col-md-8 d-flex justify-content-end align-items-center" style="cursor: pointer;"
                                @click="() => refreshData()">
                                <i class="fe fe-refresh-ccw fe-16"></i>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="col-md-12">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <table class="table datatables" id="dataTable-1">
                                            <thead>
                                                <tr>
                                                    <th v-for="i in NB_COLUMN_USERS_TABLE" :key="i">
                                                        {{ t('userList.columnHeaders[' + (i - 1) + ']') }}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(user, index) in userList.datas" :key="index">
                                                    <td>{{ index+1 }}</td>
                                                    <td>{{ user.ema }}</td>
                                                    <td>{{ user.pro.nom }}</td>
                                                    <td>{{ user.ent.nom }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <nav aria-label="Table Paging" class="mb-0 text-muted">
                                            <ul class="pagination justify-content-center mb-0">
                                                <li class="page-item" v-if="route.params.numPage != 1">
                                                    <a class="page-link" @click.prevent="() => changePage(route.params.numPage - 1)">
                                                        Previous
                                                    </a>
                                                </li>
                                                <span v-for="i in nbPages" :key="i">
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
                                        <!-- Modal -->
                                    </div>
                                </div>
                            </div> <!-- simple table -->
                        </div> <!-- end section -->
                    </div> <!-- .col-12 -->
                </div> <!-- .row -->
            </div> <!-- .container-fluid -->
        </main>
    </div>
</template>

<style scoped>
button {
    cursor: pointer;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background: rgba(0, 0, 0, 0.5); */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
}

.model {
    /* background: white; */
    background-color: #595e63;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    text-align: right;
}

.page-link {
    cursor: pointer;
}
</style>
