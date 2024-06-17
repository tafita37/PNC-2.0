<script setup>
  import { onMounted } from 'vue';

  var dark=null;

  var curentTheme=null;

  var light=null;

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

  const props=defineProps({
    collapseFunction : {
      type : Function
    },
    headerId : {
      type : String
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
</style>
<template>
    <nav :id="props.headerId" class="topnav navbar navbar-light">
      <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar" @click.prevent="collapse">
        <i class="fe fe-menu navbar-toggler-icon"></i>
      </button>
      <form class="form-inline mr-auto searchform text-muted">
        <input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Type something..." aria-label="Search">
      </form>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark" @click="modeSwitch">
            <i class="fe fe-sun fe-16"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-shortcut">
            <span class="fe fe-grid fe-16"></span>
          </a>
        </li>
        <li class="nav-item nav-notif">
          <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
            <span class="fe fe-bell fe-16"></span>
            <span class="dot dot-md bg-success"></span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="avatar avatar-sm mt-2">
              <img src="/src/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Profile</a>
            <a class="dropdown-item" href="#">Settings</a>
            <a class="dropdown-item" href="#">Activities</a>
          </div>
        </li>
      </ul>
    </nav>
</template>