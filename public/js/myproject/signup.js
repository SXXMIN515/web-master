// singup.js

// 회원가입 -> 메인페이지 뒤로가기
document.querySelector('div.signup-container #back-to-login')
  .addEventListener('click', function () {
    window.location.href = "mainPage.html";
  });

// 회원가입
document.querySelector('form.signup-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let id = document.querySelector("#signup-id").value;
    let pw = document.querySelector("#signup-pw").value;
    let name = document.querySelector("#member-name").value;
    let birth = document.querySelector("#birth").value;
    let tel = document.querySelector("#tel").value;
    fetch("http://localhost:3000/gym/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
          pw,
          name,
          birth,
          tel
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // 서버 응답(result)이 성공이면 메인 페이지로 이동
        if (result.success) { // 서버에서 { success: true } 보내주는 경우
          alert("가입 완료");
          window.location.href = "mainPage.html"; // 메인 페이지로 이동
        } else {
          alert("가입 실패");
        }

        // 입력값 초기화.
        document.querySelectorAll('div.signup-container input').forEach(input => {
          input.value = '';
        });
      })
      .catch((err) => console.log(err));
  });