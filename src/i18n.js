// src/i18n.js
import { createI18n } from 'vue-i18n';
import engMess from '@/locales/eng.json'
import frMess from '@/locales/fr.json'

// Messages en différentes langues
const messages = {
  ENG: engMess,
  FR: frMess
};

var currentLangage='FR';
if(sessionStorage.getItem("current_language")) {
    currentLangage=sessionStorage.getItem("current_language");
} else {
    sessionStorage.setItem("current_language", currentLangage);
}

const i18n = createI18n({
    legacy: false, 
    locale: currentLangage, // langue par défaut
    messages,
});

export default i18n;
