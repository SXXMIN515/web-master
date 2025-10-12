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
    <button class="myPage-btn">마이페이지</button>
    <button class="logout-btn">로그아웃</button>
  `;
  }
  // else {
  //   // 로그인 정보 없으면 로그인 페이지로 이동
  //   window.location.href = "login.html";
  // }

  // 로그아웃 처리
  document.querySelector('div.top-right .logout-btn')
    .addEventListener('click', function () {
      localStorage.removeItem("loginUser");
      alert("로그아웃 되었습니다.");
      window.location.href = "mainPage.html";
    });
});

// 로그인 페이지로 이동
function goLogin() {
  window.location.href = "login.html";
}

// 회원가입 페이지로 이동
function goSignup() {
  window.location.href = "signup.html";
}


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
  let fields = ["CATEGORY"]; // SQL 테이블 컬명
  let li = document.createElement("li");
  let opt = document.createElement("option");
  fields.forEach((field) => {
    li.setAttribute('data-category', category[field]);
    li.innerHTML = category[field];
    opt.setAttribute('date-search-category', category[field]);
    opt.innerHTML = category[field];
  });

  return [li, opt];
} // end of makeRow.

// 사이드바 카테고리 클릭 이벤트
document.querySelector(".sidebar").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const category = e.target.dataset.category || e.target.innerText; // data-category 없으면 innerText 사용
    filteredClasses = category === "전체" ? [...allClasses] :
      allClasses.filter(c => c.CATEGORY.trim() === category.trim());
    renderPage(1);
  }
});

// 검색 버튼 클릭 시
document.querySelector(".search-btn").addEventListener("click", () => {
  const selectedCategory = document.querySelector(".searchCategory").value;
  const keyword = document.querySelector(".searchKeyword").value.trim();

  let result = [...allClasses];

  // 카테고리 필터링
  if (selectedCategory !== "전체") {
    result = result.filter(c => c.CATEGORY.trim() === selectedCategory.trim());
  }

  // 키워드 검색 필터링
  if (keyword) {
    result = result.filter(c => c.CLASS_NAME.includes(keyword));
  }

  filteredClasses = result; // 필터 적용
  renderPage(1); // 결과 1페이지부터 렌더링
});



let allClasses = []; // 서버에서 받은 전체 수업
let filteredClasses = []; // 현재 선택된 카테고리/검색 후 남은 데이터
// 수업 목록
fetch("http://localhost:3000/gym/classList")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    allClasses = result.data || result; // 서버 데이터
    filteredClasses = [...allClasses]; // 초기엔 전체 보여줌
    renderPage(1); // 1페이지 출력
  })
  .catch((err) => console.log(err));

// 수업정보 => row 생성.
function makeClassList(classInfo) {
  let fields = ["CLASS_ID", "CATEGORY", "CLASS_NAME", "REGISTRATION_START", "REGISTRATION_END", "START_DATE", "END_DATE", "ENROLLMENT_COUNT", "CLASS_CAPACITY"]; // SQL 테이블 컬명
  let tr = document.createElement("tr");
  tr.setAttribute('data-class-id', classInfo.CLASS_ID);

  // 1. 수업아이디
  let tdID = document.createElement("td");
  tdID.innerHTML = classInfo.CLASS_ID;
  tr.appendChild(tdID);

  // 2. 카테고리
  let tdCategory = document.createElement("td");
  tdCategory.innerHTML = classInfo.CATEGORY;
  tr.appendChild(tdCategory);

  // 3. 수업명
  let tdName = document.createElement("td");
  tdName.innerHTML = classInfo.CLASS_NAME;
  tr.appendChild(tdName);

  // 4. 등록기간 (REGISTRATION_START ~ REGISTRATION_END)
  let tdRegistration = document.createElement("td");
  tdRegistration.innerHTML = `${classInfo.REGISTRATION_START} ~ ${classInfo.REGISTRATION_END}`;
  tr.appendChild(tdRegistration);

  // 5. 수업기간 (START_DATE ~ END_DATE)
  let tdClassPeriod = document.createElement("td");
  tdClassPeriod.innerHTML = `${classInfo.START_DATE} ~ ${classInfo.END_DATE}`;
  tr.appendChild(tdClassPeriod);

  // 6. 신청인원/정원 (ENROLLMENT_COUNT / CLASS_CAPACITY)
  let tdEnrollment = document.createElement("td");
  tdEnrollment.innerHTML = `${classInfo.ENROLLMENT_COUNT}/${classInfo.CLASS_CAPACITY}`;
  tr.appendChild(tdEnrollment);

  // 7. 신청버튼, 취소버튼
  let td = document.createElement("td");
  td.setAttribute('class', 'btn-group');
  let applyBtn = document.createElement("button");
  let cancelBtn = document.createElement("button");
  applyBtn.setAttribute('class', 'apply-btn');
  applyBtn.innerHTML = "신청";
  // applyBtn.addEventListener("click", applyFunc);
  cancelBtn.setAttribute('class', 'cancel-btn');
  cancelBtn.innerHTML = "취소";
  // cancelBtn.addEventListener("click", cancelFunc);
  td.appendChild(applyBtn);
  td.appendChild(cancelBtn);
  tr.appendChild(td);

  return tr;
} // end of makeClassList.

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

// 수업 렌더링 함수
function renderClasses(classes) {
  let tbody = document.querySelector("#classList");
  tbody.innerHTML = ""; // 기존 내용 제거
  classes.forEach((item) => {
    let tr = makeClassList(item);
    tbody.appendChild(tr);
  });
}

function makePagingList(totalCnt, currPage) {
  const perPage = 10; // 한 페이지당 게시글 수
  const pageBlock = 10; // 한 번에 보여줄 페이지 버튼 수
  const totalPage = Math.ceil(totalCnt / perPage); // 총 페이지 수
  const pagination = document.querySelector("#pagination");

  pagination.innerHTML = ""; // 기존 페이지 버튼 초기화

  // 현재 블록 계산
  const currentBlock = Math.ceil(currPage / pageBlock);
  const startPage = (currentBlock - 1) * pageBlock + 1;
  let endPage = currentBlock * pageBlock;
  if (endPage > totalPage) endPage = totalPage;

  // 이전 블록 버튼
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${startPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (startPage > 1) renderPage(startPage - 1);
  });
  pagination.appendChild(prevLi);

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      renderPage(i);
    });
    pagination.appendChild(li);
  }

  // 다음 블록 버튼
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${endPage >= totalPage ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (endPage < totalPage) renderPage(endPage + 1);
  });
  pagination.appendChild(nextLi);
}


// 페이지별 데이터 렌더링
function renderPage(page = 1) {
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const pageData = filteredClasses.slice(start, end);
  renderClasses(pageData); // table tbody 렌더링
  makePagingList(filteredClasses.length, page); // 버튼 갱신
}