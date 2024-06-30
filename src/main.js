import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
// import '@/assets/js/jquery.min.js';
// import '@/assets/js/bootstrap.min.js';
// import '@/assets/js/Chart.min.js';
// import '@/assets/js/tinycolor-min.js';

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
