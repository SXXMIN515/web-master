// event.js
// 이벤트를 등록할 요소.
console.log();
let students = [
  { stdNo: 100, 
    stdName: '홍길동', 
    score: 80
  },
  { stdNo: 200, 
    stdName: '김민수', 
    score: 88
  }
]; // 학생정보 지정. students.length

// 이벤트들...
document.querySelector('button#addBtn') // 화면요소.
  .addEventListener('click', function () {
    // 사용자의 입력값.
    let sno = document.querySelector('#student_no').value;
    let sname = document.querySelector('#student_name').value;
    let score = document.querySelector('#score').value;

    // 필수값 입력.
    if (sno == '' || sname == '' || score == ''){
      alert('값을 입력하세요.');
      return;
    }
    students[students.length] = {
      stdNo: sno, 
      stdName: sname, 
      score: score
    };

    console.log(students);
    createStdList();
    // 입력항목 초기화
    document.querySelector('#student_no').value = '';
    document.querySelector('#student_name').value = '';
    document.querySelector('#score').value = '';
  });
  
// 수정이벤트
document.querySelector('button.addBtn') //선택자
  .addEventListener('click', function() {
    // 목록에서 tr 전체선택.
    // 찾을 학생번호, 변경할 학생점수
    let sno = document.querySelector('#student_no').value;
    let score = document.querySelector('#score').value;
  
    let nodeList = document.querySelectorAll('#list tbody tr');
    for (let i=0; i<nodeList.length; i++) {
      // console.log(nodeList[i].children[0].innerHTML, '-', sno); // td, td, td, td
      // 찾을 학생번호.
      if (sno == nodeList[i].children[0].innerHTML) { // 찾을 값 비교
        nodeList[i].children[2].innerHTML = score; // 변경값 할당
      }
    } // end of for.
  }); // end of document.querySelector('.addBtn')

// 함수들....
// 배열값을 활용해서 학생목록 출력.
function createStdList() {
  let str = ``;
  for (let i=0; i<students.length; i++) {
    str += `<tr onclick='showInfo(event)'>
              <td>${students[i].stdNo}</td>
              <td>${students[i].stdName}</td>
              <td>${students[i].score}</td>
              <td><button class='btn btn-danger' onclick='removeRow(event)'>삭제</button></td>
            </tr>`;
  }
  document.querySelector('#list tbody').innerHTML = str;
} // end of createStdList().
createStdList();

// 학생정보삭제
function removeRow(e) {
  e.target.parentElement.parentElement.remove();
}

// 학생정보 입력화면에 출력
function showInfo(e) {
  console.dir(e.target.parentElement.children[0].innerHTML);
  // 학생번호 - 
  document.querySelector('#student_no').value = e.target.parentElement.children[0].innerHTML;
  // 학생이름 -
  document.querySelector('#student_name').value = e.target.parentElement.children[1].innerHTML;
  // 점수 -
  document.querySelector('#score').value = e.target.parentElement.children[2].innerHTML;
}

console.log(document.querySelectorAll('button'));

// document.querySelectorAll('button')[0].addEventListener();