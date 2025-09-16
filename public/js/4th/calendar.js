// calendar.js
// 매개값으로 년, 월 활용.
let yyyy = 2025,
  mm = 12;
// 2025-8-1 2025-7-31
let today = new Date();
today.setFullYear(yyyy);
today.setMonth(mm - 1);
today.setDate(1);

// 1일의 위치구하기
let spaces = today.getDay(); // 공란의 갯수 일(0) 월(1)

// 이번 달 말일 구하기
today.setMonth(mm);
let lastDate = new Date(today.getTime() - (1000 * 60 * 60 * 24));
lastDate = lastDate.getDate();

// 공란계산.
let tr = document.createElement('tr');
for (let s = 0; s < spaces; s++) {
  let td = document.createElement('td');
  tr.appendChild(td);
}
// 날짜계산
for (let d = 1; d <= lastDate; d++) {
  let td = document.createElement('td');
  td.innerHTML = d;
  tr.appendChild(td);
  if ((d + spaces) % 7 == 0) { // 새로운 줄 생성.
    td.setAttribute('class', 'saturday');
    document.querySelector('tbody').appendChild(tr);
    tr = document.createElement('tr');
  } else if ((d + spaces) % 7 == 1) {
    td.setAttribute('class', 'sunday');
  }
  document.querySelector('tbody').appendChild(tr);
}