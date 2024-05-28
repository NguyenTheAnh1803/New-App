"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomMessage = document.getElementById("welcome-message");

const btnLogout = document.getElementById("btn-logout");

displayHome();

function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    // mainContent.style.display = "block";
    welcomMessage.style.display = `Welcome  ${userActive.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Are you sure you want to log out?");
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayHome();
  }
});
