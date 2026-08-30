/* =====================================================
   SMALL BUSINESS MANAGER
   APP.JS
===================================================== */

/* =====================================================
   ELEMENTS
===================================================== */

const splashScreen = document.getElementById("splashScreen");

const getStartedBtn = document.getElementById("getStartedBtn");

const loginBtn = document.getElementById("loginBtn");

/* =====================================================
   STORAGE KEYS
===================================================== */

const STORAGE_KEYS = {
  hasStarted: "sbm_hasStarted",

  currentUser: "sbm_currentUser",
};

/* =====================================================
   APP STATE
===================================================== */

const appState = {
  hasStarted: localStorage.getItem(STORAGE_KEYS.hasStarted) === "true",

  currentUser: localStorage.getItem(STORAGE_KEYS.currentUser),
};

/* =====================================================
   SPLASH
===================================================== */

window.addEventListener("load", function () {
  setTimeout(function () {
    splashScreen.classList.add("hide");
  }, 1800);
});

/* =====================================================
   GET STARTED
===================================================== */

getStartedBtn.addEventListener("click", function () {
  localStorage.setItem(STORAGE_KEYS.hasStarted, "true");

  appState.hasStarted = true;

  console.log("Get Started clicked");
});

/* =====================================================
   LOGIN
===================================================== */

loginBtn.addEventListener("click", function () {
  console.log("Login clicked");
});

/* =========================================
   REGISTER SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .then(registration => {

        console.log(
          "SBM Service Worker registered:",
          registration.scope
        );

      })
      .catch(error => {

        console.error(
          "SBM Service Worker registration failed:",
          error
        );

      });

  });

}
