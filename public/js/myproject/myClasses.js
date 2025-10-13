console.log("start");

// 전역 loginUser 선언
let loginUser = null;

// 헤더 로그인 처리
document.addEventListener("DOMContentLoaded", () => {
  loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const topRight = document.querySelector(".top-right");

  if (loginUser) {
    topRight.innerHTML = `
      <span>${loginUser.name}님 환영합니다!</span>
      <button class="myPage-btn" onclick="goMyPage()">마이페이지</button>
      <button class="logout-btn">로그아웃</button>
    `;

    // 로그아웃 처리
    document.querySelector(".logout-btn").addEventListener("click", () => {
      localStorage.removeItem("loginUser");
      alert("로그아웃 되었습니다.");
      window.location.href = "mainPage.html";
    });
  }
});

// 페이지 이동 함수
function goLogin() {
  window.location.href = "login.html";
}

function goSignup() {
  window.location.href = "signup.html";
}

function goMain() {
  window.location.href = "mainPage.html";
}

function goMyClasses() {
  if (loginUser) {
    window.location.href = `myClassList.html?memberId=${loginUser.member_id}`;
  } else {
    alert("로그인이 필요합니다.");
    goLogin();
  }
}

function goMyPage() {
  window.location.href = "myPage.html";
}

// URL에서 memberId 가져오기
const params = new URLSearchParams(window.location.search);
const memberId = params.get("memberId");

// 날짜 포맷 함수 (YYYY-MM-DD)
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// 수업 상세정보 fetch
if (memberId) {
  fetch(`http://localhost:3000/gym/myClasses?memberId=${memberId}`)
    .then(res => res.json())
    .then(result => {
      if (result.length > 0) {
        renderClassList(result);
      } else {
        alert("신청한 수업 정보가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}

// 여러 수업 DOM 생성 (스타일은 CSS에 의존)
function renderClassList(classArray) {
  const main = document.querySelector(".main-content");
  main.innerHTML = "";

  classArray.forEach(classInfo => {
    const card = document.createElement("div");
    card.className = "class-card";

    // 제목
    const title = document.createElement("div");
    title.className = "class-title";
    title.textContent = classInfo.CLASS_NAME || "-";
    card.appendChild(title);

    // 정보 container
    const infoContainer = document.createElement("div");
    infoContainer.className = "class-info";

    const infoFields = [{
        label: "카테고리",
        value: classInfo.CATEGORY
      },
      {
        label: "등록기간",
        value: `${formatDate(classInfo.REGISTRATION_START)} ~ ${formatDate(classInfo.REGISTRATION_END)}`
      },
      {
        label: "수업기간",
        value: `${formatDate(classInfo.START_DATE)} ~ ${formatDate(classInfo.END_DATE)}`
      },
      {
        label: "신청인원/정원",
        value: `${classInfo.ENROLLMENT_COUNT}/${classInfo.CLASS_CAPACITY}`
      }
    ];

    infoFields.forEach(item => {
      const div = document.createElement("div");

      const label = document.createElement("span");
      label.className = "info-label";
      label.textContent = item.label;

      const value = document.createElement("span");
      value.textContent = item.value || "-";

      div.appendChild(label);
      div.appendChild(value);
      infoContainer.appendChild(div);
    });

    // 상세설명
    const descLabel = document.createElement("div");
    descLabel.textContent = "상세설명";
    infoContainer.appendChild(descLabel);

    const desc = document.createElement("p");
    desc.id = "classDescription";
    desc.textContent = classInfo.CLASS_DESCRIPTION || "-";
    infoContainer.appendChild(desc);

    card.appendChild(infoContainer);

    // 버튼 그룹
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.textContent = "목록으로";
    backBtn.onclick = goMain;

    btnGroup.appendChild(backBtn);
    card.appendChild(btnGroup);

    main.appendChild(card);
  });
}