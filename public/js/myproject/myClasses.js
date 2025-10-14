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
  window.location.href = `myPage.html?memberId=${loginUser.member_id}`;
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
  fetch(`http://192.168.0.13:3000/gym/myClasses?memberId=${memberId}`)
    .then(res => res.json())
    .then(result => {
      if (result.length > 0) {
        console.log(result);
        result.forEach((item) => {
          let tr = renderClassList(item);
          document.querySelector("#myClasses").appendChild(tr);
        });
      } else {
        alert("신청한 수업 정보가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}

// 여러 수업 DOM 생성 (스타일은 CSS에 의존)
function renderClassList(classInfo) {
  let tr = document.createElement("tr");
  tr.setAttribute('data-class-id', classInfo.CLASS_ID);

  // 1. 카테고리
  let tdCategory = document.createElement("td");
  tdCategory.innerHTML = classInfo.CATEGORY;
  tr.appendChild(tdCategory);

  // 2. 수업명
  let tdName = document.createElement("td");
  tdName.innerHTML = classInfo.CLASS_NAME;
  tr.appendChild(tdName);

  // 3. 등록기간 (REGISTRATION_START ~ REGISTRATION_END)
  let tdRegistration = document.createElement("td");
  tdRegistration.innerHTML = `${classInfo.REGISTRATION_START} ~ ${classInfo.REGISTRATION_END}`;
  tr.appendChild(tdRegistration);

  // 4. 수업기간 (START_DATE ~ END_DATE)
  let tdClassPeriod = document.createElement("td");
  tdClassPeriod.innerHTML = `${classInfo.START_DATE} ~ ${classInfo.END_DATE}`;
  tr.appendChild(tdClassPeriod);

  // 5. 신청인원/정원 (ENROLLMENT_COUNT / CLASS_CAPACITY)
  let tdEnrollment = document.createElement("td");
  tdEnrollment.innerHTML = `${classInfo.ENROLLMENT_COUNT}/${classInfo.CLASS_CAPACITY}`;
  tr.appendChild(tdEnrollment);

  return tr;
}