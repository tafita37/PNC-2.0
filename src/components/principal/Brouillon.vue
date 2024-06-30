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

var entityList = reactive({});

var profilList = reactive({});

const isModalVisible = ref(false);

var nbPages = ref(1);

var modifUserValue = reactive({
    id: "",
    id_entite: "",
    id_profil: "",
    titre: "",
    nom_utilisateur: "",
    prenom: "",
    email: ""
});

function closeModal() {
    isModalVisible.value = false;
}

async function getAllUserPaginate() {
    try {
        const token = sessionStorage.getItem("pnc_tokens");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = API_BACK_URL + "/allUser/" + route.params.numPage;
        const response = await axios.get(url, { headers: headers });
        Object.assign(userList, response.data);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

async function getNbPageUser() {
    if (!sessionStorage.getItem("pnc_nb_pages_user")) {
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
    } else {
        nbPages.value = Number(sessionStorage.getItem("pnc_nb_pages_user"));
    }
}

function changePage(pageNum) {
    router.push({ name: 'users', params: { numPage: pageNum } })
}

function modifyUserModal(id) {
    var userModif = userList.datas.find(user => user.id == id);
    modifUserValue.id = userModif.id;
    modifUserValue.id_entite = userModif.id_entite.id;
    modifUserValue.id_profil = userModif.id_profil.id;
    modifUserValue.nom_utilisateur = userModif.nom_utilisateur;
    modifUserValue.prenom = userModif.prenom;
    modifUserValue.email = userModif.email;
    isModalVisible.value = true;
}

async function getAllEntiteFromBase() {
    try {
        const url = API_BACK_URL + "/allEntity";
        const response = await axios.get(url);
        Object.assign(entityList, response.data);
        sessionStorage.setItem("pnc_entites", JSON.stringify(entityList));
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

async function getAllProfilFromBase() {
    try {
        const url = API_BACK_URL + "/allProfil";
        const response = await axios.get(url);
        Object.assign(profilList, response.data);
        sessionStorage.setItem("pnc_profiles", JSON.stringify(profilList));
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

function getAllEntite() {
    if (!sessionStorage.getItem("pnc_entites")) {
        getAllEntiteFromBase();
    } else {
        Object.assign(entityList, JSON.parse(sessionStorage.getItem("pnc_entites")));
    }
}

function getAllProfil() {
    if (!sessionStorage.getItem("pnc_profiles")) {
        getAllProfilFromBase();
    } else {
        Object.assign(profilList, JSON.parse(sessionStorage.getItem("pnc_profiles")));
    }
}

onMounted(() => {
    sessionStorage.removeItem("pnc_entites");
    sessionStorage.removeItem("pnc_profiles");
    getAllUserPaginate();
    getNbPageUser();
    getAllEntite();
    getAllProfil();
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
                        <h2 class="mb-2 page-title">
                            {{ t('userList.titre') }}
                        </h2>
                        <p class="card-text">
                            {{ t('userList.description') }}
                        </p>
                        <div class="row my-4">
                            <div class="col-md-12">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <table class="table datatables" id="dataTable-1">
                                            <thead>
                                                <tr>
                                                    <th v-for="i in NB_COLUMN_USERS_TABLE">
                                                        {{ t('userList.columnHeaders[' + (i - 1) + ']') }}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="user in userList.datas">
                                                    <td>{{ user.email }}</td>
                                                    <td>{{ user.id_profil.nom }}</td>
                                                    <td>{{ user.id_entite.nom }}</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-sm"
                                                            @click="() => modifyUserModal(user.id)">
                                                            <i class="fe fe-edit fe-16"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-danger btn-sm">
                                                            <i class="fe fe-trash-2 fe-16"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <nav aria-label="Table Paging" class="mb-0 text-muted">
                                            <ul class="pagination justify-content-center mb-0">
                                                <li class="page-item" v-if="route.params.numPage != 1">
                                                    <a class="page-link" @click.prevent="() => changePage(i - 1)">
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
                                                    <a class="page-link" @click.prevent="() => changePage(i + 1)">
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
        <div v-if="isModalVisible" class="modal-overlay">
            <div class="model">
                <div class="modal-header">
                    <h3>Modifier l'utilisateur </h3>
                    <button @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="card shadow mb-4">
                            <div class="card-body" @keypress.enter="">
                                <p class="mb-2"><strong>Modifier l'utilisateur {{ modifUserValue.prenom }}</strong></p>
                                <div class="form-group mb-3">
                                    <label for="nom">Nom : </label>
                                    <input class="form-control" id="nom" type="text"
                                        v-model="modifUserValue.nom_utilisateur" />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="prenom">Prenom : </label>
                                    <input class="form-control" id="prenom" type="text"
                                        v-model="modifUserValue.prenom" />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="email">Email : </label>
                                    <input class="form-control" id="email" type="email"
                                        v-model="modifUserValue.email" />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="entite">Entite : </label>
                                    <select v-model="modifUserValue.id_entite" id="entite" class="form-control">
                                        <option v-for="entity in entityList.datas" :value="entity.id">
                                            {{ entity.nom }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="profil">Profil : </label>
                                    <select v-model="modifUserValue.id_profil" id="profil" class="form-control">
                                        <option v-for="profil in profilList.datas" :value="profil.id">
                                            {{ profil.nom }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div>
            </div>
        </div>
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
