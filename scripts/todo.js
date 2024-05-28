"use strict";

if (userActive) {
  const todoList = document.querySelector("#todo-list");
  const btnAdd = document.querySelector("#btn-add");
  const inputTask = document.querySelector("#input-task");

  displayTodoList();

  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner === userActive.userName)
      .forEach(function (todo) {
        html += `
          <li class="${todo.isDone ? "checked" : ""}">${todo.task}
            <span class="close">x</span>
          </li>`;
      });
    todoList.innerHTML = html;
    eventToggleTask(); // Thêm gọi sự kiện toggle
    eventDeleteTask(); // Thêm gọi sự kiện delete
  }

  // Bắt sự kiện ADD
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
      alert("Please enter a task name");
    } else {
      const todo = new Task(inputTask.value, userActive.userName, false);

      // Thêm Task mới vào todoArr
      todoArr.push(todo);
      // Lưu vào localStorage
      saveToStorage("todoArr", todoArr);
      // Hiển thị dữ liệu
      displayTodoList();
      inputTask.value = "";
    }
  });

  function eventToggleTask() {
    // Lấy tất cả các phần tử li chứa thông tin của task
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          // Tìm task vừa click
          console.log(todoArr);
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.userName &&
              todoItem.task === liEl.textContent.slice(0, -1) // Lấy nội dung text chứa task, loại bỏ x
          );

          // Sau đó thay đổi thuộc tính isDone
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          console.log(todo.isDone);

          // Lưu vào localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  function eventDeleteTask() {
    // Lấy tất cả các phần tử li chứa thông tin của task
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click trên li
        const isDelete = confirm("Are you sure you want to delete?");
        if (isDelete) {
          // Tìm task vừa click
          const index = todoArr.findIndex(
            (item) =>
              item.owner == userActive.userName &&
              item.task == closeEl.parentElement.textContent.slice(0, -1) // Lấy nội dung text chứa task, loại bỏ x
          );
          // Xóa task ra khỏi todoArr
          todoArr.splice(index, 1);
          // Lưu vào localStorage
          saveToStorage("todoArr", todoArr);
          // Hiển thị lại list
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng kí/ đăng nhập để truy cập ứng dụng");
  window.location.href = "../index.html";
}
