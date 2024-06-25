import { createI18n } from 'vue-i18n';
import engMess from '@/locales/eng.json'
import frMess from '@/locales/fr.json'


const messages = {
  ENG: engMess,
  FR: frMess
};

const languages=['FR', 'ENG'];

var currentLangage='FR';

const languageSession=sessionStorage.getItem("current_language");


if(languageSession&&typeof languageSession==='string'&&languages.includes(languageSession)) {
    currentLangage=languageSession;
} else {
    sessionStorage.setItem("current_language", currentLangage);
}


const i18n = createI18n({
    legacy: false, 
    locale: currentLangage, // langue par défaut
    messages,
});


export default i18n;
