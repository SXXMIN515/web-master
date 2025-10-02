// mainPage.js
console.log('start');

// 수업 목록
fetch("http://localhost:3000/gym/classList")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result.forEach((item) => {
      let tr = makeRow(item);
      document.querySelector("#classList").appendChild(tr);
    });
  })
  .catch((err) => console.log(err));

// 수업정보 => row 생성.
function makeRow(classInfo) {
  let fields = ["CLASS_ID", "CLASS_IMG", "CLASS_NAME", "START_DATE", "END_DATE", "CLASS_DESCRIPTION", "CLASS_CAPACITY"]; // SQL 테이블 컬명
  let tr = document.createElement("tr");
  tr.setAttribute("data-mid", classInfo.class_id);
  fields.forEach((field) => {
    let td = document.createElement("td");
    td.innerHTML = classInfo[field];
    // console.log(member[field]);
    tr.appendChild(td);
  });

  return tr;
} // end of makeRow.