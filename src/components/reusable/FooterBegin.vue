<script setup>
  import { NB_PAGE_HEADER_BEGIN } from '@/Constantes';
  import router from '@/router';
  import { useI18n } from 'vue-i18n';

  const { t, locale } = useI18n();
</script>
<template>
  <footer class="footer mt-auto py-3">
    <div class="container" style="padding: 0;">
      <div class="row">
        <div class="col-md-4">
          <h5>
            {{ t('footer.partners') }}
          </h5>
          <li>SERVICE DE RENSEIGNEMENTS FINANCIERS</li>
          <li>BUREAU INDEPENDANT ANTI-CORRUPTION</li>
          <li>DIRECTION GENERALE DES DOUANES</li>
          <li>COMMANDEMENT DE LA GENDARMERIE NATIONALE</li>
          <li>DIRECTION GENERALE DE LA POLICE NATIONALE</li>
          <li>DIRECTION GENERALE DES IMPOTS</li>
        </div>
        <div class="col-md-4">
          <h5>
            {{ t('footer.footerUseFullLinks') }}
          </h5>
          <ul class="list-unstyled">
            <li v-for="i in NB_PAGE_HEADER_BEGIN">
              <a @click.prevent="() => router.push(t('header[' + (i - 1) + '].url'))">
                {{ t('header[' + (i - 1) + '].name') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contact</h5>
          <address>
            LOT I102 A Lohanosy<br>
            Antananarivo, Madagascar<br>
            <a href="mailto:info@example.com">samifin@samifin.mg</a>
          </address>
        </div>
      </div>
      <div class="text-center">
        <small>&copy; 2024 RANDRIAMBOLOLONA Tafita Anaël. {{ t('footer.droit') }}</small>
      </div>
    </div>
  </footer>
</template>
<style></style>