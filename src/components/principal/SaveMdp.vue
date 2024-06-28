<script setup>
import { ref } from 'vue';

// Définir les références réactives
const textToCopy = ref('');
const copied = ref(false);

// Méthode pour copier le texte
const copyText = async () => {
    try {
        // Méthode de repli pour les navigateurs qui ne supportent pas l'API Clipboard
        const textarea = document.createElement('textarea');
        textarea.value = 'abcd';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied.value = true;
        // Réinitialiser l'état 'copied' après 2 secondes
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Erreur lors de la copie : ', err);
    }
};
</script>

<template>
    <div>
        <input v-model="textToCopy" placeholder="Texte à copier" />
        <button @click="copyText">Copier</button>
        <p v-if="copied">Texte copié</p>
    </div>
    <input type="text" name="" id="">
</template>

<style scoped>
button {
    margin-left: 10px;
}
</style>