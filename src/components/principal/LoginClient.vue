<script setup>
    import router from '@/router';
import { reactive } from 'vue';


    var customer=reactive({
        userName : "admin.samifin@pnc.mg",
        password : "0000"
    });


    function loginCustomer() {
        alert("Connecte");
        router.push("/customerDashboard");
    }
</script>
<template>
    <div class="wrapper vh-100">
        <div class="row align-items-center h-100">
            <form class="col-lg-3 col-md-4 col-10 mx-auto text-center">
                <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="./index.html">
                    <img src="./../../assets/img/mg.jpeg" alt="" srcset="" width="50px" height="50px"/>
                </a>
                <h1 class="h6 mb-3">Se connecter</h1>
                <div class="form-group">
                    <label for="inputEmail" class="sr-only">Email : </label>
                    <input 
                        v-model="customer.userName"
                        type="email" 
                        id="inputEmail" 
                        class="form-control form-control-lg" 
                        placeholder="Email"
                    />
                </div>
                <div class="form-group">
                    <label for="inputPassword" class="sr-only">Mot de passe : </label>
                    <input 
                        v-model="customer.password" 
                        type="password" 
                        id="inputPassword" 
                        class="form-control form-control-lg" 
                        placeholder="Password"
                    />
                </div>
                <!-- <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> 
                        Stay logged in 
                    </label>
                </div> -->
                <button class="btn btn-lg btn-primary btn-block" @click.prevent="() => loginCustomer()">Login</button>
                <p class="mt-5 mb-3 text-muted">© 2024</p>
            </form>
        </div>
    </div>
</template>
<style scoped></style>