"use strict";

const navPageNum = document.getElementById("nav-page-num");
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
let totalResults = 0;
let keywords = "";
navPageNum.style.display = "none";
btnSubmit.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";
  // Kiểm tra xem người dùng đã nhập từ khóa chưa
  if (inputQuery.value.trim().length === 0) {
    navPageNum.style.display = "none";
    alert("Vui lòng nhập từ khóa để tìm kiếm");
  } else {
    keywords = inputQuery.value;
    getDataNewByKeywords(keywords, 1);
  }
});

async function getDataNewByKeywords(keywords, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=484ca0bcdbf345b18e89f3fd2452a0c4`
    );
    const data = await res.json();
    console.log(data);
    navPageNum.style.display = "block";
    displayNewList(data);
    console.log(displayNewList(data));
  } catch (e) {
    alert("Error: " + e.message);
  }
}

// Hàm hiển thị bài viết
function displayNewList(data) {
  totalResults = data.totalResults;
  checkBtnPrev();
  checkBtnNext();
  let html = "";

  data.articles.forEach(function (article) {
    html += ` <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src="${articles.url}"
              class="card-img"
              alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${articles.title}
              </h5>
              <p class="card-text">
                ${articles.description}
              </p>
              <a
                href="${article.url}"
                class="btn btn-primary"
                >View</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  newsContainer.innerHTML = html;
}

function checkBtnPrev() {
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}

function checkBtnNext() {
  if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

btnPrev.addEventListener("click", function () {
  getDataNewByKeywords(keywords, --pageNum.textContent);
});

btnNext.addEventListener("click", function () {
  getDataNewByKeywords(keywords, ++pageNum.textContent);
});
