<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { API_BACK_URL } from '@/Constantes';

const { t, locale } = useI18n();


var customer = reactive({
    email: "prenom1.nom1.fiu.profil1@pnc.mg",
    password: "yi@B%UkY!c\"^F:$Zrvh>"
});

var responseLogin=reactive({});

function loginCustomer() {
    try {
        const url = API_BACK_URL + "/auth/login/";
        const response = axios.post(url, customer);
        response.then(reponse => {
            Object.assign(responseLogin, reponse.data);
            alert(responseLogin.message)
            sessionStorage.setItem("pnc_tokens", responseLogin.token.access)
            sessionStorage.setItem("expiration_date", responseLogin.token.access_token_expiration)
        }).catch(errors => {
            console.log(errors.response.data);
            alert(errors);
        })
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div class="wrapper vh-100">
        <div class="row align-items-center h-100">
            <form class="col-lg-3 col-md-4 col-10 mx-auto text-center">
                <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="./index.html">
                    <img src="./../../assets/img/mg.jpeg" alt="" srcset="" width="50px" height="50px" />
                </a>
                <h1 class="h6 mb-3">
                    {{ t('loginClientPage.connectMessage') }}
                </h1>
                <div class="form-group">
                    <label for="inputEmail" class="sr-only">Email : </label>
                    <input v-model="customer.email" type="email" id="inputEmail" class="form-control form-control-lg"
                        placeholder="Email" />
                </div>
                <div class="form-group">
                    <label for="inputPassword" class="sr-only">Mot de passe : </label>
                    <input v-model="customer.password" type="password" id="inputPassword"
                        class="form-control form-control-lg" placeholder="Password" />
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click.prevent="() => loginCustomer()">
                    {{ t('loginClientPage.connectSubmitButton') }}
                </button>
                <p class="mt-5 mb-3 text-muted">&copy; 2024 RANDRIAMBOLOLONA Tafita Anaël. {{ t('footer.droit') }}</p>
            </form>
        </div>
    </div>
</template>
<style scoped></style>