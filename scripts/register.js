"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const btnSubmitRegister = document.getElementById("btn-submit");

// Sự kiên button Resgister
btnSubmitRegister.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào từ form

  let user = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value
  );

  const isValidate = Validate(user);
  // Gọi hàm validate để kiểm tra form hợp lệ
  if (isValidate) {
    // Thêm user vào mảng
    userArr.push(user);

    // Lưu mảng vào localStorage
    saveToStorage("userArr", userArr);

    alert(" Register successfully");

    // Chuyển trang đến màn hình login
    window.location.href = "login.html";
  }
});

// Hàm validate để kiểm tra form hợp lệ
function Validate(user) {
  let isValidated = true;
  // Không có trường nào bị bỏ trống

  if (user.firstName.trim().length === 0) {
    alert("Please enter your first name");
    isValidated = false;
  }
  if (user.lastName.trim().length === 0) {
    alert("Please enter your last name");
    isValidated = false;
  }
  if (user.username.trim().length === 0) {
    alert("Please enter your username");
    isValidated = false;
  }
  if (user.password === "") {
    alert("Please enter your password");
    isValidated = false;
  }
  if (confirmPasswordInput.value === "") {
    alert("Please enter your  Confirm password");
    isValidated = false;
  }
  // Kiểm tra xem username đã tồn tại hay chưa

  let usernameExists = userArr.some(
    (existingUser) => existingUser.username === user.username
  );
  if (usernameExists) {
    alert("Username already exists");
    isValidated = false;
  }
  // if (!user.every((item) => (item.username !== user.username ? true : false))) {
  //   alert("username already exists");
  //   isValidated = false;
  // }
  // for (let i = 0; i < userArr.length; i++) {
  //   if (userArr[i].username !== user.username) {
  //     alert("username already exists");
  //     isValidated = false;
  //     break;
  //   }
  // }

  //Password phải có ít nhất 8 ký tự
  if (user.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }

  // Password và Confirm Password phải giống nhau
  if (user.password !== confirmPasswordInput.value) {
    alert("Password and Confirm Password do not match.");
    return false;
  }

  return isValidated;
}
