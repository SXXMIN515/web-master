// dom.js
// createElement() 요소생성.
// appendChild() 부모-자식관계
// innerTextm innerHTML, textContent

// 요소
let students = [{
    stdNo: 100,
    stdName: '홍길동',
    score: 80
  },
  {
    stdNo: 200,
    stdName: '김길동',
    score: 83
  }
]; // 학생정보 지정. students.length

// for (let prop in students[0]) {
//   console.log(prop, students[0][prop]);
// }

// 등록버튼 이벤트.
document.querySelector('#addBtn')
  .addEventListener('click', function () {
    // 등록 정보.
    const newElement = {
      stdNo: document.querySelector('#student_no').value,
      stdName: document.querySelector('#student_name').value,
      score: document.querySelector('#score').value
    }
    let tr = makeTr(newElement);
    // tbody에 등록.
    document.querySelector('#list tbody').appendChild(tr);
  }); // end of event.

function createStdList() {
  // 데이터 건수만큼 반복.
  for (let i = 0; i < students.length; i++) {
    let tr = makeTr(students[i]); // <td>100</td>
    document.querySelector('#list tbody').appendChild(tr);
  } // end of for.
} // end of createStdList().

function makeTr(newElement) {
  console.log(newElement);
  
  let tr = document.createElement('tr'); // <tr></tr>
  // 속성 반복
  for (let prop in newElement) {
    let td = document.createElement('td'); // <td></td>
    td.innerHTML = newElement[prop]; // <td>100</td>
    tr.appendChild(td); // <tr><td>100</td><td>홍길동</td><td>80</td><button>삭제</button></tr>
  }

  // 삭제버튼.
  let td = document.createElement('td');
  let btn = document.createElement('button');
  btn.addEventListener('click', function (e) {
    // console.log(e);
    e.target.parentElement.parentElement.remove(); // 버튼의 상위/상위요소
  });
  btn.setAttribute('class', 'btn btn-danger'); // <button id="addBtn" class="btn btn-danger">
  btn.innerHTML = '삭제';
  td.appendChild(btn);
  tr.appendChild(td);
  // 생성한 tr 반환.
  return tr;
} // end of makeTr(newElement).

createStdList();