// storage.js
console.log(window); // 또는 this.

// 아이템(students)
// 학번: 100, 이름: 홍길동, 점수: 80
// 학번: 200, 이름: 박철수, 점수: 85
// 학번: 300, 이름: 김민우, 점수: 76

// let students = [{
//     sno: 100,
//     sname: "홍길동",
//     score: 80
//   },
//   {
//     sno: 200,
//     sname: "박철수",
//     score: 85
//   },
//   {
//     sno: 300,
//     sname: "김민우",
//     score: 76
//   }
// ];
// localStorage.setItem('students', JSON.stringify(students));
function loadData() {
  document.querySelector('.data-container').innerHTML = ""; // 기존값 지우기
  let data = JSON.parse(localStorage.getItem("students"));
  data.forEach(item => {
    let div = document.createElement('div');
    for (let prop in item) {
      let span = document.createElement('span');
      span.innerHTML = item[prop];
      span.setAttribute('class', 'data-' + prop);
      div.appendChild(span);
    }
    // 수정화면으로 이동하는 버튼.
    let btn = document.createElement('button');
    btn.innerHTML = '수정';
    btn.addEventListener('click', function (e) {
      // search : sno 저장
      localStorage.setItem('search', item.sno);
      location.href = 'update.html';
    });
    div.appendChild(btn);

    // 삭제버튼.
    let delBtn = document.createElement('button');
    delBtn.innerHTML = '삭제';
    delBtn.addEventListener('click', function (e) {
      e.preventDefault();

    });
    div.appendChild(delBtn);

    document.querySelector('.data-container').appendChild(div);

    // 초기화.
    document.querySelector('input[id="sno"]').value = '';
    document.querySelector('input[id="sname"]').value = '';
    document.querySelector('input[id="score"]').value = '';
  });
}
loadData(); // 목록출력.

// 현재값을 불러오기.
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  let data = JSON.parse(localStorage.getItem("students"));
  let sno = document.getElementById('sno').value;
  let sname = document.getElementById('sname').value;
  let score = document.getElementById('score').value;
  // 입력값 확인.
  if (!sno || !sname || !score) {
    alert('값을 입력해주세요!');
    return;
  }

  // 중복값 확인
  if (data.filter((item) => item.sno == sno)) {
    alert('중복된 아이디가 존재합니다.');
    return;
  };

  if (!confirm('저장하시겠습니까?')) {
    alert('저장을 취소했습니다!');
    return;
  }
  console.log(data);

  data.push({
    sno,
    sname,
    score
  });

  // storage에 저장.
  localStorage.setItem('students', JSON.stringify(data));

  loadData();
});