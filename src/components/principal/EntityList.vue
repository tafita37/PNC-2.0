<script setup>
import { reactive, ref } from 'vue';
import BeginComponent from '../reusable/BeginComponent.vue';

const entityLists = reactive([
    { id: 1, role: "SERVICE DE RENSEIGNEMENTS FINANCIERS", code: "SAMIFIN" },
    { id: 2, role: "BUREAU INDEPENDANT ANTI-CORRUPTION", code: "BIANCO" },
    { id: 3, role: "DIRECTION GENERALE DES DOUANES", code: "DGD" },
    { id: 4, role: "COMMANDEMENT DE LA GENDARMERIE NATIONALE", code: "COMGN" },
    { id: 5, role: "DIRECTION GENERALE DE LA POLICE NATIONALE", code: "DGPN" },
    { id: 6, role: "DIRECTION GENERALE DES IMPOTS", code: "DGI" }
]);

const isModalVisible = ref(false);

var modifEntityValue = reactive({
    id: "",
    role: "",
    code: ""
});

function modifEntityModal(id) {
    var entityModif = entityLists.find(entity => entity.id == id);
    modifEntityValue.id = entityModif.id;
    modifEntityValue.role = entityModif.role;
    modifEntityValue.code = entityModif.code;
    isModalVisible.value = true;
}

function closeModal() {
    isModalVisible.value = false;
}
</script>

<template>
    <div class="wrapper">
        <BeginComponent />
        <main role="main" class="main-content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <h2 class="mb-2 page-title">Entites</h2>
                        <p class="card-text">Liste des entites travaillant en collaboration</p>
                        <div class="row my-4">
                            <div class="col-md-12">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <table class="table datatables" id="dataTable-1">
                                            <thead>
                                                <tr>
                                                    <th>Entite</th>
                                                    <th>Code</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entity in entityLists" :key="entity.id">
                                                    <td>{{ entity.role }}</td>
                                                    <td>{{ entity.code }}</td>
                                                    <td>
                                                        <button class="btn btn-primary btn-sm"
                                                            @click="() => modifEntityModal(entity.id)">
                                                            <i class="fas fa-edit"></i> Modifier
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-danger btn-sm">
                                                            <i class="fas fa-trash-alt"></i> Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                    <h3>Modifier l'entite {{ modifEntityValue.code }}</h3>
                    <button @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="card shadow mb-4">
                            <div class="card-body" @keypress.enter="">
                                <p class="mb-2"><strong>Input masks</strong></p>
                                <div class="form-group mb-3">
                                    <label for="code">Code : </label>
                                    <input class="form-control" id="code" type="text" name="code"
                                        v-model="modifEntityValue.code" />
                                </div>
                                <label for="role">Role : </label>
                                <input class="form-control" id="role" type="text" name="role"
                                    v-model="modifEntityValue.role" />
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
