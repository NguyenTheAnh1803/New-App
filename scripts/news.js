"use strict";
if (userActive) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  //biến để tính số News tối đa trả về từ API

  let totalResults = 0;

  getDataNew("us", 1);

  // Lấy dữ liệu từ API và hiển thị ra màn hình

  async function getDataNew(country, page) {
    try {
      // kết nối dữ liệu

      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.catergory}&pageSize=${userActive.pageSize}&page=${page}&apiKey=484ca0bcdbf345b18e89f3fd2452a0c4`
      );
      const data = await res.json();
      console.log(data);
      // gọi hàm để hiển thị list News
      displayNewList(data);
    } catch (e) {
      alert("Error" + e.message);
    }
  }
  // hàm hiển thị bài viết
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
            src="${article.urlToImage}"
            class="card-img"
            alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
            ${article.title}
            </h5>
            <p class="card-text">
            ${article.description}
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
    if (pageNum.textContent == Math.ceil(totalResults/userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  btnPrev.addEventListener("click", function () {
    getDataNew("us", --pageNum.textContent);
  });

  btnNext.addEventListener("click", function () {
    getDataNew("us", ++pageNum.textContent);
  });
}
