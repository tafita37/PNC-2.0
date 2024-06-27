<script setup>
import { NB_PAGE_DROPDOWN_LEFT } from '@/Constantes';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const props = defineProps({
  collapseOverFunction: {
    type: Function
  }
});

function collapseOver() {
  props.collapseOverFunction();
}
</script>
<template>
  <aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
    <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
      <i class="fe fe-x"><span class="sr-only"></span></i>
    </a>
    <nav class="vertnav navbar navbar-light" @mouseover="collapseOver">
      <!-- nav bar -->
      <div class="w-100 mb-4 d-flex">
        <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="">
          <svg version="1.1" id="logo" class="navbar-brand-img brand-sm" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 120" xml:space="preserve">
            <g>
              <polygon class="st0" points="78,105 15,105 24,87 87,87 	" />
              <polygon class="st0" points="96,69 33,69 42,51 105,51 	" />
              <polygon class="st0" points="78,33 15,33 24,15 87,15 	" />
            </g>
          </svg>
        </a>
      </div>
      <ul class="navbar-nav flex-fill w-100 mb-2">
        <li class="nav-item w-100" v-for="i in NB_PAGE_DROPDOWN_LEFT">
          <a class="nav-link" @click.prevent="() => router.push($t(`dropDownMenuLeft[${i-1}].url`))">
            <i :class="$t('dropDownMenuLeft['+(i-1)+'].icon')"></i>
            <span class="ml-3 item-text">
              {{t('dropDownMenuLeft['+(i-1)+'].name')}}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<style scoped>
  .nav-link {
    cursor: pointer;
  }
</style>