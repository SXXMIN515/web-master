//myPage.js
console.log("classDetail.js start");

// 헤더 로그인 처리
document.addEventListener("DOMContentLoaded", () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
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
  window.location.href = `myClassList.html?memberId=${loginUser.member_id}`;
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

// 회원 상세정보 fetch
if (memberId) {
  fetch(`http://localhost:3000/gym/myPage?memberId=${memberId}`)
    .then(res => res.json())
    .then(result => {
      if (result.length > 0) {
        let memberInfo = result[0]; // rows 배열
        renderMemberDetail(memberInfo);
      } else {
        alert("해당 회원 정보가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}

// 회원 상세정보 DOM 생성
function renderMemberDetail(myInfo) {
  const main = document.querySelector(".main-content");
  main.innerHTML = "";

  // 제목
  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "내 정보";
  main.appendChild(title);

  // 정보 container
  const infoContainer = document.createElement("div");
  infoContainer.className = "my-info";

  const infoFields = [{
      label: "아이디",
      value: myInfo.LOGIN_ID
    },
    {
      label: "비밀번호",
      value: myInfo.LOGIN_PW
    },
    {
      label: "이름",
      value: myInfo.MEMBER_NAME
    },
    {
      label: "생년월일",
      value: `${formatDate(myInfo.BIRTH)}`
    },
    {
      label: "연락처",
      value: myInfo.TEL
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

  main.appendChild(infoContainer);

  // 버튼 그룹
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  // 수업 신청 내역 보기 버튼
  const myClassBtn = document.createElement("button");
  myClassBtn.className = "class-btn";
  myClassBtn.textContent = "수업 신청 내역";

  myClassBtn.addEventListener("click", () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loginUser) {
      window.location.href = `myClasses.html?memberId=${loginUser.member_id}`;
    } else {
      alert("로그인이 필요합니다.");
      goLogin();
    }
  });

  // 이전 페이지로 돌아가기 버튼
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "목록으로";
  backBtn.onclick = goMain;

  btnGroup.appendChild(myClassBtn);
  btnGroup.appendChild(backBtn);

  main.appendChild(btnGroup);
}