"use strict";
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

const btnLogin = document.getElementById("btn-submit");

btnLogin.addEventListener("click", function () {
  const isValidated = Validate();

  if (isValidated) {
    // kiểm tra thông tin người dùng đã đăng nhập vào có đúng hay không
    const currentUser = userArr.find(
      (item) =>
        item.username === inputUserName.value &&
        item.password === inputPassword.value
    );
    console.log(currentUser);
    if (currentUser) {
      alert("Login success");
      // lưu thông tin user hiện tại đang đăng nhập
      saveToStorage("userActive", currentUser);
      // chuyển đến trang chủ

      window.location.href = "../index.html";
    } else {
      alert("Login error");
    }
  }
});
// Kiểm tra dữ liệu nhập vào từ input
function Validate() {
  const isValidated = true;
  if (inputUserName.value === "") {
    alert("Please enter your username");
    isValidated = false;
  }

  if (inputPassword.value === "") {
    alert("Please enter your password");
    isValidated = false;
  }
  return isValidated;
}
