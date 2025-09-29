// emp.js
console.log('start');
//http://localhost:3000/emp => json데이터.
fetch("http://localhost:3000/emp/ALL/ALL/-1")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result.forEach((item) => {
      let tr = makeRow(item);
      document.querySelector("#list").appendChild(tr);
    });
  })
  .catch((err) => console.log(err));

// 이벤트.
console.log(document.forms);
document.forms[0].addEventListener("submit", function (e) {
  // 기본 기능 차단.
  e.preventDefault();
  let eno = document.querySelector("#empNo").value;
  let ename = document.querySelector("#empName").value;
  let job = document.querySelector("#jobTitle").value;
  let hd = document.querySelector("#hireDate").value;
  let deptno = document.querySelector("#deptNo").value;

  // json 포맷으로 서버 전달.
  fetch("http://localhost:3000/emp", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        eno,
        ename,
        job,
        hd,
        deptno,
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
});

// 조건 검색.
document.querySelector('div.search-container button[type="button"]')
  .addEventListener('click', function (e) {
    const ename = document.querySelector('#searchName').value || "ALL";
    const job = document.querySelector('#searchJob').value || "ALL"; // false || true
    const deptno = document.querySelector('#searchDept').value || "-1";
    let url = `http://localhost:3000/emp/${ename}/${job}/${deptno}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        document.querySelector('#list').innerHTML = ""; // 기존목록 비우기.
        result.forEach((item) => {
          let tr = makeRow(item);
          document.querySelector('#list').appendChild(tr);
        });
      })
      .catch(err => console.log(err));
  });

// 사원정보 => row 생성.
function makeRow(employee) {
  let fields = ["EMPNO", "ENAME", "JOB", "SAL", "DNAME"]; // SQL 테이블 컬명
  // let fields = ["EMPNO", "ENAME", "JOB", "HIREDATE", "SAL", "DEPTNO"]; // SQL 테이블 컬명
  let tr = document.createElement("tr");
  tr.setAttribute("data-eno", employee.EMPNO);
  fields.forEach((field) => {
    let td = document.createElement("td");
    td.innerHTML = employee[field];
    // console.log(employee[field]);
    tr.appendChild(td);
  });
  // 삭제버튼.
  let btn = document.createElement("button");
  btn.innerHTML = "삭제";
  btn.addEventListener("click", deleteFunc);
  let td = document.createElement("td");
  td.appendChild(btn);
  tr.appendChild(td);
  return tr;
} // end of makeRow.

// 삭제버튼 클릭시
function deleteFunc(e) {
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