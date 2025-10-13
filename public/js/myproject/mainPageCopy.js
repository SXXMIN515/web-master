// mainPage.js
console.log('start');

// 헤더
document.addEventListener("DOMContentLoaded", () => {
  // 로그인 상태 확인
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (loginUser) {
    console.log("현재 로그인한 사용자:", loginUser);

    const topRight = document.querySelector(".top-right");
    topRight.innerHTML = `
    <span>${loginUser.name}님 환영합니다!</span>
    <button class="myPage-btn" onclick="goMyPage()">마이페이지</button>
    <button class="logout-btn">로그아웃</button>
  `;

    // 로그아웃 처리
    document.querySelector('div.top-right .logout-btn')
      .addEventListener('click', function () {
        localStorage.removeItem("loginUser");
        alert("로그아웃 되었습니다.");
        window.location.href = "mainPage.html";
      });
  }
});

// 로그인 페이지로 이동
function goLogin() {
  window.location.href = "login.html";
}

// 회원가입 페이지로 이동
function goSignup() {
  window.location.href = "signup.html";
}

// 마이페이지로 이동
function goMyPage() {
  window.location.href = "myPage.html";
}

let currentCategory = "전체";
let currentSearch = "";
let currentSort = "latest";
let currentPage = 1;
const perPage = 10;

// 사이드바 - 카테고리
fetch("http://localhost:3000/gym/category")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result.forEach((item) => {
      let [li, opt] = makeCategory(item);
      document.querySelector(".sidebar ul").appendChild(li);
      document.querySelector(".searchCategory").appendChild(opt);
    });
  })
  .catch((err) => console.log(err));

// 카테고리 => row 생성.
function makeCategory(category) {
  let li = document.createElement("li");
  let opt = document.createElement("option");

  li.setAttribute('data-category', category.CATEGORY);
  li.innerHTML = category.CATEGORY;

  opt.setAttribute('value', category.CATEGORY);
  opt.innerHTML = category.CATEGORY;

  return [li, opt];
} // end of makeRow.

// 서버에서 데이터 가져오기 & 렌더링 
async function fetchAndRender() {
  try {
    const params = new URLSearchParams({
      category: currentCategory,
      search: currentSearch,
      sort: currentSort,
      page: currentPage,
      perPage: perPage
    });

    const response = await fetch(`http://localhost:3000/gym/classList?${params.toString()}`);
    const result = await response.json();

    renderClasses(result.rows);
    makePagingList(result.totalCount, currentPage);
  } catch (err) {
    console.error(err);
  }
}

// 사이드바 카테고리 클릭 이벤트
document.querySelector(".sidebar").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    currentCategory = e.target.dataset.category || e.target.innerText; // data-category 없으면 innerText 사용
    currentPage = 1;
    fetchAndRender();
  }
});

// 검색 버튼 클릭 시
document.querySelector(".search-btn").addEventListener("click", () => {
  currentSearch = document.querySelector(".searchKeyword").value.trim();
  currentPage = 1;
  fetchAndRender();
});

// 정렬 변경 이벤트
document.querySelector('.order').addEventListener('change', (e) => {
  currentSort = e.target.value;
  currentPage = 1;
  fetchAndRender();
});

// 수업 테이블 렌더링 함수
function renderClasses(classes) {
  const tbody = document.querySelector("#classList");
  tbody.innerHTML = ""; // 기존 내용 제거
  classes.forEach((item) => {
    let tr = makeClassList(item);
    tbody.appendChild(tr);
  });
}

function makeClassList(classInfo) {
  const fields = ["CLASS_ID", "CATEGORY", "CLASS_NAME", "REGISTRATION_START", "REGISTRATION_END", "START_DATE", "END_DATE", "ENROLLMENT_COUNT", "CLASS_CAPACITY"];
  const tr = document.createElement("tr");
  tr.setAttribute('data-class-id', classInfo.CLASS_ID);

  // 각 td 생성
  fields.forEach(field => {
    const td = document.createElement("td");
    if (field === "REGISTRATION_START") {
      td.innerHTML = `${classInfo.REGISTRATION_START} ~ ${classInfo.REGISTRATION_END}`;
    } else if (field === "START_DATE") {
      td.innerHTML = `${classInfo.START_DATE} ~ ${classInfo.END_DATE}`;
    } else if (field === "ENROLLMENT_COUNT") {
      td.innerHTML = `${classInfo.ENROLLMENT_COUNT}/${classInfo.CLASS_CAPACITY}`;
    } else if (!["REGISTRATION_END", "END_DATE", "CLASS_CAPACITY"].includes(field)) {
      td.innerHTML = classInfo[field];
    }
    tr.appendChild(td);
  });

  // 신청/취소 버튼
  const tdBtn = document.createElement("td");
  tdBtn.setAttribute('class', 'btn-group');
  const applyBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  applyBtn.setAttribute('class', 'apply-btn');
  applyBtn.innerHTML = "신청";
  // applyBtn.addEventListener("click", applyFunc);

  cancelBtn.setAttribute('class', 'cancel-btn');
  cancelBtn.innerHTML = "취소";
  // cancelBtn.addEventListener("click", cancelFunc);

  tdBtn.appendChild(applyBtn);
  tdBtn.appendChild(cancelBtn);
  tr.appendChild(tdBtn);

  return tr;
}

// 페이징
function makePagingList(totalCnt, currPage) {
  const totalPage = Math.ceil(totalCnt / perPage); // 총 페이지 수
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = ""; // 기존 페이지 버튼 초기화

  // 이전 블록 버튼
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currPage > 1) {
      currentPage--;
      fetchAndRender();
    }
  });
  pagination.appendChild(prevLi);

  // 페이지 번호
  for (let i = 1; i <= totalPage; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", e => {
      e.preventDefault();
      currentPage = i;
      fetchAndRender();
    });
    pagination.appendChild(li);
  }

  // 다음
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${currPage === totalPage ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.addEventListener("click", e => {
    e.preventDefault();
    if (currPage < totalPage) {
      currentPage++;
      fetchAndRender();
    }
  });
  pagination.appendChild(nextLi);
}

fetchAndRender();

// 취소버튼 클릭시
function cancelFunc(e) {
  let thisTr = this.parentElement.parentElement;
  let eno = this.parentElement.parentElement.dataset.eno;
  //console.log(this.parentElement.parentElement.dataset); // data-eno
  fetch("http://localhost:3000/emp/" + eno)
    .then((response) => response.json())
    .then((result) => {
      if (result.rowsAffected) {
        alert("성공");
        thisTr.remove();
      } else {
        alert("실패");
      }
    })
    .catch((err) => console.log(err));
}

// 페이지별 데이터 렌더링
function renderPage(page = 1) {
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const pageData = filteredClasses.slice(start, end);
  renderClasses(pageData); // table tbody 렌더링
  makePagingList(filteredClasses.length, page); // 버튼 갱신
}