<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import BeginComponent from "../reusable/BeginComponent.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { API_BACK_URL, NB_COLUMN_ENTITY_TABLE } from "@/Constantes";
import router from "@/router";
import { useI18n } from "vue-i18n";
import DescriptionList from "../reusable/DescriptionTable.vue";

const { t, locale } = useI18n();

const entityLists = reactive({});

const route = useRoute();

var nbPages = ref(1);

async function getAllEntityPaginateFromBdd() {
  try {
    const token = sessionStorage.getItem("pnc_tokens");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API_BACK_URL + "/allEntity/" + route.params.numPage;
    const response = await axios.get(url, { headers: headers });
    Object.assign(entityLists, response.data);
    sessionStorage.setItem("pnc_entity_paginate", JSON.stringify(entityLists));
    sessionStorage.setItem("pnc_entity_page_number", route.params.numPage);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

async function getAllEntityPaginate() {
  if (
    !sessionStorage.getItem("pnc_entity_paginate") ||
    sessionStorage.getItem("pnc_entity_page_number") != route.params.numPage
  ) {
    getAllEntityPaginateFromBdd();
  } else {
    Object.assign(entityLists, JSON.parse(sessionStorage.getItem("pnc_entity_paginate")));
  }
}

async function getNbPageEntityFromBdd() {
  try {
    const token = sessionStorage.getItem("pnc_tokens");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API_BACK_URL + "/nbPageEntity";
    const response = await axios.get(url, { headers: headers });
    nbPages.value = response.data.datas.nbPages;
    sessionStorage.setItem("pnc_nb_pages_entity", nbPages.value);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

async function getNbPageEntity() {
  if (!sessionStorage.getItem("pnc_nb_pages_entity")) {
    getNbPageEntityFromBdd();
  } else {
    nbPages.value = Number(sessionStorage.getItem("pnc_nb_pages_entity"));
  }
}

function changePage(pageNum) {
  router.push({ name: "entities", params: { numPage: pageNum } });
}

function refreshData() {
  getAllEntityPaginateFromBdd();
  getNbPageEntityFromBdd();
}

onMounted(() => {
  getAllEntityPaginate();
  getNbPageEntity();
  console.log(entityLists);
});

watch(
  () => route.params.numPage,
  () => {
    getAllEntityPaginate();
  }
);
</script>

<template>
  <div class="wrapper">
    <BeginComponent />
    <main role="main" class="main-content">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <DescriptionList
              :title-table="$t('entityList.titre')"
              :description-table="$t('entityList.description')"
              :refresh-function="() => refreshData()"
            />
            <div class="row my-4">
              <div class="col-md-12">
                <div class="card shadow">
                  <div class="card-body">
                    <table class="table datatables" id="dataTable-1">
                      <thead>
                        <tr>
                          <th v-for="i in NB_COLUMN_ENTITY_TABLE" :key="i">
                            {{ t("entityList.columnHeaders[" + (i - 1) + "]") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(entity, index) in entityLists.datas" :key="entity.id">
                          <td>{{ index + 1 }}</td>
                          <td>{{ entity.nom }}</td>
                          <td>{{ entity.cod }}</td>
                          <td>{{ entity.ema }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <nav aria-label="Table Paging" class="mb-0 text-muted">
                      <ul class="pagination justify-content-center mb-0">
                        <li class="page-item" v-if="route.params.numPage != 1">
                          <a
                            class="page-link"
                            @click.prevent="() => changePage(route.params.numPage - 1)"
                          >
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
                          <a
                            class="page-link"
                            @click.prevent="() => changePage(route.params.numPage + 1)"
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <!-- simple table -->
            </div>
            <!-- end section -->
          </div>
          <!-- .col-12 -->
        </div>
        <!-- .row -->
      </div>
      <!-- .container-fluid -->
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

.page-link {
  cursor: pointer;
}
</style>
