// login.js
console.log('start');

// 로그인
console.log(document.forms);
document.querySelector('form.login-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    let id = document.querySelector("#login-id").value;
    let pw = document.querySelector("#login-pw").value;
    fetch("http://localhost:3000/gym/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
          pw
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);


        // 서버 응답(result)이 성공이면 메인 페이지로 이동
        if (result.success) { // 서버에서 { success: true } 보내주는 경우
          localStorage.setItem("loginUser", JSON.stringify(result.user)); // 로그인한 사용자 정보 저장(로컬스토리지)
          window.location.href = "mainPage.html"; // 메인 페이지로 이동
        } else {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        // 입력값 초기화.
        document.querySelectorAll("div.login-container input").forEach(input => {
          input.value = '';
        });
      })
      .catch((err) => console.log(err));
  });

// 로그인 -> 메인페이지 뒤로가기
document.querySelector('div.login-container #back-to-login')
  .addEventListener('click', function () {
    window.location.href = "mainPage.html";
  });

// 로그인 > 회원가입 버튼 클릭시.
function goSignup() {
  window.location.href = "signup.html";
}

// 로그인 > 아이디 찾기 버튼 클릭시.
document.querySelector('div.login-container .login-findId-btn')
  .addEventListener('click', function () {
    document.querySelector('div.login-container').style.display = 'none'; // 로그인 폼 사라지고
    document.querySelector('div.findId-container').style.display = ''; // 아이디 찾기 폼 나타나기
  });

// 로그인 > 비밀번호 찾기 버튼 클릭시.
document.querySelector('div.login-container .login-findPW-btn')
  .addEventListener('click', function () {
    document.querySelector('div.login-container').style.display = 'none'; // 로그인 폼 사라지고
    document.querySelector('div.findPW-container').style.display = ''; // 비밀번호 찾기 폼 나타나기
  });

// 아이디 찾기 -> 로그인 뒤로가기
document.querySelector('div.findId-container #back-to-login')
  .addEventListener('click', function () {
    document.querySelector('div.findId-container').style.display = 'none'; // 아이디 찾기 폼 사라지고
    document.querySelector('div.login-container').style.display = ''; // 로그인 폼 나타나기
  });

// 비밀번호 찾기 -> 로그인 뒤로가기
document.querySelector('div.findPW-container #back-to-login')
  .addEventListener('click', function () {
    document.querySelector('div.findPW-container').style.display = 'none'; // 비밀번호 찾기 폼 사라지고
    document.querySelector('div.login-container').style.display = ''; // 로그인 폼 나타나기
  });

// 아이디 찾기
document.querySelector('form.findId-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector("#findId-name").value;
    let birth = document.querySelector("#findId-birth").value;
    let tel = document.querySelector("#findId-tel").value;
    fetch("http://localhost:3000/gym/findId", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          birth,
          tel
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // 서버 응답(result)이 성공이면 로그인 페이지로 새로고침
        if (result.success) { // 서버에서 { success: true } 보내주는 경우
          alert("조회하신 아이디: " + result.id);
          document.querySelector('div.findId-container').style.display = 'none'; // 아이디 찾기 폼 사라지고
          document.querySelector('div.login-container').style.display = ''; // 로그인 폼 나타나기
        } else {
          alert("일치하는 회원이 없습니다.");
        }

        // 입력값 초기화.
        document.querySelectorAll("div.findId-container input").forEach(input => {
          input.value = '';
        });
      })
      .catch((err) => console.log(err));
  });

// 비밀번호 찾기
document.querySelector('form.findPW-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let id = document.querySelector("#findPW-id").value;
    let name = document.querySelector("#findPW-name").value;
    let birth = document.querySelector("#findPW-birth").value;
    let tel = document.querySelector("#findPW-tel").value;
    fetch("http://localhost:3000/gym/findPW", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
          name,
          birth,
          tel
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // 서버 응답(result)이 성공이면 로그인 페이지로 새로고침
        if (result.success) { // 서버에서 { success: true } 보내주는 경우
          alert("조회하신 비밀번호: " + result.pw);
          document.querySelector('div.findPW-container').style.display = 'none'; // 비밀번호 찾기 폼 사라지고
          document.querySelector('div.login-container').style.display = ''; // 로그인 폼 나타나기
        } else {
          alert("일치하는 회원이 없습니다.");
        }

        // 입력값 초기화.
        document.querySelectorAll("div.findPW-container input").forEach(input => {
          input.value = '';
        });
      })
      .catch((err) => console.log(err));
  });

// //회원 목록
// fetch("http://localhost:3000/gym/memberList")
//   .then((response) => response.json())
//   .then((result) => {
//     // console.log(result);
//     result.forEach((item) => {
//       let tr = makeRow(item);
//       document.querySelector("#memberList").appendChild(tr);
//     });
//   })
//   .catch((err) => console.log(err));

// // 회원정보 => row 생성.
// function makeRow(member) {
//   let fields = ["MEMBER_ID", "LOGIN_ID", "LOGIN_PW", "MEMBER_NAME", "BIRTH", "TEL", "JOIN_DATE"]; // SQL 테이블 컬명
//   let tr = document.createElement("tr");
//   tr.setAttribute("data-mid", member.member_id);
//   fields.forEach((field) => {
//     let td = document.createElement("td");
//     td.innerHTML = member[field];
//     // console.log(member[field]);
//     tr.appendChild(td);
//   });

//   return tr;
// } // end of makeRow.