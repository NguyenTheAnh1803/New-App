"use strict";
if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    if (validate) {
      // Cập nhật lại userActive
      userActive.pageSize = Number(inputPageSize.value);
      userActive.category = inputCategory.value;
      saveToStorage("userActive", userActive);
      // cập nhật lại userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;

      saveToStorage("userArr", userArr);
      // thông báo
      alert("Cài đặt thành công");
      // reset lại
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  function validate() {
    let isValidate = true;
    if (Number.isNaN(parseInt(inputPageSize, 10))) {
      alert("News per page is not a number");
      isValidate = false;
    }

    // kieemr tra inputCategory
    if (inputCategory.value == "") {
      alert("Please select a category");
      isValidate = false;
    }
    return isValidate;
  }
} else {
}
