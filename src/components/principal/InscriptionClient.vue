<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { API_BACK_URL } from '@/Constantes';

const { t, locale } = useI18n();


var customer = reactive({
    id_entite: "",
    id_profil: ""
});

var responseInscription = reactive({});

var entityList = reactive({});

var profilList = reactive({});

var isGeneratedPassword=ref(false);

var generatedEmail=ref("");
var generatedMdp=ref("");

var nb = ref(60);
var mdpText = ref("Email : ****@pnc.mg, Mdp : ****, Reste : " + nb.value);

function inscriptionCustomer() {
    try {
        const url = API_BACK_URL + "/auth/register/";
        const response = axios.post(url, customer);
        response.then(reponse => {
            Object.assign(responseInscription, reponse.data);
            generatedEmail.value=responseInscription.email;
            generatedMdp.value=responseInscription.mdp;
            isGeneratedPassword.value=true;
            const interval = setInterval(() => {
                nb.value -= 1; // Décrémenter le nombre de secondes
                mdpText.value = "Email : ****@pnc.mg, Mdp : ****, Reste : " + nb.value;
                if (nb.value <= 0) {
                    isGeneratedPassword.value=false;
                    clearInterval(interval); // Arrêter le chrono quand nb atteint 0
                }
            }, 1000);
        }).catch(errors => {
            console.log(errors.response.data);
            alert(errors);
        })
    } catch (error) {
        console.log(error);
    }
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

function refreshData() {
    getAllEntiteFromBase();
    getAllProfilFromBase();
}

var buttonCopiedMessage = ref("Copier");

var classCopy = ref("fe fe-copy fe-30");

const copyText = async () => {
    try {
        // Méthode de repli pour les navigateurs qui ne supportent pas l'API Clipboard
        const textarea = document.createElement('textarea');
        textarea.value = 'Email : '+generatedEmail.value+"\nMdp : "+generatedMdp.value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        buttonCopiedMessage.value = "Copié"
        classCopy.value = "fe fe-check fe-30";
        // Réinitialiser l'état 'copied' après 2 secondes
        setTimeout(() => {
            buttonCopiedMessage.value = "Copier";
            classCopy.value = "fe fe-copy fe-30";
        }, 2000);
    } catch (err) {
        console.error('Erreur lors de la copie : ', err);
    }
};

onMounted(() => {
    sessionStorage.removeItem("pnc_entites");
    sessionStorage.removeItem("pnc_profiles");
    getAllEntite();
    getAllProfil();
})
</script>
<template>
    <div class="wrapper vh-100">
        <div class="row align-items-center h-100">
            <form class="col-lg-4 col-md-4 col-10 mx-auto text-center">
                <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="./index.html">
                    <img src="./../../assets/img/mg.jpeg" alt="" srcset="" width="50px" height="50px" />
                </a>
                <h1 class="h6 mb-3">
                    {{ t('inscriptionClientPage.inscriptionMessage') }}
                </h1>
                <div class="form-group">
                    <label for="nom_utilisateur" class="sr-only">Nom : </label>
                    <input v-model="customer.nom_utilisateur" type="text" id="nom_utilisateur"
                        class="form-control form-control-lg" placeholder="Nom" />
                </div>
                <div class="form-group">
                    <label for="prenom" class="sr-only">Prenom : </label>
                    <input v-model="customer.prenom" type="text" id="prenom" class="form-control form-control-lg"
                        placeholder="Prenom" />
                </div>
                <div class="form-group">
                    <label for="id_entite" class="sr-only">
                        Entite :
                    </label>
                    <select v-model="customer.id_entite" id="id_entite" class="form-control form-control-lg">
                        <option value="">
                            Votre entite
                        </option>
                        <option v-for="entity in entityList.datas" :value="entity.id">
                            {{ entity.nom }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="id_profil" class="sr-only">
                        Profil :
                    </label>
                    <select v-model="customer.id_profil" id="id_profil" class="form-control form-control-lg">
                        <option value="">
                            Votre profil
                        </option>
                        <option v-for="profil in profilList.datas" :value="profil.id">
                            {{ profil.nom }}
                        </option>
                    </select>
                </div>
                <div class="form-group d-flex" style="gap: 5px;" v-if="isGeneratedPassword">
                    <input class="form-control form-control-lg" type="text" name="" id="" v-model="mdpText" disabled>
                    <button @click.prevent="() => copyText()" class="btn btn-outline-info"
                        style="display: flex; gap: 5px;">
                        <i :class="classCopy"></i> {{ buttonCopiedMessage }}
                    </button>
                </div>
                <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block" @click.prevent="() => inscriptionCustomer()">
                        {{ t('inscriptionClientPage.inscriptionSubmitButton') }}
                    </button>
                </div>
                <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block" @click.prevent="() => refreshData()">
                        {{ t('refreshMessage') }}
                    </button>
                </div>
                <p class="mt-5 mb-3 text-muted">&copy; 2024 RANDRIAMBOLOLONA Tafita Anaël. {{ t('footer.droit') }}</p>
            </form>
        </div>
    </div>
</template>
<style scoped></style>