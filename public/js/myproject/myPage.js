// myPage.js
let loginUser;
document.addEventListener("DOMContentLoaded", () => {
  loginUser = JSON.parse(localStorage.getItem("loginUser"));
  console.log(loginUser);

  const topRight = document.querySelector(".top-right");

  if (loginUser) {
    topRight.innerHTML = `
      <span>${loginUser.name}님 환영합니다!</span>
      <button class="myPage-btn">마이페이지</button>
      <button class="logout-btn">로그아웃</button>
    `;

    document.querySelector(".logout-btn").addEventListener("click", () => {
      localStorage.removeItem("loginUser");
      alert("로그아웃 되었습니다.");
      window.location.href = "mainPage.html";
    });

    document.querySelector(".myPage-btn").addEventListener("click", () => {
      window.location.href = `myPage.html?memberId=${loginUser.member_id}`;
    });
  }

  // URL에서 memberId 가져오기
  const params = new URLSearchParams(window.location.search);
  const memberId = params.get("memberId");

  if (memberId) {
    fetch(`http://192.168.0.13:3000/gym/myPage?memberId=${memberId}`)
      .then(res => res.json())
      .then(result => {
        if (result.length > 0) renderMemberDetail(result[0], loginUser);
        else alert("해당 회원 정보가 없습니다.");
      })
      .catch(err => console.error(err));
  }
});

// 회원 상세정보 DOM 생성
function renderMemberDetail(myInfo, loginUser) {
  const main = document.querySelector(".main-content");
  main.innerHTML = ""; // 기존 내용 초기화

  const div = document.createElement('div');
  div.className = "my-info";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "내 정보";
  div.appendChild(title);

  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

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
      value: formatDate(myInfo.BIRTH)
    },
    {
      label: "연락처",
      value: myInfo.TEL
    }
  ];

  infoFields.forEach(f => {
    const fieldDiv = document.createElement("div");
    const label = document.createElement("span");
    label.textContent = f.label;
    const value = document.createElement("span");
    value.textContent = f.value || "-";
    fieldDiv.appendChild(label);
    fieldDiv.appendChild(value);
    infoContainer.appendChild(fieldDiv);
  });

  div.appendChild(infoContainer);

  // 버튼 그룹
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const myClassBtn = document.createElement("button");
  myClassBtn.className = 'class-btn';
  myClassBtn.textContent = "수업 신청 내역";
  myClassBtn.addEventListener("click", () => {
    if (loginUser) window.location.href = `myClasses.html?memberId=${loginUser.member_id}`;
    else {
      alert("로그인이 필요합니다.");
      goLogin();
    }
  });

  const myUpdateBtn = document.createElement("button");
  myUpdateBtn.textContent = "정보 수정";
  myUpdateBtn.className = 'myUpdate-btn';
  myUpdateBtn.addEventListener("click", () => showUpdateForm(myInfo));

  // 목록으로 버튼
  const backBtn = document.createElement("button");
  backBtn.textContent = "목록으로";
  backBtn.className = "back-btn";
  backBtn.onclick = goMain;

  btnGroup.appendChild(myClassBtn);
  btnGroup.appendChild(myUpdateBtn);
  btnGroup.appendChild(backBtn);
  div.appendChild(btnGroup);

  main.appendChild(div);
}

// updateDiv 생성
function showUpdateForm(myInfo) {
  const main = document.querySelector(".main-content");
  main.innerHTML = ""; // 기존 내용 초기화

  const updateDiv = document.createElement("div");
  updateDiv.className = "my-update";

  const fields = [{
      label: "아이디",
      value: myInfo.LOGIN_ID,
      name: "id",
      readonly: true
    },
    {
      label: "비밀번호",
      value: "",
      name: "pw"
    },
    {
      label: "이름",
      value: myInfo.MEMBER_NAME,
      name: "name"
    },
    {
      label: "생년월일",
      value: formatDate(myInfo.BIRTH),
      name: "birth",
      type: "date"
    },
    {
      label: "연락처",
      value: myInfo.TEL,
      name: "tel",
      type: "text"
    }
  ];

  fields.forEach(f => {
    const fieldDiv = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = f.label;
    const input = document.createElement("input");
    input.id = `update-${f.name}`;
    input.name = f.name;
    input.value = f.value || '';
    if (f.readonly) input.readOnly = true;

    fieldDiv.appendChild(label);
    fieldDiv.appendChild(input);
    updateDiv.appendChild(fieldDiv);
  });

  // 버튼 그룹
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "수정 완료";
  saveBtn.className = "save-btn";
  saveBtn.addEventListener("click", () => saveUpdate());

  const backBtn = document.createElement("button");
  backBtn.textContent = "목록으로";
  backBtn.className = "back-btn";
  backBtn.addEventListener("click", () => renderMemberDetail(myInfo, JSON.parse(localStorage.getItem("loginUser"))));

  btnGroup.appendChild(saveBtn);
  btnGroup.appendChild(backBtn);

  updateDiv.appendChild(btnGroup);

  main.appendChild(updateDiv);
}

// 수정 완료 fetch
function saveUpdate() {
  const pw = document.querySelector('#update-pw').value;
  const name = document.querySelector('#update-name').value;
  const birth = document.querySelector('#update-birth').value;
  const tel = document.querySelector('#update-tel').value;

  fetch("http://192.168.0.13:3000/gym/myUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        pw,
        name,
        birth,
        tel,
        id: loginUser.member_id
      })
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        alert("수정 완료");
        window.location.reload();
      } else alert("수정 실패");
    })
    .catch(err => console.error(err));
}

// 날짜 포맷
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// 로그인 / 메인 이동
function goLogin() {
  window.location.href = "login.html";
}

function goMain() {
  window.location.href = "mainPage.html";
}