<script setup>
import router from '@/router';
import { onMounted } from 'vue';

var dark = null;

var curentTheme = null;

var light = null;

var darkColor = {
  bodyColor: "#adb5bd",
  headingColor: "#e9ecef",
  borderColor: "#212529",
  backgroundColor: "#495057",
  mutedColor: "#adb5bd",
  chartTheme: "dark"
};

var colors = {
  bodyColor: "#6c757d",
  headingColor: "#495057",
  borderColor: "#e9ecef",
  backgroundColor: "#f8f9fa",
  mutedColor: "#adb5bd",
  chartTheme: "light"
};

const props = defineProps({
  collapseFunction: {
    type: Function
  }
});

onMounted(() => {
  light = document.querySelector("#lightTheme");
  dark = document.querySelector("#darkTheme");
  curentTheme = localStorage.getItem("mode");
});

if (curentTheme) {
  if (curentTheme === "dark") {
    dark.disabled = false;
    light.disabled = true;
    colors = darkColor;
  } else if (curentTheme === "light") {
    dark.disabled = true;
    light.disabled = false;
  }

  if (switcher) {
    switcher.dataset.mode = curentTheme;
  } else {
    console.error('#modeSwitcher non trouvé dans le DOM');
  }
} else {
  if ($("body").hasClass("dark")) {
    colors = darkColor;
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
}

function collapse() {
  props.collapseFunction();
}

function modeSwitch() {
  console.log("abc");
  var currentMode = localStorage.getItem("mode");

  if (currentMode) {
    if (currentMode === "dark") {
      dark.disabled = true;
      light.disabled = false;
      localStorage.setItem("mode", "light");
    } else {
      dark.disabled = false;
      light.disabled = true;
      localStorage.setItem("mode", "dark");
    }
  } else {
    if ($("body").hasClass("dark")) {
      dark.disabled = false;
      light.disabled = true;
      localStorage.setItem("mode", "dark");
    } else {
      dark.disabled = true;
      light.disabled = false;
      localStorage.setItem("mode", "light");
    }
  }
}
</script>
<style scoped>
  #begin-header-id {
    margin-left: 0rem
  }

  .nav-item {
    cursor: pointer
  }
</style>
<template>
  <nav id="begin-header-id" class="topnav navbar navbar-light">
    <img src="./../../assets/img/mg.jpeg" alt="" srcset="" width="50px" height="50px"/>
    <!-- PNC -->
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link text-muted" href="#" id="modeSwitcher" data-mode="dark" @click="modeSwitch">
          <i class="fe fe-sun fe-16"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" @click.prevent="() => router.push('/')">
          ACCUEIL
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link  text-muted" @click.prevent="() => router.push('/about')">A PROPOS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link  text-muted" @click.prevent="() => router.push('/customerLogin')">CONNEXION</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link  text-muted dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="avatar avatar-sm mt-2">
            FR
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">ENG</a>
          <a class="dropdown-item" href="#">MG</a>
        </div>
      </li>
    </ul>
  </nav>
</template>