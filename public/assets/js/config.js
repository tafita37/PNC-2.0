"use strict";


var extend = {
  primaryColorLight: tinycolor(base.primaryColor).lighten(10).toString(),
  primaryColorLighter: tinycolor(base.primaryColor).lighten(30).toString(),
  primaryColorDark: tinycolor(base.primaryColor).darken(10).toString(),
  primaryColorDarker: tinycolor(base.primaryColor).darken(30).toString()
};

var chartColors = [
  base.primaryColor,
  base.successColor,
  "#6f42c1",
  extend.primaryColorLighter
];

var colors = {
  bodyColor: "#6c757d",
  headingColor: "#495057",
  borderColor: "#e9ecef",
  backgroundColor: "#f8f9fa",
  mutedColor: "#adb5bd",
  chartTheme: "light"
};

var darkColor = {
  bodyColor: "#adb5bd",
  headingColor: "#e9ecef",
  borderColor: "#212529",
  backgroundColor: "#495057",
  mutedColor: "#adb5bd",
  chartTheme: "dark"
};

var curentTheme = localStorage.getItem("mode");
var dark = document.querySelector("#darkTheme");
var light = document.querySelector("#lightTheme");
var switcher = document.querySelector("#modeSwitcher");

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

console.log(curentTheme);

if (curentTheme) {
  if (curentTheme === "dark") {
    dark.disabled = false;
    light.disabled = true;
    colors = darkColor;
  } else if (curentTheme === "light") {
    dark.disabled = true;
    light.disabled = false;
  }
  console.log("document.getElementById()");

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
