import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
// Importer le fichier CSS de Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'
// Facultatif : Importer les fonctionnalités JavaScript de Bootstrap
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
