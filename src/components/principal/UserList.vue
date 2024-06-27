<script setup>
import { onMounted, reactive, ref } from 'vue';
import BeginComponent from '../reusable/BeginComponent.vue';
import { API_BACK_URL, NB_COLUMN_USERS_TABLE } from '@/Constantes';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

var userList = reactive({});

const isModalVisible = ref(false);

function modifEntityModal() {
    isModalVisible.value = true;
}

function closeModal() {
    isModalVisible.value = false;
}

async function getAllUserPaginate() {
    try {
        const token = sessionStorage.getItem("pnc_tokens");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = API_BACK_URL + "/allUser/1";
        const response = await axios.get(url, {headers : headers}); // Attendre la réponse de l'API
        Object.assign(userList, response.data);
        sessionStorage.setItem("entite_pnc", JSON.stringify(userList));
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

onMounted(() => {
    if (!sessionStorage.getItem("entite_pnc")) {
        getAllUserPaginate();
    } else {
        Object.assign(userList, JSON.parse(sessionStorage.getItem("entite_pnc")));
    }
})
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
                                                    <!-- <th>Profil</th>
                                                    <th>Titre ou fonction</th>
                                                    <th>Email PNC</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="user in userList.datas">
                                                    <td>{{ user.id_profil.nom_profil }}</td>
                                                    <td>{{ user.titre }}</td>
                                                    <td>{{ user.email }}</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-sm"
                                                            @click="() => modifEntityModal()">
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
                    <h3>Modifier l'entite </h3>
                    <button @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="card shadow mb-4">
                            <div class="card-body" @keypress.enter="">
                                <p class="mb-2"><strong>Input masks</strong></p>
                                <div class="form-group mb-3">
                                    <label for="code">Code : </label>
                                    <input class="form-control" id="code" type="text" name="code" />
                                </div>
                                <label for="role">Role : </label>
                                <input class="form-control" id="role" type="text" name="role" />
                            </div>
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div>
            </div>
            <div class="modal-footer">
                <button @click="closeModal">Close</button>
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
}

.model {
    background: white;
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
</style>
