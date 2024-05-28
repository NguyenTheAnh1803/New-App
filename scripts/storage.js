"use strict";
/// Hàm lưu dữ liệu xuống LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}

// Lấy dữ liệu userArray từ localStorage, nếu không tồn tại thì mặc định là một mảng rỗng
const users = getFromStorage("userArr", []);

// chuyển đổi dữ liệu về dạng class Instance
const userArr = users.map((user) => parseUser(user));
console.log("userArr");
// Lấy dữ liệu đăng nhập
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

console.log(userArr);
//hàm để chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

//Todo
//Lấy dữ liệu todoArr từ localStorage
const todoArr = [];
// const todos = getFromStorage("todoArr")?getFromStorage("todoArr"):[];
// chuyển đổi dữ liệu về dạng Intance
// const todosArr = todos.map((todo) => parseTask(todo));
//Hàm chuyển đổi từ JS Object sang class Intance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
