// json.js

const xhtp = new XMLHttpRequest();
xhtp.open('get', 'data.json'); // 서버의 요청할 페이지 지정.
xhtp.send(); // 실제 요청
xhtp.onload = function () {
  let data = JSON.parse(xhtp.responseText);
  console.log(data);
  let fields = ['id', 'first_name', 'last_name', 'gender', 'salary'];
  data.forEach(function (item, idx, ary) {
    // tr > td * 5 생성
    let tr = document.createElement('tr');
    // for (let i = 0; i < fields.length; i++) {
    //   let td = document.createElement('td');
    //   td.innerHTML = item[fields[i]];
    //   tr.appendChild(td);
    // }
    fields.forEach(function (field) {
      let td = document.createElement('td');
      td.innerHTML = item[field];
      tr.appendChild(td);
    });
    document.querySelector('#list').appendChild(tr);
  });
}